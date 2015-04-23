var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

require('./gulp/build.js')(gulp, $);

gulp.task('html', function(){
    return gulp.start('html');
});

gulp.task('web', function(){
    return gulp.start('html');
});

gulp.task('build', function(){
    return gulp.start('html');
});