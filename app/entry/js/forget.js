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
        // btnText: "发送验证码",
        // isSend: false
    };

    // 发送验证码
    // $scope.sendCode = function () {
    //     var status = widget.checkPhone($scope.cInput.phone);

    //     if (status) return;

    //     if ($scope.cInput.isSend) {
    //         widget.msgToast('请稍后再刷新验证码！');
    //         return;
    //     }

    //     widget.ajaxRequest({
    //         url: 'setSendPhone',
    //         data: {
    //             Phone: $scope.cInput.phone
    //         },
    //         success: function (data) {
    //             widget.msgToast('验证码已发送到'+ $scope.cInput.phone +'手机上');
    //         }
    //     });

    //     var num = 60;

    //     $scope.cInput.btnText = "重新发送("+ num +")";

    //     timer();

    //     function timer() {
    //         $scope.cInput.isSend = true;
    //         $timeout(function () {
    //             num--;
    //             if (num == 0) {
    //                 $scope.cInput.isSend = false;
    //                 $scope.cInput.btnText = "重新发送验证码";
    //                 return;
    //             }
    //             $scope.cInput.btnText = "重新发送("+ num +")";
    //             timer();
    //         }, 1000);
    //     }
    // };


    // 检查手机号码
    $scope.changePassword = function () {

        var status = widget.checkPhone($scope.cInput.phone);

        if (status) return;

        if (!$scope.cInput.password) {
            widget.msgToast('请输入密码！');
            return;
        }

        if (!$scope.cInput.passwordCheck) {
            widget.msgToast('请输入确认密码！');
            return;
        }

        if ($scope.cInput.password.length < 6 || $scope.cInput.password.length > 16) {
            widget.msgToast('密码的长度应该为6-16位');
            return;
        }

        if ($scope.cInput.password !== $scope.cInput.passwordCheck) {
            widget.msgToast('您两次输入的密码不一致！');
            return;
        }

        if (!$scope.cInput.vcode) {
            widget.msgToast('请输入手机验证码！');
            return;
        }

        if ($scope.cInput.vcode.length != 4) {
            widget.msgToast('您输入的手机验证码长度不对');
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


        widget.ajaxRequest({
            url: 'setNewPassword',
            data: {
                Phone: $scope.cInput.phone,
                PhoneCode: $scope.cInput.vcode,
                Password: md5($scope.cInput.password)
            },
            success: function (data) {
                if (data.isModify) {

                } else {
                    widget.msgToast('修改密码错误，请检查您输入的信息！');
                }
            }
        });

    };

});