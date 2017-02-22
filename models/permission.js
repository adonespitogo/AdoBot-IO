var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('Permission', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uid: Sequelize.STRING(20),
  permission: Sequelize.STRING(100),
  granted: Sequelize.BOOLEAN

}, {
  tableName: 'permissions',
  timestamps: false
})

module.exports = Model
