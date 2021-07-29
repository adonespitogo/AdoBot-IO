var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var jshint = require('gulp-jshint')
var gutil = require('gulp-util')
var inject = require('gulp-inject')
var del = require('del')
var randomstring = require('randomstring')
var templateCache = require('gulp-angular-templatecache');


// javascripts -----------------------------
var js_libs = [
  './panel/libs/js/jquery-3.1.1.min.js',
  './panel/libs/js/lodash.min.js',
  './panel/libs/js/moment.min.js',
  './panel/libs/js/socket.io.js',
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

var copy_files = [
  './panel/index.html'
]

function clean () {
  return del(['./dist'])
}

function lint() {
  var s = gulp.src(app_js)
  if (process.env.NODE_ENV != 'production') {
    s = s
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
  }
  return s;
}

function buildJS() {
  var filename = 'application-' + randomstring.generate() + '.js';
  var stream = gulp.src(js_libs.concat(app_js))
    .pipe(concat(filename))

  if (process.env.NODE_ENV === 'production') {
    stream = stream
      .pipe(uglify())
      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  }

  return stream.pipe(gulp.dest('./dist/js'))
}

// ------------ CSS -----------------------------

var css_libs = [
  './panel/libs/css/bootstrap.min.css',
  './panel/libs/css/angular-toastr.min.css',
  './panel/libs/css/angular-loading-bar.min.css',
]

var app_css = [
  './panel/css/**/*.css',
]

function buildCSS() {
  var filename = 'application-' + randomstring.generate() + '.css';
  return gulp.src(css_libs.concat(app_css))
    .pipe(concat(filename))
    .pipe(gulp.dest('./dist/css'))
}

function copy () {
  return gulp.src(copy_files)
    .pipe(gulp.dest('./dist'))
}

function templates() {
  return gulp.src('./panel/views/**/*.html')
    .pipe(templateCache({
      filename: 'templates-' + randomstring.generate() + '.js',
      module: 'templates',
      standalone: true
    }))
    .pipe(gulp.dest('./dist/js'));
}

function html() {
  var target = gulp.src(['./dist/index.html']);
  var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css']);
  return target.pipe(inject(sources)).pipe(gulp.dest('./dist'))
}

// ------------- BUILD ----------------------------

//gulp.task('watch', [], function() {
//  gulp.watch([
//    'panel/**/*',
//    '!dist/**/*',
//  ], ['default']);
//});


//gulp.task('default', ['js:build', 'css:build', 'inject'])

exports.default = gulp.series(
  clean,
  gulp.parallel(buildJS, buildCSS, templates),
  copy,
  html
)
