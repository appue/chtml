/*
* 发现首页
* /clump/#/find.html
*/
angular.module('phoneApp')

.controller('tFindIndex', function (
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

            self._setSearch();

            self._updateData();
        },

        _setDeploy: function () {
            var self = this;


            $scope.footerTab = 2;

            //--顶部菜单
            $scope.urlMenu = [
                {
                    'title': '猜你喜欢',
                    'list': {
                        'url': [
                            'clump/#/find/like.htm',
                            'clump/index.html#/find/like.htm',
                        ]
                    }
                },
                {
                    'title': '圈子',
                    'list': {
                        'url': [
                            'clump/#/club/hot.htm',
                            'clump/index.html#/club/hot.htm',
                        ]
                    }
                },
                {
                    'title': '活动',
                    'list': {
                        'url': [
                            'clump/#/activity/list.htm',
                            'clump/index.html#/activity/list.htm',
                        ]
                    }
                }
            ];

            //--搜索文本
            $scope.keyword = "";

            //--更多专题
            $scope.urlSubjectList = {
                'url': [
                    'clump/#/subject/list.htm',
                    'clump/index.html#/subject/list.htm'
                ]
            };
        },

        _updateData: function () {
            var self = this;

            $scope.DataList = {
                SubjectList: [
                    {
                        SubjectId: 1,
                        ShortName: '送给孩子们的礼物',
                        ImageUrl: '../themes/temp/1.jpg',
                        SiteUrl: {
                            'url': [
                                'clump/#/subject/detail-1.htm?isFrom=find',
                                'clump/index.html#/subject/detail-1.htm?isFrom=find'
                            ]
                        }
                    },
                    {
                        SubjectId: 2,
                        ShortName: '送给孩子们的礼物',
                        ImageUrl: '../themes/temp/2.jpg',
                        SiteUrl: {
                            'url': [
                                'clump/#/subject/detail-1.htm?isFrom=find',
                                'clump/index.html#/subject/detail-1.htm?isFrom=find'
                            ]
                        }
                    },
                    {
                        SubjectId: 3,
                        ShortName: '送给孩子们的礼物',
                        ImageUrl: '../themes/temp/3.jpg',
                        SiteUrl: {
                            'url': [
                                'clump/#/subject/detail-1.htm?isFrom=find',
                                'clump/index.html#/subject/detail-1.htm?isFrom=find'
                            ]
                        }
                    }
                ],

                CategoryList: [
                    {
                        CateId: 1,
                        CateName: '教案',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 2,
                        CateName: '总结',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '玩教具',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-1.htm',
                                'forum/index.html#/cate/list-1.htm'
                            ]
                        }
                    }
                ]
            };

            $scope.CateList = [
                [
                    {CateId: 3, CateName: '教案', SiteUrl: {'url': ['forum/#/cate/list-1.htm', 'forum/index.html#/cate/list-1.htm'] } },
                    {CateId: 3, CateName: '总结', SiteUrl: {'url': ['forum/#/cate/list-1.htm', 'forum/index.html#/cate/list-1.htm'] } },
                    {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm', 'forum/index.html#/cate/list-1.htm'] } },
                    {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm', 'forum/index.html#/cate/list-1.htm'] } },
                    {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm', 'forum/index.html#/cate/list-1.htm'] } },
                    {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm', 'forum/index.html#/cate/list-1.htm'] } }    
                ],
                [
                    {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm', 'forum/index.html#/cate/list-1.htm'] } }
                ]
            ];
            // widget.ajaxRequest({
            //     noMask: true,
            //     url: '$local/Tools/getFindHome',
            //     success: function (data) {
            //         alert(data);
            //     }
            // });
        },

        _setSearch: function () {
            $scope.toSearch = function () {
                if ($scope.keyword) {
                    routerRedirect.toJump({
                        'url': [
                            'search/#/result?keyword='+ $scope.keyword,
                            'search/index.html#/result?keyword='+ $scope.keyword
                        ]
                    });
                } else {
                    routerRedirect.toJump({
                        'url': [
                            'search/#/index',
                            'search/index.html#/index'
                        ]
                    });
                }
            };
        }
    };

    pageView.init();

});