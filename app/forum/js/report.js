angular.module('phoneApp')

.controller('tReport', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    widget
){

    //--设置返回按钮
    // $scope.backParam = {
    //     'url': ['forum/#/thread-'+ $stateParams.id +'.htm']
    // };

    $scope.inputData = {};
    
    $scope.submitData = function() {

        if (!$scope.inputData.contact) {
            widget.msgToast('请填您的联系方式！');
            return;
        }

        if (!$scope.inputData.content) {
            widget.msgToast('请填上举报理由！');
            return;
        }
        
        widget.ajaxRequest({
            noMask: true,
            url: 'setReportArticle',
            data: {
                ArticleId: $stateParams.id, //-----帖子ID
                Contact: $scope.inputData.contact,//-------联系方式
                ReportReason: $scope.inputData.content //--举报理由
            },
            success: function (data) {
                widget.msgToast('感谢您的举报！');
            }
        });

    }

});