var fs   = require('fs'),
    argv = require('yargs').argv,
    os   = require('os');

var runType = argv.l || ''; // dev、build

module.exports = function (gulp, $) {

    gulp.task('html', ['sass', 'connect', 'watch']);

    gulp.task('dev', ['sass', 'images', 'connect', 'watch']);

    gulp.task('build');

    gulp.task('run', ['clean'], function() {

        if (runType == 'dev') {
            gulp.start('dev');
        } else if (runType == 'build') {
            gulp.start('build');
        } else {
            gulp.start('html');
        }

    });
    
};