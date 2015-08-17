angular.module('phoneApp')

.controller('tReport', function (
    $scope,
    $state,
    $location,
    $stateParams,
    widget
){

    $scope.cInput = {
        Title: $stateParams.title
    };

    // 头部设置
    $scope.Page = {
        RightText: false,
        RightFun: function () {
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
    };


    $scope.$watch("cInput.contact", function () {
        if ($scope.cInput.contact && $scope.cInput.content) {
            $scope.Page.RightText = "提交";
        } else {
            $scope.Page.RightText = false;
        }
    });


    $scope.$watch("cInput.content", function () {
        if ($scope.cInput.contact && $scope.cInput.content) {
            $scope.Page.RightText = "提交";
        } else {
            $scope.Page.RightText = false;
        }
    });

});