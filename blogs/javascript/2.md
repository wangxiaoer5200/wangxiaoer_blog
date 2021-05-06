---
title: React井字棋改进
date: 2020-08-24
categories:
 - js
tags:
 - js
sidebar: 'auto'
---
---
theme: channing-cyan
highlight: juejin
---

### 前言:

临时加了个预览地址： **[在线demo](https://wangxiaoer520.gitee.io/my-app/)**

这篇文章并不是React教程。

主流前端框架：**Vue, React, Angular**，工作这两年用过一次Ag,其它都在使用Vue,只有React接触的实在是少。今天下班之余打开  **[React官网](https://zh-hans.reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)** 想轻过一遍教程,看过教程的都知道上面提供了一个井字棋游戏实现的教程，官网那里也写的超级详细，我就不再说了，我想实现的是教程末尾的改进：
***************
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/680da8c774564c408fd83dd6fa71dd87~tplv-k3u1fbpfcp-watermark.image)
***************
我想完成的就是把官网教程末，改进游戏的想法在前面的基础上进行实现。

### 搭建本地开发环境
1. 我本地是有安装了较新版本的 Node.js。
2. 使用cmd运行`npx create-react-app my-app`命令，官方脚手架创建一个叫my-app的React项目
3. 安装完成 使用yarn start跑起这个项目
然后跟着教程走一遍，我这里略过......,
到这，你就已经完成官方提供的教程例子。我开始往下：

##### 需求1：在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
简单分析：
完成前面内容的都知道九个格子是可以用0-8作为下标index的，那这个需求就简单了，只要把下标简单换成横纵坐标,比如`const arr = [[1, 1], [1, 2], [1, 3],
      [2, 1], [2, 2], [2, 3],
      [3, 1], [3, 2], [3, 3]]`这样一个数组取`arr[index]`就可以拿到横纵坐标，我用`rederContent()`实现了一个落子详情
      <div>
      <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6060f73f415d400086320baab085cb4f~tplv-k3u1fbpfcp-watermark.image"  height="100" width="150"></div>
代码：
```
rederContent() {
    const positionArr = this.state.positionArr
    if (positionArr.length === 0) {
      // 还未落子
      return ''
    }
    else {
      const arr = [[1, 1], [1, 2], [1, 3],
      [2, 1], [2, 2], [2, 3],
      [3, 1], [3, 2], [3, 3]]

      const content = positionArr.map((item, index) => {
        if (index >= this.state.stepNumber) {
          // 这是返回到某一历史步骤会出现positionArr长度大于stepNumber
          return
        }
        let position = arr[item]
        const text = `第${index + 1}步:   ${index % 2 === 0 ? 'X' : 'O'}`
        const text1 = `落子第${position[0]}行，第${position[1]}列`
        return (
          <div key={index}>
            <span className='content-span'>{text}</span>
            <span>{text1}</span>
          </div>
        );
      });
      return content
    }
  }
  ```
  ##### 需求2：在历史记录列表中加粗显示当前选择的项目。
这个也很快，当前有存一个stepNumber，那和对应的步骤找到关系，相等时去增加区分的样式
  `className={move === this.state.stepNumber ? 'moveClick' : ''`
##### 需求3：使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）
分析一下：原来写死，那我想实现一个方法`renderContent(x,y)`接收两个参数，x代表行，y代表列数
```
// 渲染行数
  renderContent(x, y) {
    let content = []
    for (let i = 0; i < x; i++) {
      content.push(
        <div className="board-row" key={i}>{this.renderRow(i, y)}</div>
      )
    }
    return content
  }
  // 渲染行内容
  renderRow(x, y) {
    let content = []
    for (let i = 0; i < y; i++) {
      let num = x * 3 + i
      content.push(
        this.renderSquare(num)
      )
    }
    return content
  }
  ```
  这样你想渲染几行几列的表格都是由你来决定了
##### 需求4：添加一个可以升序或降序显示历史记录的按钮
这个就是要让实现一个上一步,下一步的功能咯
```
 jumpToNext(v) {
    let num = this.state.stepNumber
    if (v) {
    // v 有值 执行下一步的操作
      if (num === this.state.history.length - 1) {
        alert('当前是最后一步')
      } else {
        this.setState({
          stepNumber: num + 1,
          xIsNext: ((num + 1) % 2) === 0
        })
      }
    } else {
    //  执行上一步的操作
      if (num === 0) {
        alert('当前是第一步')
      } else {
        this.setState({
          stepNumber: num - 1,
          xIsNext: ((num - 1) % 2) === 0
        })
      }
    }
  }
  ```
如代码所示，根据当前步骤，所在位置，首末的时候做个判断。

##### 需求5：每当有人获胜时，高亮显示连成一线的 3 颗棋子
分析：取到胜利时的三子坐标，之前有个方法是用来判断是否三子连线，我做了修改，加个参数flag，true的时候让其返回对应的三子坐标,再把对应坐标的棋子加个样式
```
  calculateWinner(squares, flag = false) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (flag) {
          return [a, b, c]
        } else { return squares[a]; }

      }
    }
    return null;
  }
```
效果:
<div>
     <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53fef39dd3e84f658ca29a4b820e3025~tplv-k3u1fbpfcp-watermark.image"  height="100" width="150"></div>

##### 需求6：当无人获胜时，显示一个平局的消息
当无子可下的时候，加个平局提醒,当没出现胜利者，而步数为9则是平局
```
 if (winner) {
      status = "Winner: " + winner;
    } else if (this.state.stepNumber === 9) {
      status = '游戏结束！双方平局！'
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
```
<div>
      <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84b20fa555dd4e15b67838e0c621e4fd~tplv-k3u1fbpfcp-watermark.image"  height="100" width="150"></div>

 ### 小结：
 我只是按自己想法去实现对应需求，实现这些需求的方法可以是多样变化的，代码永远没有唯一，这里我附上 **[完整代码的地址](https://github.com/wangxiaoer5200/my-app)** ，这是 **[预览地址](https://wangxiaoer520.gitee.io/my-app/)** 感兴趣的可以打开查看。当然咯，这篇文章并不是React教程。
