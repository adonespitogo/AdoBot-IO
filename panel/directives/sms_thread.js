angular.module('AdoBot')
  .directive('smsThread', [
    '$uibModal',
    '$filter',
    'MessageService',
    function($uibModal, $filter, MessageService) {
      return {
        restrict: 'AE',
        scope: {
          thread: '=',
          messages: '=',
          onClose: '&'
        },
        templateUrl: 'sms-thread-entry.html',
        link: function($scope, elem, attrs) {

          $scope.getThreadTitle = function() {
            var msg = $scope.messages[0];
            return (msg.name ? msg.name + ' ' : '') + msg.phone;
          };

          $scope.deleteThread = function () {
            var msg = $scope.messages[0];
            return MessageService.deleteThread(msg.uid, msg.thread_id)
            .then(function () {
              $scope.$close();
            })
            .catch(function (e) {
              console.log(e);
            });
          };

          elem.on('click', function() {
            $uibModal.open({
              templateUrl: 'sms-thread.html',
              scope: $scope
            })
            .result.then(function () {
              $scope.onClose()();
            });
          });

        }
      };
    }
  ]);
