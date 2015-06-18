angular.module('phoneApp', [
    'ui.router',
    'DelegateEvents',
    'base64'
])
.run(function() {
    FastClick.attach(document.body);
})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
    * 二级栏目
    */
    .state('cateListSub', {
        url: '/cate/list-sub-{id}.htm',
        templateUrl: 'templates/cate_list_sub.html',
        controller: 'tCateListSub'
    })

    /*------------------------------------
    * 三级栏目
    */
    .state('cateListLast', {
        url: '/cate/list-last-{id}.htm',
        templateUrl: 'templates/cate_list_last.html',
        controller: 'tCateListLast'
    })
    
    /*------------------------------------
    * 一级栏目
    */
    .state('cateList', {
        url: '/cate/list-{id}.htm',
        templateUrl: 'templates/cate_list.html',
        controller: 'tCateList'
    })

    /*------------------------------------
    * 帖子内容
    * @params:
    *     id: 帖子ID
    */
    .state('detail', {
        url: '/thread-{id}.htm',
        templateUrl: 'templates/article_detail.html',
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
    })

    /*------------------------------------
    * 发帖第一步
    */
    .state('photoEdit', {
        url: '/photo/edit.htm',
        templateUrl: 'templates/photo.html',
        controller: 'tPhotoEdit'
    })
    .state('photoTitle', {
        url: '/photo/title.htm',
        templateUrl: 'templates/photo_title.html',
        controller: 'tPhotoTitle'
    })
    .state('photoCate', {
        url: '/photo/cate.htm',
        templateUrl: 'templates/photo_cate.html',
        controller: 'tPhotoCate'
    });

    // $urlRouterProvider.when('', '/index');
    // $urlRouterProvider.otherwise('/comment/add/{id}.html');
});
