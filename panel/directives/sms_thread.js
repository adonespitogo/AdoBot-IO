App
.directive('smsThread', [
  '$uibModal',
  '$filter',
  function($uibModal, $filter) {
    return {
      restrict: 'AE',
      scope: {
        thread: '=',
        messages: '='
      },
      template: `<div >
          {{getThreadTitle()}}
          <small class='pull-right'>{{messages[messages.length -1].date | amCalendar}}</small>
      </div>`,
      link: function($scope, elem, attrs) {

        $scope.getThreadTitle = function() {
          var msg = $scope.messages[0]
          return (msg.name ? msg.name + ' ' : '') + msg.phone
        }

        elem.on('click', function() {
          $uibModal.open({
            templateUrl: '/views/sms-thread.html',
            scope: $scope
          })
        })

      }
    }
  }
])
