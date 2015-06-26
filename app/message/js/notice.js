/*
* 消息-通知
* /home/#/msg/notice.htm
*/
angular.module('phoneApp')

.controller('tMsgNotice', function(
    $scope, 
    $state
){

    //--设置默认返回
    $scope.backParam = {
        'url': ['home/#/msg.htm']
    };

});