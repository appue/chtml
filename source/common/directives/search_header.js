angular.module('phoneApp')

/*
* header search 搜索顶部
*/
.directive('searchHeader', function (
    $state,
    widget,
    cachePool,
    routerRedirect
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/directives/search_header.html',
        // controller: function ($scope, $element, $attrs) {
        // },
        // compile: function (element, attrs, transclude) {
        //  return {
        //      pre: function preLink(scope, element, attrs, controller) {},
        //      post: function postLink(scope, element, attrs, controller) {}
        //  }
        // },
        link: function (scope, element, attrs) {
            //--搜索文本
            scope.keyword = "";

            scope.toSearch = function () {
                if (scope.keyword) {

                    var isPush = true;
                        key = cachePool.pull('Keyword') || [];

                    if (key.length >= 3) {

                        angular.forEach(key, function (v, k){
                            if (scope.keyword == v) {
                                key.splice(k, 1);
                            }
                        });
                        
                        key.splice(0, 0, scope.keyword);

                    } else {

                        angular.forEach(key, function (v, k){
                            if (scope.keyword == v) {
                                key.splice(k, 1);
                            }
                        });

                    }
                    // if (isPush) {
                    //     key.push(scope.keyword);
                    // }

                    // cachePool.push('Keyword', key);

                    // routerRedirect.toJump({
                    //     'url': [
                    //         'search/#/result?keyword='+ scope.keyword,
                    //         'search/index.html#/result?keyword='+ scope.keyword
                    //     ]
                    // });
                } else {

                    if ($state.is('index')) {

                        widget.msgToast('请输入关键字！');

                    } else {

                        routerRedirect.toJump({
                            'url': [
                                'search/#/index',
                                'search/index.html#/index'
                            ]
                        });

                    }
                }
            };
        }
    };
});