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

    $scope.currentTab = 1;
    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;
    $scope.showHeader = true;

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/cate/list-1.htm']
    };

    $scope.DataList = {
        ArticleList: []
    };

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
                    'url': ['forum/#/cate/list-last-'+ v.CateId +'.htm?from='+ currentUrl]
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
                },
                success: function (data) {
                    var res = data;

                    $scope.isLoading = false;
                    $scope.pageTotal = data.Total || 0;

                    angular.forEach(res.ArticleList, function (v, k) {
                        v.SiteUrl = {
                            'url': ['forum/#/thread-'+ v.ArticleId +'.htm?from='+ currentUrl]
                        };

                        $scope.DataList.ArticleList.push(v);
                    });

                    $timeout($scope.setFalls, 0);
                }
            });
        }
    };

    $scope.loadMore();

});