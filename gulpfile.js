var gulp = require('gulp')
var jade = require('gulp-jade')

var paths = {
  templates: 'resources/templates/**/*'
}

gulp.task('default', ['templates'])

gulp.task('templates', function () {
  var YOUR_LOCALS = {}

  gulp.src(paths.templates)
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function () {
  gulp.watch(paths.templates, ['templates'])
})
