angular.module('phoneApp')

.controller('tReport', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    
    var pageView = {
        init: function () {
            var self = this;

            self._setDeploy();

            self._setHeader();

            self._updateData();
        },

        _setDeploy: function () {
            var self = this;
        },

        _setHeader: function () {
            var self = this;
            
            //--设置返回按钮
            $scope.backParam = {
                'url': [
                ]
            };
        },

        _updateData: function () {
            var self = this;

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

        }
    };

    pageView.init();

});