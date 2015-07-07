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
    $ionicLoading,
    cachePool,
    widget
){
    //--设置返回按钮
    // var isFrom = $location.$$search.isFrom || $location.$$search.isfrom || '';

    $scope.DataList = {};
    
    //--判断用户是否登录
    var userInfo = cachePool.pull('UserInfo');
    if (userInfo) {
        $scope.isLogin = true;
    } else {
        $scope.isLogin = false;
    }

    $scope.showLayout = function () {
        $scope.isShowLayout = !$scope.isShowLayout;
    };

    //--跳转URL
    $scope.redirectUrl = {
        //--点评列表
        CommentList: {
            'url': ['forum/#/comment/list/'+ $stateParams.id +'.htm']
        },

        //--登录Url
        Login: {
            'url': ['entry/#/login.htm']
        },

        //--私聊
        Chat: {
            'url': ['/home/#/msg/chat-1.htm']
        },

        //--举报
        Report: {
            'url': ['forum/#/report/'+ $stateParams.id +'.htm']
        },

        //--编辑
        Edit: {

        }
    };

    //--获取帖子内容
    widget.ajaxRequest({
        noMask: true,
        url: 'getContentArticle',
        data: {
            ArticleId: $stateParams.id
        },
        success: function (data) {
            angular.extend($scope.DataList, data);

            if (userInfo && (userInfo.UserId == data.Author.UserId)) {
                $scope.isOwner = true;  
            } else {
                $scope.isOwner = false;
            }
        },
        error: function (data) {
        }
    });

    //--赞帖子
    $scope.setPraise = function () {
        alert(1);
        widget.ajaxRequest({
            noMask: true,
            url: 'setArticlePraise',
            data: {
                ArticleId: $stateParams.id
            },
            success: function (data) {
            }
        });
    };
});