/*
* 消息-赞
* /home/#/msg/praise
*/
angular.module('phoneApp')

.controller('tMsgPraise', function(
    $scope, 
    $state,
    $ionicNavBarDelegate,
    $ionicHistory
){
    //--设置默认返回
    $scope.backParam = {
        'url': ['home/#/msg.htm']
    };
    
    $scope.$ionicGoBack = function () {
        $ionicHistory.goBack();
    };

    angular.extend($ionicNavBarDelegate, {
        showBackButton: true,
        viewTitle: "赞"
    })
});