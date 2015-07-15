/*
* 消息页面
* /home/#/msg/
*/
angular.module('phoneApp')

.controller('tMsgIndex', function (
    $scope,
    $timeout,
    widget
) {

    $scope.Page = {
        Title: "评论"
    };

    $scope.footerTab = 4;

    $scope.DataLink = [
        {
            Title: '赞',
            ClassName: 'i_hit',
            SiteUrl: {
                router: 'forum.msg-praise'
            },
            isNew: true
        },
        {
            Title: '评论',
            ClassName: 'i_comment',
            isNew: false
        },
        {
            Title: '通知',
            ClassName: 'i_msg',
            SiteUrl: {
                router: 'forum.msg-notice'
            },
            isNew: true
        },
        {
            Title: '私聊',
            ClassName: 'i_talk',
            SiteUrl: {
                router: 'forum.msg-talk'
            },
            isNew: false
        }
        // {
        //     Title: '邀请好友',
        //     ClassName: 'i_friend',
        //     SiteUrl: {
        //         'router': 'forum.msg-search'
        //     },
        //     isNew: false
        // }
    ];

    //显示登录界面
    $scope.showLogin = function($event) {
        var $that = angular.element(document.querySelector('.js_login')).css('display', 'block');

        $timeout( function () {
            $that.addClass('this_show');
        }, 50);
    };
});