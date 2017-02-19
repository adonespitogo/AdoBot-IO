var Message = require('../models/message')

function catchError(err) {
  console.log(err)
}

module.exports = function(io) {
  return {
    notify: function(req, res, next) {
      var event = req.body.event

      if (event === "getmessages:started") {
        io.to('/admin').emit('getmessages:started', req.body)
      }
      if (event === "getmessages:done") {
        io.to('/admin').emit('getmessages:done', req.body)
      }

      if (event === "getcallhistory:started") {
        io.to('/admin').emit('getcallhistory:started', req.body)
      }
      if (event === "getcallhistory:done") {
        io.to('/admin').emit('getcallhistory:done', req.body)
      }

    }
  }
}
