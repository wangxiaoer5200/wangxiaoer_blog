---
title: vue使用render来写组件
date: 2020-08-18
categories:
 - vue
tags:
 - vue
sidebar: 'auto'
---

---
theme: channing-cyan
---
### vue使用render来写组件
 来掘金时间也不短了，一篇文章都没有，可能是因为害羞，也可能是掘金大佬太多，一直在取经，而不敢献丑。今天发表第一篇掘金文章，内容简单勿吐槽。这里的例子是跟着官网的渲染函数。

 ### 渲染函数介绍
 Vue 推荐在绝大多数情况下使用模板来创建你的HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。
### 实例
让我们深入一个简单的例子，这个例子里render函数很实用。假设我们要生成一些带锚点的标题。
首先来定义一个简单的组件：
```
<template>
  <div>
     <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
   <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else>
     <slot></slot>
  </h6>
  </div>
</template>
<script>
export default {
  props:{
    level:{
      type:Number,
      default:1
    }
  },
  data(){
    return {

    }
  }
}
</script>
```
组件完成，来引用组件：
```
<template>
  <div>
    <heading :level='level'>这里是插槽内容 现在的leave={{2}}</heading>
  </div>
</template>
<script>

import heading from './heading.vue'
export default {
  components:{
    heading:heading
  },
  data() {
    return {
      level:2
    }
  },

}
</script>
```



![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2a1ac26b3414272b033e1bc4d6bd53b~tplv-k3u1fbpfcp-zoom-1.image)
效果如图，如果打开控制台也是可以看见标签元素是h2。
这样写显得很麻烦，如果我们来试试render函数写一波新组件
```
<script>
export default {
  name: 'heading',
  props: {
    level: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  render(createElement) {
    let arr = [1,2,3,4,5]
    return createElement('div', {
      class: {
        // 这里可以添加class
      },
      attrs: {
        // 添加属性的地方
      },
      domProps: {
        // 内容
      },
      on: {
          // 添加事件的地方
      },
    },
    [
    arr.includes(this.level)?createElement('h'+this.level, this.$slots.default):createElement('h6', this.$slots.default)

    ])
  },
}
</script>
```
这里保持和原来使用模板写的组件一样最外层一层div里面才是包这h标签，当非12345的时候，使用h6标签。
所以这里可以简单看出createElement(Element,options,childrens);Element是要渲染的元素标签，options这里是该标签的一些配置也可以添加事件比如class/attrs/domProps属性，childres是一个数组里面放着子内容也可以由多个createElement(Element,options,childrens)这样的内容，具体的话看具体情况。

### 优点
- 最主要最关键的原因是函数式组件不需要实例化，无状态，没有生命周期，所以渲染性能要好于普通组件
- 函数式组件结构比较简单，代码结构更清晰

### 结语
关于渲染函数还是要多使用，孰能生巧，肯定没错，写多了就理解的快。第一次使用markdown写文章 还是很爽的，只是学到一些简单的语法。之后应该会分享一些ts和vue3的实践，因为最近写的最多的就这个。
