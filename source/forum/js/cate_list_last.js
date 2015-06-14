/*
* 发现-三级栏目-列表
* /clump/#/cate/list-last-{id}.html
*/
angular.module('phoneApp')

.controller('tCateListLast', function (
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

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/cate/list-sub-'+ $stateParams.id +'.htm']
    };

    $scope.DataList = {
        ArticleList: []
    };

    //--设置横向滚动
    $scope.$parent.myScrollOptions = { 'wrapper': {} };


    widget.ajaxRequest({
        noMask: true,
        url: 'getListCategory',
        data: {
            CateId: $stateParams.id,
            CateType: 1
        },
        success: function (data) {
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