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
    var isFrom = $location.$$search.isFrom || $location.$$search.isfrom || '';

    switch (isFrom) {
        case 'home':
            $scope.backParam = {
                'url': [
                    'home/#/index',
                    'home/index.html#/index'
                ]
            };
        break;

        case 'like':
            $scope.backParam = {
                'url': [
                    'clump/#/find/like.htm',
                    'clump/index.html#/find/like.htm'
                ]
            };
        break;

        default:
            $scope.backParam = {
                'url': [
                    'forum/#/cate/list-sub-1.htm',
                    'forum/index.html#/cate/list-sub-1.htm'
                ]
            };

    }
    
    //--设置横向滚动
    $scope.myScrollOptions = {
        'wrapper': {}
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