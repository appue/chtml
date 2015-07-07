/*
* 发现首页
* /clump/#/club/detail-{id}.html
*/
angular.module('phoneApp')

.controller('tClubDetail', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $timeout,
    widget
){
    
    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true
    };
    
    //--设置返回按钮
    // $scope.backParam = {
    //     'url': ['clump/#/club/list.htm']
    // };

    $scope.redirectUrl = {
        Ranking: "#/forum/club/ranking-"+ $stateParams.id +".htm",
    };

    $scope.DataList = {
        ArticleList: []
    };

    widget.ajaxRequest({
        noMask: true,
        url: 'getContentClub',
        data: {
            ClubId: $stateParams.id
        },
        success: function (data) {
            if (data.ActivityList && data.ActivityList.ActivityId) {
                var id = data.ActivityList.ActivityId,
                    type = data.ActivityList.ActivityType == 1 ? "article" : "photo";

                data.ActivityList.SiteUrl = "#/forum/activity/detail-"+ type +"-"+ id +".htm";
            }

            angular.extend($scope.DataList, data);
        },
        error: function (data) {
        }
    });

    $scope.loadMore = function () {
        if (!$scope.Deploy.isLoading) {

            $scope.Deploy.isLoading = true;
            $scope.Deploy.pageIndex++;

            if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize - $scope.Deploy.pageTotal)>$scope.Deploy.pageSize) {
                $scope.Deploy.isMore = false;
                return;
            }

            //--获取最新列表
            widget.ajaxRequest({
                isDrop: true,
                noMask: true,
                url: 'getListArticle',
                data: {
                    ClubId: $stateParams.id,
                    PageIndex: $scope.Deploy.pageIndex,
                    PageSize: $scope.Deploy.pageSize
                },
                success: function (data) {
                    if (data.ArticleList && data.ArticleList.length > 0) {

                        $scope.Deploy.pageTotal = data.Total || 0;
                        $scope.DataList.ArticleList = $scope.DataList.ArticleList.concat(data.ArticleList);
                        $timeout($scope.setFalls, 0);
                        $scope.Deploy.isLoading = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    } else {

                        $scope.Deploy.isLoading = true;
                        $scope.Deploy.isMore = false;

                    }
                },
                error: function (data) {
                    $scope.Deploy.isLoading = false;
                }
            });

        }

    };


    $scope.loadMore();
});