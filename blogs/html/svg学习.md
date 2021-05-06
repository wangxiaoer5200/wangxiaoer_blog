---
title: SVG学习
date: 2018-05-18
categories:
 - html
tags:
 - html
sidebar: 'auto'
---
SVG 意为可缩放矢量图形（Scalable Vector Graphics）。

HTML三种方法导入svg文件：

<html xmlns:svg="http://www.w3.org/2000/svg">
<body>

<p>This is an HTML paragraph</p>
<!--1-->
<!--<embed src="rect1.svg" width="300" height="100"
type="image/svg+xml"
pluginspage="http://www.adobe.com/svg/viewer/install/" />-->

<!--2-->
<!--<object data="rect1.svg" width="300" height="100"
type="image/svg+xml"
codebase="http://www.adobe.com/svg/viewer/install/" />-->

<!--3-->
<!--<iframe width="300" height="100" src="rect1.svg"></iframe>-->

<object data="background.svg" width="1000" height="1000"
type="image/svg+xml"
codebase="http://www.adobe.com/svg/viewer/install/" />
</body>
</html>

SVG文件内容编辑：

<?xml version="1.0" standalone="no"?> //xml声明
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> //引用外部svg DTD

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">


<rect x="20" y="20" width="250" height="250"
style="fill:blue;stroke:pink;stroke-width:5;
fill-opacity:0.2;stroke-opacity:0.9"/>
</svg>

上面只是一个矩形svg的例子；

更多：

矩形（rect）：  style属性里写样式 rx,ry边角

圆形（circle）：  cx，cy圆心坐标

椭圆（ellipse）：cx，cy中心坐标 rx,ry水平，垂直半径

线（line）：x1 y1起点坐标 x2 y2终点坐标

多边形（ploygon）：points节点坐标 x,y x1,y1 x2,y2

折线（ployline）：points节点坐标 x,y x1,y1 x2,y2

路径（path）：M A L C H V S Q T Z

几个常用属性：

stroke，stroke-width：边框，边框宽度

fill：填充颜色
