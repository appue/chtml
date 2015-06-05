var personalHomepage = angular.module('phoneApp', ['ui.router', 'DelegateEvents', 'ng-iscroll']);

personalHomepage.run(function () {
    FastClick.attach(document.body);
}).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
     * 个人主页[主、客人态]
     */
        .state('personal', {
        url: '/personal-{id}.htm',
        templateUrl: 'templates/personal.html',
        controller: 'personalCtrl'
    })

    /*------------------------------------
     * 个人主页-查看所有
     */
    .state('personalAll', {
        url: '/personal-{id}/all.htm',
        templateUrl: 'templates/personal_all.html',
        controller: 'personalAllCtrl'
    })

    /*------------------------------------
     * 个人主页-发布
     */
    .state('personalIssue', {
        url: '/personal-{id}/issue.htm',
        templateUrl: 'templates/personal_issue.html',
        controller: 'personalIssueCtrl'
    })

    /*------------------------------------
     * 个人主页-粉丝页
     */
    .state('personalFans', {
        url: '/personal-{id}/fans.htm',
        templateUrl: 'templates/personal_fans.html',
        controller: 'personalFansCtrl'
    })

    /*------------------------------------
     * 个人主页-关注页
     */
    .state('personalAttention', {
        url: '/personal-{id}/attention.htm',
        templateUrl: 'templates/personal_attention.html',
        controller: 'personalAttentionCtrl'
    })

    /*------------------------------------
     * 个人主页-圈子
     */
    .state('personalCircle', {
        url: '/personal-{id}/circle.htm',
        templateUrl: 'templates/personal_circle.html',
        controller: 'personalCircleCtrl'
    })

    /*------------------------------------
     * 个人主页-用户等级
     */
    .state('personalLevel', {
        url: '/personal-{id}/level.htm',
        templateUrl: 'templates/personal_level.html',
        controller: 'personalLevelCtrl'
    })

    /*------------------------------------
     * 他人主页-查看资料
     */
    .state('personalData', {
        url: '/personal-{id}/data.htm',
        templateUrl: 'templates/personal_data.html',
        controller: 'personalDataCtrl'
    })

    /*------------------------------------
     * 个人主页-设置
     */
    .state('personalSet', {
        url: '/personal-{id}/set.htm',
        templateUrl: 'templates/personal_set.html',
        controller: 'personalSetCtrl'
    })

    /*------------------------------------
     * 个人主页-设置-修改密码
     */
    .state('personalSetPassword', {
        url: '/personal-{id}/set/password.htm',
        templateUrl: 'templates/personal_set_password.html',
        controller: 'personalSetPasswordCtrl'
    })

    /*------------------------------------
     * 个人主页-设置-账号绑定
     */
    .state('personalSetBind', {
        url: '/personal-{id}/set/bind.htm',
        templateUrl: 'templates/personal_set_bind.html',
        controller: 'personalSetBindCtrl'
    })

    /*------------------------------------
     * 个人主页-设置-关于我们
     */
    .state('personalSetAboutus', {
        url: '/personal-{id}/set/aboutus.htm',
        templateUrl: 'templates/personal_set_aboutus.html',
        controller: 'personalSetAboutusCtrl'
    });

    // $urlRouterProvider.otherwise('/personal');

});