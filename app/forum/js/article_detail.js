/*
 * 发现-帖子终极页(帖子详情页)
 * /clump/#/thread-{id}.htm
 */
angular.module('phoneApp')

.controller('tArticleDetail', function(
    $scope,
    $state,
    $window,
    $location,
    $stateParams,
    $ionicViewSwitcher,
    cachePool,
    widget
) {
    //--设置返回按钮
    // var isFrom = $location.$$search.isFrom || $location.$$search.isfrom || '';

    widget.initUser($scope);

    $scope.DataList = {};

    $scope.showLayout = function () {
        $scope.isShowLayout = !$scope.isShowLayout;

        if ($scope.isShowLayout) {
            angular.element(document.querySelector('.isscroll'))[0].style.overflowY = 'hidden';   
        } else {
            angular.element(document.querySelector('.isscroll'))[0].style.overflowY = 'scroll';
        }
    };

    $scope.hideLayout = function () {
        $scope.isShowLayout = false;
        angular.element(document.querySelector('.isscroll'))[0].style.overflowY = 'scroll';
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

    // $scope.headerScroll = function() {
    //     widget.changeOpacity();
    // };

    // 删除帖子
    $scope.setDelete = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticleDel',
            data: {
                ArticleId: $scope.articleId
            },
            success: function(data) {
                if (data.Response && data.Response.Ack == "Success") {
                    widget.msgToast('删除成功');
                } else {
                    widget.msgToast('删除失败');
                }

                $ionicViewSwitcher.nextDirection('back'); //forward
                $window.history.back();
            }
        });
    };

});