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
    $scope.startImages = [
        {
            ImageUrl: '../themes/temp/start_3.jpg',
        },
        {
            ImageUrl: '../themes/temp/start_2.jpg',
        },
        {
            ImageUrl: '../themes/temp/start_1.jpg',
        },
        {
            ImageUrl: '../themes/temp/start_4.jpg',
        }
    ];

    $timeout(function () {
        // $state.go('index');
        routerRedirect.toJump({
            'url': ['home/#/entry.htm']
        })
    }, 4000);
});
