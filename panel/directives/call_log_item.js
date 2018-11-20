angular.module('AdoBot')
  .directive('callLogItem', [
    function() {
      return {
        restrict: 'AE',
        scope: {
          callLogItem: '='
        },
        templateUrl: 'call-log-item.html',
        link: function($scope) {

          $scope.log = $scope.callLogItem;

          $scope.callLogClass = function() {
            switch ($scope.log.type * 1) {
              case 1:
                return 'text-success';
              case 2:
                return 'text-info';
              case 3:
                return 'text-danger';
            }
          };

        }
      };
    }
  ]);

