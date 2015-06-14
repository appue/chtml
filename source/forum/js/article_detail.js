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
    cachePool,
    routerRedirect,
    widget
){
    
    //--设置返回按钮
    // var isFrom = $location.$$search.isFrom || $location.$$search.isfrom || '';

    var currentUrl = widget.getCurrentUrl();

    $scope.backParam = { 'url': ['home/#/index'] };
    $scope.DataList = {};
    
    //--判断用户是否登录
    if (cachePool.pull('UserInfo')) {
        $scope.isLogin = true;
        //--设置横向滚动
        $scope.myScrollOptions = {
            'wrapper': {}
        };
    } else {
        $scope.isLogin = false;
    }

    //--跳转URL
    $scope.redirectUrl = {
        //--点评列表
        CommentList: {
            'url': ['forum/#/comment/list/'+ $stateParams.id +'.htm?from='+ currentUrl]
        },

        //--登录Url
        Login: {
            'url': ['entry/#/login.htm?from='+ currentUrl]
        },

        //--私聊
        Chat: {
            'url': ['/home/#/msg/chat-1.htm?from='+ currentUrl]
        }
    };



    widget.ajaxRequest({
        noMask: true,
        url: 'getContentArticle',
        data: {
            ArticleId: $stateParams.id
        },
        success: function (data) {
            angular.forEach(data.ArticleList, function (v, k) {
                v.SiteUrl = {
                    'url': ['forum/#/thread-'+ v.ArticleId +'.htm?from='+ currentUrl]
                }
            });

            angular.extend($scope.DataList, data)
        }
    });

});