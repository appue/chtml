angular.module('phoneApp')

.directive('headerBar', function (
    $state,
    cachePool,
    ENV
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/header_bar.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {
        }
    };
})