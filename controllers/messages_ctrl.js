var Q = require('q')
var sequelize = require('../config/sequelize')
var message = require('../models/message')
var bot = require('../models/bot')

console.log(bot)

module.exports = function(io) {
  return {
    addMessage: function(req, res, next) {

      var uid = req.body.uid

      var attrs = {
        uid: uid,
        message_id: req.body.message_id,
        thread_id: req.body.thread_id,
        type: parseInt(req.body.type),
        phone: req.body.phone,
        name: req.body.name,
        message: req.body.message,
        date: req.body.date
      }

      message
        .findOne({
          where: {
            uid: uid,
            message_id: parseInt(req.body.message_id),
            thread_id: parseInt(req.body.thread_id)
          }
        })
        .then(function (dbMessage) {
          if (dbMessage && dbMessage.name != 'UNKNOWN_CONTACT') {
            res.json(dbMessage);
          } else {
            return message.create(attrs, {
              charset: 'utf8mb4'
            })
              .then(function(dbMessage) {
                io.to('/admin').emit('message:created', dbMessage)
                res.status(201).send();
              })
          }
        })
        .catch(function (err) {
          console.log("Error", err.errors)
          res.status(500).send(err)
        });
    },
    getMessages: function(req, res, next) {
      message.findAll({
        where: {
          uid: req.params.uid
        }
      })
        .then(function(dbMessages) {
          res.json(dbMessages)
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },
    clearMessages: function(req, res, next) {
      var uid = req.params.uid;
      message.destroy({
        where: {
          uid: uid
        }
      })
        .then(function() {
          io.to('/admin').emit('messages:cleared', {
            uid: uid
          })
          res.status(200).send();
        })
        .catch(function(err) {
          res.status(500).send();
        })
    },
    deleteThread: function (req, res) {
      message.destroy({
        where: {
          uid: req.params.uid,
          thread_id: req.params.id * 1
        }
      })
        .then(function () {
          io.to('/admin', {
            type: 'success',
            message: 'Messages deleted successfully'
          })
          res.status(200).send();
        })
        .catch(function (e) {
          res.status(500).send()
        })
    }

  }
}
