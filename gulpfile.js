var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

require('./gulp/build.js')(gulp, $);
require('./gulp/run.js')(gulp, $);


gulp.task('html', function(){
    return gulp.start('run-html');
});


gulp.task('dev', function(){
    return gulp.start('run-html');
});


gulp.task('build', function(){
    return gulp.start('run-html');
});