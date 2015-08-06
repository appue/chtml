angular.module('phoneApp')

.controller('tUserClub', function(
    $scope,
    $stateParams,
    $timeout,
    widget
) {

	$scope.Deploy = {
		pageIndex: 0,
		pageSize: 15,
		isLoading: false,
		isMore: true,

        UserId: $stateParams.uid
	};

	$scope.DataList = {
		ClubList: []
	};

	widget.initUser($scope);

	widget.ajaxRequest({
		scope: $scope,
		showPage: true,
		isLogin: true,
		url: 'getUserClub',
		data: {
			UserId: $scope.Deploy.UserId
		},
        success: function (data) {
            if (data.ClubList && data.ClubList.length > 0) {
                var res = {ClubList: []};

                angular.forEach(data.ClubList, function (v, k) {
                    if (res.ClubList.length == 0) {

                        res.ClubList.push({
                            'Letter': v.Letter,
                            'List': [v]
                        });

                    } else {

                        var len = res.ClubList.length;

                        if (res.ClubList[len-1].Letter == v.Letter) {
                            res.ClubList[len-1].List.push(v);
                        } else {
                            res.ClubList.push({
                                'Letter': v.Letter,
                                'List': [v]
                            });
                        }
                    }

                });

                angular.extend($scope.DataList, res);
            } else {
                $scope.Deploy.isMore = false;
            }
        }
	});

});