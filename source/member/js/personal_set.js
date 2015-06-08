personalHomepage.controller('personalSetCtrl', function ($scope, $stateParams) {

	$scope.backParam = { //--设置返回按钮
		'url': [
			'member/#/personal-' + $stateParams.id + '.htm'
		]
	};

	$scope.goPassword = { //--去修改密码页
		'url': [
			'member/#/personal-' + $stateParams.id + '/set/password.htm'
		]
	};

});