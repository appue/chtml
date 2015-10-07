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
        if (!$scope.cInput.Phone) {
            widget.msgToast('请输入手机号!');
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
        // widget.setLogin({
        //     UserId: 1,
        //     Auth: "EWED4494LFOFDF84834BCD8343"
        // });
        // $state.go("mange.list");

        widget.ajaxRequest({
            scope: $scope,
            url: 'getLogin',
            data: {
                Phone: $scope.cInput.Phone,
                Password: md5($scope.cInput.Password)
            },
            success: function (res) {
                widget.setLogin({
                    UserId: res.UserId,
                    Auth: res.Auth
                });
				
        		$state.go("mange.list");
            },
            error: function (err) {
                widget.msgToast('登录失败');
            }
        });

    };
});
