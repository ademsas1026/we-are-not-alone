const cluster = require('k-means');
const { Sighting } = require("../server/db/models");

const grabSightings = async() => {
  const sightingsPromises = await Sighting.findAll({}).catch(console.error);
  const sightingArrays = await Promise.all(sightingsPromises).catch(console.error);
  return sightingArrays.map(sightingArray => sightingArray.dataValues);
}


const kmeans = (...args) =>
  new Promise(resolve => cluster(...args, resolve));

const pos = async () => {
  const sightings = await grabSightings().catch(console.error);
  
  return sightings.map(
    ({latitude: lat, longitude: lng}, i) => [Number(lat), Number(lng)]
  );
}

const NUM_CLUSTERS = 20;

const go = async () => {  
  const posResults = await pos().catch(console.error);

  const {finalMatrix, clusterCenters}
    = await kmeans(posResults, {
      clusters: NUM_CLUSTERS,
      iterations: 100,
    });

  const clusters = new Array(NUM_CLUSTERS)
    .fill('x')
    .map(x => []);

  const sightings = await grabSightings().catch(console.error);

  sightings.forEach((sighting, i) => {
    console.log('this is final matrix: ', finalMatrix)
    const id = finalMatrix[i][0];
    sighting.clusterId = id;
    clusters[id].push(sighting);
  })
  
  return clusters;
}

module.exports = go();