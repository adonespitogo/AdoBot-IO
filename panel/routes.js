App.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

  var dashboardState = {
    name: 'dashboard',
    url: '/',
    templateUrl: '/views/dashboard.html',
    controller: 'DashboardCtrl'
  }

  var botState = {
    name: 'bot',
    url: '/bot/:id',
    templateUrl: '/views/bot.html',
    controller: 'BotCtrl'
  }

  $stateProvider.state(dashboardState);
  $stateProvider.state(botState);
  $locationProvider.html5Mode(true);

}]);