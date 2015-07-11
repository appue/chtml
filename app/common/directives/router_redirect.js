'use strict';

angular.module('phoneApp')

.directive('pageBack', function (
    $window,
    $state,
    $rootScope,
    $stateParams,
    $ionicHistory,
    $ionicViewSwitcher
) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function () {

                // if (attrs.pageBack) {

                //     var params = scope.$eval(attrs.pageBack);

                //     console.log(params);

                // } else if (false) { //特殊情况处理

                //     console.log(1);

                // } else { // 默认执行浏览器后退
                    
                    $ionicViewSwitcher.nextDirection('back'); //forward
                    $window.history.back();
                // }

                // $ionicHistory.goBack();

                // $rootScope.$ionicGoBack();
            });
        }
    };
})


.directive('pageJump', function (
    $window,
    $state,
    $rootScope,
    $stateParams,
    $ionicHistory,
    $ionicViewSwitcher
) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function (event) {
                
                var router = attrs.router,
                    options = attrs.options ? JSON.parse(attrs.options) : {};

                $ionicViewSwitcher.nextDirection('forward');
                $state.go(router, options);

            });
        }
    };
});