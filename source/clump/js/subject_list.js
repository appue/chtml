/*
* 发专题-列表
* /clump/#/subject/list.html
*/
angular.module('phoneApp')

.controller('tSubjectList', function (
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

            $scope.SubjectList = [
                {
                    SubjectId: 1,
                    ShortName: '可以让孩子找到属于他们的手工创作天地',
                    ImageUrl: '../themes/temp/1.jpg',
                    SiteUrl: {
                        'url': [
                            'clump/#/subject/detail-1.htm',
                            'clump/index.html#/subject/detail-1.htm'
                        ]
                    }
                },
                {
                    SubjectId: 2,
                    ShortName: '的手工创作天地',
                    ImageUrl: '../themes/temp/2.jpg',
                    SiteUrl: {
                        'url': [
                            'clump/#/subject/detail-2.htm',
                            'clump/index.html#/subject/detail-2.htm'
                        ]
                    }
                },
                {
                    SubjectId: 3,
                    ShortName: '三月招聘季',
                    ImageUrl: '../themes/temp/3.jpg',
                    SiteUrl: {
                        'url': [
                            'clump/#/subject/detail-3.htm',
                            'clump/index.html#/subject/detail-3.htm'
                        ]
                    }
                }
            ];

            /*
            * 专题排序类型（默认按什么？）
            * 1、创建时间降序
            * 2、创建时间升序
            * 3、ID降序
            * 4、ID升序
            * 5、帖子数目降序
            * 6、帖子数目升序
            */
            // widget.ajaxRequest({
            //     noMask: true,
            //     url: '$local/Tools/getListSubject',
            //     data: {
            //         SortType: 1
            //     },
            //     success: function (data) {
            //         alert(data);
            //     }
            // });
        }
    };

    pageView.init();

});