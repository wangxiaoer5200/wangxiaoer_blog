---
title: call、apply和bind的学习
date: 2020-08-23
categories:
 - js
tags:
 - js
sidebar: 'auto'
---
---
theme: channing-cyan
---
### 前言
以前在自己博客写过，这里简单重新复习一下并加点拓展。
<br/>
<i>之前粗略版：https://www.cnblogs.com/wangxiaoer5200/p/11981063.html</i>
<br/>
call、apply、bind的作用是改变函数运行时this的指向，this永远指向最后调用它的这个对象。关于this这里就不多说了，现在开始康康```call/apply/bind```

### 相似点
+ 都是用来改变函数的this对象的指向的。
+ 第一个参数都是this要指向的对象。
+ 都可以利用后续参数传参。

```
var xw = {  name : "小王",gender : "男" age : 24, say : function() {console.log(this.name + " , " + this.gender + " ,今年" + this.age); }

  var xh = {  name : "小黄" ,gender : "女", age : 18 }

调用xw.say(); //这个简单 打印出：小王，男，今年24

那么如何用xw的say方法来显示xh的数据呢。这时候就可以用到call、apply、bind

xw.say.call(xh);  //这时打印的就是：  小黄，女，今年18

xw.say.apply(xh); //打印的 小黄，女，今年18

xw.say.bind(xh)(); //打印的  小黄，女，今年18
```



 ### 区别
  + 这里call和apply的区别主要在于带参的形式，可以记住apply是以array数组形式调用，和call是...arg形式，bind和call一样；
 + 使用时bind比call和apply调用多了(),所以bind返回函数需要自己再执行调用一次，而bind和call都是对函数的直接调用
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30e2f90f2b4e49108f1d36378faf03ae~tplv-k3u1fbpfcp-zoom-1.image)

### 自己使用js简单实现这个三个方法

call实现
```
Function.prototype.mycall = function(obj,...arg){
  const fn = Symbol('test')
  obj[fn] = this
  obj[fn](...arg)
  delete obj[fn]
}
```
apply实现
```
Function.prototype.myapply=function(obj,arg){
    const fn = Symbol('test')
    obj[fn] = this
    obj[fn](...arg)
    delete obj[fn]
}
```
bind实现
```
Function.prototype.myBind = function(obj,...args){
   const Fn = this
   let fBind = function(...args2){
   const isNew = this instanceof fBind
   const context = isNew?this:Object(obj)
   return Fn.call(context,...args,...args2)
  }
   fBind.prototype = Object.create(Fn.prototype)
   return fBind
}
```
然后声明后试试
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4c5dac433f24599b1533679d3d6c117~tplv-k3u1fbpfcp-zoom-1.image)

### 后记
perfect! 一个人如果没有梦想，跟无忧无虑有什么区别呢？
