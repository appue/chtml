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
) {

    $scope.Deploy = {
        currentTab: 1,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true
    };

    $scope.DataList = {
        ArticleList: [],
        CategoryList: [],
        ClubList: [],
        UserList: []
    };

    $scope.keyword = decodeURIComponent($location.$$search.keyword) || '';

    $scope.$watch('Deploy.currentTab', function () {

        $scope.Deploy.isMore = true;

        if ($scope.Deploy.currentTab == 1 && $scope.DataList.ArticleList.length > 0) {
            $timeout($scope.setFalls, 0);
            return;
        }

        if ($scope.Deploy.currentTab == 2 && $scope.DataList.CategoryList.length > 0) {
            $timeout($scope.setFalls, 0);
            return;
        }

        if ($scope.Deploy.currentTab == 3 && $scope.DataList.ClubList.length > 0) {
            return;
        }

        if ($scope.Deploy.currentTab == 4 && $scope.DataList.UserList.length > 0) {
            return;
        }

        $scope.Deploy.isMore = false;

    });

    $scope.loadMore = function (type) {

        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                scope: $scope,
                showPage: true,
                url: 'getSearchContent',
                data: {
                    Type: type,
                    Keyword: $stateParams.keyword
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0; //todo...是否需要翻页？

                    angular.forEach(data.ArticleList, function (v, k) { //搜索的帖子结果
                        $scope.DataList.ArticleList.push(v);
                    });

                    angular.forEach(data.CategoryList, function (v, k) { //搜索的栏目结果
                        $scope.DataList.CategoryList.push(v);
                    });

                    angular.forEach(data.ClubList, function (v, k) { //搜索的圈子结果
                        $scope.DataList.ClubList.push(v);
                    });

                    angular.forEach(data.UserList, function (v, k) { //搜索的用户结果
                        $scope.DataList.UserList.push(v);
                    });

                    if (type === 1 || type === 2) {
                        $timeout($scope.setFalls, 0);
                    }

                    $scope.isLoading = false;
                }
            });
        }
    };

    $scope.loadMore(1);

});