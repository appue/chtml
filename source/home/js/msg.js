/*
* 消息页面
* /home/#/msg/
*/
angular.module('phoneApp')

.controller('HomeMsgCtrl', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect
) {
    
    var pageView = {
        init: function() {
            var self = this;

            self._setDeploy();

            self._setLink();
        },

        _setDeploy: function() {
            var self = this;

            $scope.footerTab = 4;

            console.log($location);
        },

        _setLink: function() {
            var self = this;

            $scope.itemClick = function(e) {
                var $that = angular.element(e.delegationTarget);

                var type = $that.attr('data-type'),
                    url = [];

                switch (type) {
                    case 'praise': //--赞
                        url = [
                            'home/#/msg/praise',
                            'home/index.html#/msg/praise'
                            // 'home/index.html#/msg/praise?from='+ encodeURIComponent('home/index.html#/msg/notice')
                        ];
                    break;

                    case 'comment': //--评论
                        url = [
                            'home/#/msg/praise',
                            'home/index.html#/msg/praise'
                        ];
                    break;

                    case 'notice': //--通知
                        url = [
                            'home/#/msg/notice',
                            'home/index.html#/msg/notice'
                        ];
                    break;

                    case 'whisper': //--私聊
                        url = [
                            'home/#/msg/whisper',
                            'home/index.html#/msg/whisper'
                        ];
                    break;

                    case 'search': //--邀请好友
                        url = [
                            'home/#/msg/search',
                            'home/index.html#/msg/search'
                        ];
                    break;
                }

                routerRedirect.toJump({
                    'url': url
                });
            };
        }
    };

    pageView.init();
});