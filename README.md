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

##### setPassword
> 修改用户信息

Request:
```
{   
    Password: 修改的密码（MD5）

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
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
    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
	ArticleList: [
		{
			ArticleId: 帖子ID
			Images: [ 帖子里的图片
				{
					ImageUrl: 帖子图片
					Description: 帖子描述
					Width: 切割出来的图片的宽度
					Height: 切割出来的图片的高度
				}
			]

			Author: {
				UserId: 帖子发布者ID
				ImageUrl: 帖子发布者头像
				UserName: 帖子发布者名称
			}

			TotalCollect: 帖子被收藏的总数

            帖子所属栏目名称（一级、二级、三级名称）不会跨栏目，这个栏目是用户选择的
			CategoryList: [
				{
					CateId: 栏目ID
					CateName: 栏目名称
				}
			]
		}
	]

	Total: 总条数

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### getListClub
> 获取圈子列表，按ID大到小排序

Request:
```
{   
    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    ClubList: [
        {
            ClubId: 圈子ID
            ClubName: 圈子名称
            ImageUrl: 圈子封面图
            Description: 圈子简介
            TotalUser: 圈子成员数目
            TotalArticle: 圈子帖子数目
            Letter: 圈子所属字母
            UpdateTime: 圈子最后更新的时间（用户在圈子里发表内容都会更新这个时间）
            CreateTime: 圈子创建的时间

            圈子所属栏目名称（一级、二级、三级名称）不会跨栏目，这个栏目是后台设置好的，跟圈子里的帖子没任何关系
            帖子发布是用户自己选择栏目
            CategoryList: [
                {
                    CateId: 栏目ID
                    CateName: 栏目名称
                }
            ]
        }
    ]

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### addClub
> 添加圈子

Request:
```
{
    ClubName: 圈子名称

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### getListComment
> 获取评论列表

Request:
```
{
    ArticleId: 帖子ID

    PageIndex: 当前页码
    PageSize: 每页显示多少条记录

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    CommentList: [
        {
            CommentId: 评论ID
            ArticleId: 评论关联的帖子ID
            Author: {
                UserId: 评论发布者ID
                ImageUrl: 评论发布者头像
                UserName: 评论发布者名称
            }

            UpdateTime: 评论更新时间
            Content: 评论内容
        }
    ]
    Total: 评论总数

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### delComment
> 删除某条评论

Request:
```
{
    CommentId: 评论ID

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### getReport
> 举报管理,获取举报的列表

Request:
```
{

    PageIndex: 当前页码
    PageSize: 每页显示多少条记录

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    ArticleId: 帖子ID
    Contact: 联系方式
    ReportReason: 举报理由

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### delReport
> 删除某个举报

Request:
```
{
    ReportId: 举报的ID

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### getListSubject
> 删除某个举报

Request:
```
{
    PageIndex: 当前页码
    PageSize: 每页显示多少条记录

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    SubjectList: [
        {
            SubjectId: 专题ID
            LongName: 专题标题
            ShortName: 标题简写
            ImageUrl: 专题封面
            Description: 专题描述
            ClubId: 推荐的圈子ID
            ClubName: 推荐的圈子名称
            TotalArticle: 专题内帖子总数
            UpdateTime: 更新信息
            CreateTime: 专题创建的时间

            相关主题
            此处由编辑后台推荐相关的标签类别，可以是一级栏目页，二级栏目页或三级栏目页
            CategoryList: [
                {
                    CateId: 栏目ID
                    CateName: 栏目名称
                    ImageUrl: 栏目封面图
                }
            ]
        }
    ]
    Total: 专题总数

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### addSubject
> 添加专题

Request:
```
{
    LongName: 专题标题（长标题）
    ShortName: 标题简写（短标题）
    ImageUrl: 专题封面（Base64）
    Description: 专题描述
    ClubId: 推荐的圈子ID
    ClubName: 推荐的圈子名称

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### getListActivity
> 活动列表

Request:
```
{
    ActivityType: 活动类型(0、不分类型显示所有活动列表；1、文字类型；2、图片类型)

    PageIndex: 当前页码
    PageSize: 每页显示多少条记录

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{
    ActivityList: [
        {
            ActivityId: 活动ID
            ActivityName: 活动标题
            ActivityLabel: 类别名称（可以说是一个标签吧，编辑后台随便输入的）
            ActivityType: 活动类型(1、文字类型；2、图片类型)


            ImageUrl: 活动封面图
            Description: 活动详细描述

            UpdateTime: 活动最后更新的时间（用户在活动里发表内容都会更新这个时间）
            CreateTime: 活动创建的时间


            CategoryList: [ 活动归属的栏目ID
                {
                    CateId: 栏目ID
                    CateName: 栏目名称
                    ImageUrl: 栏目封面图
                }
            ]
        }
    ]
    Total: 活动总数

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

#### addActivity
> 添加活动

Request:
```
{
    ActivityName: 活动标题
    ActivityLabel: 类别名称（可以说是一个标签吧，编辑后台随便输入的）
    ActivityType: 活动类型(1、文字类型；2、图片类型)

    ImageUrl: 活动封面图
    Description: 活动详细描述

    固顶格式Header
    Header: {
        UserId: 当前登录用户ID（未登录传空）
        Auth: 当前登录用户Auth（未登录传空）
    }
}
```
Response:
```
{

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```


