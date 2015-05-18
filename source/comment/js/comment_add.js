angular.module('phoneApp')

.controller('CommentAddCtrl', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
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