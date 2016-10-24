 var gulp = require('gulp');
 var sass = require('gulp-sass');
 var watch = require('gulp-watch');
 var imagemin = require('gulp-imagemin');
 var uglify = require('gulp-uglify');


gulp.task('minimg',function(){
  gulp.src('src/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('img'))
});

 gulp.task('watch:css', function () {
     return watch('src/styles/*.scss')
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest('css/'));
 });
gulp.task('uglify',function () {
  return gulp.src('js/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'))
})
