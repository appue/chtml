// 意见反馈
angular.module('phoneApp')

.controller('tUserFeedback', function(
    $scope, 
    $state,
    widget
){
    $scope.cInput = {};

    $scope.submitData = function () {

        if (!$scope.cInput.content) {
            widget.msgToast('请输入您需要反馈的信息！');
            return;
        }

        if (!$scope.cInput.phone) {
            widget.msgToast('请输入您的联系方式！');
            return;
        }


        widget.ajaxRequest({
            scope: $scope,
            url: 'setFeedback',
            data: {
                Content: $scope.cInput.content,
                Contact: $scope.cInput.contact
            },
            success: function (data) {
                if (data.Response && data.Response.Ack=="success") {
                    widget.msgToast('请输入您的联系方式！');  
                }
            }
        });
    };

});