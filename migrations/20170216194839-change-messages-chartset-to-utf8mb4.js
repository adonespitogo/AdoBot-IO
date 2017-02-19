'use strict';

var sequelize = require('../config/sequelize')
var q = require('q')

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      This is needed to be able to save emoji characters
    */
    var promises = []
    promises[0] = sequelize.query('ALTER DATABASE '+sequelize.config.database+' CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;')
    promises[1] = sequelize.query('ALTER TABLE messages CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;')
    promises[2] = sequelize.query('ALTER TABLE messages MODIFY message TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;')

    return q.all(promises)
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
