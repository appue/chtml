angular.module('phoneApp')
	.controller('userCtrl', function ($scope, $stateParams, routerRedirect) {

		alert(1);

		console.log($stateParams.id);

		$scope.footerTab = 5; //--底部tab初始化高亮

		$scope.goDataSet = function () { //--主人态设置页，客人态查看资料页

			var url = true ? '/set.htm' : '/data.htm';

			routerRedirect.toJump({
				'url': [
					'member/#/personal-' + $stateParams.id + url
				]
			});

		};

		$scope.redirectUrl = {
			goAttention: { //--去关注页
				'url': ['member/#/personal-' + $stateParams.id + '/attention.htm']
			},

			goFans: { //--去粉丝页
				'url': ['member/#/personal-' + $stateParams.id + '/fans.htm']
			},

			goLevel: { //--去用户等级页
				'url': ['member/#/personal-' + $stateParams.id + '/level.htm']
			},

			goIssue: { //--去发布页
				'url': ['member/#/personal-' + $stateParams.id + '/issue.htm']
			}
		};

		$scope.myScrollOptions = {
			'wrapper1': {},
			'wrapper2': {},
			'wrapper3': {}
		};

	});