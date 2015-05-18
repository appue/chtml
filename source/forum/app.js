angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
    * 帖子内容
    * @params:
    *     id: 帖子ID
    */
    .state('detail', {
        url: '/detail/{id}.html',
        templateUrl: 'templates/detail.html',
        controller: 'tArticleDetail'
    })

    /*------------------------------------
    * 帖子列表
    * @params:
    *     type: 栏目(cate)、圈子(club)、专题(subject)、活动(activity)
    *     id: 帖子ID
    */
    // .state('artlist', {
    //     url: '/list/{type}/{id}.html',
    //     templateUrl: 'templates/list.html',
    //     controller: 'tArticleList'
    // })

    /*------------------------------------
    * 添加点评
    * @params:
    *     id: 帖子ID
    */
    .state('add', {
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/comment/add/{id}.html',
        templateUrl: 'templates/comment_add.html',
        controller: 'tCommentAdd'
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
    // $urlRouterProvider.otherwise('/comment/add/{id}.html');
});
