angular.module('phoneApp')

.factory('widget', function (
    $http, 
    $cacheFactory, 
    $rootScope, 
    $compile, 
    $timeout,
    $location,
    $ionicLoading,
    $ionicBackdrop,
    cachePool,
    ENV
) {

    /**
     * toast提示层
     * @param msg, time
     */
    var toastTimer = null;
    var msgToast = function (msg, time) {
        var toastDom = angular.element(document.querySelector('.notifier'));

        if (!toastDom.length) {
            var toastTpl = $compile('<div class="notifier" ng-click="notification=null" ng-show="notification"><span>{{notification}}</span></div>');
            angular.element(document.getElementsByTagName('body')[0]).append(toastTpl($rootScope));
        }

        $timeout(function () {
            $rootScope.notification = msg;
        }, 0);

        $timeout.cancel(toastTimer);

        toastTimer = $timeout(function () {
            $rootScope.notification = '';
        }, time || 2000);

    };

    /**
     * 数据缓存 所有缓存都在数据池里操作
     * @param key
     * @param data 如果data不存在，则为取缓存，如果存在，则重写key的值
     */
    var dataPool = $cacheFactory('dataPool');
    var cacheData = function (key, data) {

        if (!angular.isString(key)) {
            return false;
        }

        var tmpCache = dataPool.get(key);

        if (data) {
            dataPool.put(key, data); //缓存数据
        } else {
            return tmpCache ? tmpCache : false;
        }
    };

    /**
     * 安全的使用angular apply方法，以保证不会因为产生循环调用而抛出“$digest already in progress”
     * @param scope
     * @param fn
     */
    var safeApply = function (scope, fn) {
        if (!scope || !fn) {
            return;
        }
        if (scope.$$phase || (scope.$root && scope.$root.$$phase)) {
            fn();
        } else {
            scope.$apply(fn);
        }
    };

    /**
     * 带标题吸顶效果的页面滚卷处理
     * @param scope
     * @param titleEles
     * @param sticker
     * @param handler
     */
    var stickyTopScroll = function (scope, compile, titleEles, handler) {
        if (!scope || !titleEles || !titleEles.length || !handler || !handler.getScrollPosition()) {
            return;
        }

        var titleEle, height, targetEle, sticker,
            scrollTop = handler.getScrollPosition().top;

        if (scope.stickyContent === undefined) {
            var tpl = compile('<h2 class="sticker" ng-show="stickyContent != null">{{stickyContent}}</h2>');
            sticker = tpl(scope);
            sticker.css({
                position: 'absolute',
                width: '100%'
            });
            angular.element(handler.getScrollView().__container).append(sticker);
            handler.__sticker = sticker;
        } else {
            sticker = handler.__sticker;
        }

        // 滚卷处理
        for (var i = 0, len = titleEles.length; i < len; i++) {
            titleEle = titleEles[i];
            if (i === 0) {
                height = titleEle.clientHeight;
            }
            if (scrollTop >= titleEle.offsetTop) {
                targetEle = titleEle;
            } else {
                if (!sticker.hasClass('ng-hide')) {
                    if (scrollTop >= titleEle.offsetTop - height) {
                        sticker.css('top', (titleEle.offsetTop - height - scrollTop) + 'px');
                    } else {
                        sticker.css('top', 0);
                    }
                }
                break;
            }
        }

        if (targetEle && scope.stickyContent !== targetEle.innerHTML) {
            sticker.css('top', 0);
            safeApply(scope, function () {
                scope.stickyContent = targetEle.innerHTML;
            });
        } else if (!targetEle) {
            safeApply(scope, function () {
                scope.stickyContent = null;
            });
        }
    };

    var loginPopup = null;
    $rootScope.$on('$locationChangeStart', function () { //切换页面时隐藏分享条&取出弹出层
        angular.element(document.getElementById('shareBtnCtrl')).css('display', 'none');
        if (loginPopup) {
            loginPopup.close();
            loginPopup = null;
        }
    });

    /**
     * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var paramObj = function (obj) {
        var query = '',
            name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramObj(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramObj(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    /**
     * ajax请求
     * @param param = {
        method: 请求方式,
        url: 请求地址,
        success: 请求成功回调,
        error: 请求失败回调,
        data: 'POST数据',
        noLoad: 请求结果是否需要loading效果,
        noMask: 请求结果是否需要mask效果,
        isPopup: 请求结果是否有popup,
        isForm: 请求形式改为形式，增加param方法来封装postData【默认false】
     }
     */
    var ajaxRequest = function (params) {
        if (!params) {
            return;
        }

        var data = params.data || {};

        //--数据改造加用户信息start
        //-------------ToDo
        // var user = {
        //     'UserId': 12313,
        //     'Auth': 'asdfasdf'
        // };

        // cachePool.push('UserInfo', user, 2 / 24); //此处之后移动到登录页面
        //-------------ToDo

        var obj = {
                Header: {
                    UserId: '',
                    Auth: ''
                }
            },
            UserInfo = cachePool.pull('UserInfo');

        if (UserInfo) {
            obj.Header.UserId = UserInfo.UserId;
            obj.Header.Auth = UserInfo.Auth
        }

        data = angular.extend({}, data, obj);
        //--数据改造加用户信息end

        var options = {
                success: function () {},
                error: function () {},
                showLoading: true,
                isPopup: false,
                config: {
                    // method: param.method || 'POST',
                    // url: ENV.apiSocket + param.url || '',
                    
                    method: 'GET',
                    url: ENV.apiSocket + params.url +'.json' || '',

                    data: data,
                    timeout: 15000
                }
            },
            effect = function () {
                if (options.showLoading) {
                    $ionicLoading.hide();
                }
                if (options.isPopup) {
                    $ionicBackdrop.release();
                }
            };

        for (var i in params) options[i] = params[i];

        if (options.showLoading) {
            $ionicLoading.show({
                templateUrl: 'common/directives/mod_loading.html'
            });
        }

        $http(options.config).success(function (data) {
            if (data && typeof options.success === 'function') {
                options.success(data);
            }

            effect();

        }).error(function (data) {

            if (typeof options.error === 'function') {
                options.error(data);
            } else {
                msgToast('请检查你的网络');
            }

            effect();

        });

    };


    /**
     * 获得当前URL地址
     */
    var toLogin = function () {

        var uid = 0,
            UserInfo = cachePool.pull('UserInfo') || '';

        if (UserInfo) {
            uid = UserInfo.UserId;
        }

        if (!uid) {
            // routerRedirect.toJump({
            //     url: ['entry/#/login.htm?from='+ getCurrentUrl()]
            // });
        }

    };

    return {
        msgToast: msgToast,
        cacheData: cacheData,
        safeApply: safeApply,
        stickyTopScroll: stickyTopScroll,
        ajaxRequest: ajaxRequest,
        toLogin: toLogin
    };
});