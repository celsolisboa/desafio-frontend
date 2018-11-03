var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

//task para o sass
gulp.task('sass', function () {
  return gulp.src('css/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('css/prod'));
});

gulp.task('default', function () {
});