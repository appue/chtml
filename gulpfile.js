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