var fs   = require('fs'),
    argv = require('yargs').argv,
    os   = require('os');

var getProject = require('./tools/folder.js'),
    buildFolder = require('./tools/build.folder.js')();


var runType     = argv.run || '', // dev、build
    packageType = argv.g || 'app', // 默认打APP的包，如果要打H5的包就 --g web
    cssPath     = './app/themes',
    netPath     = '',
    d           = new Date(),
    version     = d.getTime(),
    veros       = os.platform();

if (packageType == 'web') {
    buildFolder = './build/';
}

switch (runType) {
    case 'dev':
        netPort = argv.port || 9999;
        netPath = './app/';
    break;

    case 'build':
        netPort = argv.port || 8888;
        netPath = buildFolder;
    break;

    case 'word':
        netPort = argv.port || 5555;
        netPath = './word/';
    break;

    default: //--dev
        netPort = argv.port || 9999;
        netPath = './app/';
}

module.exports = function (gulp, $) {

    gulp.task('sass', function() {

        return gulp.src('./app/themes/*.scss')
            .pipe($.plumber())
            .pipe($.sass())
            .pipe($.autoprefixer('last 3 version'))
            .pipe($.size({
                title: 'css--------------------------------'
            }))
            .pipe(gulp.dest(cssPath));
    });


    gulp.task('clean', function() {
        var dir = buildFolder;

        if (runType == 'dev') {

            dir = './app/themes';

        } else if (runType == 'build') {

            dir = [buildFolder, './.tmp'];

        } else {

            return;

        }

        return gulp.src(dir, {read: false})
            // .pipe($.clean());
            .pipe($.rimraf({ force: true })); 
    });


    gulp.task('connect', function() {

        var url = '';

        $.connect.server({
            root: netPath,
            port: netPort,
            livereload: true
        });

        switch (veros) {
            case 'win32':
                url = 'start http://localhost:' + netPort;
            break;

            case 'darwin':
                url = 'open http://localhost:' + netPort;
            break;
        }

        gulp.src('')
            .pipe($.shell(url));
    });
    

    gulp.task('watch', function() {

        $.livereload.listen();

        gulp.src('./app/themes/**/*.scss')
            .pipe($.plumber())
            .pipe($.watch('./app/themes/**/*.scss', function() {
                gulp.src('./app/themes/*.scss')
                    .pipe($.plumber())
                    .pipe($.sass())
                    .pipe($.autoprefixer('last 3 version'))
                    .pipe($.size({
                        title: 'css--------------------------------'
                    }))
                    .pipe(gulp.dest(cssPath))
                    .pipe($.livereload());
            }))


        gulp.src([
                './app/**/*.html',
                './app/**/*.js'
            ])
            .pipe($.watch([
                './app/**/*.html',
                './app/**/*.js'
            ]))
            .pipe($.livereload())

    });


    gulp.task('word', function() {

        // $.livereload.listen();

        gulp.src('./word/**/*.html')
            .pipe($.watch('word/**/*.html', function() {}))
            .pipe($.livereload());
    });
    

    gulp.task('inject', function() {
        var fd = argv.f;

        if (fd) {
            return gulp.src('./app/'+ fd +'/index.html')
                .pipe(
                    $.inject(
                        gulp.src('./app/common/**/*.js', {read: false}), { 
                            relative: true, 
                            name: 'injectcommon' 
                        }
                    )
                )
                .pipe(
                    $.inject(
                        gulp.src(['./app/'+ fd +'/js/*.js', './app/themes/'+ fd +'.css'], {read: false}), { 
                            relative: true 
                        }
                    )
                )
                .pipe(gulp.dest('./app/'+ fd));

        } else {

            getProject({
                callback: function(folder){
                    folder.forEach( function(v) {
                        return gulp.src('./app/'+ v +'/index.html')
                            .pipe(
                                $.inject(
                                    gulp.src('./app/common/**/*.js', {read: false}), { 
                                        relative: true, 
                                        name: 'injectcommon' 
                                    }
                                )
                            )
                            .pipe(
                                $.inject(
                                    gulp.src(['./app/'+ v +'/js/*.js', './app/themes/'+ v +'.css'], {read: false}), {
                                        relative: true
                                    }
                                )
                            )
                            .pipe(gulp.dest('./app/'+ v));
                    });
                }
            });
        }

    });

    
    //--html js 替换
    gulp.task('replacehtml', function() {
        getProject({
            callback: function(folder){
                var jsFiles = [
                    '../cordova.js?v='+ version,
                    '../cordova_plugins.js?v='+ version,
                    '../common/frame.js?v='+ version,
                    'index.js?v='+ version,
                    '../common/common.js?v='+ version
                ];

                if (packageType == 'web') {
                    jsFiles = [
                        '../common/frame.js?v='+ version,
                        'index.js?v='+ version,
                        '../common/common.js?v='+ version
                    ];
                }

                folder.forEach( function(v) {
                    return gulp.src('./app/'+ v +'/*.html')
                        .pipe($.htmlReplace({ 'js': jsFiles }))
                        .pipe(gulp.dest(buildFolder + v));
                });
            }
        });
    });


    //--生成JS模板数据
    gulp.task('templates', function() {
        //--生成公共JS模板数据
        gulp.src('./app/common/**/*.html')
            .pipe($.ngHtml2js({
                moduleName: "phoneApp",
                prefix: "../common/"
            }))
            .pipe(gulp.dest("./.tmp/common"));

        //--根据项目生成项目模板数据
        getProject({
            callback: function(folder){
                folder.forEach( function(v) {
                    return gulp.src('./app/'+ v +'/templates/*.html')
                        .pipe($.ngHtml2js({
                            moduleName: "phoneApp",
                            prefix: "templates/"
                        }))
                        .pipe(gulp.dest("./.tmp/"+ v));
                });
            }
        });
    });

    //--css 迁移
    gulp.task('movecss', function() {
        return gulp.src([
                './app/**/*.css'
            ])
            .pipe(gulp.dest(buildFolder));
    });

    //--image 迁移
    gulp.task('moveimages', function() {
        return gulp.src([
                './app/**/*.jpg',
                './app/**/*.png'
            ])
            .pipe(gulp.dest(buildFolder));
    });

    //--json 迁移
    gulp.task('movejson', function() {
        return gulp.src([
                './app/**/*.json'
            ])
            .pipe(gulp.dest(buildFolder));
    });
    
    //--js 合并压缩
    gulp.task('minjs', function() {
        //--框架JS压缩合并
        var framejs = [
                './app/lib/fastclick.js',
                './app/lib/iscroll-lite.js',
                './app/lib/slide.js',
                './app/lib/md5.js',
                './app/lib/megapix-image.js',

                './app/lib/config.js',
                './app/lib/angular.js',
                './app/lib/angular-touch.js',
                './app/lib/angular-ui-router.js'
            ];

        if (packageType == 'web') {
            gulp.src(framejs)
                .pipe($.concat('frame.js'))
                .pipe($.uglify())
                .pipe(gulp.dest(buildFolder +'common'));
        } else {
            gulp.src(framejs)
                .pipe($.concat('frame.js'))
                .pipe($.replace(/isHybridCreatePhoneApp=false/g, 'isHybridCreatePhoneApp=true'))
                .pipe($.uglify())
                .pipe(gulp.dest(buildFolder +'common'));
        }


        //--项目公共JS压缩、合并（包括公共模板数据）
        gulp.src([
                './app/common/**/*.js',
                './.tmp/common/**/*.js'
            ])
            .pipe($.concat('common.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(buildFolder +'common'));

        //--项目中的JS压缩、合并（包括项目模板数据）
        getProject({
            callback: function(folder){
                folder.forEach( function(v) {
                    return gulp.src([
                            './app/'+ v +'/app.js',
                            './.tmp/'+ v +'/*.js',
                            './app/'+ v +'/js/**/*.js'
                        ])
                        .pipe($.concat('index.js'))
                        .pipe($.ngAnnotate())
                        .pipe($.uglify())
                        .pipe(gulp.dest(buildFolder + v));
                });
            }
        });
    });
};