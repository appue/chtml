userEntry.controller('loginResetCtrl', function ($scope, $stateParams, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': [
            'entry/#/login/forget.htm'
        ]
    };

    $scope.inputVal = {};

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
            url: 'getClubHotUser',
            data: {
                Phone: $stateParams.phone,
                PhoneCode: $scope.inputVal.vcode,
                Password: md5($scope.inputVal.password)
            },
            success: function (data) {}
        });

    };

});