var permission = require('../models/permission')

module.exports = function(io) {
  return {
    updatePermissions: function(req, res) {
      var uid = req.params.uid;

      permission.destroy({
        where: {
          uid: uid
        }
      })

      .then(function() {
          var perms = []
          for (var p in req.body) {
            perms.push({
              uid: uid,
              permission: p,
              granted: req.body[p] * 1 === 0 ? false : true
            })
          }
          permission.bulkCreate(perms)
            .then(function() {
              io.to('/admin').emit('permissions:updated', {
                uid: uid,
                device: req.params.device,
                permissions: perms
              })
              res.status(201).send()
            })
            .catch(function() {
              res.status(500).send()
            })
        })
        .catch(function() {
          res.status(500).send()
        })
    },
    getPermissions: function(req, res) {
      var uid = req.params.uid

      permission.findAll({
          where: {
            uid: uid
          }
        })
        .then(function(dbPermissions) {
          res.json(dbPermissions)
        })
        .catch(function(err) {
          res.status(500).json(err)
        })

    }
  }
}
