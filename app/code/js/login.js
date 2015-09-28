// 首页
angular.module('Tjoys')

.controller('tLogin', function (
    $state,
    $scope,
    $rootScope,
    widget
){
    $rootScope.showHeader = false;

    $scope.cInput = {};

    $scope.toLogin = function () {
        if (!$scope.cInput.Name) {
            widget.msgToast('请输入用户名!');
            return;
        }

        if (!$scope.cInput.Password) {
            widget.msgToast('请输入登录密码!');
            return;
        }

        if (!$scope.cInput.Code) {
            widget.msgToast('请输入验证码!');
            return;
        }

        // 测试用 toDo
        widget.setLogin({
            UserId: 1,
            Auth: "EWED4494LFOFDF84834BCD8343"
        });

        widget.ajaxRequest({
            scope: $scope,
            url: 'getLogin',
            data: {
                UserName: $scope.cInput.Name,
                Password: md5($scope.cInput.Password)
            },
            success: function (res) {
                widget.setLogin({
                    UserId: res.UserId,
                    Auth: res.Auth
                });
            }
        });

        $state.go("mange.index");
    };
});
