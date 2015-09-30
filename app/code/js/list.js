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

    $scope.Page = {
        Type: $stateParams.type || ''
    };

    $scope.DataList = {};

    // widget.ajaxRequest({
    //     scope: $scope,
    //     url: 'getArticleList',
    //     data: {
    //         CateId: parseInt($stateParams.cateid, 0) || 0,
    //         Type: $stateParams.type || ''
    //     },
    //     success: function (res) {
    //         angular.extend($scope.DataList, res);
    //     }
    // })



    widget.ajaxRequest({
        scope: $scope,
        url: 'getListArticle',
        data: {
            CateId: 1,
            PageIndex: 1,
            PageSize: 100
        },
        success: function (res) {
            angular.extend($scope.DataList, res);

            console.log($scope.DataList);
        }
    });
});
