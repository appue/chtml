angular.module('Tjoys')

.controller('tRole', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'user';
    $rootScope.SubMenu = 'role';

    $scope.loadMore = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getAdminList',
            success: function (res) {
                $scope.DataList = res;
            }
        });
    };

    $scope.loadMore();

    $scope.delRole = function (id) {
        if (!id) {
            widget.msgToast('你没有选择用户');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'setRole',
            data: {
                UserId: id,
                Type: 'user'
            },
            success: function (res) {
                widget.msgToast('删除管理员成功');
                $scope.loadMore();
            }
        });
    };
});
