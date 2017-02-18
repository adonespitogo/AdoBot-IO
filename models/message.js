var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('Message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: Sequelize.STRING,
    length: 100
  },
  message: Sequelize.TEXT,
  date: Sequelize.DATE,
  type: Sequelize.INTEGER,
  name: Sequelize.STRING,
  phone: Sequelize.STRING,
  thread_id: Sequelize.INTEGER,
  message_id: {
    type: Sequelize.INTEGER
  }

}, {
  tableName: 'messages',
  timestamps: false,
  charset: 'utf8mb4',
  indexes: [
    {
      unique: true,
      fiels: ['message_id']
    }
  ]
})


Model.removeAttribute('id')

module.exports = Model
