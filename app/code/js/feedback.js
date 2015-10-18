angular.module('Tjoys')

.controller('tFeedback', function (
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu = 'web';
    $rootScope.SubMenu = 'feedback';

    $scope.Page = {
        pageIndex: parseInt($stateParams.index, 0) || 1,
        pageSize: 20,

        SelectId: [], // 选择的ID,
        isAll: false
    };

    $scope.DataList = {};

    $scope.loadMore = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getCommentList',
            data: {
                PageIndex: $scope.Page.pageIndex,
                PageSize: $scope.Page.pageSize
            },
            success: function (res) {
                $scope.DataList = res;
            }
        });
    };

    $scope.loadMore();

    // 选择ID
    $scope.setSelect = function (e, type) {
        if (type && type == 'all') {
            if ($scope.Page.isAll) {
                angular.forEach($scope.DataList.CommentList, function (v, k) {
                    v.Check = false;
                });
                $scope.Page.isAll = false;
            } else {
                angular.forEach($scope.DataList.CommentList, function (v, k) {
                    v.Check = true;
                });
                $scope.Page.isAll = true;
            }
        } else {
            var $that = angular.element(e.target),
                state = true,
                key   = $that.attr('data-key'),
                id    = $that.attr('data-id');

            if ($scope.DataList.CommentList[key].Check) {
                $scope.Page.isAll = false;
            }

            $scope.DataList.CommentList[key].Check = !$scope.DataList.CommentList[key].Check;

            angular.forEach($scope.DataList.CommentList, function (v, k) {
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

        angular.forEach($scope.DataList.CommentList, function (v, k) {
            if (v.Check) {
                $scope.Page.SelectId.push(v.CommentId);
            }
        });
    };

    // 删除评论
    $scope.delComment = function (id) {
        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();
        }

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('请选择要删除的评论');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'delComment',
            data: {
                CommentId: $scope.Page.SelectId
            },
            success: function (res) {
                $scope.loadMore();
                widget.msgToast('评论删除成功');
            },
            error: function (err) {
                widget.msgToast('评论删除失败');
            }
        })
    }
});
