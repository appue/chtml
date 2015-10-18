// 首页
angular.module('Tjoys')

.controller('tListType', function (
    $state,
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu = $stateParams.menu;
    $rootScope.SubMenu = $stateParams.sub;

    $scope.Page = {
        pageIndex: parseInt($stateParams.page, 0) || 1,
        pageSize: 20,

        CateId: [],
        tCateId: '',

        Id: parseInt($stateParams.id, 0),
        Type: $stateParams.type,
        TypeName: '',

        SelectId: [], // 选择的文章ID,
        isAll: false
    };
    $scope.DataList = {};

    switch ($scope.Page.Type) {
        case 'club':
            $scope.Page.TypeName = '圈子';
        break;
        case 'activity':
            $scope.Page.TypeName = '活动';
        break;
        case 'subject':
            $scope.Page.TypeName = '专题';
        break;
    }

    $scope.loadMore = function () {
        $scope.Page.isAll = false;

        widget.ajaxRequest({
            scope: $scope,
            url: 'getArticleList',
            data: {
                CateId: $scope.Page.tCateId,
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

    // 归类
    $scope.Add = function (e, id) {
        var $that = angular.element(e.target),
            type  = $that.attr('data-type');

        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();
        }

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('选择'+$scope.Page.TypeName+'图片');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticleType',
            data: {
                ArticleId: $scope.Page.SelectId,
                Id: $scope.Page.Id,
                Type: $scope.Page.Type
            },
            success: function (res) {
                widget.msgToast('关联'+$scope.Page.TypeName+'成功');
                $scope.Page.SelectId = [];
                $scope.loadMore();
            },
            error: function (err) {
                widget.msgToast('关联'+$scope.Page.TypeName+'失败');
            }
        });
    };
});
