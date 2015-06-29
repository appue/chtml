// 热门圈子
angular.module('phoneApp')

.controller('tClubHot', function (
    $scope,
    widget
){

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