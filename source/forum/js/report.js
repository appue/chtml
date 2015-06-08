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
        'url': [
        ]
    };
    
    $scope.addReport = function() {

        widget.ajaxRequest({
            noMask: true,
            url: '$local/Tools/setReportArticle',
            data: {
                ArticleId: $stateParams.id, //-----帖子ID
                Contact: Contact,//-------联系方式
                ReportReason: ReportReason//--举报理由
            },
            success: function (data) {
                alert(data);
            }
        });

    }

});