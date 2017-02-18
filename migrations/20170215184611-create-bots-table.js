
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
        type: Sequelize.STRING,
        length: 100
      },
      status: Sequelize.BOOLEAN,
      updated: Sequelize.DATE,
      provider: {
        type: Sequelize.STRING,
        length: 100
      },
      lat: Sequelize.DECIMAL,
      longi: Sequelize.DECIMAL,
      device: {
        type: Sequelize.STRING,
        length: 100
      },
      sdk: {
        type: Sequelize.STRING,
        length: 100
      },
      version: {
        type: Sequelize.STRING,
        length: 100
      },
      phone: {
        type: Sequelize.STRING,
        length: 100
      },
      socket_id: {
        type: Sequelize.STRING,
        length: 100
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
