var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('File', {
  uid: {
    type: Sequelize.STRING,
    length: 100
  },
  file: Sequelize.STRING,
  time: Sequelize.DATE
}, {
  tableName: 'files',
  timestamps: false
})

Model.removeAttribute('id')

module.exports = Model
