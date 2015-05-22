angular.module('phoneApp')

.directive('footerBar', function (
    $state, 
    routerRedirect
) {
    var obj = [
        ['home/#/index', 'home/index.html#/index'],
        ['clump/#/find.html', 'clump/index.html#/find.htm'],
        ['home/#/index', 'home/index.html#/index'],
        ['home/#/msg', 'home/index.html#/msg'],
        ['member/#/index', 'member/index.html#/index']
    ];

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/directives/footer_bar.html',
        controller: function ($scope) {
            // var currentUrl = $state.current.url.replace(/^\//g, '');
            var current = $scope.footerTab;

            $scope.menuChange = function(e) {
                if (e.target.nodeName == 'LI') {

                    var $that = angular.element(e.target);

                    var direction = 'up',
                        id = $that.attr('data-id');

                    if (id < current) {
                        direction = 'down';
                    }

                    $that.addClass('current');

                    routerRedirect.toJump({
                        'opts': {
                            'direction': direction
                        },
                        'url': obj[id-1]
                    });
                }
            }
        }
    };
});