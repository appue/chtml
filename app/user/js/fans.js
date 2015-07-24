angular.module('phoneApp')

.controller('tUserFans', function(
	$scope,
	widget
) {

	$scope.Deploy = {
		pageIndex: 0,
		pageSize: 15,
		isLoading: false,
		isMore: true
	};

	$scope.DataList = {
		FansList: []
	};

	widget.initUser($scope);

	$scope.loadMore = function() {

		widget.ajaxRequest({
			scope: $scope,
			showPage: true,
			isLogin: true,
			url: 'getUserFans',
			data: {
				UserId: $scope.Deploy.uId
			},
			success: function(data) {

				if (data.FansList && data.FansList.length > 0) {

					angular.forEach(data.FansList, function(v, k) {
						$scope.DataList.FansList.push(v);
					});
					$scope.$broadcast('scroll.infiniteScrollComplete');

				} else {

					$scope.Deploy.isMore = false;

				}

			}
		});

	};

	$scope.loadMore();

});