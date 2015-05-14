'use strict';

angular.module('phoneApp').factory('ENV', function ($timeout) {
    var ua = navigator.userAgent.toLowerCase();

    var ENV = {
        getLocalApi: '/api/',
        getServerApi: 'http://www.51mart.com.cn/Service/api/',

        isHybrid: false, //-----是否APP环境
        isWeixin: false, //-----是否微信环境
        isApple: false, //------是否苹果环境
        isAndroid: false, //----是否Android环境
        appVersion: '1.0.1' //--APP版本号
    };

    //--是APP环境
    if (/appuewireless/.test(this.ua)) {
        ENV.isHybrid = true;
    }

    //--是否Android环境
    if (/android/.test(this.ua)) {
        ENV.isAndroid = true;
    }

    //--是否苹果环境
    if (/iphone|ipad|ipod/.test(this.ua)) {
        ENV.isApple = true;
    }

    //--是否微信环境
    if (/micromessenger/.test(this.ua)) {
        ENV.isWeixin = true;
    }

    return ENV;

});
