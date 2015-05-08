angular.module('phoneApp')
	.directive('header', function ($state) {
		return {
			restrict: 'E',
			templateUrl: 'header.html',
			controller: function ($scope) {
				alert(1)
			}
		};
	});