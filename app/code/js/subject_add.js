angular.module('Tjoys')

.controller('tSubjectAdd', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'subject-add';

    $scope.tInput = {};

    $scope.addSubject = function () {
        if (!$scope.tInput.LongName) {
            widget.msgToast('专题标题（长标题）不能为空');
            return;
        }
        if (!$scope.tInput.ShortName) {
            widget.msgToast('标题简写（短标题）不能为空');
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

        widget.ajaxRequest({
            scope: $scope,
            url: 'addSubject',
            data: data,
            success: function (res) {
                widget.msgToast('添加专题成功');
                $scope.tInput = {};
            },
            error: function (err) {
                widget.msgToast('添加专题失败');
            }
        });
    };
});
