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

        // Type: $stateParams.type || '',
        Type: '',
        SelectId: [], // 选择的文章ID,
        isAll: false
    };

    $scope.tmpType = $stateParams.type || '';

    switch ($scope.tmpType) {
        case 'yes':
            $scope.Page.Type = 'yCate';
            break;
        case 'no':
            $scope.Page.Type = 'nCate';
            break;
        case 'home':
            $scope.Page.Type = 'yHome';
            break;
        default:
            $scope.Page.Type = '';
    }

    $scope.DataList = {};

    $scope.loadMore = function () {
        $scope.Page.isAll = false;

        widget.ajaxRequest({
            scope: $scope,
            url: 'getArticleList',
            data: {
                // CateId: parseInt($stateParams.cateid, 0) || '',
                CateId: $scope.Page.tCateId,
                Type: $scope.Page.Type,
                PageIndex: $scope.Page.pageIndex,
                PageSize: $scope.Page.pageSize
            },
            success: function (res) {
                angular.extend($scope.DataList, res);
            }
        });
    };

    $scope.loadMore();


    $scope.$watch('Page.tCateId', function () {
        $scope.loadMore();
    });

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

                    res.CategoryList.unshift({
                        CateName: '选择筛选栏目'
                    });
                    $scope.Page.CateId.splice(key+1, len-key+1);
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
            msg = '',
            type  = $that.attr('data-type');

        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();
        }

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('选择推荐的图片');
            return;
        }

        switch (type) {
            case 'nCate':
                msg = '取消栏目推荐';
            break;
            case 'nHome':
                msg = '取消首页推荐';
            break;
            case 'yCate':
                msg = '栏目推荐';
            break;
            case 'yHome':
                msg = '首页推荐';
            break;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticleCheck',
            errmsg: msg +'失败',
            data: {
                ArticleId: $scope.Page.SelectId,
                Type: type
            },
            success: function (res) {
                widget.msgToast(msg +'成功');
                $scope.loadMore();
            },
            error: function (err) {
                widget.msgToast(msg +'失败');
            }
        });
    };

    // 选择ID
    $scope.setSelect = function (e, type) {
        if (type && type == 'all') {
            if ($scope.Page.isAll) {
                angular.forEach($scope.DataList.ArticleList, function (v, k) {
                    v.Check = false;
                });
                $scope.Page.isAll = false;
            } else {
                angular.forEach($scope.DataList.ArticleList, function (v, k) {
                    v.Check = true;
                });
                $scope.Page.isAll = true;
            }
        } else {
            var $that = angular.element(e.target),
                state = true,
                key   = $that.attr('data-key'),
                id    = $that.attr('data-id');

            if ($scope.DataList.ArticleList[key].Check) {
                $scope.Page.isAll = false;
            }

            $scope.DataList.ArticleList[key].Check = !$scope.DataList.ArticleList[key].Check;

            angular.forEach($scope.DataList.ArticleList, function (v, k) {
                if (!v.Check) {
                    state = false;
                }
            });

            if (state) {
                $scope.Page.isAll = true;
            } else {
                $scope.Page.isAll = false;
            }
        }
    };
    $scope.getSelect = function () {
        $scope.Page.SelectId = [];

        angular.forEach($scope.DataList.ArticleList, function (v, k) {
            if (v.Check) {
                $scope.Page.SelectId.push(v.ArticleId);
            }
        });
    };
    // $scope.setSelect = function (e) {
    //     var $that = angular.element(e.target),
    //         state = false,
    //         key,
    //         id    = $that.attr('data-id');

    //     // $that.addClass('select');
    //     // alert($that.hasClass('select'));

    //     angular.forEach($scope.Page.SelectId, function (v, k) {
    //         if (v == id) {
    //             state = true;
    //             key = k;
    //         }
    //     });

    //     if (!state) {
    //         $that.addClass('select');
    //         $scope.Page.SelectId.push(id);
    //     }

    //     if (state) {
    //         $scope.Page.SelectId.splice(key, 1);
    //         $that.removeClass('select');
    //     }

    //     console.log($scope.Page.SelectId);
    // };


    // 分页
    // $scope.changePage = function (e) {
    //     var $that = angular.element(e.delegationTarget);
    //         id    = $that.attr("data-id");

    //     // $state.go("mange.list", {page: id});
    //     $scope.Page.pageIndex = id;
    //     $scope.loadMore();
    // };

    // 删除
    $scope.delData = function (e, id) {
        var $that = angular.element(e.target),
            type  = $that.attr('data-type');

        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();
        }

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
