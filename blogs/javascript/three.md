---
title: 可视化mockjs
date: 2021-04-25
categories:
 - 工具
tags:
 - 工具
sidebar: 'auto'
---
---
theme: channing-cyan
---
### 前言

Mock就是用一个虚拟的对象（Mock 对象）来创建以便测试的测试方法。

- 随着WEB技术的发展，前后端分离架构变得普遍起来，但是问题也随之而来，文档零散、不规范。并且经常碰到例如参数的新增、变动。这就导致了后端工程师需要耗费大量的时间维护接口文档
- 前端的开发工作依赖于后端提供的接口数据，但是后端接口往往没有那么快就可以开发完成。这就导致了前端在“等”数据。
- 上述的情况就会导致工作效率低下，沟通成本增加。接口管理平台的需求就日趋强烈
所以这也促进了mock的出现和发展



### 说说自己使用mock的变化
#### 1.原地模拟数据
直接在页面data里面声明或者外部文件声明然后引入
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca3df94e339a40378f46ad2c5208b352~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7502ca8b1e844dc2be3c7ea4bc89192b~tplv-k3u1fbpfcp-watermark.image)

优点：这样相应页面就会有占位数据，有个直观的感觉

缺点：数据写死，不会变化，也不是从接口获取 后期待对接的工作量还是很高，而且前期成本也不低

#### 2.接口声明return数据

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53e45729da444c3686c9cf60a8b9afcf~tplv-k3u1fbpfcp-watermark.image)
这里其实和第一种没什么区别，在接口定义的地方返回数据。只是起到占位的作用，非要和第一个对比，只是增加了接口简单声明，为后面对接少了一点点工作量，其实后面对接，还是有很多工作要做。

#### 3.使用mock.js
其实较早接触mock.js 最近才知道YApi
直接模拟相应接口返回，接口名也可以自定义，数据类型也可以自定义 随意改动等等好处
在下一步慢慢体会
直接使用引入mockjs然后使用
```
const ResultUtil = require('../_util/resultUtil');
const Mock = require('mockjs');
// 公告管理
const dataList = Mock.mock({
  'rows|12': [
    {
      demoId: '@id',
      demoTitle: '@ctitle(3,10)',
      demoCnte: '<h2 style="text-align: center;">公告</h2><p>测试测试，内容内容。</p>',
      'demoMan|1': ['张三', '李四'],
      demoTime: '@datetime',
      'demoStatusText|1': ['生效', '未生效'],
      'demoStatus|1': ['1', '2'],

      'demoRole|1': ['1', '2'],
      'demoRoleText|1': ['专家', '社会监督员'],
      'demoMethod|1': ['1', '2'],
      'demoMethodText|1': ['PC', '微信'],
      demoFileList: [
        {
          archiveFor: 'xls',
          archiveId: 107,
          archiveName: '任务管理病案审核专家意见模板.xls',
          bizId: 'ZJYY0001',
          cldArchiveId: '557',
          crteTime: 1606443355672,
          crterId: '0',
          crterName: '超级管理员',
          fileBase64: null,
          matId: '1303',
          rid: '557',
          updtTime: 1606443355672,
          valiFlag: null,
        },
      ],
    },
  ],
});
// 操作历史
const hisList = Mock.mock({
  'rows|32': [
    {
      hisId: '@id',
      hisResult: '@ctitle(3,40)',
      'hisName|1': ['张三', '李四'],
      hisTime: '@datetime',
      'hisTypeStatusText|1': ['生效', '未生效'],
      'hisTypeStatus|1': ['1', '2'],
      'opterRoleText|1': ['专家', '社会监督员'],
    },
  ],
});

module.exports = {
  // 查询列表
  'GET /demo/getList 500': ({ query }) => {
    const { pageNo = 1, pageSize = 10 } = query;
    const dataListItems = dataList.rows;
    const pageData = ResultUtil.pagination(pageNo, pageSize, dataListItems);
    return ResultUtil.pageSuccess(pageData, dataListItems.length);
  },
  // 查询详情
  'GET /demo/detail 500': ({ query }) => {
    const { demoId = '' } = query;
    const dataListItems = dataList.rows;
    const index = dataListItems.findIndex((item) => item.demoId === demoId);
    return ResultUtil.success(dataListItems[index !== -1 ? index : 0]);
  },
  //   查询历史记录
  'GET /demo/getHistory 500': ({ query }) => {
    const { pageNo = 1, pageSize = 10 } = query;
    const dataListItems = hisList.rows;
    const pageData = ResultUtil.pagination(pageNo, pageSize, dataListItems);
    return ResultUtil.pageSuccess(pageData, dataListItems.length);
  },
};

```
这样的话在项目中就可以像调用接口 然后去模拟随机生成数组，mockjs很强大 很多api我也没搞懂，具体详情官网奉上 [mock官方文档](http://mockjs.com/0.1/#) 和 [项目地址](https://github.com/nuysoft/Mock)

这样的做法也是我之前的做法 我在使用的时候就在想 能不能更简单的去配置类似[rap2](https://github.com/thx/rap2-delos)或者[easy-mock](https://github.com/easy-mock/easy-mock)大搜车这样 可视化操作。
如果你是团队多人 我也建议在这样的网站上拉个团队建个仓库 多人协调工作

那我个人玩玩 接下来介绍本文重点-[一个本地化的可视化配置的mock项目](https://github.com/wangxiaoer5200/serve-mock)


### 项目介绍

一个基于mockjs、vue2、koa实现一个本地化的可视化配置的服务项目(`本文大篇幅介绍，也是本文最想表达的项目详情`)

1. **在线项目地址**
[在线mock界面地址](http://1.14.164.222/#/home)

`PS:`**这里临时加点内容：** 很多人说在线新增成功后 接口会报错 这是因为服务慢了一步，所以需要刷新一下页面。那我这里的建议是你本地把server文件的项目安装依赖然后本地跑起来，界面右上角换成你本地跑起来的服务地址，这样体验更佳(还没想到这个解决办法 大佬们要是知道可以告诉我一下 我尝试一下)。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c877f0cdecc44419a2687c8421ff9961~tplv-k3u1fbpfcp-watermark.image)

服务接口地址http://1.14.164.222:6868+模块名+接口名(如：http://1.14.164.222.cn:6868/user/test2)
user模块下test2接口配置：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/528c6936f04f497d9a2cd5a51e741cd5~tplv-k3u1fbpfcp-watermark.image)
在线测试：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92ec8ce8e1344d55b86f0f8d46c8ec30~tplv-k3u1fbpfcp-watermark.image)

浏览器直接访问：
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f781a013f223419a8564c1406c239c0b~tplv-k3u1fbpfcp-watermark.image)

2. **源码地址：**

**欢迎star！谢谢star！**
- [github项目地址](https://github.com/wangxiaoer5200/serve-mock)
- [gitee项目地址](https://gitee.com/wangxiaoer520/mock-serve-demo)

PS:我这服务器只供在线小测试和练手使用(随时可能关闭)


#### 1.项目结构

一个page是ui界面的项目
一个server是本地接口服务项目

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8db4d40b440e4394b3cf2cc17df00f5f~tplv-k3u1fbpfcp-watermark.image)

#### 2.项目运行
首先page和server都要安装依赖
先把服务跑起来 然后再跑page
```
// 命令1
cd page
yarn
yarn run serve
// 命令2
cd server
yarn
yarn run serve

```
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13fa287649b14f009ae369373946ef23~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/886e60aaa8684e3d90d6183926d5428f~tplv-k3u1fbpfcp-watermark.image)

#### 3.项目使用
这是跑起来的ui界面
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea032db8cc554b91904caa5bf6e2daf3~tplv-k3u1fbpfcp-watermark.image)
你在这可以去添加各种模块和接口，然后自定义返回类型
添加成功可以直接浏览器测试或者点测试接口  也可以在项目中使用
注意点：如果你接口有参数之类是要相应填写的

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51745b0f6e4a4c50b2d7c3e50a4b38b5~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/902f4b8cd0de4f95afe2b31286aa2770~tplv-k3u1fbpfcp-watermark.image)

使用的话 知道操作后就特别的流畅方便 一开始上手可能需要摸清一下用法

#### 4.server服务项目重点
简单说说server文件(服务)的项目
##### 运行
- `yarn install`: 安装依赖
- `yarn serve`: 运行项目

##### 自定义 mock 口访问(用于项目开发前端模拟接口使用)

本地项目运行成功后，接口访问格式为 本地 ip 或者`localhost`+ 端口(统一为 6868)+ 所属模块的接口前缀(pathName)+ 所访问接口的接口地址(url)

例如，访问接口前缀为 user 的模块 下的 add 接口，访问地址如下：

```.
http://localhost:6868/user/add
```

##### UI 界面操作接口(用于 UI 界面操作)

相关接口可见接口文档.md 文件，接口访问格式为 本地 ip 或者`localhost`+ 端口(统一为 6868)+ 接口名称(如‘/section/createSection’)

例如，访问创建模块接口，访问地址如下：

```.
http://localhost:6868/section/createSection
```

##### 主要目录结构说明

```.
├── public                --存放接口生成的静态数据
├── README.md             --项目说明文件
├── 接口文档.md             --接口说明文件
├── 接口测试用例.md         --接口测试用例说明文件
├── index.ts              --服务启动文件
├── logger.ts             --日志处理文件
├── server.ts             --服务主要处理文件
├── src                   --项目代码目录
├──── api                 --路由相关处理目录
├──── config               --环境配置目录
├──── controller          --接口参数校验目录
├──── enum                --常量目录
├──── service             --接口具体操作处理目录
├──── types               --相关参数的 interface 定义 目录
├──── utils               --工具方法目录
├──── validate            --接口参数校验方法目录
```

#### 5.主要实现逻辑
分为模块相关接口和模块下接口相关操作的接口
##### 模块相关接口实现

1. **新增模块**： public/sectionList 下新建以 pathName 命名的 json 文件（以下简称“模块 json 文件”），写入提交的模块相关信息；同时 public/下新建以 pathName 命名的文件夹（以下简称“模块接口文件夹”），用以存放该模块下的接口；
2. **修改模块**： 修改模块 json 文件，对比旧的 pathName，如不一样，需要将模块 json 文件重命名以及模块接口文件夹以新的 pathName 重命名；
3. **获取模块详情**： 找到模块 json 文件，读取文件内容；
4. **删除模块**：删除模块 json 文件和模块接口文件夹(文件夹下的所有文件也需删除)；
5. **获取带分页的模块列表**：获取 public/sectionList 文件夹下的所有 json 文件个数及内容，拼接为带 list 和 total 的对象返回。

##### 接口相关接口实现

1. **新增接口**：根据 pathName 找到对应的模块接口文件夹，创建以 url 命名的 json 文件（以下简称“接口 json 文件”），写入提交的接口相关信息；
2. **修改接口**：修改接口 json 文件，对比旧的 url，如不一样，需要将接口 json 文件以新的 url 重命名；
3. **获取接口详情**： 找到接口 json 文件，读取文件内容；
4. **删除接口**：删除接口 json 文件；
5. **获取带分页的接口列表**：获取 模块接口文件夹下的所有 json 文件个数及内容，拼接为带 list 和 total 的对象返回。

##### 自定义 mock 接口实现

&emsp;&emsp;读取接口 json 文件数据，获取请求参数和响应内容参数。第一步，校验请求的必填参数是否有提交，其次校验提交的参数类型是否正确。第二步，在第一步成功的基础上，对响应内容的数据进行处理，处理为 mock 可接收的对象，然后通过 mock，模拟数据返回。


#### 6.serve接口文档
server的几个接口是重点 比如增加模块 增加接口删除接口等等 所以放出一些接口文档

(1) 接口返回成功示例

```json
{
  success: true  // 主要通过这个字段去判断成功或者失败
  message: "新增成功"
  data: {list: [,…], total: 2}
  code: 200
}
```

(2) 接口返回失败示例

```json
{
  success: false
  data: null
  message: "child "url" fails because ["url" is required]"
  code: 400
}
```

1. 新增模块接口 post 方式 /section/createSection

```json
{
  "name": "模块1", // 模块名称-必填
  "pathName": "user", // 创建的文件夹名称以及调用接口需要加的前缀-必填且只能是英文(页面就叫接口前缀吧),每个模块的pathName唯一
  "description": "模块介绍" // 接口描述可选
}
```

2. 详情模块接口 post 方式 /section/getSectionDetail

```json
{
  "pathName": "user" // pathName-必填
}
```

3. 更新模块接口 post 方式 /section/updateSection

```json
{
  "id": 123, // id-必填
  "name": "模块1", // 模块名称-必填
  "pathName": "user", // 必填
  "description": "模块介绍" // 接口描述可选
}
```

4. 删除模块接口 post 方式 /section/deleteSection

```json
{
  "pathName": "user" // pathName-必填
}
```

5. 获取模块列表 post 方式 /section/getSectionList

```json
{
  "page": 1, // 当前页数可选
  "size": 2, // 每页显示条数可选
  "isPage": true // 必填，表示是否分页，true分页、false不分页
}
```

6. 新增接口 post 方式 /interface/createData

```json
// 提交参数
{
  "pathName": "user", // 所属模块的模块pathName必填
  "name": "示例接口", // 接口名必填
  "url": "/createJson", // 接口地址必填
  "method": "GET", // 接口请求方式可选，默认"POST"
  "status": 200, // 状态码可选，默认200
  "description": "描述" // 接口描述可选
}
```

7. 详情接口 post 方式 /interface/getDetailData

```json
{
  "pathName": "user", // 所属模块的模块pathName必填
  "url": "/createJson" // 接口地址必填
}
```

8. 修改接口 post 方式 /interface/updateData （参数必填项还未全部确定）

```json
{
  "pathName": "user", // 所属模块的pathName必填
  "id": 123, // 所更改的接口id--必填
  "name": "示例接口", // 接口名--必填
  "url": "/createJson", // 接口地址--必填
  "method": "GET", // 接口请求方式--必填
  "status": 200, // 状态码--必填
  "description": "描述" // 接口描述
  // 自定义请求参数
  "request": [
      {
        "id": 100,
        "parentId": -1,
        "name": "name", // 字段名
        "required": true, // 是否为必填项
        "type": "String", // 字段类型
        "rule": "", // 生成规则
        "value": "", // 初始值
        "description": "数组属性示例" // 字段描述
      },
    ],
  // 自定义返回内容
    "response": [
      {
        "id": 6,
        "parentId": -1,
        "name": "数组", // 字段名
        "required": true, // 是否为必填项
        "type": "Array", // 字段类型
        "rule": "1-2", // 生成规则
        "value": "", // 初始值
        "description": "数组属性示例" // 字段描述
      },
      {
        "id": 11,
        "parentId": 6,
        "name": "子元素1", // 字段名
        "required": true, // 是否为必填项
        "type": "Array", // 字段类型
        "rule": "1-2", // 生成规则
        "value": "@cname", // 初始值
        "description": "数组一级子元素" // 字段描述
      },
    ]
}
```

9. 删除接口 post 方式 /interface/deleteData

````json
{
   "pathName": "user", // 所属模块的模块pathName必填
   "url": "/createJson" // 接口地址必填
}

10. 获取接口列表，带分页 post 方式 /interface/getDataList

```json
{
   "pathName": "user",
  "page": 1, // 当前页数
  "size": 2, // 每页显示条数
  "isPage": true // 必填，表示是否分页，true分页、false不分页
}
````



### 小结

总感觉看的人和点赞的不多，仔细想想是纯文字输出 大家可能不爱看，所以提供了 [在线测试地址](http://1.14.164.222/#/home) 给大家测试，不知道能不能多一些人观看

不同平台的mock服务有不同的优缺点，当然如果我的文章对你有帮助 我也是很开心的
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/492fe7462d1a434aa81512924e0f0c20~tplv-k3u1fbpfcp-watermark.image)
选最适合你的 或者 最容易上手的 反正就是结合你自己的需求去选择。这里推荐[YApi](https://yapi.baidu.com/doc/documents/index.html)。简单上手，尽量减少学习成本。Yapi这点比较好。简单的使用甚至不需要了解mock.js的api.直接配置即可。开源程度社区活跃度较高，且保持bug的修复与功能完善.


### 结束语

其实最近一直在练习 怎么取分享知识和写好文章。这两点我现在都做的不怎么好 也许是掌握不深 所以不知道怎样去表达知识点和分享精彩吸引人的内容。
如果能坚持写博客 记录一下自己使用的技术之类 对我来说也是一种进步 孰能生巧！

**点关注不迷路！你那么帅(漂亮)，都看到这了，动手点个赞鼓励一下作者吧，谢谢！**

`点赞，点赞，点赞！ 非常谢谢！`


### 参考链接
1. [mock官方文档](http://mockjs.com/0.1/#) 和 [项目地址](https://github.com/nuysoft/Mock)
1. [yapi官方文档](https://yapi.baidu.com/doc/documents/index.html) 和  [项目地址](https://github.com/ymfe/yapi)
1. [常见MOCK-SERVER对比](https://blog.csdn.net/u014340331/article/details/105093557)
1. [几个mock平台的个人感受](https://www.jianshu.com/p/15ebd51ea733)
1. [Mockito 简明教程](https://www.cnblogs.com/bodhitree/p/9456515.html)

` PS:别问我为什么把好链接放后面(放前面 你们还能看完我的文章嘛) 要是觉得不错，点个赞哦 `
