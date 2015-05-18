/**
 * $http interceptor
 *
 * 1. 如果 $http 发起 request 的 URL domain 部分是以 $server 开头, 则会被自动替换为当前环境的 domain
 *
 * 例: $http.get('$server/...')
 * 可能会被替换成: $http.get('http://www.51mart.com.cn/Service/api/...')
 *
 * 2. response...
 *
 */

angular.module('phoneApp').config(function ($provide, $httpProvider) {

    $provide.factory('httpInterceptor', function ($q, ENV) {

        var httpInterceptor = {

            request: function (config) {
                //-------------ToDo
                var user = {
                    'UserId': 12313,
                    'Auth': 'asdfasdf'
                };

                localStorage.setItem('UserInfo', JSON.stringify(user));
                //-------------ToDo

                var obj = {
                        UserId: '',
                        Auth: ''
                    },
                    UserInfo = localStorage.getItem('UserInfo') || '';

                if (UserInfo) {
                    obj = {
                        Header: {
                            UserId: JSON.parse(UserInfo).UserId,
                            Auth: JSON.parse(UserInfo).Auth
                        }
                    };
                }

                var raw = config.url;
                config.params = angular.extend({}, config.params, obj);

                if (raw.indexOf('$local') === 0) {
                    config.url = raw.replace('$local/', ENV.getLocalApi);
                }

                if (raw.indexOf('$server') === 0) {
                    config.url = raw.replace('$server/', ENV.getServerApi);
                }

                return config || $q.when(config);
            },

            requestError: function (rejection) {
                return $q.reject(rejection);
            },

            response: function (response) {

                // if (response.data && response.data.ResponseStatus) {

                //     if (response.data.ResponseStatus.Ack !== 'Success') {

                //         return $q.reject(response);
                //     }
                // }

                return response || $q.when(response);
            },

            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        };

        return httpInterceptor;
    });

    $httpProvider.interceptors.push('httpInterceptor');
});