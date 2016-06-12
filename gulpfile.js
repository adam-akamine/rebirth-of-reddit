var gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch('js/*', function() {
    console.log("the file changed");
  });
});
gulp.task('default', function() {
  console.log("hello");
});

