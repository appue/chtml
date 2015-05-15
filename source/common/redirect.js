angular.module('phoneApp')

.factory('routerRedirect', function($state, ENV) {

    var routerRedirect = {
        /*
        * 页面跳转
        * var options = {
        *     "direction": "left", //-----'left|right|up|down', default 'left' (which is like 'next')
        *     "duration": 500, //---------in milliseconds (ms), default 400
        *     "slowdownfactor": 3, //-----overlap views (higher number is more) or no overlap (1), default 4
        *     "iosdelay": 100, //---------ms to wait for the iOS webview to update before animation kicks in, default 60
        *     "androiddelay": 150, //-----same as above but for Android, default 70
        *     "winphonedelay": 250, //----same as above but for Windows Phone, default 200,
        *     "fixedPixelsTop": 0, //-----the number of pixels of your fixed header, default 0 (iOS and Android)
        *     "fixedPixelsBottom": 48 //--the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        *     'href': '' //---------------跳转的地址
        * };
        * @params:
        *     opts: {
        *         direction: 页面转动方向[left|right|up|down]
        *     },
        *     module: 所属的项目[这种只对H5并且相同模块有效]
        *     hash: hash值[这种只对H5并且相同模块有效]
        *     filter: 传递的参数[这种只对H5并且相同模块有效]
        *     url: 用于APP的跳转[对非同一模块并且APP中有效]
        */
        toJump: function (params) {
            var self = this;

            if (!ENV.isHybrid) {

                var url,
                    pathname = window.location.pathname.replace('\/', '').replace('\/', '');

                if (pathname == params.module) {

                    if (params.filter) {
                        $state.go(params.hash, filter);
                    } else {
                        $state.go(params.hash);
                    }

                    return;
                }

                window.location.href = params.url;

                return;
            } 
            
            self._slide(params);

        },

        _slide: function(params){
            var self = this;

            var i,
                options = {
                    'direction': 'left',
                    'duration': 500, 
                    'slowdownfactor': 3, 
                    'iosdelay': 100,
                    'androiddelay': 150,
                    'winphonedelay': 250, 
                    'fixedPixelsTop': 0,
                    'fixedPixelsBottom': 48
                };

            for (i in params.opts) options[i] = params.opts[i];

            // return;
            if (params.url) {
                options.href = params.url;
            } else {
                options.href = params.module +'/index.html#'+ $state.get(params.hash).url; 
            }
            
            window.plugins.nativepagetransitions.slide(
                options,
                function (msg) {
                    console.log(msg);
                },
                function (msg) {
                    console.log(msg);
                }
            );
        }
    };

    return routerRedirect;

});