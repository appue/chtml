/*
* 欢迎页面
* /home/#/start.htm
*/
angular.module('phoneApp')

.controller('tHomeStart', function (
    $scope, 
    $state,
    $timeout,
    $timeout,
    cachePool,
    routerRedirect,
    widget
){
    $timeout(function () {
        $state.go('index');
    }, 2000);
});
