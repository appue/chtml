/*
* 发现-活动-晒图活动页
* /clump/#/activity/detail/photo-{id}.htm
*/
angular.module('phoneApp')

.controller('tActivityDetail', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $timeout,
    $ionicLoading,
    widget
){

    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.Deploy = {
        isType: $stateParams.type == "photo" ? true : false,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true
    };
    $scope.DataList = {
        ArticleList: []
    };

    if ($stateParams.type == "photo") {

        //--获取活动的基本信息
        widget.ajaxRequest({
            noMask: true,
            url: 'getActivityInfo',
            data: {
                ActivityId: $stateParams.id,
            },
            success: function (data) {
                angular.extend($scope.DataList, data);
            }
        });


        //--获取活动的帖子列表
        $scope.loadMore = function () {
            if (!$scope.Deploy.isLoading) {

                $scope.Deploy.isLoading = true;
                $scope.Deploy.pageIndex++;

                if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize - $scope.Deploy.pageTotal)>$scope.Deploy.pageSize) {
                    $scope.Deploy.isMore = false;
                    return;
                }

                widget.ajaxRequest({
                    noMask: true,
                    url: 'getListArticle',
                    data: {
                        ActivityId: $stateParams.id,
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

                        $ionicLoading.hide();
                    },
                    error: function (data) {
                        $ionicLoading.hide();
                    }
                });
            }
        };


        $scope.$on('$stateChangeSuccess', function() {
            $scope.loadMore();
        });
    } else {

        //--获取帖子内容
        widget.ajaxRequest({
            noMask: true,
            url: 'getContentArticle',
            data: {
                ArticleId: $stateParams.id
            },
            success: function (data) {
                // angular.forEach(data.ArticleList, function (v, k) {
                //     v.SiteUrl = {
                //         'url': ['forum/#/thread-'+ v.ArticleId +'.htm?from='+ currentUrl]
                //     }
                // });

                angular.extend($scope.DataList, data);

                // if (userInfo.UserId == data.Author.UserId) {
                //     $scope.isOwner = true;  
                // } else {
                //     $scope.isOwner = false;
                // }

                $ionicLoading.hide();
            },
            error: function (data) {
                $ionicLoading.hide();
            }
        });
    
    }

});