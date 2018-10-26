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

    var q1 = sequelize.query('ALTER TABLE messages ADD CONSTRAINT u_msg UNIQUE (uid,message_id);')
    var q2 = sequelize.query('ALTER TABLE call_logs ADD CONSTRAINT u_call_log UNIQUE (uid,date,type);')
    var q3 = sequelize.query('ALTER TABLE contacts ADD CONSTRAINT u_contact UNIQUE (uid,contact_id);')

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
