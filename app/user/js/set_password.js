angular.module('phoneApp')

.controller('tUserSetPassword', function (
	$scope,
	$stateParams,
	widget
) {

	$scope.inputVal = {};

	$scope.submitModify = function () {

		if (!$scope.inputVal.oldPassword) {
			widget.msgToast('请输入旧密码');
			return;
		}

		if (!$scope.inputVal.password) {
			widget.msgToast('请输入新密码');
			return;
		}

		if ($scope.inputVal.password.length <= 5) {
			widget.msgToast('新密码必须大于或等于6位');
			return;
		}

		if (!$scope.inputVal.passwordCheck) {
			widget.msgToast('请再次输入新密码');
			return;
		}

		if ($scope.inputVal.passwordCheck !== $scope.inputVal.password) {
			widget.msgToast('两次输入不相符，请重新输入');
			return;
		}

		widget.ajaxRequest({
			noMask: true,
			url: '$local/Tools/SendCheckCode',
			data: {
				Mobile: 123
			},
			success: function (data) {}
		});

	};

});