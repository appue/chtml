angular.module('phoneApp')

.controller('loginCtrl', function ($scope, widget) {

	$scope.backParam = { //--设置返回按钮
		'url': [
			'entry/#/',
			'entry/index.html#/'
		]
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

		widget.ajaxRequest({
			noMask: true,
			url: '$local/Tools/SendCheckCode',
			data: {
				Mobile: 123
			},
			success: function (data) {}
		});

		//todo..
	};

	$scope.chooseLoginWay = function (e) {
		var $that = angular.element(e.delegationTarget);
		console.log($that);
	};



});