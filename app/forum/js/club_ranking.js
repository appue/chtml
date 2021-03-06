// 圈子成员排行榜
angular.module('phoneApp')

.controller('tClubRanking', function (
    $scope, 
    $state, 
    $stateParams,
    widget
){  

    $scope.Deploy = {
        isMore: true
    };
    
    $scope.DataList = {};

    widget.ajaxRequest({
        scope: $scope,
        url: 'getClubHotUser',
        data: {
            ClubId: $stateParams.id
        },
        success: function (data) {
            if (data.UserList && data.UserList.length > 0) {
                angular.extend($scope.DataList, data);
            } else {
                $scope.Deploy.isMore = false;
            }
        }
    });

});