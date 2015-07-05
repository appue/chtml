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
    $ionicLoading,
    widget
){
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

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
                    
                    $ionicLoading.hide();
                },
                error: function (data) {
                    $ionicLoading.hide();
                }
            });
        }
    };

    $scope.loadMore();
});