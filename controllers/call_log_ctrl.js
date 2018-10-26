var Q = require('q')
var CallLog = require('../models/call_log')

module.exports = function(io) {
  return {
    create: function(req, res, next) {

      var attrs = {
        call_id: parseInt(req.body.call_id),
        uid: req.body.uid,
        type: parseInt(req.body.type),
        name: req.body.name,
        date: req.body.date,
        phone: req.body.phone,
        duration: parseInt(req.body.duration)
      }

      CallLog.findOne({
        where: {
          uid: req.body.uid,
          type: req.body.type,
          call_id: parseInt(req.body.call_id),
          duration: parseInt(req.body.duration)
        }
      })
        .then(function (dbCallLog) {
          if (dbCallLog) {
            res.json(dbCallLog)
            return dbCallLog
          }
          else {
            return CallLog.create(attrs)
              .then (function (dbCallLog) {
                io.to('/admin').emit('call_log:created', dbCallLog)
                res.json(dbCallLog)
              })
          }
        })
        .catch(function (err) {
          res.status(500).send(err)
        })

    },

    showLogs: function (req, res, next) {
      var uid = req.params.uid
      CallLog.findAll({where: {uid: uid}})
        .then(function (dbCallLogs) {
          res.json(dbCallLogs)
        })
        .catch(function (err) {
          res.status(500).send(err)
        })
    },
    clear: function (req, res, next) {
      var uid = req.params.uid
      CallLog.destroy({where: {uid: uid}})
        .then(function(){
          io.to('/admin').emit('call_log:cleared', {uid: uid})
          res.status(200).send()
        })
        .catch(function(err) {
          console.log(err)
        })
    }
  }
}
