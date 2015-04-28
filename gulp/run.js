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

    gulp.task('word', function(){
        var version = os.platform(),
            url = '';

        $.connect.server({
            root: 'word',
            port: '9999',
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

        $.livereload.listen();

        gulp.src('./word/**/*.html')
            .pipe($.watch('word/**/*.html', function() {}))
            .pipe($.livereload());
    });
    
};