/*
* 设置-意见反馈
* /home/#/set/feedback
*/
angular.module('phoneApp')

.controller('HomeSetFeedbackCtrl', function(
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