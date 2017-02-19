App = angular.module('AdoBot', [
    'ui.router',
    'btford.socket-io',
    'ui.bootstrap',
    'ngAnimate',
    'toastr',
    'angular-duration-format',
    'angularMoment',
    'http-auth-interceptor'
  ])
  .run([
    '$http',
    '$rootScope',
    function($http, $rootScope) {
      $http.defaults.headers.common.username = localStorage.getItem('username')
      $http.defaults.headers.common.password = localStorage.getItem('password')
      $rootScope.$on('event:auth-loginRequired', function(event, data) {
        console.log(event)
        console.log(data)
      })
    }
  ])
