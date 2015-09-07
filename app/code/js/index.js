// 首页
angular.module('Tjoys')

.controller('tIndex', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.showHeader = true;

    console.log($rootScope);

    $rootScope.Menu = "club";
});
