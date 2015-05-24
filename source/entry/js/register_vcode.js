userEntry.controller('registerVcodeCtrl', function ($scope, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': [
            'entry/#/register/account.htm',
            'entry/index.html#/register/account.htm'
        ]
    };

    $scope.goDone = function () { //点击去注册完成页

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
                'entry/#/register/vcode.htm',
                'entry/index.html#/register/vcode.htm'
            ]
        });

    };

});