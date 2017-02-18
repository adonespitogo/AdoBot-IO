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
      uid: {
        type: Sequelize.STRING,
        length: 50
      },
      call_id: Sequelize.INTEGER,
      type: Sequelize.INTEGER,
      name: Sequelize.STRING,
      date: {
        type: Sequelize.DATE,
        unique: true
      },
      phone: Sequelize.STRING,
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
