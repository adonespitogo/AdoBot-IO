var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('Contact', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uid: Sequelize.STRING(50),
  contact_id: {
    type: Sequelize.INTEGER,
    unique: true
  },
  name: Sequelize.STRING(50),
  phone_numbers: Sequelize.STRING
}, {
  tableName: 'contacts',
  timestamps: false
})

module.exports = Model
