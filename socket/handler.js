var BotHandler = require('./bot_handler')
var admin_handler = require('./admin_handler')

module.exports = function (io, socket) {

  socket.on('register', function(device) {
    var bot = new BotHandler(io, socket, device);
    bot.init();
  })

  socket.on('admin', function(){
    admin_handler(io, socket)
  })

}