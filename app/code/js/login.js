// 首页
angular.module('Tjoys')

.controller('tLogin', function (
    $state,
    $scope,
    $rootScope,
    widget
){
    $rootScope.showHeader = false;

    $scope.cInput = {};

    $scope.toLogin = function () {
        if (!$scope.cInput.Name) {
            widget.msgToast("1111");
            return;
        }
        widget.setLogin({
            UserId: 1,
            Auth: "EWED4494LFOFDF84834BCD8343"
        });

        $state.go("mange.index");
    };
});
