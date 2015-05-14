angular.module('phoneApp')

.controller('loginCtrl', function ($scope, $state) {

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