angular.module('phoneApp')

.controller('entryCtrl', function ($scope, $state, $ionicPopup, routerRedirect) {

	var registerPopup = null;
	$scope.registerSelect = function () {
		registerPopup = $ionicPopup.alert({
			title: '用户注册',
			okText: '取消',
			template: '<div class="choose_register" ngd-click="itemClick($event)" selector="li"><ul class="mod_list_default"><li class="icon_weixin"><a>微信注册</a></li><li ui-sref="entry.registerCreate" class="icon_mobile"><a>手机号注册</a></li><li class="icon_qq"><a>QQ注册</a></li><li class="icon_weibo last_border_line"><a>微博注册</a></li></ul></div>'
		});
	};

	$scope.itemClick = function (e) {
		var $that = angular.element(e.delegationTarget),
			type = $that.attr('class').replace(' last_border_line', '');

		switch (type) {
		case 'icon_weixin':
			alert(1);
			break;
		case 'icon_mobile':
			alert(1);
			registerPopup.close();
			break;
		case 'icon_qq':
			alert(3);
			break;
		case 'icon_weibo':
			alert(4);
			break;
		}

		//todo...

		// 注：
		// e 原始的event对象，但是增加了delegationTarget => 代理target元素
		//
		// 对于selector这块，如果引用了jQuery的话，则支持的是jquery的选择器
		// 对于支持matchesSelector的浏览器来说，支持的就是标准的选择器；
		// 否则的话只能支持tagName...
	};

});