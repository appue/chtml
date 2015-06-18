/*
* 消息-聊天
* /home/#/msg/chat-{uid}.htm
*/
angular.module('phoneApp')

.controller('tMsgChat', function(
    $scope, 
    $state
){
    //--设置默认返回
    $scope.backParam = {
        'url': ['home/#/index']
    };
});