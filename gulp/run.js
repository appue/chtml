module.exports = function (gulp, $) {

    gulp.task('run-html', ['sass', 'connect', 'watch']);

    gulp.task('run-dev', ['sass', 'connect', 'watch']);

    gulp.task('run-build', ['sass', 'connect', 'watch']);

};