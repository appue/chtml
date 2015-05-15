angular.module('phoneApp')

.controller('HomeMsgCtrl', function ($scope, $state, $stateParams, routerRedirect) {
    
    var view = {
        init: function() {
            var self = this;

            self._setDeploy();

            self._setLink();
        },

        _setDeploy: function() {
            var self = this;

            $scope.footerTab = 4;
        },

        _setLink: function() {
            var self = this;

            $scope.itemClick = function(e) {
                var $that = angular.element(e.delegationTarget);

                var type = $that.attr('data-type'),
                    obj = {
                        'module': 'home'
                    };
                

                switch (type) {
                    case 'praise': //--赞
                        obj.hash = 'msgPraise';
                    break;

                    case 'comment': //--评论
                        obj.hash = 'index';
                    break;

                    case 'notice': //--通知
                        obj.hash = 'msgNotice';
                    break;

                    case 'whisper': //--私聊
                        obj.hash = 'msgWhisper';
                    break;

                    case 'search': //--邀请好友
                        obj.hash = 'msgSearch';
                    break;
                }

                routerRedirect.toJump(obj);
            };
        }
    };

    view.init();
});