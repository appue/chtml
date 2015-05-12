var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os');

var getProject = require('./tools/folder.js');

var runType = argv.run || ''; // dev、build

var cssPath = "./mockup/themes",
    netPath = "mockup";

switch (runType) {
    case 'dev':
        cssPath = './source/themes/';
        netPath = 'source';
    break;
}

module.exports = function (gulp, $) {

    gulp.task('sass', function () {

        return gulp.src('./mockup/themes/*.scss')
            .pipe($.plumber())
            .pipe($.sass())
            .pipe($.autoprefixer('last 3 version'))
            .pipe($.size({
                title: 'css--------------------------------'
            }))
            .pipe(gulp.dest(cssPath));

        // .pipe(gulp.dest('./mockup/'));
        // .pipe(gulp.dest('./source/themes/'));
    });


    gulp.task('images', function () {
        return gulp.src([
                './mockup/themes/**/*.jpg',
                './mockup/themes/**/*.png'
            ])
            .pipe(gulp.dest('./source/themes/'))
    });


    gulp.task('clean', function () {

        if (runType == 'dev') {
            return gulp.src('./source/themes', {
                    read: false
                })
                // .pipe($.clean());
                .pipe($.rimraf());
        }

    });

    gulp.task('connect', function () {

        var version = os.platform(),
            url = '',
            port = argv.port || 9999;

        if (runType == 'dev') {
            port = argv.port || 5555;
        }

        $.connect.server({
            root: netPath,
            port: port,
            livereload: true
        });

        switch (version) {
            case 'win32':
                url = 'start http://localhost:' + port;
            break;

            case 'darwin':
                url = 'open http://localhost:' + port;
            break;
        }

        gulp.src('')
            .pipe($.shell(url));
    });

    gulp.task('watch', function () {

        $.livereload.listen();

        if (!runType) {

            gulp.src('./mockup/**/*.html')
                .pipe($.watch('./mockup/**/*.html', function () {}))
                .pipe($.livereload());

        }

        gulp.src('./mockup/themes/**/*.scss')
            .pipe($.plumber())
            .pipe($.watch('./mockup/themes/**/*.scss', function () {
                gulp.src('./mockup/themes/*.scss')
                    .pipe($.plumber())
                    .pipe($.sass())
                    .pipe($.autoprefixer('last 3 version'))
                    .pipe($.size({
                        title: 'css--------------------------------'
                    }))
                    .pipe(gulp.dest(cssPath))
                    .pipe($.livereload());
            }))


        if (runType == 'dev') {
            gulp.src([
                    './source/**/*.html',
                    './source/**/*.js'
                ])
                .pipe($.watch([
                    './source/**/*.html',
                    './source/**/*.js'
                ]))
                .pipe($.livereload())
        }

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
    

    gulp.task('inject', function () {
        var fd = argv.f;

        if (fd) {

            return gulp.src('./source/'+ fd +'/*.html')
                .pipe(
                    $.inject(
                        gulp.src([
                            './source/'+ fd +'/**/*.js',
                            './source/themes/'+ fd +'.css',
                        ]),
                        {
                            relative: true
                        }
                    )
                )
                .pipe(gulp.dest('./source/'+ fd));

        } else {

            getProject({
                callback: function(folder){
                    folder.forEach( function(v) {
                        return gulp.src('./source/'+ v +'/*.html')
                            .pipe(
                                $.inject(
                                    gulp.src([
                                        './source/'+ v +'/**/*.js',
                                        './source/themes/'+ v +'.css'
                                    ]), {
                                        relative: true
                                    }
                                )
                            )
                            .pipe(gulp.dest('./source/'+ v));
                    });
                }
            });
        }

    });
};