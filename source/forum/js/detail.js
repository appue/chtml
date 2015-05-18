angular.module('phoneApp')

.controller('tArticleDetail', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
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

});