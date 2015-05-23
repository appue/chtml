angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
    * 一级栏目
    */
    .state('cateList', {
        url: '/cate/list.htm',
        templateUrl: 'templates/cate_list.html',
        controller: 'tCateList'
    })

    /*------------------------------------
    * 帖子内容
    * @params:
    *     id: 帖子ID
    */
    .state('detail', {
        url: '/detail/{id}.htm',
        templateUrl: 'templates/detail.html',
        controller: 'tArticleDetail'
    })

    /*------------------------------------
    * 举报帖子
    * @params:
    *     id: 帖子ID
    */
    .state('report', {
        url: '/report/{id}.htm',
        templateUrl: 'templates/report.html',
        controller: 'tReport'
    })

    /*------------------------------------
    * 添加点评
    * @params:
    *     id: 帖子ID
    */
    .state('add', {
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/comment/add/{id}.htm',
        templateUrl: 'templates/comment_add.html',
        controller: 'tCommentAdd'
    })

    /*------------------------------------
    * 点评列表
    * @params:
    *     id: 帖子ID
    */
    .state('list', {
        url: '/comment/list/{id}.htm',
        templateUrl: 'templates/comment_list.html',
        controller: 'tCommentList'
    });

    // $urlRouterProvider.when('', '/index');
    // $urlRouterProvider.otherwise('/comment/add/{id}.html');
});
