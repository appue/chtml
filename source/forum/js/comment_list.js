angular.module('phoneApp')

.controller('tCommentList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect
) {
    
    $scope.pageIndex = 1;

    //--设置返回按钮
    $scope.backParam = {
        'url': [
            'forum/#/thread-'+ $stateParams.id  +'.htm'
        ]
    };


    //--UpdateData
    $scope.loadMore = function () {
        $scope.pageIndex++;

        $scope.DataList.CommentList.push(
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'}
        );
    };
    $scope.DataList = {
        CommentList: [
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'},
            {CommentId: 1, ArticleId: 2, Author: {UserId: 12313, ImageUrl: '../themes/temp/3.jpg', UserName: 'angular'}, UpdateTime: '04.07 11:12', Content: '手工灯笼制作，让家长和孩子一起动手，制作一个属于自己的灯笼，这是一件非常有意义的事情，相信它会成为你们难忘的回忆！'}
        ]
    }
});