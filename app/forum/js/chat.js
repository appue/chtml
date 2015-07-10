/*
* 消息-聊天
* /home/#/msg/chat-{uid}.htm
*/
angular.module('phoneApp')

.controller('tMsgChat', function(
    $scope, 
    $state
){
    
    $scope.Page = {
        Title: "开心每一天",
        Next: "TA的主页",
        NextUrl: "#/forum/club/list.htm"
    };

});