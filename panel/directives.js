angular.module('AdoBot')
  .directive('smsThread', [
    '$uibModal',
    function($uibModal) {
      return {
        restrict: 'AE',
        scope: {
          thread: '=',
          messages: '='
        },
        template: '<span >{{getThreadTitle()}}</span>',
        link: function($scope, elem, attrs) {

          $scope.getThreadTitle = function() {
            for (var i = $scope.messages.length - 1; i >= 0; i--) {
              if ($scope.messages[i].type * 1 === 1) {
                return ($scope.messages[i].name ? $scope.messages[i].name + ' ' : '') + $scope.messages[i].phone
                break;
              }
            }
            // all are sent messages
            return $scope.messages[0].phone
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
  .directive('callLogItem', [
    function() {
      return {
        restrict: 'AE',
        scope: {
          callLogItem: '='
        },
        template: `<span ng-class="callLogClass()">
              <span ng-if="log.type*1===1">(Incoming)</span>
              <span ng-if="log.type*1===2">(Outgoing)</span>
              <span ng-if="log.type*1===3">(Missed)</span> {{log.name}} {{log.phone}}
              </br>
              {{log.date | amCalendar:referenceTime:formats}}</br>
              <!-- {{log.date}}</br> -->
              duration {{log.duration*1000|duration:'hh:mm:ss'}}</br>
        </span>`,
        link: function($scope) {

          $scope.log = $scope.callLogItem

          $scope.callLogClass = function() {
            switch ($scope.log.type * 1) {
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

        }
      }
    }
  ])
