angular.module('Tjoys')

.controller('tUser', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'user';
    $rootScope.SubMenu = 'user';
});
