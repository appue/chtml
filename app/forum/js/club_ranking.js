/*
* 发现-猜你喜欢
* /clump/#/club/ranking-{id}.html
*/
angular.module('phoneApp')

.controller('tClubRanking', function (
    $scope, 
    $state, 
    $stateParams,
    widget
){
    $scope.DataList = {};

    //--设置返回按钮
    $scope.backParam = {
        'url': ['#/forum/club/detail-'+ $stateParams.id +'.htm']
    };

    widget.ajaxRequest({
        noMask: true,
        url: 'getClubHotUser',
        data: {
            ClubId: $stateParams.id
        },
        success: function (data) {
            angular.forEach(data.UserList, function (v, k) {
                v.SiteUrl = '#/member/personal-'+ v.UserId +'.htm';
            });

            angular.extend($scope.DataList, data);
        }
    });

});