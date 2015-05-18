angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('detail', { //--帖子内容
        url: '/detail/{id}.html',
        templateUrl: 'templates/detail.html',
        controller: 'tArticleDetail'
    })
    .state('artlist', { //--帖子内容
        url: '/detail/{id}.html',
        templateUrl: 'templates/detail.html',
        controller: 'tArticleList'
    })
    .state('add', { //--添加点评
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/add/{id}.html',
        templateUrl: 'templates/comment_add.html',
        controller: 'tCommentAdd'
    })
    .state('list', { //--点评列表
        url: '/list/{id}.html',
        templateUrl: 'templates/comment_list.html',
        controller: 'tCommentList'
    });

    // $urlRouterProvider.when('', '/index');
    // $urlRouterProvider.otherwise('/comment/add/{id}.html');
});
