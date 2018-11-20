angular.module('AdoBot').config([
  '$stateProvider',
  '$locationProvider',
  function($stateProvider, $locationProvider) {

    $stateProvider
      .state({
        abstract: true,
        name: 'dashboard',
        url: '/',
        templateUrl: 'dashboard.html',
        controller: 'RootCtrl'
      })
      .state('dashboard.home', {
        name: 'home',
        url: '',
        controller: 'HomeCtrl',
        templateUrl: 'home.html'
      })
      .state('dashboard.bot', {
        name: 'bot',
        url: 'bot/:id',
        controller: 'BotCtrl',
        templateUrl: 'bot.html',
        resolve: {
          bot: [
            'BotService',
            '$stateParams',
            '$q',
            function(BotService, $stateParams, $q) {
              var def = $q.defer();
              BotService.get($stateParams.id)
              .then(function(res) {
                def.resolve(res.data);
              })
              .catch(function(err) {
                def.reject(err);
              });
              return def.promise;
            }
          ]
        }
      });

    $locationProvider.html5Mode(true);

  }
]);
