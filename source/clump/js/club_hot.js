angular.module('phoneApp')

.controller('tClubHot', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    $scope.jumpClubList = {
        'module': 'clump',
        'hash': 'clubList'
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