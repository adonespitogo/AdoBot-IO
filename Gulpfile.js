const gulp = require('gulp')
const concat = require('gulp-concat')

// javascripts -----------------------------
var js_libs = [
  './panel/libs/js/jquery-3.1.1.min.js',
  './panel/libs/js/lodash.min.js',
  './panel/libs/js/moment.min.js',
  './panel/libs/js/socket.io.min.js',
  // angular libs
  './panel/libs/js/angular.min.js',
  './panel/libs/js/angular-animate.min.js',
  './panel/libs/js/angular-duration-format.js',
  './panel/libs/js/angular-google-maps.js',
  './panel/libs/js/angular-moment.min.js',
  './panel/libs/js/angular-route.min.js',
  './panel/libs/js/angular-simple-logger.js',
  './panel/libs/js/angular-socket.min.js',
  './panel/libs/js/angular-toastr.tpls.min.js',
  './panel/libs/js/angular-touch.min.js',
  './panel/libs/js/angular-ui-router.min.js',
  './panel/libs/js/http-auth-interceptor.min.js',
  './panel/libs/js/ui-bootstrap-2.5.0.min.js',
  './panel/libs/js/ui-bootstrap-tpls-2.5.0.min.js',
  './panel/libs/js/angular-loading-bar.min.js',
]

var app_js = [
  './panel/init.js',
  './panel/login.js',
  './panel/app.js',
  './panel/routes.js',
  './panel/controllers/**/*.js',
  './panel/directives/**/*.js',
  './panel/services/**/*.js',
  './panel/filters/**/*.js',
]

gulp.task('js:build', [], function() {
  return gulp.src(js_libs.concat(app_js))
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./panel/dist/js'))
})

// ------------ CSS -----------------------------

var css_libs = [
  './panel/libs/css/bootstrap.min.css',
  './panel/libs/css/angular-toastr.min.css',
  './panel/libs/css/angular-loading-bar.min.css',
]

var app_css = [
  './panel/css/**/*.css',
]

gulp.task('css:build', function() {
  return gulp.src(css_libs.concat(app_css))
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./panel/dist/css'))
})

// ------------- BUILD ----------------------------

gulp.task('watch', [], function() {
  gulp.watch([
    'panel/**/*',
    '!panel/dist/**/*',
  ], ['default']);
});


gulp.task('default', ['js:build', 'css:build'])
