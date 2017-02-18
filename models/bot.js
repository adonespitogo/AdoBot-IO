var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

module.exports = sequelize.define('Bot', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: Sequelize.STRING,
    length: 100
  },
  status: Sequelize.BOOLEAN,
  updated: Sequelize.DATE,
  provider: {
    type: Sequelize.STRING,
    length: 100
  },
  lat: Sequelize.DECIMAL,
  longi: Sequelize.DECIMAL,
  device: {
    type: Sequelize.STRING,
    length: 100
  },
  sdk: {
    type: Sequelize.STRING,
    length: 100
  },
  version: {
    type: Sequelize.STRING,
    length: 100
  },
  phone: {
    type: Sequelize.STRING,
    length: 100
  },
  socket_id: {
    type: Sequelize.STRING,
    length: 100
  }
}, {
  tableName: 'bots',
  timestamps: false
})
