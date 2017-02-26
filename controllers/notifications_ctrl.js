var Message = require('../models/message')

function catchError(err) {
  console.log(err)
}

module.exports = function(io) {
  return {
    notify: function(req, res, next) {

      io.to('/admin').emit(req.body.event, req.body)
      res.status(200).send()

    }
  }
}
