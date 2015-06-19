/*
* 消息页面
* /home/#/msg/
*/
angular.module('phoneApp')

.controller('tMsg', function (
    $scope,
    routerRedirect,
    widget
) {
    
    widget.toLogin();

    $scope.footerTab = 4;

    $scope.DataLink = [
        {
            Title: '赞',
            ClassName: 'i_hit',
            SiteUrl: {
                'url': ['home/#/msg/praise']
            },
            isNew: true
        },
        // {
        //     Title: '评论',
        //     ClassName: 'i_comment',
        //     SiteUrl: {
        //         'url': ['home/#/msg/praise']
        //     },
        //     isNew: false
        // },
        {
            Title: '通知',
            ClassName: 'i_msg',
            SiteUrl: {
                'url': ['home/#/msg/notice.htm']
            },
            isNew: true
        },
        {
            Title: '私聊',
            ClassName: 'i_talk',
            SiteUrl: {
                'url': ['home/#/msg/whisper.htm']
            },
            isNew: false
        },
        {
            Title: '邀请好友',
            ClassName: 'i_friend',
            SiteUrl: {
                'url': ['home/#/msg/search']
            },
            isNew: false
        }
    ];

    // $scope.itemClick = function(e) {
    //     var $that = angular.element(e.delegationTarget);

    //     var type = $that.attr('data-type'),
    //         url = [];

    //     switch (type) {
    //         case 'praise': //--赞
    //             url = [
    //                 'home/#/msg/praise'
    //             ];
    //         break;

    //         case 'comment': //--评论
    //             url = [
    //                 'home/#/msg/praise'
    //             ];
    //         break;

    //         case 'notice': //--通知
    //             url = [
    //                 'home/#/msg/notice'
    //             ];
    //         break;

    //         case 'whisper': //--私聊
    //             url = [
    //                 'home/#/msg/whisper'
    //             ];
    //         break;

    //         case 'search': //--邀请好友
    //             url = [
    //                 'home/#/msg/search'
    //             ];
    //         break;
    //     }

    //     routerRedirect.toJump({
    //         'url': url
    //     });
    // };
});