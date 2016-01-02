var elixir = require('laravel-elixir')
require('laravel-elixir-vueify')

elixir(function (mix) {
  mix.browserify('app.js')
})

var gulp = require('gulp')
var concat = require('gulp-concat')
var cssBase64 = require('gulp-css-base64')
var inject = require('gulp-inject')
var runSequence = require('run-sequence')

gulp.task('build', function (callback) {
  runSequence('base64', 'styles', 'scripts', 'data', 'inject')
})

gulp.task('base64', function () {
  return gulp.src('./public/css/datatables.min.css')
    .pipe(cssBase64())
    .pipe(gulp.dest('./dist/'))
})

gulp.task('styles', function () {
  return gulp.src([
    './public/css/bootstrap.min.css',
    './dist/datatables.min.css',
    './public/css/panelWithTabs.css',
    './public/css/site.css'
  ]).pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('scripts', function () {
  return gulp.src([
    './public/js/jquery.js',
    './public/js/bootstrap.min.js',
    './public/js/datatables.min.js',
    './public/js/vue.js',
    './public/js/app.js'
  ]).pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('data', function () {
  return gulp.src('./data/**')
    .pipe(concat('data.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('inject', function () {
  var target = gulp.src('index.html')

  return target.pipe(inject(gulp.src('./dist/styles.css'), {
    ignorePath: 'dist/',
    addRootSlash: false,
    starttag: '<!-- inject:styles:css -->',
    transform: function (filePath, file) {
      // return file contents as string
      var content = '<style media="screen">\n' +
        file.contents.toString('utf8') +
        '</style>'
      return content
    }
  }))
    .pipe(inject(gulp.src('./dist/data.js'), {
      ignorePath: 'dist/',
      addRootSlash: false,
      starttag: '<!-- inject:data:js -->',
      transform: function (filePath, file) {
        // return file contents as string
        var content = '<script>\n' +
          file.contents.toString('utf8') +
          '</script>'
        return content
      }
    }))
    .pipe(inject(gulp.src('./dist/scripts.js'), {
      ignorePath: 'dist/',
      addRootSlash: false,
      starttag: '<!-- inject:scripts:js -->',
      transform: function (filePath, file) {
        // return file contents as string
        var content = '<script>\n' +
          file.contents.toString('utf8') +
          '</script>'
        return content
      }
    }))
    .pipe(gulp.dest('./dist'))
})
