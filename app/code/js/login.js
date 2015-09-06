// 首页
angular.module('Tjoys')

.controller('tLogin', function (
    $state,
    $scope,
    $rootScope,
    widget
){
    $rootScope.showHeader = false;

    $scope.toLogin = function () {
        widget.setLogin({
            UserId: 1,
            Auth: "EWED4494LFOFDF84834BCD8343"
        });

        $state.go("mange.index");
    };
});
