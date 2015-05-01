var fs   = require('fs'),
    argv = require('yargs').argv,
    os   = require('os');

var runType = argv.run || ''; // dev、build

var cssPath = "./mockup/",
    netPath = "mockup";

switch (runType) {
    case 'dev':
        cssPath = './source/themes/';
        netPath = 'source';
    break;
}

module.exports = function (gulp, $) {

    gulp.task('sass', function () {

        return gulp.src('mockup/*.scss')
            .pipe($.plumber())
            .pipe($.sass())
            .pipe($.autoprefixer('last 3 version'))
            .pipe($.size({title: 'css--------------------------------'}))
            .pipe(gulp.dest(cssPath));

        // .pipe(gulp.dest('./mockup/'));
        // .pipe(gulp.dest('./source/themes/'));
    });

    
    gulp.task('images', function() {
        return gulp.src([
                './mockup/**/*.jpg',
                './mockup/**/*.png'
            ])
            .pipe(gulp.dest('./source/themes/'))
    });


    gulp.task('clean', function () {

        if (runType == 'dev') {
            return gulp.src('./source/themes', {read: false})
                // .pipe($.clean());
                .pipe($.rimraf());
        }

    });

    gulp.task('connect', function () {

        var version = os.platform(),
            url = '';

        $.connect.server({
            root: netPath,
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
    });


    gulp.task('watch', function () {

        $.livereload.listen();

        if (!runType) {

            gulp.src('mockup/**/*.html')
                .pipe($.watch('mockup/**/*.html', function() {}))
                .pipe($.livereload());

        }

        gulp.src('mockup/**/*.scss')
            .pipe($.watch('mockup/**/*.scss', function(){
                gulp.start('sass');
            }))
            .pipe($.livereload())


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
};