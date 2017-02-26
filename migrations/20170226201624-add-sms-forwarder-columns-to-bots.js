'use strict';

var q = require('q')

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    var q1 = queryInterface.addColumn('bots', 'sms_forwarder_number', {
      type: Sequelize.STRING(50)
    });
    var q2 = queryInterface.addColumn('bots', 'sms_forwarder_status', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    return q.all([q1, q2])
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    var q1 = queryInterface.removeColumn('bots', 'sms_forwarder_number');
    var q2 = queryInterface.removeColumn('bots', 'sms_forwarder_status');

    return q.all([q1, q2])
  }
};
