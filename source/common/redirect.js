angular.module('phoneApp')

.factory('routerRedirect', function(ENV) {

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
        *         href: 页面跳转的URL
        *     },
        *     callback: function(){},
        *     failure: function(){}
        */
        toJump: function (params) {
            var self = this;

            if (!ENV.isHybrid) {

                var url = params.opts.href.replace('index\.html', '')

                window.location.href = window.location.origin + url;

                return;
            } 
            
            // self._slide(params);

        },

        _slide: function(params){
            var self = this;

            var options = {
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

            options.href = params.opts.href;
            
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