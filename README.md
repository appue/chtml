### 开发环境搭建

##### 运行环境配置
运行环境基于nodejs、npm、gulp，去网上下载相关的代码安装吧

##### 初始化数据
- bower install
- npm install

##### 运行
1.看接口相关文档
- gulp --run word

2.运行HTML模板
- gulp --run html

3.运行JS开发环境
在运行开发环境前需要运行命令：
- gulp inject (--f [项目名称])

- gulp

4.JS编译成正式环境下的代码
- gulp --run build || gulp --run build --g app [生成APP压缩包]
- gulp --run build --g web  [生成H5压缩包]


### 接口协议

##### getLogin
> 后台登录

Request:
```
{   
    UserName: 用户名
    Password: 密码（md5）
}
````
Response:
```
{
    Auth: 返回用户的Auth
    UserId: 返回用户的UserId

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

##### getArticleList
>获取文章列表

Request:
```
{

}
```
Response:
```
{
    
}
```