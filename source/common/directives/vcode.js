'use strict';

angular.module('phoneApp')

// 获取验证码
.directive('getVcode', function ($rootScope, $stateParams, $timeout, routerRedirect, widget) {
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
                    url: '$local/Tools/SendCheckCode',
                    data: {
                        Mobile: $stateParams.phone
                    },
                    success: function (data) {

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

        }
    };
});