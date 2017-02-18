'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering messages here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('files', {
      uid: {
        type: Sequelize.STRING,
        length: 100
      },
      file: Sequelize.STRING,
      time: Sequelize.DATE
    }, {
      timestamps: false
    });
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting files here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('files');
  }
};
