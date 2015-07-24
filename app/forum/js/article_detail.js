/*
 * 发现-帖子终极页(帖子详情页)
 * /clump/#/thread-{id}.htm
 */
angular.module('phoneApp')

.controller('tArticleDetail', function(
    $scope,
    $state,
    $stateParams,
    $location,
    cachePool,
    widget
) {
    //--设置返回按钮
    // var isFrom = $location.$$search.isFrom || $location.$$search.isfrom || '';

    widget.initUser($scope);

    $scope.DataList = {};

    $scope.showLayout = function() {
        $scope.isShowLayout = !$scope.isShowLayout;
    };

    $scope.articleId = $stateParams.id || 0;

    //--跳转URL
    // $scope.redirectUrl = {
    //     //--点评列表
    //     CommentList: {
    //         'url': ['forum/#/comment/list/'+ $stateParams.id +'.htm']
    //     },

    //     //--登录Url
    //     Login: {
    //         'url': ['entry/#/login.htm']
    //     },

    //     //--私聊
    //     Chat: {
    //         'url': ['/home/#/msg/chat-1.htm']
    //     },

    //     //--举报
    //     Report: {
    //         'url': ['forum/#/report/'+ $stateParams.id +'.htm']
    //     },

    //     //--编辑
    //     Edit: {

    //     }
    // };

    //--获取帖子内容
    widget.ajaxRequest({
        scope: $scope,
        url: 'getContentArticle',
        data: {
            ArticleId: $scope.articleId
        },
        success: function(data) {
            angular.extend($scope.DataList, data);

            if ($scope.Deploy.uId == data.Author.UserId) {
                $scope.isOwner = true;
            } else {
                $scope.isOwner = false;
            }
        }
    });

    //--赞帖子
    $scope.setPraise = function() {
        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticlePraise',
            data: {
                ArticleId: $scope.articleId
            },
            success: function(data) {}
        });
    };

    $scope.headerScroll = function() {
        widget.changeOpacity();
    };

});