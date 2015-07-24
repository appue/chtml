// 热门圈子
angular.module('phoneApp')

.controller('tClubHot', function (
    $state,
    $scope,
    widget
){

    $scope.goNext = function () {
        // SiteUrl: {
        //     router: "forum.club-list"
        // }

        $state.go("forum.club-list");
    };

    $scope.Deploy = {
        isMore: true
    };

    $scope.DataList = {};

    widget.ajaxRequest({
        scope: $scope,
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
        }
    });

});