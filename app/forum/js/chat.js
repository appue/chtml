/*
 * 消息-聊天
 * /home/#/msg/chat-{uid}.htm
 */
angular.module('phoneApp')

.controller('tMsgChat', function(
	$scope,
	$state,
	$location,
	$stateParams,
	$ionicViewSwitcher,
	widget
) {

	$scope.uname = $location.$$search.uname || '未知用户';

	widget.initUser($scope);

	widget.ajaxRequest({
        scope: $scope,
        url: 'getMsgTalk',
        data: {},
        success: function (data) {
            console.log(data);
        }
    });

	$scope.goUserPage = function() {

		$ionicViewSwitcher.nextDirection('forward');

		$state.go('forum.user-other-index', {
			uid: $stateParams.uid
		}, {
			inherit: false
		});

	};

	$scope.sendMsg = function () {
		widget.ajaxRequest({
	        scope: $scope,
	        url: 'getMsgTalk', //todo...发送消息接口
	        data: {},
	        success: function (data) {
	            console.log(data);
	        }
	    });
	};

});