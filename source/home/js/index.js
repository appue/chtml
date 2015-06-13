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
        ArticleList: []
    };

    $scope.currentTab = 1;
    $scope.footerTab = 1;

    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;


    $scope.checkLogin = function () {
        if (cachePool.pull('UserInfo')) {

            $scope.currentTab = 2;
            $scope.pageIndex = 1;
            $scope.isLoading = false;

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
            $scope.eventSlide = data.ImageList.length;
        },
        error: function (data) {
        }
    });

    $scope.loadMore = function (currentTab) {

        if (!$scope.isLoading) {

            $scope.pageIndex++;
            $scope.isLoading = true;

            switch (currentTab) {
                case 1:
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
                            $scope.pageTotal = data.Total || 0;
                            $scope.isLoading = false;

                            angular.forEach(data.ArticleList, function (v, k) {
                                v.SiteUrl = {
                                    'url': ['forum/#/thread-1.htm?from='+ currentUrl]
                                }
                                $scope.DataList.ArticleList.push(v);
                            });

                            $timeout($scope.setFalls, 0);
                        },
                        error: function (data) {
                        }
                    });
                break;

                case 2:
                    //--关注列表
                    widget.ajaxRequest({
                        noMask: true,
                        url: 'getHomeFollow',
                        data: {
                            PageIndex: $scope.pageIndex,
                            PageSize: $scope.pageSize
                        },
                        success: function (data) {
                            console.log('2success');
                            $scope.isLoading = false;
                        },
                        error: function (data) {
                            console.log('2error');
                            $scope.isLoading = false;
                        }
                    });
                break;
            }
        }
    };
    
    $scope.loadMore(1);

});
