angular.module('phoneApp')

.controller('HomeIndexCtrl', function($scope, $state){
    $scope.goIndex = function(){
        // // $state.go('homes');
        // window.loa.href = '#/index/homes'
    }

    $scope.tabChange = function(){
        tab.setAttribute('class', 'current');
    }
});