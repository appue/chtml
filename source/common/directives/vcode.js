'use strict';

angular.module('phoneApp')

// 获取验证码
.directive('getVcode', function ($rootScope, $stateParams, $timeout, routerRedirect, widget, $http, $q) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            if (!$stateParams.phone) { //如果电话号码不存在，则返回上一页
                routerRedirect.toJump(scope.backParam);
                return;
            }

            if ($rootScope.vEnable) { //初始化，如果之前的倒计时未结束，则重启倒计时
                $timeout.cancel($rootScope.vEnable);
                countdown();
            } else {
                $rootScope.vDisableTime = 0;
            }

            function countdown() { //倒计时函数
                if ($rootScope.vDisableTime > 0) {
                    element.text('重新发送(' + $rootScope.vDisableTime + ')').addClass('disable');
                    $rootScope.vDisableTime--;
                    $rootScope.vEnable = $timeout(countdown, 1000);
                } else {
                    element.text('重发验证码').removeClass('disable');
                }
            }

            function resendVcode() {

                if ($rootScope.vDisableTime !== 0) {
                    return;
                }

                $rootScope.vDisableTime = 30;

                widget.ajaxRequest({
                    noMask: true,
                    url: 'getClubHotUser',
                    data: {
                        UserId: 8
                    },
                    success: function (data) {

                        console.log(data);

                        if (data.ShortMessage) {

                            countdown(); //开始倒计时

                            widget.msgToast(data.ShortMessage);

                        } else {

                            widget.msgToast(data.msg || '手机号无效');

                        }

                    },
                    error: function () { //待删除...
                        countdown();
                    }
                });

            }

            resendVcode(); //页面首次请求

            element.text('重新发送(' + $rootScope.vDisableTime + ')').addClass('disable').on('click', resendVcode);



            // var defer = $q.defer();
            // var promise = defer.promise;

            // promise.then(function success(data) {
            //     console.log(data);

            //     var anotherDeferred = $q.defer();

            //     $timeout(function () {
            //         anotherDeferred.resolve('bar');
            //     }, 1000);

            //     return anotherDeferred.promise;

            // }, function error(data) {
            //     console.log(data);
            // }).then(function success(data) {
            //     console.log(data);
            // });

            // defer.notify(3);
            // defer.resolve(1);
            // defer.reject(2);

            // $q.all({
            //     first: $http.get('http://127.0.0.1:9999/api/getClubHotUser.json'),
            //     second: $http.get('http://127.0.0.1:9999/api/getClubHotUser.json')
            // }).then(function (arr) {
            //     console.log(arr);
            // });

            // function getJson(arg) {
            //     var deferred = $q.defer();
            //     var url = 'http://127.0.0.1:9999/api/' + arg + '.json';

            //     $http.get(url).success(function (d) {
            //         console.log(d);
            //         deferred.resolve(d);
            //     });

            //     return deferred.promise;
            // }

            // getJson('getClubHotUser')
            //     .then(getJson('getClubHotUser'))
            //     .then(getJson('getClubHotUser'))
            //     .then(getJson('getClubHotUser'))
            //     .then(function (data) {
            //         console.log(data);
            //     });

        }
    };
});