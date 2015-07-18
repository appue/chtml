/*
* 消息页面
* /home/#/msg/
*/
angular.module('phoneApp')

.controller('tMsgIndex', function (
    $scope,
    $timeout,
    widget
) {

    widget.initUser($scope);

    $scope.footerTab = 4;
    
});