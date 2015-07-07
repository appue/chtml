angular.module('phoneApp')
.controller('personalSetCtrl', function ($scope, $stateParams) {

	$scope.backParam = { //--设置返回按钮
		'url': [
			'member/#/personal-' + $stateParams.id + '.htm'
		]
	};

	$scope.inputVal = { //属性数据初始化
		nickname: '我是昵称',
		sex: '女',
		job: '园长',
		city: {
			Id: 1,
			Name: '上海'
		},
		village: {
			Id: 11,
			Name: '长宁区'
		}
	};

	$scope.personalData = { //开关数据初始化
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

	//初始化临时数据
	$scope.tmpSex = $scope.inputVal.sex;
	$scope.tmpJob = $scope.inputVal.job;

	$scope.chooseSex = function (e) { //选择性别
		var $that = angular.element(e.delegationTarget);

		if ($that.length > 0) { //选择
			$scope.tmpSex = $that.find('label').text();
		} else { //确定
			$scope.inputVal.sex = $scope.tmpSex;
		}
	};

	$scope.chooseJob = function (e) { //岗位选择
		var $that = angular.element(e.delegationTarget);

		if ($that.length > 0) { //选择
			$scope.tmpJob = $that.find('label').text();
		} else { //确定
			$scope.inputVal.job = $scope.tmpJob;
		}

	};

});