接口协议
----

##### getLogin
> 后台登录

Request:
```
{   
    Phone: 手机号
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

##### getBannerList
> 获取广告列表

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
    BannerList: [
        {
            BannerId: ID
            Page: 类型['home', 'guess']
            ImageUrl: 图片地址
            Link: 连接地址
            Title: 标题
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

##### addBanner
> 添加广告

Request:
```
{
    Title: 标题
    ImageUrl: 图片数据（base64）
    Link: 连接地址
    Page: ('home', 'guess')

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

##### delBanner
> 删除广告

Request:
```
{
    BannerId: BannerId

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

##### getListCategory
> 获取栏目列表

Request:
```
{   
	CateId: 栏目ID（当CateId为零或者空时表示调用一级栏目）

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
    当前栏目的信息
    如果为CateId为0 或者空时 CurrentCate 为空
    CurrentCate: {
        CateId: 栏目ID
        CateName: 栏目名称
        ImageUrl: 栏目封面图
        Description: 栏目描述
        ClubList: [相关圈子，是通过圈子反查过来的，后台设置圈子关联栏目
            {
                ClubId: 圈子ID
                ClubName: 圈子名称
                ImageUrl: 圈子封面图
            }
        ]
    }

    CategoryList: [
        {
            CateId: 栏目ID
            CateName: 栏目名称
            ImageUrl: 栏目封面图
            Description: 栏目描述
            HasSub: 是否有子栏目(true/false)
            ClubList: [
                {
                    ClubId: 圈子ID
                    ClubName: 圈子名称
                    ImageUrl: 圈子封面图
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

##### addCategory
> 添加栏目

Request:
```
{   
    ParentCateId: 上级栏目ID(上级栏目ID可能为空或者0)
	CateName: 栏目名称
    ImageUrl: 栏目图片（base64）
    Description: 栏目描述

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

##### modifyCategory
> 修改栏目

Request:
```
{   
    ParentCateId: 上级栏目ID(上级栏目ID可能为空或者0)
	CateId: 栏目ID
    CateName: 栏目名称
    ImageUrl: 栏目图片（base64）
    Description: 栏目描述

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

##### delCategory
> 删除栏目(这个暂时保留)

Request:
```
{   
	CateId: 栏目ID（栏目里有文章不能被删除）

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

##### getArticleList
> 获取文章列表

Request:
```
{   
	CateId: 栏目ID（ID为空或者不存在现实所有文章）

    Type: nCate(未推荐栏目),yCate(已推荐栏目),yHome(已推荐首页),为空(所有推荐未推荐的文章)

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
	ArticleList: [
		{
			ArticleId: 帖子ID

			Images: [ 帖子里的图片
				{
					ImageUrl: 帖子图片
					Description: 帖子描述
				}
			]

            帖子所属栏目名称（一级、二级、三级名称）不会跨栏目，这个栏目是用户选择的
			CategoryList: [
				{
					CateId: 栏目ID
					CateName: 栏目名称
				}
			]

            EditState: ('nCate','yCate') 未推荐栏目、已推荐栏目
			HomeState: ('nHome','yHome') 未推荐首页、已推荐首页

            UpdateTime: 更新时间
            CreateTime: 创建时间
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

##### getContentArticle
> 跟前台的接口一样，继承吧

##### setArticleCheck
> 推荐文章、取消推荐（首页推荐、取消首页推荐、栏目页推荐、取消栏目页推荐）

Request:
```
{   
    ArticleId: 帖子ID（是数组[1,2,3,4,5....]）
    Type: nCate.取消栏目推荐；yCate.推荐栏目页；yHome.推荐到首页；nHome.取消首页推荐
        
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

##### setArticleCate
> 文章栏目移动

Request:
```
{   
    ArticleId: 帖子ID（是数组[1,2,3,4,5....]）
    CateId: 栏目ID
        
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

##### modifyArticle
> 修改文章(这边接口待定)

Request:
```
{   
    ArticleId: 帖子ID
        
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

##### delArticle
> 删除文章

Request:
```
{   
    ArticleId: 帖子ID（是数组[1,2,3,4.....]）
        
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

##### setArticleType
> 把文章关联进圈子、活动、专题

Request:
```
{   
    ArticleId: 帖子ID（是数组[1,2,3,4.....]）

    Id: 具体类型的ID（圈子、专题、活动的ID）
    Type: club: 圈子；subject: 专题；activity：活动
        
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

##### cancleArticleType
> 取消文章关联进圈子、活动、专题

Request:
```
{   
    ArticleId: 帖子ID（是数组[1,2,3,4.....]）

    Id: 具体类型的ID（圈子、专题、活动的ID）
    Type: club: 圈子；subject: 专题；activity：活动
        
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


##### getListClub
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

##### getContentClub
> 获取某个圈子的内容

Request:
```
{
	ClubId: 圈子ID

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
    ClubId: 圈子ID
    ClubName: 圈子名称
    ImageUrl: 圈子封面图
    Description: 圈子简介
    Letter: 圈子所属字母

    CategoryList: [
        {
            CateId: 栏目ID
            CateName: 栏目名称
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

##### addClub
> 添加圈子

Request:
```
{
    ClubName: 圈子名称
    ImageUrl: 圈子封面图(base64)
    Description: 圈子简介
    Letter: 圈子所属字母
    CateId: 圈子关联的栏目ID

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

#### modifyClub
> 修改圈子

Request:
```
{
	ClubId: 圈子ID

    ClubName: 圈子名称
    ImageUrl: 圈子封面图
    Description: 圈子简介
    Letter: 圈子所属字母
    CateId: 圈子关联的栏目ID
	
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

##### delClub
> 删除圈子(保留接口)

Request:
```
{
	ClubId: 圈子ID(数组[1,2,3,4......])

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


##### getListSubject
> 获取专题列表

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

##### getContentSubject
> 获取某个专题具体的内容

Requeset:
```
{
	SubjectId: 专题ID

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
    SubjectId: 专题ID
    LongName: 专题标题
    ShortName: 标题简写
    ImageUrl: 专题封面
    Description: 专题描述
    ClubId: 推荐的圈子ID
    ClubName: 推荐的圈子名称

    CategoryList: 推荐的栏目暂时不定，有疑问

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

##### addSubject
> 添加专题

Request:
```
{
    LongName: 专题标题（长标题）
    ShortName: 标题简写（短标题）
    ImageUrl: 专题封面（Base64）
    Description: 专题描述
    ClubId: 推荐的圈子ID

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

##### modifySubject
> 修改专题

Request:
```
{
	SubjectId: 专题ID

    LongName: 专题标题
    ShortName: 标题简写
    ImageUrl: 专题封面
    Description: 专题描述
    ClubId: 推荐的圈子ID
    ClubName: 推荐的圈子名称

    CategoryList: 推荐的栏目暂时不定，有疑问

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

##### delSubject
> 删除专题(保留接口)

Request:
```
{
	SubjectId: 专题ID（数组[1,2,3.....]）

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

##### getListActivity
> 活动列表

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

##### getContentActivity
> 获取某个活动具体的内容

Request:
```
{
	ActivityId: 活动ID

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
    ActivityId: 活动ID
    ActivityName: 活动标题
    ActivityLabel: 类别名称（可以说是一个标签吧，编辑后台随便输入的）
    ActivityType: 活动类型(1、文字类型；2、图片类型) （活动一旦被添加类型不能变）

    ImageUrl: 活动封面图
    Intro: 一句话描述
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
            
    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```


##### addActivity
> 添加活动

Request:
```
{
    ActivityName: 活动标题
    ActivityLabel: 类别名称（可以说是一个标签吧，编辑后台随便输入的）
    ActivityType: 活动类型(1、文字类型；2、图片类型)

    ImageUrl: 活动封面图
    Intro: 一句话描述
    Description: 活动详细描述

    CateId: 所属标签

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

##### modifyActivity
> 修改活动

Request:
```
{
	ActivityId: 活动ID

    ActivityName: 活动标题
    ActivityLabel: 类别名称（可以说是一个标签吧，编辑后台随便输入的）

    ImageUrl: 活动封面图（base64）
    Intro: 一句话描述
    Description: 活动详细描述

    CateId: 所属标签

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

##### delActivity
> 删除活动(保留接口)

Request:
```
{
	ActivityId: 活动ID(数组[1,2,3........])

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

##### getUserList
> 获取用户列表

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
    排除管理员
    UserList: [
        {
            UserId: 用户ID
            UserName: 用户名
            UserImage: 用户头像
            Sex: (1,2) 1男、2女
            Area: 城市ID
            Job: 岗位
            Phone: 手机号
            Exper: 经验值
            CreateTime: 注册时间
        }
    ]

    Total: 用户总数

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```

##### delUser
> 删除用户

Request:
```
{
    UserId: 用户ID

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

##### getAdminList
> 获取管理员列表

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
    UserList: [
        {
            UserId: 管理员Id
            UserName: 管理员名称
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

##### setRole
> 设置角色

Request:
```
{
    UserId: 用户ID（跟name互斥）
	UserName: 用户名（跟id互斥）
    Type: admin:管理员; user:普通用户

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

##### getCommentList
> 获取评论列表(OK)

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
    CommentList: [
        {
            CommentId: 评论ID
            ArticleId: 评论关联的帖子ID,

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

##### delComment
> 删除某条评论(OK)

Request:
```
{
    CommentId: 评论ID(是数组[1,2,3,4.....])

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

##### getFeedbackList
> 获取反馈列表

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
    List: [
        {
            FeedbackId: 反馈Id
            Content: 反馈内容
            Contact: 联系方式
            CreateTIme: 反馈时间
        }
    ]

    Total: 总数

    此处格式固定，服务器返回验证数据
    Response: {
        Time: 服务器当前时间
        State: 用户登录状态（True：用户登录成功；False：用户登录失败或者未登录）
        Ack: 返回数据状态（Success、Failure）根据这个状态来判断数据是否提交成功
    }
}
```
##### delFeedback
> 删除反馈

Request:
```
{
    FeedbackId: 反馈ID(是数组[1,2,3,4.....])

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

##### getReportList
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
    ReportList: [
        {
            ReportId: 举报ID,
            Id: 举报的ID（文章DI或者圈子ID）
            <!-- Type: 举报的类型（club、article） -->
            Contact: 联系方式
            ReportReason: 举报理由
            State: 0:(未处理);1:虚假举报已忽略;2:举报属实已删除(已处理)
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

##### delReport
> 删除某个举报

Request:
```
{
    ReportId: 举报ID(是数组[1,2,3,4.....])

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
