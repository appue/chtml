var fs   = require('fs'),
    // argv = require('yargs').argv,
    os   = require('os');

module.exports = function (gulp, $) {

    gulp.task('dev-sass', function () {
        return gulp.src('mockup/*.scss')
            .pipe($.plumber())
            .pipe($.sass())
            .pipe($.autoprefixer('last 3 version'))
            .pipe($.size({title: 'css--------------------------------'}))
            .pipe(gulp.dest('./source/themes/'));
    });

    gulp.task('dev-images', function() {
        return gulp.src([
                './mockup/**/*.jpg',
                './mockup/**/*.png'
            ])
            .pipe(gulp.dest('./source/themes/'))
    });

    gulp.task('dev-clean', function () {

        return gulp.src('./source/themes', {read: false})
            // .pipe($.clean());
            .pipe($.rimraf())

    });

    gulp.task('dev-connect', function () {

        var version = os.platform(),
            url = '';

        $.connect.server({
            root: './source/',
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


    gulp.task('dev-watch', function () {

        $.livereload.listen();

        gulp.src('mockup/**/*.scss')
            .pipe($.watch('mockup/**/*.scss', ['dev-sass']))
            .pipe($.livereload())

        gulp.src([
                'mockup/**/*.jpg',
                'mockup/**/*.png'
            ])
            .pipe($.watch([
                    'mockup/**/*.jpg',
                    'mockup/**/*.png'
                ], 
                ['dev-images']
            ))
            .pipe($.livereload())
    });

    gulp.task('run-d', ['dev-sass', 'dev-images', 'dev-connect', 'dev-watch']);
    
    gulp.task('run-dev', ['dev-clean'] , function(){
        return gulp.start('run-d');
    });
};