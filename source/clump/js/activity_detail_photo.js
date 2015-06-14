/*
* 发现-活动-晒图活动页
* /clump/#/activity/detail/photo.html
*/
angular.module('phoneApp')

.controller('tActivityDetailPhoto', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $timeout,
    routerRedirect,
    widget,
    ENV
){
    if (ENV.isApple) {
        $scope.appStyle = {
            'padding-top': '64px'
        }
    } else {
        $scope.appStyle = {
            'padding-top': '44px'
        }
    }

    var currentUrl = widget.getCurrentUrl();

    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;
    $scope.DataList = {
        ArticleList: []
    };

    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/activity/list.htm']
    };

    widget.ajaxRequest({
        noMask: true,
        url: 'getPhotoActivityInfo',
        data: {
            ActivityId: $stateParams.id,
        },
        success: function (data) {
            angular.extend($scope.DataList, data);
        }
    });

    $scope.loadMore = function () {
        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                noMask: true,
                url: 'getListArticle',
                data: {
                    ActivityId: $stateParams.id,
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;

                    angular.forEach(data.ArticleList, function (v, k) {
                        v.SiteUrl = {
                            'url': ['forum/#/thread-'+ v.ArticleId +'.htm?from='+ currentUrl]
                        };

                        $scope.DataList.ArticleList.push(v);
                    });

                    $timeout($scope.setFalls, 0);
                    $scope.isLoading = false;
                }
            });
        }
    };

    $scope.loadMore();



});