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
					$scope.DataList.FansList = $scope.DataList.FansList.concat(data.FansList);
				}

			}
		});

	};

	if ($scope.Deploy.isLogin) {
		$scope.loadMore();
	}

});