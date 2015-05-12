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

				if ($that.hasClass('cancel')) { //定义取消按钮事件

					if (attrs.popupCancel) {
						console.log(attrs.popupCancel);
					} else {
						scope.showPopup = false;
					}
				}

				if ($that.hasClass('confirm')) { //定义确定按钮事件

					if (attrs.popupConfirm) {
						console.log(attrs.popupConfirm);
					} else {
						scope.showPopup = false;
					}

				}

			});

		}
	};
});