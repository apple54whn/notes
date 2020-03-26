# 字体

## @font-face 网络字体

@font-face 可以让网页支持网络字体（Web Font），不再局限于系统自带的字体

```css
@font-face {
  font-family: "conanan";
  src: url("./font/conanan.ttf"),url("./font/conanan.otf");
}

p {
	font-family: "conanan"
}
```

常见的字体种类：

*   TrueType：.ttf
*   OpenType：.ttf、.otf，建立在 TrueType 之上
*   Embedded OpenType：.eot，OpenType 字体的压缩版
*   SVG：.svg、.svgz
*   web 开放字体：.woff，建立在 TrueType 字体之上

根据浏览器的支持，准备多种字体

Google Fonts 下载：https://fonts.google.com





## 字体图标

### 发展

字体图标使用场景：主要用于显示网页中通用、常用的一些小图标。

精灵图是有诸多优点的，但是缺点很明显。 

* 图片文件还是比较大的。
* 图片本身放大和缩小会失真。
* 一旦图片制作完毕想要更换非常复杂。

此时，有一种技术的出现很好的解决了以上问题，就是字体图标 iconfont。字体图标可以为前端工程师提供一种方便高效的图标使用方式，展示的是图标，本质属于字体。



### 优点

* 轻量级：一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了服务器请求 
* 灵活性：本质其实是文字，可以很随意的改变颜色、产生阴影、透明效果、旋转等
* 兼容性：几乎支持所有的浏览器，请放心使用

注意：**字体图标不能替代精灵技术**，只是对工作中图标部分技术的提升和优化。

* 如果遇到一些结构和样式比较简单的小图标，就用字体图标。
* 如果遇到一些结构和样式复杂一点的小图片，就用精灵图。



### 使用

字体图标是一些网页常见的小图标，我们直接网上下载即可。 因此使用可以分为: 

1. 字体图标的下载，把下载包里面的 fonts 文件夹放入**页面根目录**下

    不同浏览器所支持的字体格式是不一样的，字体图标之所以兼容就是因为包含了主流浏览器支持的字体文件。

    * TureType(.ttf)格式.ttf字体是Windows和Mac的最常见的字体，支持这种字体的浏览器有IE9+、Firefox3.5+、 Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+;
    * Web Open Font Format(.woff)格式woff字体，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、 Safari3.6+、Opera11.1+;
    * Embedded Open Type(.eot)格式.eot字体是IE专用字体，支持这种字体的浏览器有IE4+;
    * SVG(.svg)格式.svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、 Opera10.0+、iOS Mobile Safari3.2+;

2. 字体图标的引入 (引入到我们html页面中)

    一般下载的demo会有介绍

3. 字体图标的追加 (以后添加新的小图标)



### 推荐下载网站

* [icomoon](http://icomoon.io) 字库  推荐指数 ★★★★★

    IcoMoon 成立于 2011 年，推出了第一个自定义图标字体生成器，它允许用户选择所需要的图标，使它们成

    一字型。该字库内容种类繁多，非常全面，唯一的遗憾是国外服务器，打开网速较慢。

* 阿里 [iconfont](http://www.iconfont.cn/) 字库 推荐指数 ★★★★★

    这个是阿里妈妈 M2UX 的一个 iconfont 字体图标字库，包含了淘宝图标库和阿里妈妈图标库。可以使用 AI 制作图标上传生成。 重点是，免费!



