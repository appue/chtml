angular.module('Tjoys')

.controller('tActivity', function (
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'activity';

    $scope.Page = {
        pageIndex: parseInt($stateParams.index, 0) || 1,
        pageSize: 20,

        isAll: false,
        SelectId: []
    };
    $scope.DataList = {};

    $scope.loadMore = function () {
        $scope.Page.isAll = false;

        widget.ajaxRequest({
            scope: $scope,
            url: 'getListActivity',
            data: {
                PageIndex: $scope.Page.pageIndex,
                PageSize: $scope.Page.pageSize
            },
            success: function (res) {
                $scope.DataList = res;
            },
            error: function (err) {
                widget.msgToast('获取活动失败');
            }
        });
    };

    $scope.loadMore();

    // 选择ID
    $scope.setSelect = function (e, type) {
        if (type && type == 'all') {
            if ($scope.Page.isAll) {
                angular.forEach($scope.DataList.ActivityList, function (v, k) {
                    v.Check = false;
                });
                $scope.Page.isAll = false;
            } else {
                angular.forEach($scope.DataList.ActivityList, function (v, k) {
                    v.Check = true;
                });
                $scope.Page.isAll = true;
            }
        } else {
            var $that = angular.element(e.target),
                state = true,
                key   = $that.attr('data-key'),
                id    = $that.attr('data-id');

            if ($scope.DataList.ActivityList[key].Check) {
                $scope.Page.isAll = false;
            }

            $scope.DataList.ActivityList[key].Check = !$scope.DataList.ActivityList[key].Check;

            angular.forEach($scope.DataList.ActivityList, function (v, k) {
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

        angular.forEach($scope.DataList.ActivityList, function (v, k) {
            if (v.Check) {
                $scope.Page.SelectId.push(v.ActivityId);
            }
        });
    };

    // 删除专题
    $scope.delSubject = function (id) {
        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();    
        }

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('请选择要删除的活动');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'delSubject',
            data: {
                ClubId: $scope.Page.SelectId
            },
            success: function (res) {
                $scope.loadMore();
                widget.msgToast('删除活动成功');
            },
            error: function (err) {
                widget.msgToast('删除活动失败');
            }
        });
    };
});
