angular.module('phoneApp')

/** 
 *  引用方法：
 *	<location-data
 *		title="string"     //定义标题
 *		transparent        //定义透明背景
 *		back="obj"         //定义后退按钮(可选)
 *		left="obj"         //定义取消按钮名(可选)
 *		right="obj"        //定义确定按钮名(可选)
 *	</location-data>
 */

.directive('locationData', function (widget) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '../common/directives/location_data.html',
		controller: function ($scope, $element, $attrs) {

			alert(1);

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

			$scope.inputVal.city = $scope.inputVal.city || $scope.cityList[0];
			$scope.inputVal.village = $scope.inputVal.village || $scope.villageList[0];

			function getVillageData() { //取地区数据
				// todo...
			}

			$scope.popupLocation = function () { //呼出所在地弹层 todo...
				$scope.tmpCity = $scope.inputVal.city || $scope.cityList[0];
				$scope.tmpVillage = $scope.inputVal.village || $scope.villageList[0];
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

		}
	};
});