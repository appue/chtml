userEntry.controller('loginForgetCtrl', function ($scope, $cacheFactory, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': [
            'entry/#/login.htm',
            'entry/index.html#/login.htm'
        ]
    };

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

        var $thisPopup = angular.element(document.getElementById('popup_checkPhone'));

        $thisPopup.removeClass('ng-hide');
        $scope.showMask = true;
    };

    $scope.sendMessage = function () { //跳验证码页

        // routerRedirect.toJump({
        //     'module': 'entry',
        //     'hash': 'loginReset',
        //     'url': '/login/reset/' + $scope.inputVal.phone,
        //     'filter': {
        //         'phone': $scope.inputVal.phone
        //     }
        // });

        routerRedirect.toJump({
            'url': [
                'entry/#/login/reset/' + $scope.inputVal.phone + '.htm',
                'entry/index.html#/login/reset/' + $scope.inputVal.phone + '.htm'
            ]
        });

    };

});