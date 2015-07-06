angular.module('phoneApp')
    .controller('registerAccountCtrl', function ($scope, $state, widget) {

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

            $state.go('entry.registerVcode', {
                phone: $scope.inputVal.phone
            });

        };

    });