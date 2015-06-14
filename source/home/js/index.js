/*
* 首页
* /home/#/index
*/
angular.module('phoneApp')

.controller('HomeIndexCtrl', function (
    $scope, 
    $state,
    $timeout,
    cachePool,
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.DataList = {
        ListLeft: [], 
        ListRight: []
    };

    $scope.currentTab = 1;
    $scope.footerTab = 1;

    $scope.pageIndex = 0;
    $scope.pageIndexLeft = 0;
    $scope.pageIndexRight = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;

    $scope.showLeft = function () {
        $scope.currentTab = 1;
        // $scope.pageIndex = 0;
        $scope.isLoading = false;

        $scope.loadMore();
    };

    $scope.showRight = function () {
        if (cachePool.pull('UserInfo')) {

            $scope.currentTab = 2;
            // $scope.pageIndex = 0;
            $scope.isLoading = false;

            $scope.loadMore();

        } else {

            routerRedirect.toJump({
                url: ['entry/#/login.htm?from='+ currentUrl]
            });

        }
    };


    //--获取幻灯片图片
    widget.ajaxRequest({
        noMask: true,
        url: 'getHomeImage',
        success: function (data) {
            angular.extend($scope.DataList, data);
            $scope.eventSlide = true;
        },
        error: function (data) {
        }
    });

    $scope.loadMore = function () {

        if (!$scope.isLoading) {

            $scope.isLoading = true;

            if ($scope.currentTab == 1) {
                $scope.pageIndexLeft++;
                $scope.pageIndex = $scope.pageIndexLeft;

                //--获取最新列表
                widget.ajaxRequest({
                    isDrop: true,
                    noMask: true,
                    url: 'getHomeArticle',
                    data: {
                        PageIndex: $scope.pageIndex,
                        PageSize: $scope.pageSize
                    },
                    success: function (data) {
                        $scope.pageTotalLeft = data.Total || 0;
                        $scope.pageTotal = $scope.pageTotalLeft;

                        angular.forEach(data.ArticleList, function (v, k) {
                            v.SiteUrl = {
                                'url': ['forum/#/thread-1.htm?from='+ currentUrl]
                            }
                            $scope.DataList.ListLeft.push(v);
                        });

                        $timeout($scope.setFalls, 0);
                        $scope.isLoading = false;
                    },
                    error: function (data) {
                        $scope.isLoading = false;
                    }
                });

            } else {
                $scope.pageIndexRight++;
                $scope.pageIndex = $scope.pageIndexRight;

                //--关注列表
                widget.ajaxRequest({
                    noMask: true,
                    url: 'getHomeFollow',
                    data: {
                        PageIndex: $scope.pageIndex,
                        PageSize: $scope.pageSize
                    },
                    success: function (data) {
                        $scope.pageTotalRight = data.Total || 0;
                        $scope.pageTotal = $scope.pageTotalRight;

                        angular.forEach(data.ArticleList, function (v, k) {
                            v.SiteUrl = {
                                'url': ['forum/#/thread-1.htm?from='+ currentUrl]
                            }
                            $scope.DataList.ListRight.push(v);
                        });

                        $timeout($scope.setFalls, 0);
                        $scope.isLoading = false;
                    },
                    error: function (data) {
                        $scope.isLoading = false;
                    }
                });

            }
        }
    };
    
    $scope.loadMore();

});
