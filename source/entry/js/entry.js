userEntry.controller('entryCtrl', function ($scope, routerRedirect, widget) {

	$scope.goLoginPage = {
		'url': [
			'entry/#/login.htm',
			'entry/index.html#/login.htm'
		]
	};

	$scope.popupConfirm = function (arg) {
		console.log(arg);
	};

	$scope.itemClick = function (e) {
		var $that = angular.element(e.delegationTarget),
			type = $that.attr('class').replace(' last_border_line', '');

		switch (type) {
		case 'icon_weixin':
			alert(1);
			break;
		case 'icon_mobile':
			routerRedirect.toJump({
				'url': [
					'entry/#/register/create.htm',
					'entry/index.html#/register/create.htm'
				]
			});
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