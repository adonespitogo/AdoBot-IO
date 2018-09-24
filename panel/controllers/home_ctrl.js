angular.module('AdoBot')
  .controller('HomeCtrl', [
    '$scope',
    'BotService',
    'socket',
    'toastr',
    function($scope, BotService, socket, toastr) {
      $scope.bots = [];

      BotService.fetch().then(function(res) {
        $scope.bots = res.data;
      });

      socket.forward('bot:created', $scope);
      socket.forward('bot:connected', $scope);
      socket.forward('bot:disconnected', $scope);

      $scope.$on('socket:bot:created', function(e, data) {
        $scope.bots.push(data);
        toastr.success('New device has connected', data.device);
      });

      $scope.$on('socket:bot:connected', function(e, data) {
        for (var i = $scope.bots.length - 1; i >= 0; i--) {
          if ($scope.bots[i].uid == data.uid) {
            $scope.bots[i] = data;
            $scope.bots = angular.copy($scope.bots);
            break;
          }
        }
      });

      $scope.$on('socket:bot:disconnected', function(e, data) {
        for (var i = $scope.bots.length - 1; i >= 0; i--) {
          if ($scope.bots[i].uid == data.uid) {
            $scope.bots[i] = data;
            $scope.bots = angular.copy($scope.bots);
            break;
          }
        }
      });

    }
  ]);
