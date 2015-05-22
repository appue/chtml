angular.module('phoneApp')

.controller('tCommentAdd', function (
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

            self._updateData();
        },

        _setDeploy: function () {
            var self = this;

            
            //--设置返回按钮
            $scope.backParam = {
                'module': 'home',
                'hash': 'msg'
            };
        },

        _updateData: function () {
            var self = this;

            $scope.addComment = function() {
                var content = angular.element(document.querySelector('.js_textarea')).val();

                if (!content) return;

                widget.ajaxRequest({
                    noMask: true,
                    url: '$local/Tools/setArticleComment',
                    data: {
                        ArticleId: $stateParams.id,
                        Content: content
                    },
                    success: function (data) {
                        alert(data);
                    }
                });
            };

        }
    }

    pageView.init();

});