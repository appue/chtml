var fs   = require('fs'),
    // argv = require('yargs').argv,
    os   = require('os');

module.exports = function (gulp, $) {

    gulp.task('sass', function () {
        return gulp.src('mockup/*.scss')
            .pipe($.plumber())
            .pipe($.sass())
            .pipe($.autoprefixer('last 3 version'))
            .pipe($.size({title: 'css--------------------------------'}))
            .pipe(gulp.dest('mockup/'));
    });


    gulp.task('connect', function () {

        var version = os.platform(),
            url = '';

        $.connect.server({
            root: 'mockup',
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

        var livereload = require('gulp-livereload');

        livereload.listen();

        gulp.src('mockup/**/*.html')
            .pipe($.watch('mockup/**/*.html', function(){})
            .pipe(livereload());

        gulp.src('mockup/**/*.scss')
            .pipe($.watch('mockup/**/*.scss', ['sass'])
            .pipe(livereload());
    });
};