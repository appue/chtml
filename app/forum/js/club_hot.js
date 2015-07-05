// 热门圈子
angular.module('phoneApp')

.controller('tClubHot', function (
    $scope,
    $ionicLoading,
    widget
){
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.DataList = {};

    widget.ajaxRequest({
        noMask: true,
        url: 'getHotListClub',
        data: {
            ShowNum: 10
        },
        success: function (data) {
            angular.extend($scope.DataList, data);
        },
        error: function (data) {
        }
    });

});