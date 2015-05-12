angular.module('phoneApp')

.directive('headerBar', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '../common/directives/header_bar.html',
		// controller: function ($scope, $element, $attrs) {
		// 	console.log($attrs);
		// },
		// compile: function (element, attrs, transclude) {
		// 	return {
		// 		pre: function preLink(scope, element, attrs, controller) {},
		// 		post: function postLink(scope, element, attrs, controller) {}
		// 	}
		// },
		link: function (scope, element, attrs) {

			scope.headerTitle = attrs.title || ''; //定义标题

			if (attrs.transparent !== undefined) { //定义背景是否透明
				scope.transparent = true;
			}

			if (attrs.back !== undefined) { //定义后退按钮
				scope.backButton = true;
				if (attrs.back) { //如果不为空则指定回退路径
					scope.backParam = attrs.back;
				}
			}

			if (attrs.left) { //定义左侧按钮
				scope.leftButton = attrs.left;
			}

			if (attrs.right) { //定义右侧按钮
				scope.rightButton = attrs.right.split('|')[0] || '';
				scope.jumpParam = attrs.right.split('|')[1] || '';
			}

		}
	};
});