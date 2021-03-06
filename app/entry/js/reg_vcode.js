angular.module('phoneApp')

.controller('tRegVcode', function (
    $scope,
    $state,
    widget
) {

    $scope.inputVal = {}; //数据初始化

    $scope.goDone = function () { //点击去注册完成页

        if (!$scope.inputVal.vcode) {
            widget.msgToast('请输入验证码');
            return;
        }

        var account = widget.cacheData('accountData');

        if (account) {
            widget.ajaxRequest({
                scope: $scope,
                url: 'setSendPhone',
                data: {
                    Phone: account.phone,
                    PhoneCode: $scope.inputVal.vcode,
                    Password: md5(account.password)
                },
                success: function (data) {
                    widget.cacheData('accountData', null);
                    $state.go('forum.registerDone');
                }
            });
        } else {
            $state.go('forum.registerAccount');
        }

    };

});