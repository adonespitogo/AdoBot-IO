App.config([
  '$stateProvider',
  '$locationProvider',
  function($stateProvider, $locationProvider) {

    $stateProvider
      .state({
        abstract: true,
        name: 'dashboard',
        url: '/',
        templateUrl: '/views/dashboard.html',
        controller: 'RootCtrl'
      })
      .state('dashboard.home', {
        name: 'home',
        url: '',
        controller: 'HomeCtrl',
        templateUrl: '/views/home.html'
      })
      .state('dashboard.bot', {
        name: 'bot',
        url: 'bot/:id',
        controller: 'BotCtrl',
        templateUrl: '/views/bot.html'
      })

    $locationProvider.html5Mode(true);

  }
]);
