/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tCateList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget,
    SetFalls
){
    
    var pageView = {
        init: function () {
            var self = this;

            self._setDeploy();

            self._setHeader();

            self._updateData();

            self._setFalls();
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
                CategoryList: [
                    {
                        CateId: 1,
                        CateName: '大班',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-sub-1.htm',
                                'forum/index.html#/cate/list-sub-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 2,
                        CateName: '中班',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-sub-2.htm',
                                'forum/index.html#/cate/list-sub-2.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '小班',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-sub-3.htm',
                                'forum/index.html#/cate/list-sub-3.htm'
                            ]
                        }
                    },
                    {
                        CateId: 4,
                        CateName: '托班',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-sub-1.htm',
                                'forum/index.html#/cate/list-sub-1.htm'
                            ]
                        }
                    }
                ],

                ArticleList: [
                    {
                        ArticleId: 1,
                        Images: [
                            {
                                ImageUrl: '../themes/temp/1.jpg',
                                Description: '所需材料：剪刀、彩纸、双面胶等等',
                                Width: 200,
                                Height: 162
                            }
                        ],
                        Author: {
                            UserId: 1,
                            ImageUrl: '../themes/temp/3.jpg',
                            UserName: '帖子发布者名称'
                        },
                        CategoryList: [
                            {
                                CateId: 1,
                                CateName: '泥工'
                            },
                            {
                                CateId: 1,
                                CateName: '废旧材料'
                            },
                            {
                                CateId: 1,
                                CateName: '玩教具'
                            }
                        ],
                        SiteUrl: {
                            'url': [
                                'home/#/index',
                                'home/index.html#/index'
                            ]
                        }
                    },
                    {
                        ArticleId: 1,
                        Images: [
                            {
                                ImageUrl: '../themes/temp/2.jpg',
                                Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿',
                                Width: 200,
                                Height: 124
                            }
                        ],
                        Author: {
                            UserId: 1,
                            ImageUrl: '../themes/temp/3.jpg',
                            UserName: '帖子发布者名称'
                        },
                        CategoryList: [
                            {
                                CateId: 1,
                                CateName: '泥工'
                            },
                            {
                                CateId: 1,
                                CateName: '废旧材料'
                            },
                            {
                                CateId: 1,
                                CateName: '玩教具'
                            }
                        ],
                        SiteUrl: {
                            'url': [
                                'home/#/index',
                                'home/index.html#/index'
                            ]
                        }
                    }
                ]
            };
    
            // widget.ajaxRequest({
            //     noMask: true,
            //     url: '$local/Tools/getContentArticle',
            //     data: {
            //         ArticleId: $stateParams.id
            //     },
            //     success: function (data) {
            //         alert(data);
            //     }
            // });

        },

        _setFalls: function() {
            var self = this;

            var obj = SetFalls.init({
                'elem': '.js_falls'
            }); 
            
            // console.log(obj);

            if (obj.x <= obj.y) {
                document.querySelector('.js_falls').style.cssText = 'height:'+ obj.y +'px';
            } else {
                document.querySelector('.js_falls').style.cssText = 'height:'+ obj.x +'px';
            }

            var html = document.querySelectorAll('.js_falls li');

            for(var i=0,len=html.length; i<len; i++) {
                html[i].style.cssText = obj.layout[i].type +':0;top:'+ obj.layout[i].top +'px';
            }
        }
    };

    pageView.init();

});