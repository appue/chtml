angular.module('phoneApp')
.controller('registerVcodeCtrl', function ($scope, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': [
            'entry/#/register/account.htm'
        ]
    };

    $scope.inputVal = {}; //数据初始化

    $scope.goDone = function () { //点击去注册完成页

        if (!$scope.inputVal.vcode) {
            widget.msgToast('请输入验证码');
            return;
        }

        routerRedirect.toJump({
            'url': [
                'entry/#/register/done.htm'
            ]
        });

    };

});