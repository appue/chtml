/*
* 首页
* /home/#/index
*/
angular.module('phoneApp')

.controller('tHome', function (
    $scope, 
    $state,
    $timeout,
    $ionicLoading,
    $ionicBackdrop,
    $ionicHistory,
    cachePool,
    widget
){

    $scope.footerTab = 1;

    $scope.Deploy = {
        currentTab: 1,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false
    };
    $scope.DataList = {
        ListLeft: [], 
        ListRight: []
    };
    
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });


    //$ionicBackdrop.retain();

    //--获取幻灯片图片
    widget.ajaxRequest({
        noMask: true,
        url: 'getHomeImage',
        success: function (data) {
            angular.extend($scope.DataList, data);

            $ionicLoading.hide();
        },
        error: function (data) {
            $ionicLoading.hide();
        }
    });


    $scope.Deploy.showLeft = function () {
        $scope.Deploy.currentTab = 1;
        // $scope.pageIndex = 0;

        if ($scope.Deploy.pageIndexLeft * $scope.Deploy.pageSize >= $scope.Deploy.pageTotalLeft) {
            $scope.Deploy.isLoading = true;

            $timeout(function () {
                $scope.setFalls('.mod_list_falls');
            }, 0);
            return;
        }
                
        $scope.Deploy.isLoading = false;

        $scope.loadMore();
    };

    $scope.Deploy.showRight = function () {
        if (cachePool.pull('UserInfo')) {

            $scope.Deploy.currentTab = 2;
            // $scope.pageIndex = 0;

            if ($scope.Deploy.pageIndexRight * $scope.Deploy.pageSize >= $scope.Deploy.pageTotalRight) {
                $scope.Deploy.isLoading = true;
                $timeout(function () {
                    $scope.setFalls('.mod_list_falls');
                }, 0);
                return;
            }

            $scope.Deploy.isLoading = false;
            $scope.loadMore();

        } else {

            // routerRedirect.toJump({
            //     url: ['entry/#/login.htm?from='+ currentUrl]
            // });

        }
    };

    $scope.loadMore = function () {

        if (!$scope.Deploy.isLoading) {

            $scope.Deploy.isLoading = true;

            if ($scope.Deploy.currentTab == 1) {
                $scope.Deploy.pageIndexLeft++;
                $scope.Deploy.pageIndex = $scope.Deploy.pageIndexLeft;

                // if ($scope.Deploy.pageTotalLeft && ($scope.Deploy.pageIndexLeft * $scope.Deploy.pageSize - $scope.Deploy.pageTotalLeft)>$scope.Deploy.pageSize) {
                //     $scope.Deploy.isMore = false;
                //     return;
                // }

                //--获取最新列表
                widget.ajaxRequest({
                    isDrop: true,
                    noMask: true,
                    url: 'getHomeArticle',
                    data: {
                        PageIndex: $scope.Deploy.pageIndex,
                        PageSize: $scope.Deploy.pageSize
                    },
                    success: function (data) {
                        $scope.Deploy.pageTotalLeft = data.Total || 0;
                        $scope.Deploy.pageTotal = $scope.Deploy.pageTotalLeft;

                        $scope.DataList.ListLeft = $scope.DataList.ListLeft.concat(data.ArticleList);

                        $timeout($scope.setFalls, 0);

                        $scope.Deploy.isLoading = false;

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },
                    error: function (data) {
                        $scope.Deploy.isLoading = false;
                        $scope.Deploy.isMore = false;
                    }
                });

            } else {
                $scope.Deploy.pageIndexRight++;
                $scope.Deploy.pageIndex = $scope.Deploy.pageIndexRight;

                if ($scope.Deploy.pageTotalRight && ($scope.Deploy.pageIndexRight * $scope.Deploy.pageSize - $scope.Deploy.pageTotalRight)>$scope.Deploy.pageSize) {
                    $scope.Deploy.isMore = false;
                    return;
                }

                //--关注列表
                widget.ajaxRequest({
                    noMask: true,
                    url: 'getHomeFollow',
                    data: {
                        PageIndex: $scope.Deploy.pageIndex,
                        PageSize: $scope.Deploy.pageSize
                    },
                    success: function (data) {
                        $scope.Deploy.pageTotalRight = data.Total || 0;
                        $scope.Deploy.pageTotal = $scope.Deploy.pageTotalRight;

                        $scope.DataList.ListRight = $scope.DataList.ListRight.concat(data.ArticleList);

                        $timeout($scope.setFalls, 0);

                        $scope.Deploy.isLoading = false;

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },
                    error: function (data) {
                        $scope.Deploy.isLoading = false;
                        $scope.Deploy.isMore = false;
                    }
                });

            }
        }
    };
    
    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
});
