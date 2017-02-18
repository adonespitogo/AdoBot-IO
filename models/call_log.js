var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('CallLog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: Sequelize.STRING,
  call_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  name: Sequelize.STRING,
  date: Sequelize.DATE,
  phone: Sequelize.STRING,
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
