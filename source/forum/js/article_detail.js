/*
* 发现-帖子终极页(帖子详情页)
* /clump/#/thread-{id}.htm
*/
angular.module('phoneApp')

.controller('tArticleDetail', function (
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
            'forum/#/cate/list-sub-1.htm',
            'forum/index.html#/cate/list-sub-1.htm'
        ]
    };
    
    // widget.ajaxRequest({
    //     noMask: true,
    //     url: '$local/Tools/getContentArticle',
    //     data: {
    //         ArticleId: $stateParams.id
    //     },
    //     success: function (data) {
    //         alert(data);
    //     }
    // });

});