angular.module('phoneApp')

.directive('userLogin', function (
    $state,
    $ionicViewSwitcher,
    $window,
    cachePool,
    ENV
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/user_login.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {
        }
    };
});