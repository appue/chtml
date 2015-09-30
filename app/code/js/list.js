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
        Type: $stateParams.type || '',
        SelectId: [] // 选择的文章ID
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

    // 审核推荐文章
    $scope.setCheck = function (e, id) {
        var $that = angular.element(e.target),
            type  = $that.attr('data-type');

        if (id) $scope.Page.SelectId = [id];

        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticle',
            data: {
                ArticleId: $scope.Page.SelectId,
                Type: type
            },
            success: function (res) {

            }
        });
    };

    // 选择ID
    $scope.setSelect = function (e) {
        var $that = angular.element(e.target),
            state = false,
            id    = $that.attr('data-id');

        angular.forEach($scope.Page.SelectId, function (v, k) {
            if (v == id) state = true
        });

        if (!state) $scope.Page.SelectId.push(id);

        console.log($scope.Page.SelectId);
    };
});
