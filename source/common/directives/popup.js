var popupDom = document.querySelectorAll('.mod_popup');

angular.module('phoneApp')

/** 
 *  引用方法：
 *	<popup
 *		ng-show="string"        //定义popup名，用于对应绑定的事件元素(必选)
 *		title="string"          //定义标题
 *		popup-cancel="fn(arg)"  //重定义取消按钮方法
 *		popup-confirm="fn(arg)" //重定义确定按钮方法
 *		cancel-text="string"    //重定义取消按钮名
 *		confirm-text="string"   //重定义确定按钮名
 *		no-cancel               //隐藏取消按钮，默认显示
 *		no-confirm              //隐藏确定按钮，默认显示
 *	</popup>
 */

.directive('popup', function ($parse, $timeout) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: '../common/directives/popup.html',
		controller: function ($scope, $element, $attrs) {

			// var mask = document.querySelector('.mod_mask');
			// if (!mask) { //页面如果没有mask层，则append一个新的进来
			// 	var $body = angular.element(document.getElementsByTagName('body'));
			// 	$body.append('<div ng-show="showPopup" class="mod_mask"></div>');
			// }

			$scope[$attrs.ngShow] = false;

			$scope.popupTitle = $attrs.title;
			$scope.popupCancelText = $attrs.cancelText;
			$scope.popupConfirmText = $attrs.confirmText;
			$scope.noCancel = ($attrs.noCancel !== undefined) ? true : false;
			$scope.noConfirm = ($attrs.noConfirm !== undefined) ? true : false;

			function bind(attr) { //按钮callback方法

				$timeout(function () {
					$scope[$attrs.ngShow] = false;
					$scope.showMask = false;
				}, 0);

				// console.log($scope.$eval(attr));
				if (attr && !$scope.$$phase) {

					var fn = $parse(attr); //必须为function，否则无效
					$scope.$apply(fn($scope)); //参数scope是你带进去的参数，如果不带则是整个scope域

				}
			}

			$element.on('click', function (event) {

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
 *		show-popup="name|fun"  //给元素绑定弹出层事件，name(必选)指定显示哪一个弹出层，fun(可选)在弹出层显示前调用
 *	</ANY>
 */

.directive('showPopup', function ($parse, $timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			element.on('click', function (event) {

				var popupName = attrs.showPopup.split('|')[0],
					fn = attrs.showPopup.split('|')[1];

				scope.showPopup = function () {
					$timeout(function () {
						if (scope[popupName] !== undefined) {
							scope[popupName] = true;
							scope.showMask = true;
						}
					}, 0);
				};

				if (fn && !scope.$$phase) {
					scope.$apply($parse(fn)(scope)); //当回调执行完执行show方法，显示popup
				} else {
					scope.showPopup();
				}

			});

		}
	};
});