/*
* 发现-猜你喜欢
* /clump/#/like.html
*/
angular.module('phoneApp')

.controller('tFindLike', function (
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

            // self._updateData();

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

            /*
            * 1、每个圈子当天发帖量多的排前面，每24小时会自动更新一次（取前20个）
            * 2、圈子ID降序
            * 3、圈子发帖时间降序
            * 4、圈子发帖时间升序
            * 5、字母排序（所有的圈子全部吐出）
            */
            widget.ajaxRequest({
                noMask: true,
                url: '$local/Tools/getListClub',
                data: {
                    SortType: 5
                },
                success: function (data) {
                    alert(data);
                }
            });
        },

        _setFalls: function() {
            var self = this;

            var obj = SetFalls.init({
                'elem': '.js_falls'
            }); 
            
            console.log(obj);

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