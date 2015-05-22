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
        *     url: 用于APP的跳转[对非同一模块并且APP中有效]
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

            alert(window.location.href);
            
            // self._slide(params);
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
            
            self._slide(params);

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

            options.href = (params.url.length > 1) ? params.url[1] : params.url[0];

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
        },
    };

    return routerRedirect;

});