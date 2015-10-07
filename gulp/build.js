var fs   = require('fs'),
    argv = require('yargs').argv,
    os   = require('os');

var getProject = require('./tools/folder.js'),
    buildFolder = require('./tools/build.folder.js')() || './build/';


var runType     = argv.run || '', // dev、build
    packageType = argv.g || 'app', // 默认打APP的包，如果要打H5的包就 --g web
    cssPath     = './app/themes',
    netPath     = '',
    d           = new Date(),
    version     = d.getTime(),
    veros       = os.platform();

switch (runType) {
    case 'build':
        netPort = argv.port || 8888;
        netPath = buildFolder;
    break;

    default: //--dev
        netPort = argv.port || 9999;
        netPath = './app/';
}

module.exports = function (gulp, $) {

    //拉取依赖框架
    gulp.task('bower', function() {
        return bower()
            .pipe(gulp.dest('lib/'))
    });

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
        
        if (runType !== 'build') {
            return;
        }

        return gulp.src([
                buildFolder,
                './.tmp'
            ], {read: false})
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
            }));


        gulp.src([
                './app/**/*.html',
                './app/**/*.js',
                '!./bower_components/**/*'
            ])
            .pipe($.watch([
                './app/**/*.html',
                './app/**/*.js',
                '!./app/bower_components/**/*'
            ]))
            .pipe($.livereload());

    });
    
    //--JS 注入到页面中
    gulp.task('inject', function() {
        return gulp.src('./app/index.html')
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
                    gulp.src([
                            './app/**/*.js',
                            '!./**/app.js',
                            '!./app/common/**/*.js',
                            '!./app/lib/*',
                            '!./app/api/*',
                            '!./app/data/*',
                            '!./app/themes/*',
                            '!./app/bower_components/**/*'
                        ], 
                        {read: false}), {relative: true}
                )
            )
            .pipe(gulp.dest('./app/'));
    });

    
    //--html js 替换
    gulp.task('replacehtml', function() {
        var jsFiles = [
            'frame.js?v='+ version,
            'common.js?v='+ version,
            'index.js?v='+ version
        ];

        return gulp.src('./app/index.html')
            .pipe($.htmlReplace({
                'css': 'themes/all.css?v='+ version,
                'js': jsFiles
            }))
            .pipe(gulp.dest(buildFolder));
    });


    //--生成JS模板数据
    gulp.task('templates', function() {
        return gulp.src([
                './app/**/*.html',
                '!./app/index.html',
                '!./app/bower_components/**/*'
            ])
            .pipe($.ngHtml2js({
                moduleName: "Tjoys",
                prefix: ""
            }))
            .pipe(gulp.dest("./.tmp/"));
    });

    //--css 迁移
    gulp.task('movecss', function() {
        return gulp.src([
                './app/**/*.css',
                '!./app/bower_components/**/*'
            ])
            // .pipe($.minifyCss())
            .pipe(gulp.dest(buildFolder));
    });

    //字体文件
    gulp.task('movefonts', function() {
        return gulp.src([
                './app/themes/fonts/*'
            ])
            .pipe(gulp.dest(buildFolder+ '/themes/fonts'));
    });

    //--image 迁移
    gulp.task('moveimages', function() {
        return gulp.src([
                './app/**/*.jpg',
                './app/**/*.png',
                // '!./app/themes/temp/**/*',
                '!./app/themes/logo/**/*',
                '!./app/bower_components/**/*'
            ])
            .pipe(gulp.dest(buildFolder));
    });
    
    //--js 合并压缩
    gulp.task('minjs', function() {
        //--框架JS压缩合并
        var framejs = [
                './app/lib/md5.js',
                './app/lib/exif.js',
                './app/lib/megapix-image.js',

                './app/lib/angular.js',
                './app/lib/angular-touch.js',
                './app/lib/angular-route.js',
                './app/lib/angular-ui-router.js'
            ];

        gulp.src(framejs)
            .pipe($.concat('frame.js'))
            .pipe($.uglify())
            .pipe(gulp.dest(buildFolder));


        //--项目公共JS压缩、合并（包括公共模板数据）
        gulp.src([
                './app/app.js',
                
                './.tmp/common/**/*.js',
                './app/common/**/*.js'
            ])
            .pipe($.concat('common.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(buildFolder));

        //--项目中的JS压缩、合并（包括项目模板数据）
        gulp.src([
                './.tmp/**/*.js',
                './app/**/*.js',

                '!./.tmp/common/**/*.js',

                '!./app/app.js',
                '!./app/lib/**/*.js',
                '!./app/common/**/*.js',
                '!./app/bower_components/**/*'
            ])
            .pipe($.concat('index.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(buildFolder));
    });
};