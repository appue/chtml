angular.module('Tjoys')

.controller('tClub', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'club';

    $scope.DataList = {};

    $scope.loadMore = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getClubList',
            data: {},
            success: function (res) {
                $scope.DataList = res;
            },
            error: function (err) {
                widget.msgToast('失败');
            }
        });
    };

    $scope.loadMore();
});
