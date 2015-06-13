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
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;
    
    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/club/list.htm']
    };

    $scope.redirectUrl = {
        Ranking: {
            'url': ['clump/#/club/ranking-'+ $stateParams.id +'.htm']
        }
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
                var type = (data.ActivityList.ActivityType == 1) ? 'article' : 'photo';

               data.ActivityList.SiteUrl = {
                    'url': ['clump/#/activity/detail/'+ type +'-'+ data.ActivityList.ActivityId +'.htm?from='+ currentUrl]
                }
            }

            angular.forEach(data.ArticleTop, function (v, k) {
                v.SiteUrl = {
                    'url': ['forum/#/thread-'+ v.ArticleId +'.htm?from='+ currentUrl]
                };
            });

            angular.extend($scope.DataList, data);

            //--设置滚动
            $scope.$parent.myScrollOptions = { 'wrapper': {} };
            $scope.eventScroll = "wrapper";
        }
    });

    $scope.loadMore = function () {

        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            //--获取最新列表
            widget.ajaxRequest({
                isDrop: true,
                noMask: true,
                url: 'getListArticle',
                data: {
                    ClubId: $stateParams.id,
                    PageIndex: $scope.pageIndex,
                    PageSize: $scope.pageSize
                },
                success: function (data) {
                    var res = {};

                    $scope.pageTotal = data.Total || 0;

                    res.ArticleList = data.ArticleList || [];

                    angular.forEach(res.ArticleList, function (v, k) {
                        v.SiteUrl = {
                            'url': ['forum/#/thread-'+ v.ArticleId +'.htm?from='+ currentUrl]
                        };

                        $scope.DataList.ArticleList.push(v);
                    });
                    
                    $timeout($scope.setFalls, 0);
                    // $scope.isLoading = false;
                },
                error: function (data) {
                }
            });

        }

    };

    $scope.loadMore();
});