'use strict';

angular.module('Tjoys')

.directive('pageBack', function (
    $state,
    $window,
    $rootScope,
    $stateParams,
    widget
) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                $window.history.back();
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

            });
        }
    };
});