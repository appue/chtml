angular.module('phoneApp')

.controller('tPhotoCate', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    $ionicViewSwitcher,
    widget
){

    $scope.Page = {
        Title: "选择标签",
        Next: "完成"
    };

    // $ionicViewSwitcher.nextDirection('forward');

    
});