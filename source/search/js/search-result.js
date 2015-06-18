/*
* 搜索结果
* /search/#/result
*/
angular.module('phoneApp')

.controller('tSearchResult', function (
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
    $scope.DataList = {
        ArticleList: []
    };

    $scope.keyword = $location.$$search.keyword || '';

    //--设置返回
    $scope.backParam = { 'url': ['search/#/index'] };

    $scope.$watch('currentTab', function () {
        if ($scope.currentTab == 1) {
            $timeout($scope.setFalls, 0);
        }
    });

    $scope.loadMore = function() {
        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                noMask: true,
                url: 'getSearchContent',
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