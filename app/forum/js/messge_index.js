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
            SiteUrl: {
                'route': 'forum.msg-praise'
            },
            isNew: true
        },
        {
            Title: '评论',
            ClassName: 'i_comment',
            SiteUrl: {
                'route': 'forum.msg-comment'
            },
            isNew: false
        },
        {
            Title: '通知',
            ClassName: 'i_msg',
            SiteUrl: {
                'route': 'forum.msg-notice'
            },
            isNew: true
        },
        {
            Title: '私聊',
            ClassName: 'i_talk',
            SiteUrl: {
                'route': 'forum.msg-whisper'
            },
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