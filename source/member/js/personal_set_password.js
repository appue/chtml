personalHomepage.controller('personalSetPasswordCtrl', function ($scope, $stateParams) {

    console.log($stateParams.id);

    $scope.backParam = { //--设置返回按钮
        'url': [
            'personal/#/' + $stateParams.id,
            'personal/index.html#/' + $stateParams.id
        ]
    };

});