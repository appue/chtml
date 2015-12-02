angular.module('Tjoys')

.controller('tSubjectContent', function (
    $state,
    $scope,
    $location,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu    = 'club';
    $rootScope.SubMenu = 'subject';


    $scope.Page = {
        // pageIndex: parseInt($stateParams.index, 0) || 1,
        pageIndex: parseInt($location.search()['page'], 0) || 1,
        pageSize: 20,

        Id: parseInt($stateParams.id, 0),

        SelectId: [], // 选择的文章ID,
        isAll: false
    };

    $scope.tContent = {};
    $scope.DataList = {};

    $scope.getContent = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getContentSubject',
            data: {
                SubjectId: $scope.Page.Id
            },
            success: function (res) {
                angular.extend($scope.tContent, res);
            }
        })
    };
    $scope.getContent();

    $scope.loadMore = function () {
        $scope.Page.isAll = false;

        widget.ajaxRequest({
            scope: $scope,
            url: 'getListArticle',
            data: {
                SubjectId: $scope.Page.Id,
                PageIndex: $scope.Page.pageIndex,
                PageSize: $scope.Page.pageSize
            },
            success: function (res) {
                angular.extend($scope.DataList, res);
            }
        });
    };
    $scope.loadMore();

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

    // 删除
    $scope.Delete = function (e, id) {
        var $that = angular.element(e.target),
            type  = $that.attr('data-type');

        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();
        }

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('选择取消关联的帖子');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'cancleArticleType',
            data: {
                ArticleId: $scope.Page.SelectId,
                Type: 'subject',
                Id: $scope.Page.Id
            },
            success: function (res) {
                widget.msgToast('取消关联成功');
                $scope.Page.SelectId = [];
                $scope.loadMore();
            },
            error: function (err) {
                widget.msgToast('取消关联失败');
            }
        });
    };
});
