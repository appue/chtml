angular.module('phoneApp')

.directive('pageJump', function ($window, $state, $stateParams, $parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {

				console.log(scope.$eval(attrs.pageJump));

				// if (attrs.pageJump) {
				// 	$window.location.href = attrs.pageJump;
				// }

			});
		}
	};
});