angular.module('phoneApp')

.controller('tUserSet', function (
	$scope,
	$ionicPopup,
	$timeout,
	widget
) {

	$scope.Page = { //头部设置
		Title: '设置',
		RightText: false,
		RightFun: function () {
			alert(1);
		}
	};

	widget.initUser($scope);

	$scope.cInput = $scope.UserInfo || {};

	if ($scope.cInput.Sex == 2) {
		$scope.cInput.SexName = "女";
	} else {
		$scope.cInput.SexName = "男";
	}

	$scope.tmpSex = $scope.cInput.SexName; //初始弹出层临时性别

	$scope.userSetData = { //开关数据初始化
		isMsgPush: true,
		isFocusOnly: false,
		isTelAllow: true,
		isPhotoSave: false
	};

	$scope.switchCtrl = function (type) {

		$scope.userSetData[type] = !$scope.userSetData[type];

		console.log($scope.userSetData[type]);
	};

	$scope.genderSelect = function () {
		$ionicPopup.confirm({
			title: '选择性别',
			cancelText: '取消',
			cancelType: 'cancel',
			okText: '确定',
			okType: 'confirm',
			scope: $scope,
			template: '<div class="choose_gender" ngd-click="chooseSex($event)" selector="span"><span><input name="sex" ng-checked="tmpSex == \'女\'" type="radio"><label>女</label></span><span><input name="sex" ng-checked="tmpSex == \'男\'" type="radio"><label>男</label></span></div>'
		}).then(function (res) {
			if (res) { //确认所在地位置
				$scope.chooseSex(false);
				//todo...
			}
		});
	};

	$scope.chooseSex = function (e) { //选择性别
		var $that = angular.element(e.delegationTarget);
		if ($that.length > 0) { //选择
			$scope.tmpSex = $that.find('label').text();
		} else { //确定
			$scope.cInput.SexName = $scope.tmpSex;
		}
	};

	// $timeout(function () {//todo...
	// 	console.log($scope.cInput);
	// 	$scope.$watch('cInput', function () {
	// 		$scope.Page.RightText = '保存设置';
	// 	});
	// }, 2000);

	$scope.loginOut = function () {
		$scope.showLogin();
	};

});