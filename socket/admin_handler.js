var Bot = require('../models/bot')

module.exports = function Admin(io, socket) {

  socket.join('/admin')

}
