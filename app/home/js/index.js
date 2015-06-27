/*
* 首页
* /home/#/index
*/
angular.module('phoneApp')

.controller('tHome', function (
    $scope, 
    $state,
    $timeout,
    $ionicLoading,
    $ionicBackdrop,
    $ionicHistory
){

    $scope.currentTab = 1;

    
    // $ionicLoading.show({
    //   template: 'Loading...'
    // });

// $ionicBackdrop.retain();

$scope.a = function () {
    $state.go('msg.index');
};

    $scope.myGoBack = function() {
        $ionicHistory.goBack();
    };

});
