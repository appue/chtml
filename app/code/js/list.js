// 首页
angular.module('Tjoys')

.controller('tList', function (
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
        url: 'getArticleList',
        data: {
            CateId: parseInt($stateParams.cateid, 0) || 0,
            Type: $stateParams.type || ''
        },
        success: function (res) {
            angular.extend($scope.DataList, res);
        }
    })
});
