/*
 * 搜索结果
 * /search/#/result
 */
angular.module('phoneApp')

.controller('tSearchResult', function(
    $scope,
    $state,
    $stateParams,
    $location,
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

    $scope.keyword = $location.$$search.keyword || '';

    function updateData(dataList, listName) {

        if ($scope.Deploy.pageIndex == 1) {
            $scope.DataList[listName] = [];
        }
        
        if (dataList && dataList.length > 0) {

            angular.forEach(dataList, function(v, k) {
                $scope.DataList[listName].push(v);
            });
            $scope.Deploy.isLoading = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');

        } else {

            $scope.Deploy.isLoading = true;
            $scope.Deploy.isMore = false;

        }
    }

    $scope.loadMore = function(type) {

        if (type === 1 || type === 2) {
            $scope.Deploy.pageSize = 5;
        } else {
            $scope.Deploy.pageSize = 20;
        }

        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getSearchContent',
            data: {
                Type: type,
                Keyword: $stateParams.keyword
            },
            success: function(data) {

                $scope.Deploy.pageTotal = data.Total || 0;

                switch (type) {
                    case 1:
                        updateData(data.ArticleList, 'ArticleList');
                        $scope.setFalls('ArticleList');
                        break;

                    case 2:
                        updateData(data.CategoryList, 'CategoryList');
                        $scope.setFalls('CategoryList');
                        break;

                    case 3:
                        updateData(data.ClubList, 'ClubList');
                        break;

                    case 4:
                        updateData(data.UserList, 'UserList');
                        break;
                }

            }
        });

    };

    $scope.$watch('Deploy.currentTab', function() {
        $scope.Deploy.isLoading = false;
        $scope.Deploy.isMore = true;
        $scope.Deploy.pageIndex = 0;
        $scope.loadMore($scope.Deploy.currentTab);
    });

});