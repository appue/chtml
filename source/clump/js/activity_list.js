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

            $scope.DataList = {   
                ActivityList: [
                    {
                        ActivityId: 1,
                        ActivityName: '【晒萌照】4D绘本',
                        ActivityType: 2, //---活动类型(1、文字类型；2、图片类型)
                        ImageUrl: '../themes/temp/img_1.jpg',
                        Description: '涂一涂，扫一扫，涂鸦一秒变动画',
                        SiteUrl: {
                            'url': [
                                'clump/#/activity/detail/photo-1.htm',
                                'clump/index.html#/activity/detail/photo-1.htm'
                            ]
                        }
                    },
                    {
                        ActivityId: 2,
                        ActivityName: '【晒萌照】4D绘本',
                        ActivityType: 2, //---活动类型(1、文字类型；2、图片类型)
                        ImageUrl: '../themes/temp/img_2.jpg',
                        Description: '涂一涂，扫一扫，涂鸦一秒变动画',
                        SiteUrl: {
                            'url': [
                                'clump/#/activity/detail/photo-2.htm',
                                'clump/index.html#/activity/detail/photo-2.htm'
                            ]
                        }
                    },
                    {
                        ActivityId: 3,
                        ActivityName: '【晒萌照】4D绘本',
                        ActivityType: 1, //---活动类型(1、文字类型；2、图片类型)
                        ImageUrl: '../themes/temp/img_3.jpg',
                        Description: '涂一涂，扫一扫，涂鸦一秒变动画',
                        SiteUrl: {
                            'url': [
                                'clump/#/activity/detail/article-3.htm',
                                'clump/index.html#/activity/detail/article-3.htm'
                            ]
                        }
                    },
                    {
                        ActivityId: 4,
                        ActivityName: '【晒萌照】4D绘本',
                        ActivityType: 1, //---活动类型(1、文字类型；2、图片类型)
                        ImageUrl: '../themes/temp/img_4.jpg',
                        Description: '涂一涂，扫一扫，涂鸦一秒变动画',
                        SiteUrl: {
                            'url': [
                                'clump/#/activity/detail/article-4.htm',
                                'clump/index.html#/activity/detail/article-4.htm'
                            ]
                        }
                    }
                ]
            };


            // widget.ajaxRequest({
            //     noMask: true,
            //     url: '$local/Tools/getListActivity',
            //     data: {
            //         ActivityType: 0
            //     },
            //     success: function (data) {
            //         alert(data);
            //     }
            // });
        }
    };

    pageView.init();

});