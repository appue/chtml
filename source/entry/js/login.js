angular.module('phoneApp')

.controller('loginCtrl', function ($scope, $state) {

	$scope.backParam = { //定义后退事件
		'module': 'entry',
		'hash': ' '
	};

	$scope.aaaaa = {
		a: 1,
		b: 2,
		c: function () {
			alert(1);
		}
	};

	$scope.bbbbb = function () {
		alert(2);
	};

});