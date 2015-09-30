// 首页
angular.module('Tjoys')

.controller('tListDetail', function (
    $sce,
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu    = 'article';
    $rootScope.SubMenu = $stateParams.type ? 'list-'+ $stateParams.type : 'list';

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
});
