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
                'route': 'msg.praise'
            },
            isNew: true
        },
        {
            Title: '评论',
            ClassName: 'i_comment',
            SiteUrl: {
                'route': 'msg.comment'
            },
            isNew: false
        },
        {
            Title: '通知',
            ClassName: 'i_msg',
            SiteUrl: {
                'route': 'msg.notice'
            },
            isNew: true
        },
        {
            Title: '私聊',
            ClassName: 'i_talk',
            SiteUrl: {
                'route': 'msg.whisper'
            },
            isNew: false
        },
        {
            Title: '邀请好友',
            ClassName: 'i_friend',
            SiteUrl: {
                'route': 'msg.search'
            },
            isNew: false
        }
    ];
});