userEntry.controller('loginResetCtrl', function ($scope, $stateParams, routerRedirect, widget) {

    if (!$stateParams.phone) { //如果电话号码不存在，则返回上一页
        routerRedirect.toJump({
            'module': 'entry',
            'hash': 'loginForget',
            'url': '/login/forget'
        });
    }

    $scope.vHtml = '重新发送';
    $scope.vDisable = true;
    $scope.inputVal = {};

    $scope.resendMessage = function (disable) {

        if (disable) {
            return;
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
                            $scope.vHtml = '重新发送' + time;
                            time--;
                            $timeout(countdown, 1000);
                        } else {
                            $scope.vHtml = '重发验证码';
                            $scope.vDisable = false;
                        }
                    };

                if (data.ShortMessage) {
                    widget.msgToast(data.ShortMessage);
                    $scope.vDisable = true;
                    $timeout(countdown, 0);
                } else {
                    widget.msgToast(data.msg || '手机号无效');
                }

            }
        });

    };

    $scope.resendMessage(false); //页面首次请求

    $scope.submitPassword = function () {
        if (!$scope.inputVal.vcode) {
            widget.msgToast('请输入验证码');
            return;
        }

        if (!$scope.inputVal.password) {
            widget.msgToast('请输入新密码');
            return;
        }

        if ($scope.inputVal.password.length <= 5) {
            widget.msgToast('新密码必须大于或等于6位');
            return;
        }

        if (!$scope.inputVal.passwordCheck) {
            widget.msgToast('请再次输入新密码');
            return;
        }

        if ($scope.inputVal.passwordCheck !== $scope.inputVal.password) {
            widget.msgToast('两次输入不相符，请重新输入');
            return;
        }

        widget.ajaxRequest({
            noMask: true,
            url: '$local/Tools/SendCheckCode',
            data: {
                Mobile: 123
            },
            success: function (data) {}
        });

    };

});