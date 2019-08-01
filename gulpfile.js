const gulp = require('gulp');
const sass = require('gulp-sass');

function copyFiles() {
  return gulp.src('./src/assets/img/*')
    .pipe(gulp.dest('./public/images'));
}

function copyScripts() {
  return gulp.src('./src/scripts/*')
    .pipe(gulp.dest('./public/javascript'));
}

function style() {
  return gulp.src('./src/styles/sass/style.sass')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./public/css'));
}

exports.copyFiles = copyFiles;
exports.style = style;
exports.copyScripts = copyScripts;
