// 首页
angular.module('phoneApp')

.controller('tDefault', function (
    $scope,
    $rootScope,
    $state,
    $ionicBackdrop,
    $ionicHistory,
    cachePool,
    widget
){

    widget.clearHistory();
    widget.showStatusBar();

    var initConfig = {
        init: function  () {
            var self = this;

            $scope.footerTab = 1;
            $scope.DataList = {};

            $scope.Deploy = {
                isLogin: false,
                currentTab: 1
            };

            widget.initUser($scope);

            self.deploy();
        },

        deploy: function () {
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
        scope: $scope,
        url: 'getHomeImage',
        success: function (data) {
            angular.extend($scope.DataList, data);
        }
    });


    // $scope.$watch('Deploy.currentTab', function () {
    //     initConfig.deploy();

    //     $scope.loadMore();
    // });
    $scope.updateData = function (tab) {
        if (tab == 2) {
            if (!$scope.Deploy.isLogin) {
                $scope.showLogin();
                return;
            }
            $scope.Deploy.currentTab = 2;
        } else {
            $scope.Deploy.currentTab = 1;
        }
        
        initConfig.deploy();

        $scope.loadMore();
    };


    $scope.loadMore = function () {
        if ($scope.Deploy.currentTab == 1) {
            //--获取最新列表
            widget.ajaxRequest({
                scope: $scope,
                showPage: true,
                url: 'getHomeArticle',
                data: {
                },
                success: function (data) {
                    if (data.ArticleList && data.ArticleList.length > 0) {

                        // $scope.Deploy.pageTotal = data.Total || 0;
                        $scope.DataList.ListLeft = $scope.DataList.ListLeft.concat(data.ArticleList);
                        $scope.setFalls();
                    //     $scope.Deploy.isLoading = false;
                    //     $scope.$broadcast('scroll.infiniteScrollComplete');

                    // } else {

                    //     $scope.Deploy.isLoading = true;
                    //     $scope.Deploy.isMore = false;

                    }
                }
            });

        } else {
            //--关注列表
            widget.ajaxRequest({
                scope: $scope,
                showPage: true,
                url: 'getHomeFollow',
                data: {
                },
                success: function (data) {
                    if (data.ArticleList && data.ArticleList.length > 0) {
                        
                        // $scope.Deploy.pageTotal = data.Total || 0;
                        $scope.DataList.ListRight = $scope.DataList.ListRight.concat(data.ArticleList);
                        $scope.setFalls();
                    //     $scope.Deploy.isLoading = false;
                    //     $scope.$broadcast('scroll.infiniteScrollComplete');

                    // } else {

                    //     $scope.Deploy.isLoading = true;
                    //     $scope.Deploy.isMore = false;

                    }

                }
            });

        }
    };
    
    $scope.loadMore();
});
