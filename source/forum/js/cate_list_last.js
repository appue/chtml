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