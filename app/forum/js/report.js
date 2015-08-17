angular.module('phoneApp')

.controller('tReport', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    widget
){

    $scope.cInput = {};
    
    $scope.submitData = function() {

        if (!$scope.cInput.contact) {
            widget.msgToast('请填您的联系方式！');
            return;
        }

        if (!$scope.cInput.content) {
            widget.msgToast('请填上举报理由！');
            return;
        }
        
        widget.ajaxRequest({
            scope: $scope,
            noMask: true,
            url: 'setReportArticle',
            data: {
                ArticleId: $stateParams.id, //-----帖子ID
                Contact: $scope.cInput.contact,//-------联系方式
                ReportReason: $scope.cInput.content //--举报理由
            },
            success: function (data) {
                widget.msgToast('感谢您的举报！');
            }
        });

    }

});