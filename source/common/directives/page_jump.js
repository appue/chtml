angular.module('phoneApp')

.directive('pageJump', function ($stateParams, $parse, routerRedirect) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function (event) {

				var params = scope.$eval(attrs.pageJump);

				if (params) {

					if (angular.isFunction(params) && !scope.$$phase) { //如果传进来的是fun，执行之，否则做为跳转参数使用

						var fn = $parse(params);
						scope.$apply(fn(scope));

					} else {
						routerRedirect.toJump(params);
					}

				}

				event.preventDefault();

			});
		}
	};
});