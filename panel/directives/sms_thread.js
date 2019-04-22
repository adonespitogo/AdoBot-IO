angular.module('AdoBot')
  .directive('smsThread', [
    '$uibModal',
    '$filter',
    'MessageService',
    'toastr',
    function($uibModal, $filter, MessageService, toastr) {
      return {
        restrict: 'AE',
        scope: {
          thread: '=',
          messages: '=',
          onClose: '&'
        },
        templateUrl: 'sms-thread-entry.html',
        link: function($scope, elem, attrs) {

          var modal;

          $scope.getThreadTitle = function() {
            var msg = $scope.messages[0];
            return (msg.name ? msg.name + ' ' : '') + msg.phone;
          };

          $scope.deleteThread = function () {
            var msg = $scope.messages[0];
            return MessageService.deleteThread(msg.uid, msg.thread_id)
            .then(function () {
              if (modal) {
                $scope.onClose();
                modal.close();
              }
            })
            .catch(function (e) {
              toastr.error("Something went wrong: " + e.toString());
            });
          };

          elem.on('click', function() {
            modal = $uibModal.open({
              templateUrl: 'sms-thread.html',
              scope: $scope
            });
          });

        }
      };
    }
  ]);
