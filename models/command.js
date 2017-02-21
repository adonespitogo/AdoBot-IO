var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('Command', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: Sequelize.STRING(20)
  },
  command: {
    type: Sequelize.STRING(100)
  },
  arg1: {
    type: Sequelize.STRING
  },
  arg2: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'commands',
  timestamps: false
})

module.exports = Model
