/*
* 欢迎页面
* /home/#/start.htm
*/
angular.module('phoneApp')

.controller('tStart', function (
    $scope, 
    $state,
    $timeout,
    $timeout,
    cachePool,
    widget
){  

    localStorage.setItem('PHONEAPP_START', false);

    $scope.eventSlide = true;

    $scope.DataList = {};

    $scope.DataList.ImagesList = [
        {
            ImageUrl: 'themes/temp/start_1.jpg',
        },
        {
            ImageUrl: 'themes/temp/start_2.jpg',
        },
        {
            ImageUrl: 'themes/temp/start_3.jpg',
        },
        {
            ImageUrl: 'themes/temp/start_4.jpg',
        }
    ];

    $timeout(function () {
    }, 8000);
});
