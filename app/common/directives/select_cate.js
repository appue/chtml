angular.module('Tjoys')

.directive('selectCate', function (
    $window,
    $location,
    $rootScope,
    widget
) {
    return {
        restrict: 'E',
        replace: true,
        require: '?ngModel',
        scope: {},
        templateUrl: 'common/directives/select_cate.html',
        link: function ($scope, $element, $attrs, ngModel) {
            if (!ngModel) return;

            $scope.Child = {
                CateId: [],
                tCateId: ''
            };
            $scope.CateList = [];

            $scope.getCate = function () {
                widget.ajaxRequest({
                    scope: $scope,
                    url: 'getListCategory',
                    data: {
                        CateId: $scope.Child.tCateId
                    },
                    success: function (res) {
                        if (res.CategoryList.length > 0) {
                            var len = $scope.CateList.length,
                                key = $scope.Child.CateKey;

                            res.CategoryList.unshift({
                                CateName: '选择筛选栏目'
                            });
                            $scope.Child.CateId.splice(key+1, len-key+1);
                            $scope.CateList.splice(key+1, len-key+1);
                            $scope.CateList.push(res);
                        }
                    }
                });
            };
            $scope.getCate();

            $scope.changeCate = function (key) {
                // alert($scope.Child.CateId);
                // alert($scope.Child.CateId);
                $scope.Child.tCateId = $scope.Child.CateId[key];
                $scope.Child.CateKey = key;
                ngModel.$setViewValue($scope.Child.tCateId);
                $scope.getCate();
            };

        }
    };
});