'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {

    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uid: Sequelize.STRING(20),
      message: Sequelize.TEXT,
      date: Sequelize.STRING(50),
      type: Sequelize.INTEGER,
      name: Sequelize.STRING(20),
      phone: Sequelize.STRING(20),
      thread_id: Sequelize.INTEGER,
      message_id: Sequelize.INTEGER
    });
  },

  down: function(queryInterface, Sequelize) {

    return queryInterface.dropTable('messages');
  }
};
