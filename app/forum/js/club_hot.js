/*
* 热门圈子
* #/forum/club/hot.htm
*/
angular.module('phoneApp')

.controller('tClubHot', function (
    $scope,
    $state,
    widget
){

    //--查看全部圈子
    $scope.redirectUrl = {
        Club: {
            'url': ['clump/#/club/list.htm']
        }
    };

    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/find.htm']
    };

    $scope.DataList = {};

    widget.ajaxRequest({
        noMask: true,
        url: 'getHotListClub',
        data: {
            ShowNum: 10
        },
        success: function (data) {
            angular.forEach(data.ClubList, function (v, k) {
                v.SiteUrl = '#/forum/club/detail-'+ v.ClubId +'.htm';
            });
            angular.extend($scope.DataList, data);
        },
        error: function (data) {
        }
    });

});