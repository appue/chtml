personalHomepage.controller('personalSetCtrl', function ($scope, $stateParams) {

	$scope.backParam = { //--设置返回按钮
		'url': [
			'member/#/personal-' + $stateParams.id + '.htm'
		]
	};

	$scope.personalData = { //数据初始化
		isMsgPush: true,
		isFocusOnly: false,
		isTelAllow: true,
		isPhotoSave: false
	};

	$scope.goPassword = { //--去修改密码页
		'url': [
			'member/#/personal-' + $stateParams.id + '/set/password.htm'
		]
	};

	$scope.switchCtrl = function (type) {

		$scope.personalData[type] = !$scope.personalData[type];

		console.log($scope.personalData[type]);
	};

});