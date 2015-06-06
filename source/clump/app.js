angular.module('phoneApp', [
    'ui.router',
    'DelegateEvents',
    'ng-iscroll'
])
.run(function() {
    FastClick.attach(document.body);
})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
    * 发现首页
    */
    .state('findIndex', {
        url: '/find.htm',
        templateUrl: 'templates/find.html',
        controller: 'tFindIndex'
    })

    /*------------------------------------
    * 发现-猜你喜欢
    */
    .state('findLike', {
        url: '/find/like.htm',
        templateUrl: 'templates/like.html',
        controller: 'tFindLike'
    })

    /*------------------------------------
    * 全部圈子
    */
    .state('clubList', {
        url: '/club/list.htm',
        templateUrl: 'templates/club_list.html',
        controller: 'tClubList'
    })

    /*------------------------------------
    * 热门圈子
    */
    .state('clubHot', {
        url: '/club/hot.htm',
        templateUrl: 'templates/club_hot.html',
        controller: 'tClubHot'
    })

    /*------------------------------------
    * 圈子详情页
    */
    .state('clubDetail', {
        url: '/club/detail-{id}.htm',
        templateUrl: 'templates/club_detail.html',
        controller: 'tClubDetail'
    })

    /*------------------------------------
    * 活动列表
    */
    .state('activityList', {
        url: '/activity/list.htm',
        templateUrl: 'templates/activity_list.html',
        controller: 'tActivityList'
    })

    /*------------------------------------
    * 发现-活动-晒图活动页
    */
    .state('activityDetailPhoto', {
        url: '/activity/detail/photo-{id}.htm',
        templateUrl: 'templates/activity_detail_photo.html',
        controller: 'tActivityDetailPhoto'
    })

    /*------------------------------------
    * 发现-活动-话题活动页
    */
    .state('activityDetailArticle', {
        url: '/activity/detail/article-{id}.htm',
        templateUrl: 'templates/activity_article_photo.html',
        controller: 'tActivityDetailArticle'
    })

    /*------------------------------------
    * 专题列表
    */
    .state('subjectList', {
        url: '/subject/list.htm',
        templateUrl: 'templates/subject_list.html',
        controller: 'tSubjectList'
    })

    /*------------------------------------
    * 专题内容
    */
    .state('subjectDetail', {
        url: '/subject/detail-{id}.htm',
        templateUrl: 'templates/subject_detail.html',
        controller: 'tSubjectDetail'
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
    $urlRouterProvider.otherwise('/find.htm');
});
