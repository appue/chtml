angular.module('phoneApp')
.controller('tUserIndex', function (
	$scope,
    $state,
	$stateParams,
    $ionicPopover,
    $ionicViewSwitcher,
    $timeout,
    cachePool,
    widget
) {
    
    $scope.footerTab = 5; //--底部tab初始化高亮

    $scope.Deploy = {
        isLogin: false,
        uId: 0
    };

    $scope.DataList = {};


    var userInfo = cachePool.pull('UserInfo');
    if (userInfo) {
        $scope.Deploy.uId = userInfo.UserId;
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
        isLogin: true,
        data: {
            UserId: $scope.Deploy.uId
        },
        success: function (data) {
            
            if (data.Response.Ack == "Success" && data.Response && data.Response.State) {
                $scope.Deploy.isLogin = true;
            } else {
                $scope.Deploy.isLogin = false;
            }

        	angular.extend($scope.DataList, data);
        }
    });


    $scope.headerScroll = function () {
        widget.changeOpacity();
    };

    $scope.toMail = function () {
        if ($scope.Deploy.isLogin) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('forum.msg-talk');
        } else {
            $scope.showLogin();
        }
    };

    // $scope.showLogin = function($event) {
    //     var $that = angular.element(document.querySelector('.js_login')).css('display', 'block');

    //     $timeout( function () {
    //         $that.addClass('this_show');
    //     }, 50);
    // };

});