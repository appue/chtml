/*
* 消息-私聊
* /home/#/msg/whisper.htm
*/
angular.module('phoneApp')

.controller('HomeMsgWhisperCtrl', function(
    $scope, 
    $state
){

    //--设置默认返回
    $scope.backParam = {
        'url': [
            'home/#/msg'
        ]
    };


});