angular.module('phoneApp')

/** 
 *  引用方法：
 *	<location-data></location-data>
 */
.directive('locationData', function (widget, cachePool) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '../common/directives/location_data.html',
		link: function (scope, element, attrs) {

			var location = cachePool.pull('LocationData');

			if (location) {
				scope.cityList = location;
			} else {
				widget.ajaxRequest({
					url: 'getCityList',
					success: function (data) {
						scope.cityList = data;
					}
				});
			}

			//todo...
			scope.cityList = [{
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

			scope.villageList = [{
				Id: 11,
				Name: '长宁区'
			}, {
				Id: 12,
				Name: '徐汇徐'
			}, {
				Id: 23,
				Name: '朝阳区'
			}, {
				Id: 14,
				Name: '闸北区'
			}];

			//记录所选地区
			scope.inputVal.city = scope.inputVal.city || scope.cityList[0];
			scope.inputVal.village = scope.inputVal.village || scope.villageList[0];

			//临时所选地区
			scope.tmpCity = scope.inputVal.city;
			scope.tmpVillage = scope.inputVal.village;

			function getVillageData() { //取地区数据
				scope.tmpVillage = scope.villageList[0];
			}

			scope.chooseLocation = function (e) { //所在地选择
				var $that = angular.element(e.delegationTarget),
					name = $that.text(),
					city = $that.attr('data-city'),
					village = $that.attr('data-village');

				$that.parent('ul').find('li').removeClass('current');

				$that.addClass('current');

				if (city) {
					getVillageData();
					scope.tmpCity = scope.$eval(city);
				}

				if (village) {
					scope.tmpVillage = scope.$eval(village);
				}

			};

			scope.$parent.confirmLocation = function () { //确认所在地位置
				scope.inputVal.city = scope.tmpCity;
				scope.inputVal.village = scope.tmpVillage;
			};

		}
	};
});