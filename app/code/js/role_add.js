angular.module('Tjoys')

.controller('tRoleAdd', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'user';
    $rootScope.SubMenu = 'role-add';

    $scope.tInput = {
        UserName: '',
        Type: 'admin'
    };

    $scope.RoleList = [
        {
            id: 'admin',
            name: '管理员'
        },
        {
            id: 'user',
            name: '普通用户'
        }
    ];


    $scope.addRole = function () {
        if (!$scope.tInput.UserName) {
            widget.msgToast('请输入用户名');
            return;
        }

        if (!$scope.tInput.Type) {
            widget.msgToast('请选择角色');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'setRole',
            data: {
                UserName: $scope.tInput.UserName,
                Type: $scope.tInput.Type
            },
            success: function (res) {
                widget.msgToast('用户设置成功');
                $scope.tInput = {
                    UserName: '',
                    Type: 'admin'
                };
            },
            error: function (err) {
                widget.msgToast('用户设置失败');
            }
        });
    };
});
