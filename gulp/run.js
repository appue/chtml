var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os'),
    inject = require('gulp-inject');

var runType = argv.run || ''; // dev、build

module.exports = function (gulp, $) {

    gulp.task('tmpl', ['minjs'], function() {
        gulp.start('connect');
    });
    

    gulp.task('html', ['sass', 'connect', 'watch']);


    gulp.task('dev', ['sass', 'images', 'connect', 'watch']);

    
    gulp.task('build', ['replacehtml', 'templates', 'movecss', 'moveimages'], function() {
        gulp.start('tmpl');
    });


    gulp.task('text', ['connect', 'word']);


    gulp.task('run', ['clean'], function () {

        switch (runType) {
            case 'dev':
                gulp.start('dev'); //----开发调试任务启动
            break;

            case 'build':
                gulp.start('build'); //--打包测试
            break;

            case 'word':
                gulp.start('text'); //---文档服务启动
            break;

            default:
                gulp.start('html'); //---静态资源服务
        }

    });

};