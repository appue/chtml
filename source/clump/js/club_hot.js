/*
* 热门圈子
* /clump/#/club/hot.htm
*/
angular.module('phoneApp')

.controller('tClubHot', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

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
                v.SiteUrl = {
                    'url': ['/clump/#/club/detail-'+ v.ClubId +'.htm?from='+ currentUrl]
                };
            });
            angular.extend($scope.DataList, data);
        },
        error: function (data) {
        }
    });

});