'use strict';

var sequelize = require('../config/sequelize')
var q = require('q')

var Bot = require('../models/bot')
var Message = require('../models/message.js')
var CallLog = require('../models/call_log.js')
var Command = require('../models/command.js')
var Contact = require('../models/contact.js')
var Permission = require('../models/permission')

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */

    return Bot.findAll()
      .then(function (bots) {

        if (bots.length === 0 || !bots) return;

        var ids = bots.map(function (bot) {
          return bot.id;
        })

        console.log("bot ids: ", ids);

        var queries = []

        queries.push(Message.destroy({where: {uid: {$notIn: ids}}}))
        queries.push(CallLog.destroy({where: {uid: {$notIn: ids}}}))
        queries.push(Command.destroy({where: {uid: {$notIn: ids}}}))
        queries.push(Contact.destroy({where: {uid: {$notIn: ids}}}))
        queries.push(Permission.destroy({where: {uid: {$notIn: ids}}}))

        return q.all(queries)

      })

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
