/*
* 消息-赞
* /home/#/msg/praise
*/
angular.module('phoneApp')

.controller('HomeMsgPraiseCtrl', function(
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