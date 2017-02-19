angular.module('Login', ['ui.router'])

.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

  var loginState = {
    name: 'login',
    url: '/',
    templateUrl: '/views/login.html',
    controller: 'LoginCtrl'
  }

  $stateProvider.state(loginState);
  $locationProvider.html5Mode(true);

}])
  .controller('LoginCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {

      console.log('loin LoginCtrl')

      $scope.doLogin = function(username, password) {
        $http.post('/login', {username: username, password: password})
        .then(function () {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
          window.location.reload()
        })
        .catch(function() {
          alert('Invalid username or password.')
        })
      }

    }
  ])
