var Command = require('../models/command')
var Bot = require('../models/bot')

function formatCommand(c) {
  var cmd;
  if (c['arg1'] == "" && c['arg2'] == "") {
    cmd = c.command + "()\n"
  } else if (!c['arg1']) {
    cmd = c.command + "(" + c['arg2'] + ")\n"
  } else if (!c['arg2']) {
    cmd = c.command + "(" + c['arg1'] + ")\n"
  } else {
    cmd = c.command + "(" + c['arg1'] + ", " + c['arg2'] + ")\n"
  }
  return cmd;
}

module.exports = function(io) {
  return {
    addCommand: function(req, res, next) {

      Bot.findOne({
          where: {
            uid: req.body.uid,
            status: true
          }
        })
        .then(function(dbBot) {
          if (dbBot) {
            if (io.sockets.connected[dbBot.socket_id]) {
              io.sockets.connected[dbBot.socket_id].emit('commands', [req.body])
              res.status(201).send()
            } else {
              res.status(422).send()
            }
          } else {

            Command.create(req.body)
              .then(function(dbCommand) {
                io.to('/admin').emit('command:added', {
                  id: dbCommand.id,
                  command: formatCommand(dbCommand),
                  uid: dbCommand.uid
                });
                res.json(dbCommand);
              })
              .catch(function() {
                res.status(422).send();
              });
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    getCommands: function(req, res, next) {
      Command.findAll({
          where: {
            uid: req.query.UID
          }
        })
        .then(function(dbCommands) {
          if (!dbCommands) return res.send()
          var resText = '';
          dbCommands.forEach(function(c) {
            var cmd = formatCommand(c);
            resText = resText + cmd;
          });
          Command.destroy({
              where: {
                uid: req.query.UID
              }
            })
            .then(function() {
              io.to('/admin').emit('commands:deleted', {
                uid: req.query.UID
              })
              res.send(resText);
            })
            .catch(function(err) {
              res.status(500).send(err)
            })
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },
    pendingCommands: function(req, res, next) {
      Command.findAll({
          where: {
            uid: req.query.uid
          }
        })
        .then(function(dbCommands) {
          if (!dbCommands) return res.send()
          var cmds = [];
          dbCommands.forEach(function(c) {
            var cmd = formatCommand(c)
            cmds.push({
              id: c.id,
              command: cmd
            })
          });
          res.json(cmds);
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },

    delete: function(req, res, next) {
      Command.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(function() {
          res.status(200).send();
          io.to('/admin').emit('command:deleted', {
            id: parseInt(req.params.id)
          })
        })
    }



  }
}
