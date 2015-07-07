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

    $scope.Deploy = {
        cateId: $stateParams.id,
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

    $scope.loadCate = function (type) {
        widget.ajaxRequest({
            noMask: true,
            url: 'getListCategory',
            data: {
                CateId: $scope.Deploy.cateId
            },
            success: function (data) {
                if (type && type == "refresh") {
                    $scope.DataList.CurrentCate = "";
                    $scope.DataList.CategoryList = "";
                }

                if (data.CategoryList.length % 3 == 0) {
                    $scope.Deploy.cateClass = "forum_cate_three_list";
                }

                $scope.DataList.CurrentCate = data.CurrentCate;
                $scope.DataList.CategoryList = data.CategoryList;

                $ionicNavBarDelegate.title($scope.DataList.CurrentCate.CateName);
            }
        });
    };

    $scope.loadMore = function(type) {
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
                    CateId: $scope.Deploy.cateId,
                    PageSize: $scope.Deploy.pageSize,
                    PageIndex: $scope.Deploy.pageIndex
                },
                success: function (data) {
                    if (data.ArticleList && data.ArticleList.length > 0) {

                        if (type && type == "refresh") {
                            $scope.DataList.ArticleList = [];
                        }
                        $scope.Deploy.pageTotal = data.Total || 0;
                        $scope.DataList.ArticleList = $scope.DataList.ArticleList.concat(data.ArticleList);
                        $timeout($scope.setFalls, 0);
                        $scope.Deploy.isLoading = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    } else {

                        $scope.Deploy.isLoading = true;
                        $scope.Deploy.isMore = false;

                    }
                },
                error: function (data) {
                }
            });
        }
    };

    $scope.refreshView = function (id) {
        angular.extend($scope.Deploy, {
            cateId: id,
            currentTab: 1,
            pageIndex: 0,
            isLoading: false,
            isMore: true,
            pageTotal: 0
        });

        $scope.DataList = {
            ArticleList: []
        };

        $scope.loadCate("refresh");
        $scope.loadMore("refresh");
    };

    $scope.loadCate();
    $scope.loadMore();
});