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
    var q1 = queryInterface.changeColumn('commands', 'arg1', {
      type: Sequelize.STRING(255)
    });
    var q2 = queryInterface.changeColumn('commands', 'arg2', {
      type: Sequelize.STRING(255)
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
  }
};
