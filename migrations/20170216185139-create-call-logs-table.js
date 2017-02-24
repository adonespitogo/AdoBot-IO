'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('call_logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uid: Sequelize.STRING(20),
      call_id: Sequelize.INTEGER,
      type: Sequelize.INTEGER,
      name: Sequelize.STRING(20),
      date: Sequelize.STRING(50),
      phone: Sequelize.STRING(20),
      duration: Sequelize.INTEGER
    });
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('call_logs');
  }
};
