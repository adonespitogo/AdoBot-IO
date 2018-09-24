
angular.module('AdoBot')
  .controller('RootCtrl', ['$scope', function($scope) {
    $scope.logout = function() {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      window.location.reload();
    };
  }]);
