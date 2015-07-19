angular.module('phoneApp')

.controller('tUserSet', function (
	$scope,
	$stateParams,
	$timeout,
	widget
) {

	widget.initUser($scope);

	$scope.cInput = $scope.UserInfo || {};

	if ($scope.cInput.Sex == 2) {
		$scope.cInput.SexName = "女";
	} else {
		$scope.cInput.SexName = "男";
	}
	
	console.log($scope.cInput);

	$scope.personalData = { //开关数据初始化
		isMsgPush: true,
		isFocusOnly: false,
		isTelAllow: true,
		isPhotoSave: false
	};

	$scope.switchCtrl = function (type) {

		$scope.personalData[type] = !$scope.personalData[type];

		console.log($scope.personalData[type]);
	};

	//初始化临时数据
	// $scope.tmpSex = $scope.inputVal.sex;
	// $scope.tmpJob = $scope.inputVal.job;

	$scope.chooseSex = function (e) { //选择性别
		var $that = angular.element(e.delegationTarget);

		if ($that.length > 0) { //选择
			$scope.tmpSex = $that.find('label').text();
		} else { //确定
			$scope.inputVal.sex = $scope.tmpSex;
		}
	};

	// $scope.chooseJob = function (e) { //岗位选择
	// 	var $that = angular.element(e.delegationTarget);

	// 	if ($that.length > 0) { //选择
	// 		$scope.tmpJob = $that.find('label').text();
	// 	} else { //确定
	// 		$scope.inputVal.job = $scope.tmpJob;
	// 	}

	// };


	$scope.loginOut = function () {
		// widget.cleanLogin($scope);
		$scope.showLogin();
	};
});