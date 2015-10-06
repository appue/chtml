angular.module('Tjoys')

.controller('tClubThread', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'club';

    $scope.DataList = {};
});
