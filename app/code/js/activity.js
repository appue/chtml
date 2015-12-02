angular.module('Tjoys')

.controller('tActivity', function (
    $scope,
    $location,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'activity';

    $scope.Page = {
        pageIndex: parseInt($location.search()['page'], 0) || 1,
        pageSize: 10,

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
                ActivityType: 0,
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

    // 删除
    $scope.Delete = function (id) {
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
            url: 'delActivity',
            data: {
                ActivityId: $scope.Page.SelectId
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

    // 编辑
    $scope.Edit = function (id) {
        $scope.isModify = true;

        angular.forEach($scope.DataList.ActivityList, function (v, k) {
            if (v.ActivityId == id) {
                $scope.tInput = {
                    ActivityId: v.ActivityId,
                    ActivityName: v.ActivityName,
                    ActivityLabel: v.ActivityLabel,
                    ActivityType: v.ActivityType,
                    ImageUrl: v.ImageUrl,
                    Intro: v.Intro,
                    Description: v.Description,
                    CateId: v.CateId
                };
            }
        });
    };
    // 提交编辑
    $scope.Submit = function () {
        if (!$scope.tInput.ActivityName) {
            widget.msgToast('专题标题（长标题）不能为空');
            return;
        }

        if (!$scope.tInput.ImageUrl) {
            widget.msgToast('请上传图片');
            return;
        }

        if (!$scope.tInput.Description) {
            widget.msgToast('请输入专题描述');
            return;
        }

        var data  = angular.extend({}, $scope.tInput);

        widget.ajaxRequest({
            scope: $scope,
            url: 'modifyActivity',
            data: data,
            success: function (res) {
                widget.msgToast('修改活动成功');
                $scope.tInput = {};
                $scope.isModify = false;
            },
            error: function (err) {
                widget.msgToast('修改活动失败');
            }
        });
    };
    // 取消编辑
    $scope.Cancel = function () {
        $scope.isModify = false;
    };
});
