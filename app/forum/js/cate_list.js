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
        isMore: true,
        cateClass: "forum_cate_two_list"
    };
    $scope.DataList = {
        ArticleList: []
    };

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
                $scope.Deploy.cateClass = "forum_cate_three_list";
            }

            // angular.forEach(data.CategoryList, function (v, k) {
            //     v.SiteUrl = '#/forum/cate/list-'+ v.CateId +'.htm';
            // });

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
                }
            });
        }
    };


    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });
});