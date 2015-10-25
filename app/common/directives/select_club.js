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

            $scope.ClubId = $attrs.id ? parseInt($attrs.id, 0) : 0;
            $scope.ClubName = $attrs.name ? $attrs.name : '选择推荐的圈子';

            $scope.getClub = function () {
                widget.ajaxRequest({
                    scope: $scope,
                    url: 'getListClub',
                    data: {},
                    success: function (res) {
                        if (!$attrs.id) {
                            res.ClubList.unshift({
                                ClubId: 0,
                                ClubName: '选择推荐的圈子'
                            });
                        }
                        $scope.ClubList = res.ClubList;
                    }
                });
            };
            $scope.getClub();

            $scope.changeClub = function () {
                ngModel.$setViewValue($scope.ClubId);
            };

        }
    };
});