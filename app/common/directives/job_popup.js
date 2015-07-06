angular.module('phoneApp')

/** 
 *  引用方法：
 *	<ANY job-popup></ANY>
 */
.directive('jobPopup', function ($ionicPopup, widget, cachePool) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			var job = cachePool.pull('JobData'); //todo...

			scope.tmpJob = scope.inputVal.job; //初始化临时job

			scope.chooseJob = function (e) { //岗位选择
				var $that = angular.element(e.delegationTarget);

				if ($that.length > 0) { //选择
					scope.tmpJob = $that.find('label').text();
				} else { //确定
					scope.inputVal.job = scope.tmpJob;
				}

			};

			element.bind('click', function () { //呼出弹出层

				$ionicPopup.confirm({
					title: '选择岗位',
					cancelText: '取消',
					cancelType: 'cancel',
					okText: '确定',
					okType: 'confirm',
					scope: scope,
					templateUrl: '../common/directives/job_popup.html'
				}).then(function (res) {
					if (res) { //确认所在地位置
						scope.chooseJob(false); //传false保证e对象不会报错
					}
				});

			});

		}
	};
});