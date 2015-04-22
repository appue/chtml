/*
npm install --save-dev gulp
npm install --save-dev gulp-sass
npm install --save-dev gulp-minify-css
npm install --save-dev gulp-connect
npm install --save-dev gulp-watch
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
    }
};

gulp.task('default', function(){
    task.sass();
});