angular.module('Tjoys')

.controller('tActivityAdd', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'activity-add';

    $scope.tInput = {
        ActivityType: "2"
    };

    $scope.addActivity = function () {
        if (!$scope.tInput.ActivityName) {
            widget.msgToast('专题标题（长标题）不能为空');
            return;
        }

        if (!$scope.tInput.ImageUrl) {
            widget.msgToast('请上传图片');
            return;
        }

        if (!$scope.tInput.Description) {
            widget.msgToast('请输入专题描述');
            return;
        }


        var data  = angular.extend({}, $scope.tInput);

        data.ActivityType = parseInt(data.ActivityType, 0);

        widget.ajaxRequest({
            scope: $scope,
            url: 'addActivity',
            data: data,
            success: function (res) {
                widget.msgToast('添加活动成功');
                $scope.tInput = {
                    ActivityType: "2"
                };
            },
            error: function (err) {
                widget.msgToast('添加活动失败');
            }
        });
    };
});