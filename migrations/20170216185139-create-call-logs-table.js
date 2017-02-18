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
      name: Sequelize.STRING,
      date: {
        type: Sequelize.STRING(30),
        unique: true
      },
      phone: Sequelize.STRING(20),
      duration: Sequelize.INTEGER
    }, {
      indexes: [{
        unique: true,
        fiels: ['date']
      }]
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
