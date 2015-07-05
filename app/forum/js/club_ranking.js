// 圈子成员排行榜
angular.module('phoneApp')

.controller('tClubRanking', function (
    $scope, 
    $state, 
    $stateParams,
    $ionicLoading,
    widget
){
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.Deploy = {
        isMore: true
    };
    
    $scope.DataList = {};

    widget.ajaxRequest({
        noMask: true,
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

            $ionicLoading.hide();
        },
        error: function (data) {
            $ionicLoading.hide();
        }
    });

});