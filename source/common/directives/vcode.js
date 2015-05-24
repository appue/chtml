'use strict';

angular.module('phoneApp')

// 获取验证码
.directive('getVcode', function ($stateParams, $timeout, routerRedirect, widget) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            if (!$stateParams.phone) { //如果电话号码不存在，则返回上一页
                routerRedirect.toJump(scope.backParam);
            }

            var vDisable = false;

            function resendVcode() {

                if (vDisable) {
                    return;
                } else {
                    vDisable = true;
                }

                widget.ajaxRequest({
                    noMask: true,
                    url: '$local/Tools/SendCheckCode',
                    data: {
                        Mobile: $stateParams.phone
                    },
                    success: function (data) {
                        var time = 30,
                            countdown = function () { //倒计时
                                if (time > 0) {
                                    element.text('重新发送' + time);
                                    time--;
                                    $timeout(countdown, 1000);
                                } else {
                                    vDisable = false;
                                    element.text('重发验证码').removeClass('disable');
                                }
                            };

                        if (data.ShortMessage) {

                            vDisable = true;
                            element.addClass('disable');
                            $timeout(countdown, 0); //开始倒计时
                            widget.msgToast(data.ShortMessage);

                        } else {
                            widget.msgToast(data.msg || '手机号无效');
                        }

                    }
                });

            };

            resendVcode(); //页面首次请求

            element.text('重新发送').addClass('disable').on('click', resendVcode);

        }
    };
});