angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    //--帖子内容
    .state('detail', {
        url: '/detail/{id}.html',
        templateUrl: 'templates/detail.html',
        controller: 'tArticleDetail'
    })

    //--帖子内容
    .state('artlist', {
        url: '/detail/{id}.html',
        templateUrl: 'templates/detail.html',
        controller: 'tArticleList'
    })

    //--添加点评
    .state('add', {
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/add/{id}.html',
        templateUrl: 'templates/comment_add.html',
        controller: 'tCommentAdd'
    })

    //--点评列表
    .state('list', {
        url: '/list/{id}.html',
        templateUrl: 'templates/comment_list.html',
        controller: 'tCommentList'
    });

    // $urlRouterProvider.when('', '/index');
    // $urlRouterProvider.otherwise('/comment/add/{id}.html');
});
