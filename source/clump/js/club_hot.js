/*
* 热门圈子
* /clump/#/club/hot.htm
*/
angular.module('phoneApp')

.controller('tClubHot', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    //--查看全部圈子
    $scope.redirectUrl = {
        Club: {
            'url': [
                'clump/#/club/list.htm'
            ]
        }
    };

    //--设置返回按钮
    $scope.backParam = {
        'url': [
            'clump/#/find.htm',
            'clump/index.html#/find.htm'
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

    };

});