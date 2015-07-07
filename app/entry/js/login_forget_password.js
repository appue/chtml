angular.module('phoneApp')
    .controller('loginForgetCtrl', function ($scope, $state, $ionicPopup, widget) {

        $scope.inputVal = widget.cacheData('loginPhone') || {};

        $scope.checkPhone = function () { //检查手机号码

            if (!$scope.inputVal.phone) {
                widget.msgToast('请输入手机号码');
                return;
            }

            if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($scope.inputVal.phone)) {
                widget.msgToast('手机号码格式不合法');
                return;
            }

            widget.cacheData('loginPhone', $scope.inputVal);

            $ionicPopup.confirm({
                title: '确认手机号码',
                cancelText: '取消',
                cancelType: 'cancel',
                okText: '确定',
                okType: 'confirm',
                scope: $scope,
                template: '<div class="phone_number_cont"><p>我们将发送验证码到该手机：<br><span class="color_green">{{inputVal.phone}}</span></p></div>'
            }).then(function (res) {
                if (res) {
                    $state.go('forum.loginReset', {
                        phone: $scope.inputVal.phone
                    });
                }
            });

        };

    });