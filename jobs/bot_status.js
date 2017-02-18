var sequelize = require('../config/sequelize')
var bot = require('../models/bot')

module.exports = function updateBotStatuses(io) {
  sequelize.query("UPDATE bots SET status = 0 WHERE updated < DATE_SUB(NOW(),INTERVAL 1 MINUTE)")
    .then(function() {
      bot.findAll()
        .then(function(bots) {
          io.emit('job:bots:status', bots)
        })
        .catch(function(err) {
          console.log(err)
        });
    })
    .catch(function(err) {
      console.log(err)
    });
}
