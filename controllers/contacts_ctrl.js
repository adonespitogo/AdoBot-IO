var Contact = require('../models/contact')

module.exports = function(io) {
  return {
    create: function(req, res) {
      Contact.findOne({
        where: {uid: req.body.uid, contact_id: parseInt(req.body.contact_id)}
      })
        .then(function (dbContact) {
          if (dbContact) {
            return dbContact
          }
          else {
            return Contact.create(req.body)
              .then(function(dbContact) {
                io.to('/admin').emit('contact:created', dbContact)
              })
          }
        })
        .then(function () {
          res.status(201).send()
        })
        .catch(function(err) {
          res.status(500).send()
        })
    },
    getContacts: function(req, res) {
      var uid = req.params.uid
      Contact.findAll({
        where: {
          uid: uid
        }
      })
        .then(function(dbContacts) {
          res.json(dbContacts)
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },
    clear: function(req, res) {
      Contact.destroy({
        where: {
          uid: req.params.uid
        }
      })
        .then(function() {
          res.status(200).send()
        })
        .catch(function() {
          res.status(500).send()
        })
    }
  }
}
