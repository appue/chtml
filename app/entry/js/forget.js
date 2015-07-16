angular.module('phoneApp')

.controller('tLoginForget', function (
    $scope,
    $state,
    $ionicPopup,
    $ionicViewSwitcher,
    $timeout,
    widget
) {

    $scope.cInput = {
        btnText: "发送验证码",
        isSend: false
    };



    // 发送验证码
    $scope.sendCode = function () {
        var status = widget.checkPhone($scope.cInput.phone);

        // if (status) return;

        if ($scope.cInput.isSend) {
            widget.msgToast('请稍后再刷新验证码！');
            return;
        }

        var num = 60;

        $scope.cInput.btnText = num;

        timer();

        function timer() {
            $scope.cInput.isSend = true;
            $timeout(function () {
                if (num == 0) {
                    $scope.cInput.isSend = false;
                    $scope.cInput.btnText = "重新发送验证码";
                    return;
                }
                num--;
                $scope.cInput.btnText = num;
                timer();
            }, 1000);
        }
    };

    // 检查手机号码
    $scope.changePassword = function () {

        var status = widget.checkPhone($scope.cInput.phone);

        if (status) return;

        if (!$scope.cInput.password) {
            widget.msgToast('请输入密码！');
            return;
        }

        if ($scope.cInput.passwordCheck) {
            widget.msgToast('请输入确认密码！');
            return;
        }

        if ($scope.cInput.password !== $scope.cInput.passwordCheck) {
            widget.msgToast('您两次输入的密码不一致！');
            return;
        }

        if ($scope.cInput.vcode) {
            widget.msgToast('请输入手机验证码！');
            return;
        }

        // widget.cacheData('loginPhone', $scope.inputVal);

        // $ionicPopup.confirm({
        //     title: '确认手机号码',
        //     cancelText: '取消',
        //     cancelType: 'cancel',
        //     okText: '确定',
        //     okType: 'confirm',
        //     scope: $scope,
        //     template: '<div class="phone_number_cont"><p>我们将发送验证码到该手机：<br><span class="color_green">{{inputVal.phone}}</span></p></div>'
        // }).then(function (res) {
        //     if (res) {
        //         $ionicViewSwitcher.nextDirection("forward");
        //         $state.go('password_reset', {
        //             phone: $scope.inputVal.phone
        //         });
        //     }
        // });

    };


    function checkPhone() {
    }

});