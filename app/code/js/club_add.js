angular.module('Tjoys')

.controller('tClubAdd', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'club-add';

    $scope.tInput = {};

    $scope.addClub = function () {
        if (!$scope.tInput.ClubName) {
            widget.msgToast('圈子名称不能为空');
            return;
        }

        if (!$scope.tInput.ImageUrl) {
            widget.msgToast('请上传图片');
            return;
        }

        if (!$scope.tInput.Description) {
            widget.msgToast('请输入圈子介绍');
            return;
        }

        if (!$scope.tInput.Letter) {
            widget.msgToast('请输入圈子所在字母');
            return;
        }

        var data  = angular.extend({}, $scope.tInput);

        widget.ajaxRequest({
            scope: $scope,
            url: 'addClub',
            data: data,
            success: function (res) {
                widget.msgToast('添加圈子成功');
                $scope.tInput = {};
            },
            error: function (err) {
                widget.msgToast('添加圈子失败');
            }
        });
    };
});
