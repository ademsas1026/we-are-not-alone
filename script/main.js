// Engine.clusterDataSet method = cluster
const cluster = require('k-means')
const { Sighting } = require("../server/db/models")

const grabSightings = async next => {
  const sightingsPromises = await Sighting.findAll({}).catch(next)
  const sightingArrays = await Promise.all(sightingsPromises).catch(next)
  return sightingArrays.map(sightingArray => sightingArray.dataValues)
}


const kmeans = (...args) =>
  new Promise(resolve => cluster(...args, resolve))

const pos = async (next) => {
  const sightings = await grabSightings(next).catch(next)
  
  return sightings.map(
    ({latitude: lat, longitude: lng}, i) => [Number(lat), Number(lng)]
  )
}

const NUM_CLUSTERS = 20

const go = async (next) => {  
  const posResults = await pos(next).catch(next)

  const {finalMatrix, clusterCenters}
    = await kmeans(posResults, {
      clusters: NUM_CLUSTERS,
      iterations: 100,
    })

  const clusters = new Array(NUM_CLUSTERS)
    .fill('x')
    .map(x => [])

  const sightings = await grabSightings(next).catch(next)
  if (finalMatrix.length){
    sightings.forEach((sighting, i) => {
    
      const id = finalMatrix[i][0]
      sighting.clusterId = id
      clusters[id].push(sighting)
    })
  }
 
  
  return clusters
}

module.exports = go