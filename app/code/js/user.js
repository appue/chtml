angular.module('Tjoys')

.controller('tComment', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'article';
    $rootScope.SubMenu = 'comment';
});
