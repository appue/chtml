angular.module('phoneApp')

/** 
 *  引用方法：
 *	<popup
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
		link: function (scope, element, attrs) {

			// var mask = document.querySelector('.mod_mask');
			// if (!mask) { //页面如果没有mask层，则append一个新的进来
			// 	var $body = angular.element(document.getElementsByTagName('body'));
			// 	$body.append('<div ng-show="showPopup" class="mod_mask"></div>');
			// }

			function bind(attr) { //按钮callback，如果没有attr则隐藏popup
				// console.log(scope.$eval(attr));
				if (attr && !scope.$$phase) {

					var fn = $parse(attr); //必须为fn，否则无效
					scope.$apply(fn(scope)); //参数scope是你带进去的参数

				} else {

					$timeout(function () {
						scope.showPopup = false;
					}, 0);

				}
			}

			scope.showPopup = false;
			scope.popupTitle = attrs.title;
			scope.popupCancelText = attrs.cancelText;
			scope.popupConfirmText = attrs.confirmText;
			scope.noCancel = (attrs.noCancel !== undefined) ? true : false;
			scope.noConfirm = (attrs.noConfirm !== undefined) ? true : false;

			element.on('click', function (event) {

				var $that = angular.element(event.target);

				if ($that.hasClass('cancel')) { //定义取消按钮事件
					bind(attrs.popupCancel);
				}

				if ($that.hasClass('confirm')) { //定义确定按钮事件
					bind(attrs.popupConfirm);
				}

			});

		}
	};
})

/** 
 *  引用方法：
 *	<ANY
 *		show-popup="name"  //给元素绑定弹出层事件 name指定显示哪一个弹出层
 *	</ANY>
 */

.directive('showPopup', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			element.on('click', function (event) {

				$timeout(function () {
					scope.showPopup = true;
				}, 0);

			});

		}
	};
});