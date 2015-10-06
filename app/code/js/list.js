// 首页
angular.module('Tjoys')

.controller('tList', function (
    $state,
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu    = 'article';
    $rootScope.SubMenu = $stateParams.type ? 'list-'+ $stateParams.type : 'list';

    $scope.Page = {
        pageIndex: parseInt($stateParams.index, 0) || 1,
        pageSize: 20,

        CateId: [],
        tCateId: '',

        Type: $stateParams.type || '',
        SelectId: [] // 选择的文章ID
    };

    $scope.DataList = {};

    $scope.loadMore = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getArticleList',
            showPage: true,
            data: {
                CateId: parseInt($stateParams.cateid, 0) || 0,
                Type: $stateParams.type || '',
                PageIndex: $scope.Page.pageIndex,
                PageSize: $scope.Page.pageSize
            },
            success: function (res) {
                angular.extend($scope.DataList, res);
            }
        });
    };

    $scope.loadMore();

    $scope.CateList = [];
    $scope.getCate = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getListCategory',
            data: {
                CateId: $scope.Page.tCateId
            },
            success: function (res) {
                if (res.CategoryList.length > 0) {
                    var len = $scope.CateList.length,
                        key = $scope.Page.CateKey;

                    $scope.CateList.splice(key+1, len-key+1);
                    $scope.CateList.push(res);
                }
            }
        });
    };
    $scope.getCate();

    $scope.changeCate = function (key) {
        // alert($scope.Page.CateId);
        // alert($scope.Page.CateId);
        $scope.Page.tCateId = $scope.Page.CateId[key];
        $scope.Page.CateKey = key;
        $scope.getCate();
    };

    $scope.setCate = function (e) {
        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('选择归类的图片');
            return;
        }
    };

    // 审核推荐文章
    $scope.setCheck = function (e, id) {
        var $that = angular.element(e.target),
            type  = $that.attr('data-type');

        if (id) $scope.Page.SelectId = [id];

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('选择推荐的图片');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticleCheck',
            data: {
                ArticleId: $scope.Page.SelectId,
                Type: type
            },
            success: function (res) {
                widget.msgToast('推荐成功');
                $scope.loadMore();
            },
            error: function (err) {
                widget.msgToast('推荐失败');
            }
        });
    };

    // 选择ID
    $scope.setSelect = function (e) {
        var $that = angular.element(e.target),
            state = false,
            key,
            id    = $that.attr('data-id');

        // $that.addClass('select');
        // alert($that.hasClass('select'));

        angular.forEach($scope.Page.SelectId, function (v, k) {
            if (v == id) {
                state = true;
                key = k;
            }
        });

        if (!state) {
            $that.addClass('select');
            $scope.Page.SelectId.push(id);
        }

        if (state) {
            $scope.Page.SelectId.splice(key, 1);
            $that.removeClass('select');
        }

        console.log($scope.Page.SelectId);
    };


    // 分页
    $scope.changePage = function (e) {
        var $that = angular.element(e.delegationTarget);
            id    = $that.attr("data-id");

        // $state.go("mange.list", {page: id});
        $scope.Page.pageIndex = id;
        $scope.loadMore();
    };

    // 删除
    $scope.delData = function (e, id) {
        var $that = angular.element(e.target),
            type  = $that.attr('data-type');

        if (id) $scope.Page.SelectId = [id];

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('选择删除的图片');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'delArticle',
            data: {
                ArticleId: $scope.Page.SelectId
            },
            success: function (res) {
                widget.msgToast('删除成功');
                $scope.loadMore();
            },
            error: function (err) {
                widget.msgToast('删除失败');
            }
        });
    };
});
