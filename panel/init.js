$(document).ready(function() {
  var username = localStorage.getItem('username'),
    password = localStorage.getItem('password');

  if (!username || !password) {
    window.history.pushState(null, 'login', '/');
    angular.bootstrap(document.body, ['Login']);
  } else {

    $.post('/login', {
      username: username,
      password: password
    })
      .done(function() {
        angular.bootstrap(document.body, ['AdoBot']);
      })
      .fail(function() {
        angular.bootstrap(document.body, ['Login']);
      });
  }
});
