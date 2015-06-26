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
    cachePool,
    widget,
    ENV
){

    $ionicLoading.show({
      template: 'Loading...'
    });

});
