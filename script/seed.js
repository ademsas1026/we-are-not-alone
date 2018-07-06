'use strict';
const { sightingsData } = require('./prepData.js');
const db = require("../server/db");
const { Sighting } = require( "../server/db/models");

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

const sightings = await Promise.all(
  sightingsData.map(sighting => Sighting.create(sighting))
);

console.log(`seeded ${sightings.length} sightings`);
console.log(`seeded successfully`);
}

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
