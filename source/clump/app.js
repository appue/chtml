angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
    * 发现首页
    */
    .state('find', {
        url: '/find.html',
        templateUrl: 'templates/find.html',
        controller: 'tFind'
    })

    /*------------------------------------
    * 发现-猜你喜欢
    */
    .state('findLike', {
        url: '/find/like.html',
        templateUrl: 'templates/like.html',
        controller: 'tFindLike'
    })

    /*------------------------------------
    * 全部圈子
    */
    .state('clubList', {
        url: '/club/list.html',
        templateUrl: 'templates/club_list.html',
        controller: 'tClubList'
    })

    /*------------------------------------
    * 热门圈子
    */
    .state('clubHot', {
        url: '/club/hot.html',
        templateUrl: 'templates/club_hot.html',
        controller: 'tClubHot'
    })

    /*------------------------------------
    * 点评列表
    * @params:
    *     id: 帖子ID
    */
    .state('list', {
        url: '/comment/list/{id}.html',
        templateUrl: 'templates/comment_list.html',
        controller: 'tCommentList'
    });

    // $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/find.html');
});
