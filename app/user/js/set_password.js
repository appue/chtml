angular.module('phoneApp')

.controller('tUserSetPassword', function (
    $scope,
    $stateParams,
    $timeout,
    $ionicViewSwitcher,
    widget
) {

    widget.initUser($scope);

    $scope.cInput = {
        // btnText: "发送验证码",
        // isSend: false
        phone: $scope.UserInfo.Phone || 0
    };

    // 发送验证码
    // $scope.sendCode = function () {
    //     console.log($scope.UserInfo);
    //     if ($scope.UserInfo) {
    //         var status = widget.checkPhone($scope.UserInfo.Phone);

    //         if (status) return;
    //     }

    //     if ($scope.cInput.isSend) {
    //         widget.msgToast('请稍后再刷新验证码！');
    //         return;
    //     }

    //     widget.ajaxRequest({
    //         url: 'setSendPhone',
    //         data: {
    //             Phone: $scope.UserInfo.Phone
    //         },
    //         success: function (data) {
    //             widget.msgToast('验证码已发送到' + $scope.UserInfo.Phone + '手机上');
    //         }
    //     });

    //     var num = 60;

    //     $scope.cInput.btnText = "重新发送(" + num + ")";

    //     timer();

    //     function timer() {
    //         $scope.cInput.isSend = true;
    //         $timeout(function () {
    //             if (num == 0) {
    //                 $scope.cInput.isSend = false;
    //                 $scope.cInput.btnText = "重新发送验证码";
    //                 return;
    //             }
    //             num--;
    //             $scope.cInput.btnText = "重新发送(" + num + ")";
    //             timer();
    //         }, 1000);
    //     }
    // };

    $scope.submitModify = function () {

        if (!$scope.cInput.oldPassword) {
            widget.msgToast('请输入旧密码');
            return;
        }

        if (!$scope.cInput.password) {
            widget.msgToast('请输入新密码');
            return;
        }

        if ($scope.cInput.password.length < 6 || $scope.cInput.password.length > 16) {
            widget.msgToast('密码的长度应该为6-16位');
            return;
        }

        if (!$scope.cInput.passwordCheck) {
            widget.msgToast('请输入确认密码');
            return;
        }

        if ($scope.cInput.passwordCheck !== $scope.cInput.password) {
            widget.msgToast('两次输入不相符，请重新输入');
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

        widget.ajaxRequest({
            scope: $scope,
            url: 'setModifyPassword',
            data: {
                OldPassword: $scope.cInput.oldPassword,
                Password: $scope.cInput.password,
                PhoneCode: $scope.cInput.vcode
            },
            success: function (data) {
                if (data.Response && data.Response.Ack == "Success") {
                    widget.msgToast('密码修改成功！');

                    $ionicViewSwitcher.nextDirection('back'); //forward
                    $window.history.back();
                } else {
                    widget.msgToast('密码修改失败！');
                }
            }
        });

    };

});