/*
* 消息页面
* /home/#/msg/
*/
angular.module('phoneApp')

.controller('tMsgIndex', function (
    $scope
) {

    $scope.footerTab = 4;

    $scope.DataLink = [
        {
            Title: '赞',
            ClassName: 'i_hit',
            SiteUrl: 'forum.msg-praise',
            isNew: true
        },
        {
            Title: '评论',
            ClassName: 'i_comment',
            SiteUrl: 'forum.msg-comment',
            isNew: false
        },
        {
            Title: '通知',
            ClassName: 'i_msg',
            SiteUrl: 'forum.msg-notice',
            isNew: true
        },
        {
            Title: '私聊',
            ClassName: 'i_talk',
            SiteUrl: 'forum.msg-talk',
            isNew: false
        }
        // {
        //     Title: '邀请好友',
        //     ClassName: 'i_friend',
        //     SiteUrl: {
        //         'route': 'forum.msg-search'
        //     },
        //     isNew: false
        // }
    ];
});