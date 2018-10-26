'use strict';

var sequelize = require('../config/sequelize')
var q = require('q')

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    var q1 = sequelize.query('ALTER TABLE messages DROP INDEX u_msg;')
    var q2 = sequelize.query('ALTER TABLE call_logs DROP INDEX u_call_log;')
    var q3 = sequelize.query('ALTER TABLE contacts DROP INDEX u_contact;')

    return q.all([q1, q2, q3])

  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
