var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os');

var getProject = require('./tools/folder.js');

var runType = argv.run || '', // dev、build
    cssPath = "./mockup/themes",
    netPath = "mockup",
    d = new Date(),
    version = d.getTime();

switch (runType) {
    case 'dev':
        cssPath = './source/themes/';
        netPath = 'source';
    break;
}

module.exports = function (gulp, $) {

    gulp.task('sass', function() {

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


    gulp.task('images', function() {
        return gulp.src([
                './mockup/themes/**/*.jpg',
                './mockup/themes/**/*.png'
            ])
            .pipe(gulp.dest('./source/themes/'))
    });


    gulp.task('clean', function() {
        var dir = './build';

        if (runType == 'dev') {

            dir = './source/themes';

        } else if (runType == 'build') {

            dir = './build';

        }

        return gulp.src(dir, {
                read: false
            })
            // .pipe($.clean());
            .pipe($.rimraf()); 
    });

    gulp.task('connect', function() {

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

    gulp.task('watch', function() {

        $.livereload.listen();

        if (!runType) {

            gulp.src('./mockup/**/*.html')
                .pipe($.watch('./mockup/**/*.html', function() {}))
                .pipe($.livereload());

        }

        gulp.src('./mockup/themes/**/*.scss')
            .pipe($.plumber())
            .pipe($.watch('./mockup/themes/**/*.scss', function() {
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


    gulp.task('word', function() {
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
            .pipe($.watch('word/**/*.html', function() {}))
            .pipe($.livereload());
    });
    

    gulp.task('inject', function() {
        var fd = argv.f;

        if (fd) {

            return gulp.src('./source/'+ fd +'/*.html')
                .pipe(
                    $.inject(
                        gulp.src([
                            './source/'+ fd +'/js/*.js',
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
                                        './source/'+ v +'/js/*.js',
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

    
    //--html js 替换
    gulp.task('replacehtml', function() {
        getProject({
            callback: function(folder){
                folder.forEach( function(v) {
                    return gulp.src('./source/'+ v +'/*.html')
                        .pipe($.htmlReplace({
                            'libjs': '../lib/frame.js?v='+ version,
                            'js': 'index.js?v='+ version,
                            'commonjs': 'common.js?v='+ version
                        }))
                        .pipe(gulp.dest('./build/'+ v));
                });
            }
        });
    });

    //--html 迁移
    gulp.task('movehtml', function() {
        return gulp.src([
                './source/**/*.html',
                '!./source/*/*.html',
                './source/**/*.css',
                './source/**/*.jpg',
                './source/**/*.png'
            ])
            .pipe(gulp.dest('./build/'));
    });

    //--css 迁移
    gulp.task('movecss', function() {
        return gulp.src([
                './source/**/*.css'
            ])
            .pipe(gulp.dest('./build/'));
    });

    //--image 迁移
    gulp.task('moveimages', function() {
        return gulp.src([
                './source/**/*.jpg',
                './source/**/*.png'
            ])
            .pipe(gulp.dest('./build/'));
    });

    //--js 合并压缩
    gulp.task('minjs', function() {
        //--框架JS压缩合并
        gulp.src([
                './source/lib/angular.js',
                './source/lib/angular-touch.js',
                './source/lib/angular-ui-router.js'
            ])
            .pipe($.concat('frame.js'))
            .pipe($.uglify())
            .pipe(gulp.dest('./build/lib'));


        //--项目公共JS压缩、合并
        getProject({
            callback: function(folder){
                folder.forEach( function(v) {
                    return gulp.src([,
                            './source/'+ v +'/app.js',
                            './source/common/**/*.js'
                        ])
                        .pipe($.concat('common.js'))
                        .pipe($.ngAnnotate())
                        .pipe($.uglify())
                        .pipe(gulp.dest('./build/'+ v));
                });
            }
        });

        //--项目中的JS压缩、合并
        getProject({
            callback: function(folder){
                folder.forEach( function(v) {
                    return gulp.src('./source/'+ v +'/js/**/*.js')
                        .pipe($.concat('index.js'))
                        .pipe($.ngAnnotate())
                        .pipe($.uglify())
                        .pipe(gulp.dest('./build/'+ v));
                });
            }
        });
    });
};