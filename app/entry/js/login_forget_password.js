userEntry.controller('loginForgetCtrl', function ($scope, $compile, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': [
            'entry/#/login.htm'
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

        if (!document.querySelector('.mod_mask')) {
            var maskTpl = $compile('<div ng-show="showMask" class="mod_mask"></div>');
            angular.element(document.getElementById('js_view')).append(maskTpl($scope));
        }

        var $thisPopup = angular.element(document.getElementById('popup_checkPhone'));

        $thisPopup.removeClass('ng-hide');
        $scope.showMask = true;

    };

    $scope.sendMessage = function () { //跳验证码页
        routerRedirect.toJump({
            'url': [
                'entry/#/login/reset/' + $scope.inputVal.phone
            ]
        });
    };

});