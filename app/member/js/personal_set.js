personalHomepage.controller('personalSetCtrl', function ($scope, $stateParams) {

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

	//todo...
	$scope.cityList = [{
		Id: 1,
		Name: '上海'
	}, {
		Id: 2,
		Name: '北京'
	}, {
		Id: 3,
		Name: '广州'
	}, {
		Id: 4,
		Name: '厦门'
	}];

	$scope.villageList = [{
		Id: 11,
		Name: '长宁区'
	}, {
		Id: 12,
		Name: '徐汇徐'
	}, {
		Id: 13,
		Name: '浦东新区'
	}, {
		Id: 14,
		Name: '闸北区'
	}];

	//初始化临时数据
	$scope.tmpSex = $scope.inputVal.sex;
	$scope.tmpJob = $scope.inputVal.job;
	$scope.tmpCity = $scope.inputVal.city || $scope.cityList[0];
	$scope.tmpVillage = $scope.inputVal.village || $scope.villageList[0];

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

	function getVillageData() { //取地区数据
		// todo...
	}

	$scope.popupLocation = function () { //确认所选的地区 todo...
		$scope.inputVal.city = $scope.tmpCity;
		$scope.inputVal.village = $scope.tmpVillage;
	};

	$scope.chooseLocation = function (e) { //所在地选择
		var $that = angular.element(e.delegationTarget),
			name = $that.text(),
			city = $that.attr('data-city'),
			village = $that.attr('data-village');

		$that.parent('ul').find('li').removeClass('current');

		$that.addClass('current');

		if (city) {
			$scope.tmpCity = $scope.$eval(city);
		}

		if (village) {
			$scope.tmpVillage = $scope.$eval(village);
		}

	};

});