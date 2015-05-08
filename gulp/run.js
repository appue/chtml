var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os'),
    inject = require('gulp-inject');

var runType = argv.run || ''; // dev、build

module.exports = function (gulp, $) {

    gulp.task('html', ['sass', 'connect', 'watch']);

    gulp.task('dev', ['sass', 'images', 'connect', 'watch']);

    gulp.task('build');

    gulp.task('run', ['clean'], function () {

        if (runType == 'dev') {
            gulp.start('dev');
        } else if (runType == 'build') {
            gulp.start('build');
        } else {
            gulp.start('html');
        }

    });

    var folder = argv.f; //直接注入js到index.html入口文件 gulp inject -f 文件名

    gulp.task('inject', function () {

        if (!folder) return;

        return gulp.src('./source/' + folder + '/index.html').pipe(inject(gulp.src('./source/' + folder + '/js/*.js'), {
            relative: true
        })).pipe(gulp.dest('./source/' + folder));

    });

    gulp.task('word', function () {
        var version = os.platform(),
            url = '';

        $.connect.server({
            root: 'word',
            port: '8888',
            livereload: true
        });

        switch (version) {
        case 'win32':
            url = 'start http://localhost:8888';
            break;
        case 'darwin':
            url = 'open http://localhost:8888';
            break;
        }

        gulp.src('')
            .pipe($.shell(url));

        $.livereload.listen();

        gulp.src('./word/**/*.html')
            .pipe($.watch('word/**/*.html', function () {}))
            .pipe($.livereload());
    });

};