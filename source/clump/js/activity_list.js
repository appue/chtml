/*
* 发现-活动
* /clump/#/activity/list.html
*/
angular.module('phoneApp')

.controller('tActivityList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    var pageView = {
        init: function () {
            var self = this;

            self._setDeploy();

            self._setHeader();

            self._updateData();
        },

        _setDeploy: function () {
            var self = this;
        },

        _setHeader: function () {
            var self = this;
            
            //--设置返回按钮
            $scope.backParam = {
                'url': [
                    'clump/#/find.htm',
                    'clump/index.html#/find.htm'
                ]
            };
        },

        _updateData: function () {
            var self = this;

            $scope.DataList = [
                {
                    'ActivityName': '【晒萌照】4D绘本',
                    'Description': '涂一涂，扫一扫，涂鸦一秒变动画',
                    'ImageUrl': '../themes/temp/img_1.jpg',
                    'SiteUrl': {
                        'url': [
                            'clump/#/activity/detail/photo.htm',
                            'clump/index.html#/activity/detail/photo.htm'
                        ]
                    }
                },
                {
                    'ActivityName': '【晒萌照】4D绘本',
                    'Description': '涂一涂，扫一扫，涂鸦一秒变动画',
                    'ImageUrl': '../themes/temp/img_2.jpg',
                    'SiteUrl': {
                        'url': [
                            'clump/#/activity/detail/photo.htm',
                            'clump/index.html#/activity/detail/photo.htm'
                        ]
                    }
                },
                {
                    'ActivityName': '【晒萌照】4D绘本',
                    'Description': '涂一涂，扫一扫，涂鸦一秒变动画',
                    'ImageUrl': '../themes/temp/img_3.jpg',
                    'SiteUrl': {
                        'url': [
                            'clump/#/activity/detail/photo.htm',
                            'clump/index.html#/activity/detail/photo.htm'
                        ]
                    }
                },
                {
                    'ActivityName': '【晒萌照】4D绘本',
                    'Description': '涂一涂，扫一扫，涂鸦一秒变动画',
                    'ImageUrl': '../themes/temp/img_4.jpg',
                    'SiteUrl': {
                        'url': [
                            'clump/#/activity/detail/photo.htm',
                            'clump/index.html#/activity/detail/photo.htm'
                        ]
                    }
                }
            ]
        }
    };

    pageView.init();

});