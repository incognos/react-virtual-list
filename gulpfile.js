'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

function handleError(err) {
    console.error(err);
}

gulp.task('jsx', function() {
    return gulp.src('./src/*.jsx')
        .on('error', handleError)
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function() {
    return gulp.src('./src/utils/*.js')
        .on('error', handleError)
        .pipe(gulp.dest('./dist/utils'));
    
});

gulp.task('default', ['jsx', 'copy']);