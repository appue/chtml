/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tCateList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $timeout,
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.headerTitle = $location.$$search.title || "";

    $scope.currentTab = 1;
    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;
    $scope.showHeader = true;
    $scope.cateClass = "unit_find_cate_two";
    $scope.DataList = {
        ArticleList: []
    };
    
    //--设置返回按钮
    $scope.backParam = { 'url': ['clump/#/find.htm'] };

    $scope.$watch('currentTab', function () {
        if ($scope.currentTab == 1) {
            $timeout($scope.$parent.setFalls, 0);
        }
    });

    widget.ajaxRequest({
        noMask: true,
        url: 'getListCategory',
        data: {
        },
        success: function (data) {
            if (data.CategoryList.length % 3 == 0) {
                $scope.cateClass = "unit_find_cate_three";
            }

            angular.forEach(data.CategoryList, function (v, k) {
                v.SiteUrl = {
                    'url': ['forum/#/cate/list-'+ v.CateId +'.htm']
                };
            });

            angular.extend($scope.DataList, data);
        }
    });

    $scope.loadMore = function() {
        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                noMask: true,
                url: 'getListArticle',
                data: {
                    CateId: $stateParams.id
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