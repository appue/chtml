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
    var isFrom = $location.$$search.isFrom || $location.$$search.isfrom || '';

    switch (isFrom) {
        case 'home':
            $scope.backParam = {
                'url': [
                    'home/#/index'
                ]
            };
        break;

        case 'like':
            $scope.backParam = {
                'url': [
                    'clump/#/find/like.htm'
                ]
            };
        break;

        default:
            $scope.backParam = {
                'url': [
                    'forum/#/cate/list-sub-1.htm'
                ]
            };

    }
    
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
        CommnetList: {
            'url': [
                'forum/#/comment/list/'+ $stateParams.id +'.htm'
            ]
        },

        //--登录Url
        Login: {
            'url': [
                'entry/#/login.htm'
            ]  
        }
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