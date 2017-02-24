
'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('bots', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uid: {
        type: Sequelize.STRING(20)
      },
      status: Sequelize.BOOLEAN,
      updated: Sequelize.DATE,
      provider: {
        type: Sequelize.STRING(100)
      },
      lat: Sequelize.DECIMAL(10,6),
      longi: Sequelize.DECIMAL(10,6),
      device: {
        type: Sequelize.STRING
      },
      sdk: {
        type: Sequelize.STRING(10)
      },
      version: {
        type: Sequelize.STRING(10)
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      socket_id: {
        type: Sequelize.STRING(100)
      }
    });
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting bots here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('bots');
  }
};
