var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('CallLog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: Sequelize.STRING(20),
  call_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  name: Sequelize.STRING(20),
  date: {
    type: Sequelize.STRING(50),
    unique: true
  },
  phone: Sequelize.STRING(20),
  duration: Sequelize.INTEGER
}, {
  tableName: 'call_logs',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fiels: ['date']
    }
  ]
})

module.exports = Model
