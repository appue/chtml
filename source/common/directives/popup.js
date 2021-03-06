angular.module('phoneApp')

/** 
 *  引用方法：
 *	<popup
 *		id="string"              //定义popup名，用于对应绑定的事件元素(必选)
 *		title="string"           //定义标题
 *		popup-cancel="fn(arg)"   //重定义取消按钮方法
 *		popup-confirm="fn(arg)"  //重定义确定按钮方法
 *		cancel-text="string"     //重定义取消按钮名
 *		confirm-text="string"    //重定义确定按钮名
 *		no-cancel                //隐藏取消按钮，默认显示
 *		no-confirm               //隐藏确定按钮，默认显示
 *	</popup>
 */

.directive('popup', function ($parse, $timeout) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: '../common/directives/popup.html',
		controller: function ($scope, $element, $attrs) {

			$element.attr('id', 'popup_' + $attrs.id);

			$scope['popup_' + $attrs.id]

			var domArr = $element.children(),
				$title = angular.element(domArr[0]),
				$cancel = angular.element(domArr[2]).find('a').eq(0),
				$confirm = angular.element(domArr[2]).find('a').eq(1);

			if ($attrs.title) {
				$title.html($attrs.title).removeClass('ng-hide');
			}

			if ($attrs.cancelText) {
				$cancel.html($attrs.cancelText);
			}

			if ($attrs.confirmText) {
				$confirm.html($attrs.confirmText);
			}

			if ($attrs.noCancel !== undefined && $attrs.noConfirm !== undefined) {
				angular.element(domArr[2]).addClass('ng-hide');
				return;
			}

			if ($attrs.noCancel !== undefined) {
				$cancel.remove();
			}

			if ($attrs.noConfirm !== undefined) {
				$confirm.remove();
			}

			function bind(attr) { //绑定按钮callback方法

				var isFn = angular.isFunction($scope.$eval(attr));

				if (isFn && !$scope.$$phase) { //必须为function，否则无效
					var fn = $parse(attr);
					$scope.$apply(fn($scope)); //参数scope是你带进去的参数，如果不带则是整个scope域
				}
			}

			angular.element(domArr[2]).find('a').on('click', function (event) {

				var $allPopup = angular.element(document.querySelectorAll('.mod_popup'));

				$timeout(function () {
					$allPopup.addClass('ng-hide');
					$scope.showMask = false;
				}, 0);

				var $that = angular.element(event.target);

				if ($that.hasClass('cancel')) { //定义取消按钮事件
					bind($attrs.popupCancel);
				}

				if ($that.hasClass('confirm')) { //定义确定按钮事件
					bind($attrs.popupConfirm);
				}

			});

		}
	};
})

/** 
 *  引用方法：
 *	<ANY
 *		show-popup="id|fun"  //给元素绑定弹出层事件，id(必选)指定显示哪一个弹出层，fun(可选)在弹出层显示前调用
 *	</ANY>
 */

.directive('showPopup', function ($parse, $compile, $timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			element.on('click', function (event) {

				if (!document.querySelector('.mod_mask')) {
					var maskTpl = $compile('<div ng-show="showMask" class="mod_mask"></div>');
					angular.element(document.getElementById('js_view')).append(maskTpl(scope));
				}

				var popupName = attrs.showPopup.split('|')[0],
					$thisPopup = angular.element(document.getElementById('popup_' + popupName));

				$timeout(function () {
					if (popupName) {
						$thisPopup.removeClass('ng-hide');
						scope.showMask = true;
					}
				}, 0);

				var callback = attrs.showPopup.split('|')[1],
					isFn = angular.isFunction(scope.$eval(callback));

				if (callback && isFn && !scope.$$phase) {
					var fn = $parse(callback);
					scope.$apply(fn(scope)); //如果有回调函数，则执行回调
				}

			});

		}
	};
});