angular.module('phoneApp')

.controller('tUserSet', function (
	$scope,
	$ionicPopup,
	$timeout,
	cachePool,
	widget
) {
	// 初始化用户信息
	widget.initUser($scope);

	// 头部设置
	$scope.Page = { 
		isModify: false, //是否修改了
		RightText: false,
		RightFun: function () {
			widget.ajaxRequest({
				scope: $scope,
				url: 'setUserSetting',
				data: {
			        UserInfo: {
			            Sex: $scope.cInput.Sex,
			            Job: $scope.cInput.Job,
			            AreaId: $scope.cInput.City
			        }
				},
				success: function (data) {
					cachePool.modify('UserInfo', {
						Sex: $scope.cInput.Sex,
						Job: $scope.cInput.Job,
						JobName: $scope.cInput.JobName,
						City: $scope.cInput.City,
						CityName: $scope.cInput.CityName
					});
	                widget.msgToast('信息修改成功！');
	                $scope.Page.isModify = false;
				}
			});
		}
	};

	// 修改右边按钮功能
	$scope.$watch("Page.isModify", function () {
		if ($scope.Page.isModify) {
			$scope.Page.RightText = "完成";
		} else {
			$scope.Page.RightText = false;
		}
	});

	$scope.cInput = $scope.UserInfo || {};

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


	// 选择性别 start
	$scope.$watch('cInput.Sex', function () {
		if ($scope.cInput.Sex == 2) {
			$scope.cInput.SexName = "女";
		} else {
			$scope.cInput.SexName = "男";
		}
		$scope.tmpSex = $scope.cInput.Sex; //初始弹出层临时性别
	});

	$scope.genderSelect = function () {
		$ionicPopup.confirm({
			title: '选择性别',
			cancelText: '取消',
			cancelType: 'cancel',
			okText: '确定',
			okType: 'confirm',
			scope: $scope,
			template: '<div class="choose_gender" ngd-click="chooseSex($event)" selector="span"><span><input name="sex" ng-checked="tmpSex == 2" type="radio"><label data-sex="2">女</label></span><span><input name="sex" ng-checked="tmpSex == 1" type="radio"><label data-sex="1">男</label></span></div>'
		}).then(function (res) {
			if (res) { //确认所在地位置
				$scope.chooseSex(false);
				$scope.Page.isModify = true;
				//todo...
			} else {
				$scope.tmpSex = $scope.cInput.Sex;
			}
		});
	};
	$scope.chooseSex = function (e) { //选择性别
		var $that = angular.element(e.delegationTarget);

		if ($that.length > 0) { //选择
			$scope.tmpSex = $that.find('label').attr('data-sex');
		} else { //确定
			$scope.cInput.Sex = $scope.tmpSex;
		}
	};
	// 选择性别 end


	// 退出登录
	$scope.loginOut = function () {
		widget.cleanLogin($scope);
		// $scope.showLogin();
	};

});