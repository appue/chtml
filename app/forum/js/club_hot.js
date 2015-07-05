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

    $scope.Deploy = {
        isMore: true
    };

    $scope.DataList = {};

    widget.ajaxRequest({
        noMask: true,
        url: 'getHotListClub',
        data: {
            ShowNum: 10
        },
        success: function (data) {
            if (data.ClubList && data.ClubList.length > 0) {
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