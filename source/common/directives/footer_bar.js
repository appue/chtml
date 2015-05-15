angular.module('phoneApp')

.directive('footerBar', function ($state, routerRedirect) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/directives/footer_bar.html',
        controller: function ($scope) {
            $scope.menuChange = function(e) {
                if (e.target.nodeName == 'LI') {

                    var $that = angular.element(e.target);

                    var name = $that.attr('data-name'),
                        hash = $that.attr('data-hash');

                    $that.addClass('current');

                    routerRedirect.toJump({
                        'module': name,
                        'hash': hash,
                        'isAnimate': false
                    });
                }
            }
        }
    };
});