angular.module('phoneApp')

.directive('pageJump', function ($window, $state, $stateParams, $parse, ENV) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.on('click', function () {

				var params = scope.$eval(attrs.pageJump);

				// if (attrs.pageJump) {
				// 	$window.location.href = attrs.pageJump;
				// }
				// console.log(params.opts.href);

				// $window.location.href = params.opts.href;
				// console.log();

				if (!ENV.isHybrid) {
					$window.location.href = params.opts.href.replace('index\.html', '');
					return;
				}

				/*
				* @params:
				*     opts: {
				*         direction: 页面转动方向[left|right|up|down]
				*         href: 页面跳转的URL
				*     }
				*/
				var options = {
					'direction': 'left',
					'duration': 500, 
					'slowdownfactor': 3, 
					'iosdelay': 100,
					'androiddelay': 150,
					'winphonedelay': 250, 
					'fixedPixelsTop': 0,
					'fixedPixelsBottom': 48,
					'href': params.opts.href
				};

				for (i in params.opts) options[i] = params.opts[i];

				options.href = params.opts.href;

				window.plugins.nativepagetransitions.slide(
					options,
					function (msg) {
						console.log(msg);
					},
					function (msg) {
						console.log(msg);
					}
				);
			});
		}
	};
});