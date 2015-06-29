// 圈子成员排行榜
angular.module('phoneApp')

.controller('tClubRanking', function (
    $scope, 
    $state, 
    $stateParams,
    widget
){
    $scope.DataList = {};

    widget.ajaxRequest({
        noMask: true,
        url: 'getClubHotUser',
        data: {
            ClubId: $stateParams.id
        },
        success: function (data) {
            // angular.forEach(data.UserList, function (v, k) {
            //     v.SiteUrl = '#/member/personal-'+ v.UserId +'.htm';
            // });

            angular.extend($scope.DataList, data);
        }
    });

});