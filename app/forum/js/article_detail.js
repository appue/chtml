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
    $ionicHistory,
    $ionicViewSwitcher,
    cachePool,
    widget
) {
    //--设置返回按钮
    // var isFrom = $location.$$search.isFrom || $location.$$search.isfrom || '';

    widget.initUser($scope);

    $scope.DataList = {};
    $scope.cInput = {
        comment: ""
    };

    $scope.articleId = $stateParams.id || 0;
    $scope.hideScroll = function () {
        angular.element(document.querySelector('.isscroll'))[0].style.overflowY = 'hidden';
    };
    $scope.showScroll = function () {
        angular.element(document.querySelector('.isscroll'))[0].style.overflowY = 'scroll';
    };


    $scope.showLayout = function () {
        $scope.isShowLayout = !$scope.isShowLayout;
        $scope.isComment = false;

        if ($scope.isShowLayout) {
            $scope.hideScroll();   
        } else {
            $scope.showScroll();
        }
    };

    $scope.hideLayout = function () {
        $scope.isShowLayout = false;
        $scope.showScroll();
    };


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

    // 赞帖子
    $scope.setPraise = function() {
        if (!$scope.Deploy.isLogin) {
            $scope.showLogin();
            return;
        }
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
        if (!$scope.Deploy.isLogin) {
            $scope.showLogin();
            return;
        }
        
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
                // $window.history.back();
                $ionicHistory.goBack();
            }
        });
    };

    // 发表评论
    $scope.showComment = function () {
        if (!$scope.Deploy.isLogin) {
            $scope.showLogin();
            return;
        }
        $scope.isComment = !$scope.isComment;

        if ($scope.isComment) {
              $scope.hideScroll();
        } else {
            $scope.showScroll();
        }
    };
    $scope.hideComment = function () {
        $scope.isComment = false;
        $scope.showScroll();
    };
    $scope.setComment = function () {
        if (!$scope.Deploy.isLogin) {
            $scope.showLogin();
            return;
        }

        if ($scope.cInput.comment.length < 6) {
            widget.msgToast('请多说点内容吧！');

            return;
        };

        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticleComment',
            data: {
                ArticleId: $scope.articleId,
                Content: $scope.cInput.comment
            },
            success: function(data) {
                $scope.isComment = false;
                $scope.cInput.comment = "";
                widget.msgToast('评论发表成功');
            }
        });
    };


    // 收藏帖子
    $scope.setCollect = function () {
        if (!$scope.Deploy.isLogin) {
            $scope.showLogin();
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticleCollect',
            data: {
                ArticleId: $scope.articleId
            },
            success: function(data) {
                widget.msgToast('帖子收藏成功');
            }
        });
    };

});