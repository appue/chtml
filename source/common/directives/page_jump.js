angular.module('phoneApp')

.directive('pageJump', function ($window, $state, $stateParams, $parse, routerRedirect) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {

				var params = scope.$eval(attrs.pageJump);

				// if (attrs.pageJump) {
				// 	$window.location.href = attrs.pageJump;
				// }
				// console.log(params.opts.href);

				// $window.location.href = params.opts.href;
				// console.log();
				// if (!ENV.isHybrid) {
				// 	$window.location.href = params.opts.href.replace('index\.html', '');
				// 	return;
				// }

				routerRedirect.toJump(params);
			});
		}
	};
});