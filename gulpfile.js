var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

// require('./gulp/html.js')(gulp, $);
// require('./gulp/dev.js')(gulp, $);
// require('./gulp/build.js')(gulp, $);


// gulp.task('html', function(){
//     return gulp.start('run-html');
// });


// gulp.task('dev', function(){
//     return gulp.start('run-dev');
// });


// gulp.task('build', function(){
//     return gulp.start('run-build');
// });

require('./gulp/build.js')(gulp, $);

require('./gulp/run.js')(gulp, $);

gulp.task('default', function (){
    return gulp.start('run');
});