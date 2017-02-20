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
      if (event === "nopermission") {
        io.to('/admin').emit('nopermission', req.body)
      }
      if (event === "download:started") {
        io.to('/admin').emit('download:started', req.body)
      }
      if (event === "download:completed") {
        io.to('/admin').emit('download:completed', req.body)
      }
      if (event === "download:error") {
        io.to('/admin').emit('download:error', req.body)
      }

    }
  }
}
