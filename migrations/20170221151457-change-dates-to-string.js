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
    var q1 = queryInterface.changeColumn('messages', 'date', {
      type: Sequelize.STRING(50),
    });
    var q2 = queryInterface.changeColumn('call_logs', 'date', {
      type: Sequelize.STRING(50),
      unique: true
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
    var q1 = queryInterface.changeColumn('messages', 'date', {
      type: Sequelize.DATE
    });
    var q2 = queryInterface.changeColumn('call_logs', 'date', {
      type: Sequelize.DATE,
      unique: true
    });
    return q.all([q1, q2])
  }
};
