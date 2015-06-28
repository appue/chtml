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
    $ionicHistory,
    widget
){

    $scope.footerTab = 1;
    $scope.currentTab = 1;


    $scope.DataList = {
        ListLeft: [], 
        ListRight: []
    };
    
    //显示loadding
    $ionicLoading.show({
      template: 'Loading...'
    });


    //$ionicBackdrop.retain();



    //--获取幻灯片图片
    widget.ajaxRequest({
        noMask: true,
        url: 'getHomeImage',
        success: function (data) {
            angular.extend($scope.DataList, data);

            $ionicLoading.hide();
        },
        error: function (data) {
            $ionicLoading.hide();
        }
    });

});
