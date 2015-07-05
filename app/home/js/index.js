/*
* 首页
* /home/#/index
*/
angular.module('phoneApp')

.controller('tHome', function (
    $scope,
    $rootScope,
    $state,
    $timeout,
    $ionicLoading,
    $ionicBackdrop,
    $ionicHistory,
    cachePool,
    widget
){
    var initConfig = {
        init: function  () {
            var self = this;

            $scope.footerTab = 1;
            $scope.DataList = {};

            $scope.Deploy = {
                currentTab: 1
            };

            self.deploy();
        },

        deploy: function () {
            //显示loadding
            $ionicLoading.show({
                template: 'Loading...'
            });

            angular.extend($scope.Deploy, {
                pageIndex: 0,
                pageSize: 5,
                isMore: true,
                isLoading: false
            });

            $scope.DataList.ListLeft = [];
            $scope.DataList.ListRight = [];
        }
    };

    initConfig.init();


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


    $scope.$watch('Deploy.currentTab', function () {

        initConfig.deploy();

        $scope.loadMore();
    });

    $scope.loadMore = function () {

        if (!$scope.Deploy.isLoading) {

            $scope.Deploy.isLoading = true;

            if ($scope.Deploy.currentTab == 1) {
                $scope.Deploy.pageIndex++;

                if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize - $scope.Deploy.pageTotal)>$scope.Deploy.pageSize) {
                    $scope.Deploy.isMore = false;
                    return;
                }

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
                        $scope.Deploy.pageTotal = data.Total || 0;

                        $scope.DataList.ListLeft = $scope.DataList.ListLeft.concat(data.ArticleList);

                        $timeout($scope.setFalls, 0);

                        $scope.Deploy.isLoading = false;

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                        $ionicLoading.hide();
                    },
                    error: function (data) {
                        $scope.Deploy.isLoading = false;
                        $scope.Deploy.isMore = false;
                    }
                });

            } else {
                $scope.Deploy.pageIndex++;

                if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize - $scope.Deploy.pageTotal)>$scope.Deploy.pageSize) {
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
                        $scope.Deploy.pageTotal = data.Total || 0;

                        $scope.DataList.ListRight = $scope.DataList.ListRight.concat(data.ArticleList);

                        $timeout($scope.setFalls, 0);

                        $scope.Deploy.isLoading = false;

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                        $ionicLoading.hide();
                    },
                    error: function (data) {
                        $scope.Deploy.isLoading = false;
                        $scope.Deploy.isMore = false;
                    }
                });

            }
        }
    };
    
    $scope.loadMore();
});
