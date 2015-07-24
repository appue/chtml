angular.module('phoneApp')

.controller('tUserAttention', function(
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
		FollowList: []
	};

	widget.initUser($scope);

	$scope.loadMore = function() {

		widget.ajaxRequest({
			scope: $scope,
			showPage: true,
			isLogin: true,
			url: 'getUserFollow',
			data: {
				UserId: $scope.Deploy.uId
			},
			success: function(data) {

				if (data.FollowList && data.FollowList.length > 0) {

					angular.forEach(data.FollowList, function(v, k) {
						$scope.DataList.FollowList.push(v);
					});

				}

			}
		});

	};

	if ($scope.Deploy.isLogin) {
		$scope.loadMore();
	}

});