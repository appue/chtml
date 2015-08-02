angular.module('phoneApp')

.controller('tPhotoCate', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    $ionicViewSwitcher,
    $ionicPopup,
    $window,
    widget
){
    //初始化用户信息
    widget.initUser($scope);

    $scope.CameraImages = widget.cacheData("CameraImages") || '';

    if (!$scope.CameraImages || !$scope.CameraImages.Images || $scope.CameraImages.Images.length == 0) {
        $ionicViewSwitcher.nextDirection('back');
        $window.history.back();
        return;
    }


    angular.extend($scope.Deploy, {
        cateId: $stateParams.id || 1
    });
    $scope.DataList = {
        CateList: [],
        currentId: $scope.CameraImages.CateId || 0
    };


    widget.ajaxRequest({
        scope: $scope,
        url: 'getListCategory',
        data: {
            CateId: $scope.Deploy.cateId
        },
        success: function (data) {
            $scope.DataList.CateList = data.CategoryList;
        }
    });

    $scope.toSelect = function (e) {
        var $that = angular.element(e.delegationTarget),
            id = $that.attr('data-id');

        if ($that.hasClass("next")) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('forum.photo-cate', {
                id: id
            })
        } else {
            // $scope.CameraImages.CateId = id;
            $scope.DataList.currentId = id;
        }
    };

    $scope.toDone = function () {

        // if (!$scope.CameraImages.CateId) {
        //     widget.msgToast('请选择标签吧！');
        //     return;
        // }
        if (!$scope.DataList.currentId) {
            widget.msgToast('请选择标签吧！');
            return;
        }

        angular.forEach($scope.CameraImages.Images, function (v, k) {
            if (!v.ImageUrl || !v.Description) {
                $scope.isNone = true;
            }
        });

        if ($scope.isNone) {
            $ionicPopup.confirm({
                title: '错误提示',
                cancelText: '取消',
                cancelType: 'cancel',
                okText: '确定',
                okType: 'confirm',
                scope: $scope,
                template: '<div style="padding:20px 0;line-height:20px;text-align:center;">您提交的信息不完整请返回修改！</div>'
            }).then(function (res) {
                if (res) { //确认所在地位置
                    $ionicViewSwitcher.nextDirection('back');
                    $window.history.back();
                }
            });

            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'setArticlePost',
            data: $scope.CameraImages,
            success: function (data) {
                console.log(data);
            }
        });
    };
});