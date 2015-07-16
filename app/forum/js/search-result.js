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
    widget
){
    $scope.Page = {};

    $scope.Deploy = {
        currentTab: 1,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true
    };
    $scope.DataList = {
        ArticleList: []
    };

    $scope.keyword = decodeURIComponent($location.$$search.keyword) || '';

    $scope.Page.Title = "搜索<span class='color_green'>"+ $scope.keyword +"</span>的结果"
    

    $scope.$watch('Deploy.currentTab', function () {
        if ($scope.currentTab == 1) {
            $timeout($scope.setFalls, 0);
        }
    });

    $scope.loadMore = function() {
        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                scope: $scope,
                noMask: true,
                url: 'getSearchContent',
                data: {
                    CateId: $stateParams.id
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;

                    angular.forEach(data.ArticleList, function (v, k) {
                        $scope.DataList.ArticleList.push(v);
                    });

                    $timeout($scope.setFalls, 0);
                    $scope.isLoading = false;
                },
                error: function (data) {
                }
            });
        }
    };

    $scope.loadMore();
});