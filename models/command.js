var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('Command', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: Sequelize.STRING,
    length: 100
  },
  command: {
    type: Sequelize.STRING,
    length: 100
  },
  arg1: {
    type: Sequelize.STRING,
    length: 100
  },
  arg2: {
    type: Sequelize.STRING,
    length: 160
  }
}, {
  tableName: 'commands',
  timestamps: false
})

module.exports = Model
