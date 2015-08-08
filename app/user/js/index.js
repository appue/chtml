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
    widget.initUser($scope);

    $scope.footerTab = 5; //--底部tab初始化高亮

    $scope.DataList = {};


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

    if ($scope.Deploy.isLogin) {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getUserInfo',
            isLogin: true,
            data: {
                UserId: $scope.Deploy.uId
            },
            success: function (data) {
            	angular.extend($scope.DataList, data);
            }
        });
    }

    $scope.headerScroll = function () {
        widget.changeOpacity();
    };

    $scope.toMail = function () {
        console.log($scope.Deploy);
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