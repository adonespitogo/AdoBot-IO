App
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
