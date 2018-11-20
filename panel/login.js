angular.module('Login', ['ui.router', 'templates'])

  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    var loginState = {
      name: 'login',
      url: '/',
      templateUrl: 'login.html',
      controller: 'LoginCtrl'
    };

    $stateProvider.state(loginState);
    $locationProvider.html5Mode(true);

  }])
  .controller('LoginCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {

      $scope.submitting = false;
      $scope.doLogin = function(username, password) {
        $scope.submitting = true;
        $http.post('/login', {username: username, password: password})
          .then(function () {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.location.reload();
          })
          .catch(function() {
            $scope.submitting = false;
            alert('Invalid username or password.');
          });
      };

    }
  ]);
