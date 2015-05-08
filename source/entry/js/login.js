angular.module('ENTRY')
	.controller('loginCtrl', function ($scope, $state) {

		$scope.goIndex = function () {
			// // $state.go('homes');
			// window.loa.href = '#/index/homes'
		}

		$scope.currentTab = 1;

		$scope.tabChange = function (e) {

			var a = angular.element(e.currentTarget).find('li');
			console.log(a.index('li'));
		}

		var obj = SetFalls.init({
			'elem': '.js_falls'
		});

		console.log(obj);

		if (obj.x <= obj.y) {
			document.querySelector('.js_falls').style.cssText = 'height:' + obj.y + 'px';
		} else {
			document.querySelector('.js_falls').style.cssText = 'height:' + obj.x + 'px';
		}

		var html = document.querySelectorAll('.js_falls li');

		for (var i = 0, len = html.length; i < len; i++) {
			html[i].style.cssText = obj.layout[i].type + ':0;top:' + obj.layout[i].top + 'px';
		}

	});