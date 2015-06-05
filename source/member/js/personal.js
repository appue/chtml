personalHomepage.controller('personalCtrl', function ($scope, $stateParams) {

	console.log($stateParams.id);

	$scope.goAttention = { //--去关注页
		'url': [
			'member/#/personal-' + $stateParams.id + '/attention.htm',
			'member/index.html#/personal-' + $stateParams.id + '/attention.htm'
		]
	};

	$scope.goData = { //--去查看资料页
		'url': [
			'member/#/personal-' + $stateParams.id + '/data.htm',
			'member/index.html#/personal-' + $stateParams.id + '/data.htm'
		]
	};

	$scope.goFans = { //--去粉丝页
		'url': [
			'member/#/personal-' + $stateParams.id + '/fans.htm',
			'member/index.html#/personal-' + $stateParams.id + '/fans.htm'
		]
	};

	$scope.goLevel = { //--去用户等级页
		'url': [
			'member/#/personal-' + $stateParams.id + '/level.htm',
			'member/index.html#/personal-' + $stateParams.id + '/level.htm'
		]
	};

	$scope.goIssue = { //--去发布页
		'url': [
			'member/#/personal-' + $stateParams.id + '/issue.htm',
			'member/index.html#/personal-' + $stateParams.id + '/issue.htm'
		]
	};

	$scope.myScrollOptions = {
		'wrapper1': {},
		'wrapper2': {}
	};

});