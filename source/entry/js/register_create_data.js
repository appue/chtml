userEntry.controller('registerCreateCtrl', function ($scope, $state, $timeout, $stateParams) {

    $scope.inputVal = {};
    $scope.inputVal.gender = 1;
    $scope.inputVal.post = '园长';
    $scope.inputVal.tmpPost = '园长';

    $scope.popupConfirm = function () {
        console.log($scope.inputVal);
    };

    $scope.itemClick = function (e) {
        var $that = angular.element(e.delegationTarget);

        console.log($that);

        //todo...

        // 注：
        // e 原始的event对象，但是增加了delegationTarget => 代理target元素
        //
        // 对于selector这块，如果引用了jQuery的话，则支持的是jquery的选择器
        // 对于支持matchesSelector的浏览器来说，支持的就是标准的选择器；
        // 否则的话只能支持tagName...
    };

});