var bot = require('../models/bot')

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
      var uid = req.query.UID
      var attributes = {
        status: true,
        updated: new Date(),
        provider: req.query.Provider,
        device: req.query.Device,
        version: req.query.Version,
        phone: req.query.Phone_Number,
        sdk: req.query.Sdk,
        random: req.query.Random,
        lat: 0,
        longi: 0
      }
      if (req.query.Coordinates) {
        var coords = req.query.Coordinates.split(',')
        attributes.lat = coords[0] === 'null' ? 0 : coords[0]
        attributes.longi = coords[1] === 'null' ? 0 : coords[1]
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
                res.send()
              })
              .catch(function(err) {
                res.status(500).send(err)
              })
          } else {
            attributes.uid = uid
            bot.create(attributes)
              .then(function(dbBot) {
                io.to('/admin').emit('bot:added', dbBot)
                res.send()
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
      .catch(function (err) {
        res.status(500).send(err)
      })
    }
  }
}
