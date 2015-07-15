angular.module('phoneApp')
.controller('tUserOtherIndex', function (
	$scope,
    $state,
	$stateParams,
    $ionicPopover,
    $ionicViewSwitcher,
    $timeout,
    cachePool,
    widget
) {

    $scope.Deploy = {
        isLogin: false
    };

    $scope.DataList = {};

    var userInfo = cachePool.pull('UserInfo');
    if (userInfo) {
        $scope.Deploy.userId = userInfo.UserId;
    }

    // if (!$stateParams.id) {
    //     if (!$scope.Deploy.userId) {
    //         $ionicViewSwitcher.nextDirection('none'); //back
    //         $state.go('forum.login');
    //         return;
    //     } else {
    //         $scope.userId = $scope.Deploy.userId;
    //     }
    // } else {
    //     $scope.userId = $stateParams.id;
    // }

    widget.ajaxRequest({
        url: 'getUserInfo',
        data: {
            UserId: $scope.Deploy.userId
        },
        success: function (data) {

            if (data.Response && data.Response.State) {
                $scope.Deploy.isLogin = true;
            } else {
                $scope.Deploy.isLogin = true;
            }

        	angular.extend($scope.DataList, data);
        }
    });


    $scope.headerScroll = function () {
        widget.changeOpacity();
    };
});