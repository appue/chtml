angular.module('phoneApp')

.directive('footerBar', function ($state, routerRedirect) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/directives/footer_bar.html',
        controller: function ($scope) {
            var obj = {
                    'index': 1,
                    'msg': 4
                };

            $scope.menuChange = function(e) {
                if (e.target.nodeName == 'LI') {

                    var $that = angular.element(e.target);

                    var direction = 'up',
                        currentName = $state.current.name,
                        name = $that.attr('data-name'),
                        hash = $that.attr('data-hash');

                    if (obj[hash] < obj[currentName] ) {
                        direction = 'down';
                    }

                    $that.addClass('current');

                    routerRedirect.toJump({
                        'opts': {
                            'direction': direction
                        },
                        'url': [
                            name +'/#/'+ hash,
                            name +'/index.html#/'+ hash
                        ]
                    });
                }
            }
        }
    };
});