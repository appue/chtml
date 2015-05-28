personalHomepage.controller('personalDataCtrl', function ($scope, $stateParams) {

	$scope.backParam = { //--设置返回按钮
		'url': [
			'member/#/personal-' + $stateParams.id + '.htm',
			'member/index.html#/personal-' + $stateParams.id + '.htm'
		]
	};

});