/*
* 发现-猜你喜欢
* /clump/#/club/ranking-{id}.html
*/
angular.module('phoneApp')

.controller('tClubRanking', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();
    
    $scope.DataList = {};

    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/club/detail-'+ $stateParams.id +'.htm']
    };

    widget.ajaxRequest({
        noMask: true,
        url: 'getClubHotUser',
        data: {
            ClubId: 1
        },
        success: function (data) {
            angular.forEach(data.UserList, function (v, k) {
                v.SiteUrl = {
                    'url': ['member/#/personal-'+ v.UserId +'.htm?from='+ currentUrl]
                };
            });

            angular.extend($scope.DataList, data);
        }
    });

});