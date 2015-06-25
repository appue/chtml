userEntry.controller('registerAccountCtrl', function ($scope, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': [
            'entry/#/register/create.htm'
        ]
    };

    $scope.inputVal = widget.cacheData('accountData') || {};
    $scope.inputVal.password = null;

    $scope.goNextStep = function () { //设置下一步按钮

        if (!$scope.inputVal.phone) {
            widget.msgToast('请输入手机号码');
            return;
        }

        if (!$scope.inputVal.password) {
            widget.msgToast('请输入密码');
            return;
        }

        if ($scope.inputVal.password.length <= 5) {
            widget.msgToast('密码必须大于或等于6位');
            return;
        }

        widget.cacheData('accountData', $scope.inputVal);

        routerRedirect.toJump({
            'url': [
                'entry/#/register/vcode/' + $scope.inputVal.phone
            ]
        });

    };

});