angular.module('Tjoys')

.controller('tBannerAdd', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'web';
    $rootScope.SubMenu = 'banner';

    $scope.tInput = {
        Page: 'home',
		Model: "1"
    };

    $scope.addBanner = function () {
        if (!$scope.tInput.Title) {
            widget.msgToast('广告标题不能为空');
            return;
        }

        if (!$scope.tInput.ImageUrl) {
            widget.msgToast('请上传图片');
            return;
        }

        var data  = angular.extend({}, $scope.tInput);

        widget.ajaxRequest({
            scope: $scope,
            url: 'addBanner',
            data: data,
            success: function (res) {
                widget.msgToast('添加广告成功');
                $scope.tInput = {};
            },
            error: function (err) {
                widget.msgToast('添加广告失败');
            }
        });
    };
});
