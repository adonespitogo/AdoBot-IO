var env = process.env.NODE_ENV || 'development'
var express = require('express')
var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static('./dist'))

// logging
app.use(function(req, res, next) {
  console.log('path: ' + req.path)
  console.log('query:')
  console.log(req.query)
  console.log('body:')
  console.log(req.body)
  console.log('----------------------------')
  next()
})

var pTimeout = env === 'production' ? 60000 : 10000
var pInterval = env === 'production' ? 25000 : 10000
var server = require('http').Server(app);
var io = require('socket.io')(server, {
  'pingTimeout': pTimeout,
  'pingInterval': pInterval
});

var port = process.env.PORT || 3000

var routes = require('./routes')
routes(app, io)

var socketHandler = require('./socket/handler')

io.on('connect', function(socket) {
  socketHandler(io, socket)
})

server.listen(port, function() {
  console.log('App listening on port ' + port + '!')
})
