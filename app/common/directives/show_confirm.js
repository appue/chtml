angular.module('Tjoys')

.directive('showConfirm', function (
    $window,
    $rootScope
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/show_page.html',
        controller: function ($scope, $element, $attrs) {

            $scope.changePage = function (e) {
                var $that = angular.element(e.delegationTarget);
                    id    = parseInt($that.text(), 0);

                $scope.Page.pageIndex = id;
                $scope.Page.isAll = false;
                $scope.loadMore();
            };

            $scope.$watch('DataList.Total', function () {
                if (!$scope.DataList.Total) return;

                $scope.PageNum = Math.ceil($scope.DataList.Total / $scope.Page.pageSize);
            });
        }
    };
});