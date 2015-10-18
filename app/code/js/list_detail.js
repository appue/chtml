// 首页
angular.module('Tjoys')

.controller('tListDetail', function (
    $sce,
    $scope,
    $state,
    $window,
    $location,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu    = $stateParams.menu;
    $rootScope.SubMenu = $stateParams.sub;

    $scope.DataList = {};

    widget.ajaxRequest({
        scope: $scope,
        url: 'getContentArticle',
        data: {
            ArticleId: parseInt($stateParams.id, 0)
        },
        success: function (res) {
            angular.extend($scope.DataList, res);

            angular.forEach($scope.DataList.Images, function (v, k) {
                v.Description = $sce.trustAsHtml(v.Description);
            });

            console.log($scope.DataList);
        }
    });

    $scope.toBack = function () {
        // console.log($location);
        // $state.go('mange.list')
        $window.history.back();
    };
});
