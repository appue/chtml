/*
* 消息-私聊
* /home/#/msg/whisper.htm
*/
angular.module('phoneApp')

.controller('tMsgWhisper', function(
    $scope, 
    $state,
    widget
){
    var currentUrl = widget.getCurrentUrl();
    
    //--设置默认返回
    $scope.backParam = {
        'url': ['home/#/msg']
    };


    $scope.url = {
        'url': ['/home/#/msg/chat-1.htm?from='+ currentUrl ]
    }
});