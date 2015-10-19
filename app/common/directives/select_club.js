angular.module('Tjoys')

.directive('selectClub', function (
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
        templateUrl: 'common/directives/select_club.html',
        link: function ($scope, $element, $attrs, ngModel) {
            if (!ngModel) return;

            $scope.ClubId = 0;

            $scope.getClub = function () {
                widget.ajaxRequest({
                    scope: $scope,
                    url: 'getListClub',
                    data: {},
                    success: function (res) {
                        res.ClubList.unshift({
                            ClubId: 0,
                            ClubName: '选择推荐的圈子'
                        });
                        $scope.ClubList = res.ClubList;
                    }
                });
            };
            $scope.getClub();

            $scope.changeClub = function () {
                alert($scope.ClubId);

                ngModel.$setViewValue($scope.ClubId);
            };

        }
    };
});