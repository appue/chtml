angular.module('phoneApp')

.controller('loginCtrl', function ($scope, routerRedirect, widget) {

	$scope.inputVal = {}; //初始化ng-model

	$scope.backParam = {
		'module': 'entry',
		'hash': ' '
	};

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

		alert(1);

		//todo..
	};

	$scope.goForget = function () {
		routerRedirect.toJump({
			'module': 'entry',
			'hash': 'loginForget'
		});
	};

	$scope.chooseLoginWay = function (e) {
		var $that = angular.element(e.delegationTarget);
		console.log($that);
	};



});