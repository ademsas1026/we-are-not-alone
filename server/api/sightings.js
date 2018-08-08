const router = require('express').Router();
const { Sighting } = require('../db/models');
const go = require('../../script/main');
module.exports = router;

let minLat;
let maxLat;
let minLng;
let maxLng;
let sightings = [];


router.get('/', async (req, res, next) => {
  sightings = await Sighting.findAll({}).catch(next);
  res.json(sightings);
})

router.post('/', async (req, res, next) => {
  const sighting = await Sighting.create(req.body).catch(next);
  res.json(sighting);
})

router.get('/clusters/:latitude/:longitude', async(req, res, next) => {
  console.log('this is the database!', process.env.DATABASE_URL)
  const data = await go(next).catch(next);
  const allLongitudesAndLatitudes = [];

  for (let clusterId=0; clusterId < data.length; clusterId++){
    allLongitudesAndLatitudes.push({clusterId, 
      longitudes: data[clusterId].map(sighting => sighting.longitude), 
      latitudes: data[clusterId].map(sighting => sighting.latitude )
    })
  }


  allLongitudesAndLatitudes.forEach(cluster => {
    minLat = cluster.latitudes.length > 2 ? Math.min(...cluster.latitudes) : Math.min(cluster.latitudes);
    maxLat = cluster.latitudes.length > 2 ? Math.max(...cluster.latitudes) : Math.max(cluster.latitudes);
    minLng = cluster.longitudes.length > 2 ? Math.min(...cluster.longitudes) : Math.min(cluster.longitudes);
    maxLng = cluster.latitudes.length > 2 ? Math.max(...cluster.longitudes) : Math.max(cluster.longitudes);
    if(minLat <= Number(req.params.latitude) && minLng <= Number(req.params.longitude)){
      if(Number(req.params.latitude) < maxLat && Number(req.params.longitude) < maxLng){
        
       
        sightings = data[cluster.clusterId];
        res.json(sightings);
      }
      
     
    }
  })

})