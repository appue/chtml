angular.module('phoneApp')

.controller('tUserClub', function(
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
		ClubList: []
	};

	widget.initUser($scope);

	$scope.loadMore = function() {

		widget.ajaxRequest({
			scope: $scope,
			showPage: true,
			isLogin: true,
			url: 'getUserClub',
			data: {
				UserId: $scope.Deploy.uId
			},
			success: function(data) { //todo...

				if (data.ClubList && data.ClubList.length > 0) {

					angular.forEach(data.ClubList, function(v, k) {
						$scope.DataList.ClubList.push(v);
					});

				}

			}
		});

	};

	if ($scope.Deploy.isLogin) {
		$scope.loadMore();
	}

});