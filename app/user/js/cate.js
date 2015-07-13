angular.module('phoneApp')

.controller('tUserCate', function (
	$scope,
	$stateParams,
	widget
) {

	$scope.Deploy = {
        pageIndex: 0,
        pageSize: 5,
        isMore: true,
        isLoading: false
	};

	$scope.loadMore = function () {
        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getUserCategory',
            data: {
            },
            success: function (data) {
                if (data.CategoryList && data.CategoryList.length > 0) {

                    $scope.Deploy.pageTotal = data.Total || 0;
                    $scope.DataList.CategoryList = $scope.DataList.CategoryList.concat(data.CategoryList);
                    $timeout($scope.setFalls, 0);
                    $scope.Deploy.isLoading = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');

                } else {

                    $scope.Deploy.isLoading = true;
                    $scope.Deploy.isMore = false;

                }
            }
        });
	};

	$scope.loadMore();

});