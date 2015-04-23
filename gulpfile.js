/*
npm install yargs
npm install --save-dev gulp
npm install --save-dev gulp-sass
npm install --save-dev gulp-minify-css
npm install --save-dev gulp-connect
npm install --save-dev gulp-watch
npm install --save-dev gulp-shell
npm install --save-dev gulp-livereload
npm install --save-dev gulp-plumber
npm install --save-dev gulp-batch
*/

var fs   = require('fs'),
    argv = require('yargs').argv,
    os   = require('os');

var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    minifycss  = require('gulp-minify-css'),
    connect    = require('gulp-connect'),
    shell      = require('gulp-shell'),
    watch      = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    plumber    = require('gulp-plumber');

var task = {
    sass: function() {
        // gulp.src('mockup/themes/*.scss')
        //     .pipe(plumber())
        //     .pipe(sass())
        //     .pipe(minifycss())
        //     .pipe(gulp.dest(buildPath +'themes'));
        gulp.src('mockup/*.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(gulp.dest('mockup/'));
    },

    watch: function(){
        var self = this;

        livereload.listen();

        gulp.src('mockup/**/*.html')
            .pipe(watch('mockup/**/*.html', function() {
            }))
            .pipe(livereload());

        gulp.src('mockup/**/*.scss')
            .pipe(watch('mockup/**/*.scss', function() {
                self.sass();
            }))
            .pipe(livereload());
    },

    connect: function() {

        var version = os.platform(),
            url = '';

        connect.server({
            root: 'source',
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
            .pipe(shell(url));
            
    },
};

gulp.task('default', function(){
    // task.sass();
    // task.watch();
    task.connect();
});