/*
* 消息-搜索好友||消息-好友
* /home/#/msg/search
*/
angular.module('phoneApp')

.controller('tMsgSearch', function(
    $scope, 
    $state
){
    $scope.Page = {
        Title: "邀请好友"
    };
    

    //--设置默认返回
    $scope.backParam = {
        'url': ['home/#/msg.htm']
    };
    
});