/*
* 发现-二级栏目-列表
* /clump/#/cate/list-sub-{id}.html
*/
angular.module('phoneApp')

.controller('tCateListSub', function (
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
                    'forum/#/cate/list-1.htm',
                    'forum/index.html#/cate/list-1.htm'
                ]
            };
        },

        _updateData: function () {
            var self = this;

            $scope.DataList = {
                CategoryList: [
                    {
                        CateId: 1,
                        CateName: '语言',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-last-1.htm',
                                'forum/index.html#/cate/list-last-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 2,
                        CateName: '美工',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-last-1.htm',
                                'forum/index.html#/cate/list-last-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 3,
                        CateName: '数学',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-last-1.htm',
                                'forum/index.html#/cate/list-last-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 4,
                        CateName: '科学',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-last-1.htm',
                                'forum/index.html#/cate/list-last-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 4,
                        CateName: '音乐',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-last-1.htm',
                                'forum/index.html#/cate/list-last-1.htm'
                            ]
                        }
                    },
                    {
                        CateId: 4,
                        CateName: '健康',
                        SiteUrl: {
                            'url': [
                                'forum/#/cate/list-last-1.htm',
                                'forum/index.html#/cate/list-last-1.htm'
                            ]
                        }
                    }
                ],
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