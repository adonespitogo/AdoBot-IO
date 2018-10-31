var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Bot = sequelize.define('Bot', {
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
  },
  sms_forwarder_number: Sequelize.STRING(50),
  sms_forwarder_status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'bots',
  timestamps: false
})

module.exports = Bot

