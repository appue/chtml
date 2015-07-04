//发现-猜你喜欢
angular.module('phoneApp')

.controller('tFindLike', function (
    $scope,
    $timeout,
    $ionicLoading,
    widget
){
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    //--设置返回按钮
    // $scope.backParam = { 'route': '#/forum/clump/find.htm' };

    $scope.DataList = {};

    widget.ajaxRequest({
        noMask: true,
        url: 'getFindLike',
        data: {},
        success: function (data) {
            angular.extend($scope.DataList, data);

            $timeout($scope.setFalls, 0);

            $ionicLoading.hide();
        },
        error: function (data) {
            $ionicLoading.hide();
        }
    });
});