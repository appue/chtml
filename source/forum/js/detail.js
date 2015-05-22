angular.module('phoneApp')

.controller('tArticleDetail', function (
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
    
            widget.ajaxRequest({
                noMask: true,
                url: '$local/Tools/getContentArticle',
                data: {
                    ArticleId: $stateParams.id
                },
                success: function (data) {
                    alert(data);
                }
            });

        }
    };

    pageView.init();

});