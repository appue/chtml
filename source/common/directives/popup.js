angular.module('phoneApp')

.directive('popup', function ($timeout) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: '../common/directives/popup.html',
		// controller: function ($scope, $element, $attrs) {},
		link: function (scope, element, attrs) {

			scope.popupTitle = attrs.title;

			element.on('click', function (event) {

				var $that = angular.element(event.target);

				if (attrs.popupCancel && $that.hasClass('cancel')) {
					alert(1);
				}

			});

		}
	};
});