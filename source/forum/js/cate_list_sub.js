/*
* 发现-二级栏目-列表
* /clump/#/cate/list-sub-{id}.html
*/
angular.module('phoneApp')

.controller('tCateListSub', function (
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
    $scope.DataList = {
        ArticleList: []
    };


    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/cate/list-'+ $stateParams.id +'.htm']
    };

    $scope.$watch('currentTab', function () {
        if ($scope.currentTab == 1) {
            $timeout($scope.$parent.setFalls, 0);
        }
    });

    widget.ajaxRequest({
        noMask: true,
        url: 'getListCategory',
        data: {
            CateId: $stateParams.id,
            CateType: 1
        },
        success: function (data) {
            var res = {};

            res.CategoryList = data.CategoryList || [];

            angular.forEach(res.CategoryList, function (v, k) {
                v.SiteUrl = {
                    'url': ['forum/#/cate/list-last-'+ v.CateId +'.htm?title='+ encodeURIComponent +'&from='+ currentUrl]
                };
            });

            angular.extend($scope.DataList, res);
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