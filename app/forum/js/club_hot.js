// 热门圈子
angular.module('phoneApp')

.controller('tClubHot', function (
    $scope,
    widget
){

    $scope.Page = {
        Title: "圈子HOT",
        Next: "全部圈子",
        SiteUrl: {
            router: "forum.club-list",
            options: {}
        }
    };

    $scope.Deploy = {
        isMore: true
    };

    $scope.DataList = {};

    widget.ajaxRequest({
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