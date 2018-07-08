const Sequelize = require('sequelize')
const db = require('../db')

const Sighting = db.define('sighting', {
  date: Sequelize.STRING, 
  time: Sequelize.STRING,  
  city: Sequelize.STRING, 
  state: Sequelize.STRING, 
  country: Sequelize.STRING, 
  shape: Sequelize.STRING,
  duration: Sequelize.INTEGER, 
  comments: Sequelize.STRING, 
  latitude: {
    type: Sequelize.DECIMAL, 
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL, 
    allowNull: false
  }
})

module.exports = Sighting