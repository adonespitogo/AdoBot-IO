var bot = require('../models/bot')
var permission = require('../models/permission')

module.exports = function(io) {
  return {
    index: function(req, res, next) {
      bot.findAll()
        .then(function(db_bots) {
          res.json(db_bots)
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },
    updateStatus: function(req, res, next) {
      var uid = req.params.uid
      var attributes = {
        status: true,
        updated: new Date(),
        provider: req.body.provider,
        device: req.body.device,
        version: req.body.version,
        phone: req.body.phone,
        sdk: req.body.sdk,
        lat: req.body.lat,
        longi: req.body.longi
      }
      bot.findOne({
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
            bot.create(attributes)
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
      bot.findById(id)
        .then(function(bot) {
          res.json(bot);
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    }
  }
}
