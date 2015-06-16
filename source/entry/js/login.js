angular.module('phoneApp')

.controller('loginCtrl', function ($scope, widget) {

	$scope.backParam = { //--设置返回按钮
		'url': ['home/#/index']
	};

	$scope.inputVal = {}; //初始化ng-model

	$scope.goLogin = function () {
		if (!$scope.inputVal.phone) {
			widget.msgToast('请输入用户名');
			return;
		}

		if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($scope.inputVal.phone)) {
			widget.msgToast('用户名格式不合法');
			return;
		}

		if (!$scope.inputVal.password) {
			widget.msgToast('请输入密码');
			return;
		}

		if ($scope.inputVal.password.length <= 5) {
			widget.msgToast('新密码必须大于或等于6位');
			return;
		}

		widget.ajaxRequest({
			url: 'getLogin',
			data: {
				Phone: $scope.inputVal.phone,
				Password: md5($scope.inputVal.password)
			},
			success: function (data) { //todo...

			}
		});

	};

	$scope.chooseLoginWay = function (e) {
		var $that = angular.element(e.delegationTarget);
		console.log($that);
	};

});