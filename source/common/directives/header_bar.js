angular.module('phoneApp')

.directive('headerBar', function ($state, $timeout) {
	return {
		restrict: 'E',
		templateUrl: '../common/directives/header_bar.html',
		controller: function () {
		},
		link: function (scope, element, attrs) {

			scope.headerTitle = attrs.title || ''; //定义标题

			if (attrs.transparent !== undefined) { //定义背景是否透明
				scope.transparent = true;
			}

			if (attrs.back !== undefined) { //定义后退按钮
				scope.backButton = true;
			}

			if (attrs.left) { //定义左侧按钮
				scope.leftButton = attrs.left;
			}

			if (attrs.right) { //定义右侧按钮
				scope.rightButton = attrs.right;
			}

		}
	};
});