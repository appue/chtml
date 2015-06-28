/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tCateList', function (
    $scope,
    $stateParams,
    $timeout,
    $ionicNavBarDelegate,
    widget
){
    // $scope.headerTitle = $location.$$search.title || "";

    $scope.Deploy = {
        currentTab: 1,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        showHeader: true,
        isMore: true
    };
    $scope.DataList = {
        ArticleList: []
    };

    $scope.cateClass = "forum_cate_two_list";

    $scope.$watch('Deploy.currentTab', function () {
        if ($scope.Deploy.currentTab == 1) {
            $timeout($scope.setFalls, 0);
        }
    });

    widget.ajaxRequest({
        noMask: true,
        url: 'getListCategory',
        data: {
        },
        success: function (data) {
            if (data.CategoryList.length % 3 == 0) {
                $scope.cateClass = "forum_cate_three_list";
            }

            angular.forEach(data.CategoryList, function (v, k) {
                v.SiteUrl = '#/forum/cate/list-'+ v.CateId +'.htm';
            });

            angular.extend($scope.DataList, data);

            $ionicNavBarDelegate.title($scope.DataList.CurrentCate.CateName);
        }
    });

    $scope.loadMore = function() {
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
                    CateId: $stateParams.id
                },
                success: function (data) {
                    $scope.Deploy.pageTotal = data.Total || 0;

                    angular.forEach(data.ArticleList, function (v, k) {
                        v.SiteUrl = '#/forum/thread-'+ v.ArticleId +'.htm';

                        $scope.DataList.ArticleList.push(v);
                    });

                    $timeout($scope.setFalls, 0);

                    $scope.Deploy.isLoading = false;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        }
    };


    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
});