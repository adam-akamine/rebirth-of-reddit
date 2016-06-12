var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp
    .src('scss/rebirth.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});
gulp.task('watch', ['styles'], function() {
  gulp.watch('js/*', function() {
    console.log("the file changed");
  });
  gulp.watch('scss/**/*', ['styles']);
});
gulp.task('default', function() {
  console.log("hello");
});