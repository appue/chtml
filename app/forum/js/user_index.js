angular.module('phoneApp')
.controller('tUserIndex', function (
	$scope,
    $state,
	$stateParams,
    $ionicLoading,
    $ionicViewSwitcher,
    cachePool,
    widget
) {

    //显示loadding
    // $ionicLoading.show({
    //     templateUrl: 'common/directives/mod_loading.html'
    // });

    $scope.footerTab = 5; //--底部tab初始化高亮

    $scope.Deploy = {
        isOwner: false,
        isShow: false
    };
	// console.log($stateParams.id);

    $scope.DataList = {};

    var userInfo = cachePool.pull('UserInfo');
    if (userInfo) {
        $scope.Deploy.userId = userInfo.UserId;
    }

    if (!$stateParams.id) {
        if (!$scope.Deploy.userId) {
            $ionicViewSwitcher.nextDirection('swap'); //back
            // $state.go('forum.user-login');
            return;
        } else {
            $scope.userId = $scope.Deploy.userId;
        }
    } else {
        $scope.userId = $stateParams.id;
    }

    widget.ajaxRequest({
        noMask: true,
        url: 'getUserInfo',
        data: {
            UserId: $scope.userId
        },
        success: function (data) {

            if (data.Response && data.Response.State) {

            } else {

            }

        	angular.extend($scope.DataList, data);
            // $ionicLoading.hide();
        },
        error: function (data) {
            // $ionicLoading.hide();
        }
    });




	$scope.goDataSet = function () { //--主人态设置页，客人态查看资料页

		var url = true ? '/set.htm' : '/data.htm';

		routerRedirect.toJump({
			'url': [
				'member/#/personal-' + $stateParams.id + url
			]
		});

	};

	$scope.redirectUrl = {
		goAttention: { //--去关注页
			'url': ['member/#/personal-' + $stateParams.id + '/attention.htm']
		},

		goFans: { //--去粉丝页
			'url': ['member/#/personal-' + $stateParams.id + '/fans.htm']
		},

		goLevel: { //--去用户等级页
			'url': ['member/#/personal-' + $stateParams.id + '/level.htm']
		},

		goIssue: { //--去发布页
			'url': ['member/#/personal-' + $stateParams.id + '/issue.htm']
		}
	};

	$scope.DataList = {
		ClubList: [
		]
	}
});