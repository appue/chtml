angular.module('phoneApp')

.controller('tRegAccount', function (
    $scope,
    $state,
    $timeout,
    $ionicViewSwitcher,
    widget
) {

    var regData = widget.cacheData('personalData');

    if (!regData) {
        widget.msgToast('用户注册信息已过期请重新返回输入！');
        // $state.reload();
        $ionicViewSwitcher.nextDirection("back");
        $state.go('forum.reg-create');
        return;
    }

    $scope.cInput = widget.cacheData('personalData');

    $scope.cInput.password = null;
    $scope.cInput.btnText = "发送验证码"

    $scope.submitReg = function () {

        if (!$scope.cInput.phone) {
            widget.msgToast('请输入手机号码！');
            return;
        }

        if (!$scope.cInput.password) {
            widget.msgToast('请输入密码！');
            return;
        }

        if ($scope.cInput.password.length < 6 || $scope.cInput.password.length > 16) {
            widget.msgToast('密码必须6到16位之间！');
            return;
        }

        if (!$scope.cInput.vcode) {
            widget.msgToast('请输入手机验证码！');
            return;
        }

        if ($scope.cInput.vcode.length > 4 || $scope.cInput.vcode.length < 4) {
            widget.msgToast('您输入的手机验证码长度不对');
            return;
        }

        widget.ajaxRequest({
            url: 'setRegInfo',
            data: {
                Phone: $scope.cInput.phone,
                UserName: $scope.cInput.nickname,
                Sex: $scope.cInput.sex,
                AreaId: $scope.cInput.city,
                Job: $scope.cInput.job,
                Password: md5($scope.cInput.password),
                PhoneCode: $scope.cInput.vcode
            },
            success: function (data) {
                if (data.Response.Ack == "Success") {

                    //注册信息写入本地，登录
                    cachePool.push('UserInfo', {
                        Phone: $scope.cInput.phone,
                        UserName: $scope.cInput.nickname,
                        Sex: $scope.cInput.sex,
                        City: $scope.cInput.city,
                        CityName: $scope.cInput.cityName,
                        Job: $scope.cInput.job,
                        JobName: $scope.cInput.jobName,
                        Auth: data.Auth,
                        UserId: data.UserId 
                    }, 2 / 24);

                    $ionicViewSwitcher.nextDirection("forward");
                    $state.go("forum.reg-done");

                } else {
                    widget.msgToast('注册失败：'+ data.Message);
                }
            }
        });
    };


    $scope.sendCode = function () {
        var status = widget.checkPhone($scope.cInput.phone);

        if (status) return;

        if ($scope.cInput.isSend) {
            widget.msgToast('请稍后再刷新验证码！');
            return;
        }

        widget.ajaxRequest({
            url: 'setSendPhone',
            data: {
                Phone: $scope.cInput.phone
            },
            success: function (data) {
                widget.msgToast('验证码已发送到'+ $scope.cInput.phone +'手机上');
            }
        });

        var num = 60;

        $scope.cInput.btnText = "重新发送("+ num +")";

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
                $scope.cInput.btnText = "重新发送("+ num +")";
                timer();
            }, 1000);
        }
    };

});