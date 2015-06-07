angular.module('phoneApp')

.factory('routerRedirect', function(
    $state,
    $stateParams,
    $location,
    ENV
) {

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
    */
    var routerRedirect = {

        /*
        * @params:
        *     opts: {
        *         direction: 页面转动方向[left|right|up|down]
        *     },
        *     module: 所属的项目[这种只对H5并且相同模块有效]
        *     hash: hash值[这种只对H5并且相同模块有效]
        *     filter: 传递的参数[这种只对H5并且相同模块有效]
        *     url: [h5, app] 用于非同一模块跳转和APP跳转
        */
        toBack: function(params) {
            var self = this;
            
            params.opts = {'direction': 'right'};

            if (!ENV.isHybrid) {

                var url,
                    from = $location.$$search.from || '';

                
                if (from) {

                    url = (typeof(from) == 'string' && self._checkUrl(from)) ? from : '';

                    if (typeof(from) == 'object') {
                        angular.forEach(from, function(v, k) {
                            if (self._checkUrl(v)) {
                                url = v;
                            }
                        });
                    }

                    if (url) {
                        window.location.href = from;

                        return;
                    }
                }

                self._url(params);

                return;
            }

            self._toRedirect(params, 2);
        },

        /*
        * @params:
        *     opts: {
        *         direction: 页面转动方向[left|right|up|down]
        *     },
        *     module: 所属的项目[这种只对H5并且相同模块有效]
        *     hash: hash值[这种只对H5并且相同模块有效]
        *     filter: 传递的参数[这种只对H5并且相同模块有效]
        *     url: [h5, app] 用于非同一模块跳转和APP跳转
        */
        toJump: function (params) {
            var self = this;

            if (!ENV.isHybrid) {
                self._url(params);

                return;
            } 
            
            self._toRedirect(params, 1);

        },

        _url: function(params) {
            var self = this;

            var url,
                pathname = window.location.pathname.replace('\/', '').replace('\/', '');

            if (params.module && pathname == params.module) {

                if (params.filter) {
                    $state.go(params.hash, params.filter);
                } else {
                    $state.go(params.hash);
                }

                return;
            }

            if (params.url.length > 0) {
                url = params.url[0];
            }

            window.location.href = window.location.origin +'/'+ url;

        },

        //--type: 1:toJump; 2:toBack
        _toRedirect: function(params, type) {
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
                    'fixedPixelsBottom': 0
                };

            for (i in params.opts) options[i] = params.opts[i];

            if (type == 2) {
                var fromUrl;

                window.location.href.replace(/.*\?/g, '?').toLowerCase().replace((/(?:[\?&])(\w+)=([^#&\s]*)/g), function (a, f, s) {

                    fromUrl = (f == 'from') ? decodeURIComponent(s) : '';

                });
                
                // angular.forEach(arr, function(v, k) {
                //     if (self._checkUrl(v)) {
                //         fromUrl = v;
                //     }
                // });

                options.href = fromUrl ? fromUrl : ((params.url.length > 1) ? params.url[1] : params.url[0].replace('\/#', '\/index.html#'));

            } else {

                options.href = (params.url.length > 1) ? params.url[1] : params.url[0].replace('\/#', '\/index.html#');

            }

            self._toAppurl(options);
        },

        _toAppurl: function(options){
            var self = this;

            window.plugins.nativepagetransitions.slide(
                options,
                function (msg) {
                    console.log(msg);
                },
                function (msg) {
                    console.log(msg);
                }
            );
        },
        
        _checkUrl : function (url) {
            return (url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0);
        }
    };

    return routerRedirect;

});