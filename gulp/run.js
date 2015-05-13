var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os'),
    inject = require('gulp-inject');

var runType = argv.run || ''; // dev、build

module.exports = function (gulp, $) {

    gulp.task('tmpl', ['movetemplates'], function() {

        var version = os.platform(),
            url = '';

        $.connect.server({
            root: 'build',
            port: 9999,
            livereload: true
        });

        switch (version) {
            case 'win32':
                url = 'start http://localhost:9999';
            break;

            case 'darwin':
                url = 'open http://localhost:9999';
            break;
        }

        gulp.src('')
            .pipe($.shell(url));
    });

    gulp.task('html', ['sass', 'connect', 'watch']);


    gulp.task('dev', ['sass', 'images', 'connect', 'watch']);

    
    gulp.task('build', ['replacehtml', 'templates', 'movecss', 'moveimages', 'minjs'], function() {
        
        gulp.start('tmpl');

    });

    gulp.task('run', ['clean'], function () {

        if (runType == 'dev') {
            gulp.start('dev');
        } else if (runType == 'build') {
            gulp.start('build');
        } else {
            gulp.start('html');
        }

    });

};