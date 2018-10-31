
var Q = require('q')

var Bot = require('../models/bot')
var Message = require('../models/message.js')
var CallLog = require('../models/call_log.js')
var Command = require('../models/command.js')
var Contact = require('../models/contact.js')
var Permission = require('../models/permission')

module.exports = function(io) {
  return {
    index: function(req, res, next) {
      Bot.findAll()
        .then(function(db_bots) {
          res.json(db_bots)
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },
    updateStatus: function(req, res, next) {
      var uid = req.params.uid
      var attributes = req.body
      attributes.status = true
      attributes.updated = new Date()
      Bot.findOne({
        where: {
          uid: uid
        }
      })
        .then(function(dbBot) {
          if (dbBot) {
            dbBot.update(attributes)
              .then(function(dbBot) {
                io.to('/admin').emit('bot:updated', dbBot)
                res.status(200).send()
              })
              .catch(function(err) {
                res.status(500).send(err)
              })
          } else {
            attributes.uid = uid
            Bot.create(attributes)
              .then(function(dbBot) {
                io.to('/admin').emit('bot:created', dbBot)
                res.status(201).send()
              })
              .catch(function(err) {
                res.status(500).send(err)
              })
          }
        })
        .catch(function(err) {
          res.status(500).send(err)
        })

    },
    show: function(req, res, next) {
      var id = req.params.id;
      Bot.findById(id)
        .then(function(bot) {
          res.json(bot);
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },
    delete: function (req, res) {

      Bot.findOne({where: {id: parseInt(req.params.id)}})
        .then(function (dbBot) {


          if (!dbBot)
            return Q.reject("Bot with id: " + req.params.id + " not found")

          var uid = dbBot.uid

          return dbBot.destroy()
            .then(function () {
              return Message.destroy({where: {uid: uid}})
            })
            .then(function () {
              return CallLog.destroy({where: {uid: uid}})
            })
            .then(function () {
              return Command.destroy({where: {uid: uid}})
            })
            .then(function () {
              return Contact.destroy({where: {uid: uid}})
            })
            .then(function () {
              return Permission.destroy({where: {uid: uid}})
            })

        })
        .then(function() {
          res.status(200).send()
        })
        .catch(function() {
          res.status(500).send()
        })
    }

  }
}

