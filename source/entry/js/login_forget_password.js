userEntry.controller('loginForgetCtrl', function ($scope, routerRedirect, widget) {

    $scope.inputVal = {}; //初始化ng-model

    $scope.checkPhone = function () { //检查手机号码

        if (!$scope.inputVal.phone) {
            widget.msgToast('请输入用户名');
            return;
        }

        if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($scope.inputVal.phone)) {
            widget.msgToast('用户名格式不合法');
            return;
        }

        var $thisPopup = angular.element(document.getElementById('popup_checkPhone'));

        $thisPopup.removeClass('ng-hide');
        $scope.showMask = true;
    };

    $scope.sendMessage = function () { //跳验证码页

        routerRedirect.toJump({
            'module': 'entry',
            'hash': 'loginReset',
            'url': '/login/reset/' + $scope.inputVal.phone
        });

    };

});