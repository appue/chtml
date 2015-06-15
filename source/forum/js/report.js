angular.module('phoneApp')

.controller('tReport', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/thread-'+ $stateParams.id +'.htm']
    };

    $scope.inputVal = {};
    
    $scope.submitData = function() {
        
        widget.ajaxRequest({
            noMask: true,
            url: 'setReportArticle',
            data: {
                ArticleId: $stateParams.id, //-----帖子ID
                Contact: $scope.inputVal.contact,//-------联系方式
                ReportReason: $scope.inputVal.content //--举报理由
            },
            success: function (data) {
                widget.msgToast('感谢您的举报！');
            }
        });

    }

});