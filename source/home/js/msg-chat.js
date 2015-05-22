/*
* 消息-聊天
* /home/#/msg/chat
*/
angular.module('phoneApp')

.controller('HomeMsgChatCtrl', function(
    $scope, 
    $state
){
    
    var pageView = {
        init: function() {
            var self = this;

            self._setDeploy();
        },

        _setDeploy: function() {
            var self = this;
            
            //--设置返回
            $scope.backParam = {
                'module': 'home',
                'hash': 'msgChat'
            };
        }
    };

    pageView.init();
});