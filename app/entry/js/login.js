angular.module('phoneApp')

.controller('tLogin', function (
	$scope,
	widget,
	cachePool,
	ENV
) {

	if (ENV.isHybrid) {
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
			StatusBar.show();
		}
	}

	$scope.inputVal = {}; //初始化ng-model

	$scope.goLogin = function () {
		if (!$scope.inputVal.phone) {
			widget.msgToast('请输入用户名');
			return;
		}

		if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($scope.inputVal.phone)) {
			widget.msgToast('用户名格式不合法');
			return;
		}

		if (!$scope.inputVal.password) {
			widget.msgToast('请输入密码');
			return;
		}

		if ($scope.inputVal.password.length <= 5) {
			widget.msgToast('新密码必须大于或等于6位');
			return;
		}

		widget.ajaxRequest({
			scope: $scope,
			url: 'getLogin',
			data: {
				Phone: $scope.inputVal.phone,
				Password: md5($scope.inputVal.password)
			},
			success: function (data) { //todo...

                if (data.Response && data.Response.State) {
                    cachePool.push('UserInfo', {
                        Phone: data.Phone,
                        UserName: data.Nickname,
                        Sex: data.Sex,
                        City: data.City,
                        CityName: data.CityName,
                        Job: data.Job,
                        JobName: data.JobName,

                        Auth: data.Auth,
                        UserId: data.UserId 
                    }, 2 / 24);
                }
                
			}
		});

	};

	$scope.chooseLoginWay = function (e) {
		var $that = angular.element(e.delegationTarget);
		console.log($that);
	};

});