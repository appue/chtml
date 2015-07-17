angular.module('phoneApp')

/** 
 *  引用方法：
 *	<ANY job-popup></ANY>
 */
.directive('jobPopup', function (
	$ionicPopup,
	widget,
	cachePool
) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			var job = cachePool.pull('JobData'); //todo...

			scope.tmpJob = scope.cInput.job; //初始化临时job

			scope.chooseJob = function (e) { //岗位选择
				var $that = angular.element(e.delegationTarget);

				if ($that.length > 0) { //选择
					scope.tmpJob = $that.attr("data-id");
					scope.tmpJobName = $that.attr("data-name");
				} else { //确定
					scope.cInput.job = scope.tmpJob;
					scope.cInput.jobName = scope.tmpJobName;
				}

			};

			element.bind('click', function () { //呼出弹出层

		        widget.ajaxRequest({
		            url: 'getJobList',
		            data: {},
		            success: function (data) {
		            	if (data.Response && data.Response.Ack == "Success") {
		            		scope.DataList.JobList = data.JobList;

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
							
		            	} else {
		            		widget.msgToast('获取岗位失败,请重试！');
		            	}
		            }
		        });

			});

		}
	};
});