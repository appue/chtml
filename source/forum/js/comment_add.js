angular.module('phoneApp')

.controller('tCommentAdd', function (
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

});