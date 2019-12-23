# 布局

页面布局要学习三大核心：**盒子模型、浮动、定位**

网页布局过程：

1. 先准备好相关的网页元素，网页元素基本都是盒子 Box
2. 利用 CSS 设置好盒子样式，然后摆放到相应位置
3. 往盒子里面装内容

 网页布局的核心本质：就是利用 CSS 摆盒子。

## Box Model 盒子模型

盒子模型：所有HTML元素可以看作盒子，在CSS中，"box model"这一术语是用来设计和布局时使用。CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：**外边距，边框，内边距 和 实际内容**。盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

![CSS box-model](./images/box-model-20191222195705802.gif)



### 边框 border🔥

#### `border` 组合🔥

简写

```css
border : border-width || border-style || border-color;
```

分开写

```css
border-top: border-width || border-style || border-color;
border-bottom: border-width || border-style || border-color;
border-left: border-width || border-style || border-color;
border-right: border-width || border-style || border-color;
```

> 注意边框的层叠性



#### `border-width` 宽度

* 同其他

#### `border-style` 样式

- none：没有边框即忽略所有边框的宽度，默认
- solid：边框为单实线，**常用**
- dashed：边框为虚线
- dotted：边框为点线
- double：双线
- ...

#### `border-color` 颜色

* 同其他
* `transparent`透明



#### `border-collapse` 表格细线边框🔥

border-collapse 属性控制浏览器绘制表格边框的方式。它控制相邻单元格的边框。

```css
border-collapse: collapse || separate; 
```

* collapse：**合并**，表示相邻边框合并在一起，**常用**
* separate：分开



#### `border-radius`圆角边框🔥

> radius：半径

* length
  * px
  * %
* 可以**分别给四个角**都设置角度
  * 左上、 右上、 右下、 左下
  * 左上和右下、 右上和左下
  * ...
* 甚至还能直接指定top、bottom、left、right，**必须前两个在前面**



案例（**常用**）

* 如何让一个盒子变**圆形**：给`border-radius`为正方盒子 width 和 height（相等） 的一半，如50%

  ```css
  div{
    border-radius: 50%
  }
  ```

* 如何让一个盒子变**圆角矩形**：给`border-radius `为盒子 height 的一半，如50%







### 内边距 `padding`🔥

padding 属性用于设置内边距，即边框与内容之间的距离。

| 值的个数                     | 含义                      |
| ---------------------------- | ------------------------- |
| padding: 5px;                | 1个值，代表上下左右       |
| padding: 5px 10px;           | 2个值，代表上下、左右     |
| padding: 5px 10px 20px;      | 3个值，代表上、左右、下   |
| padding: 5px 10px 20px 30px; | 4个值，代表上、右、下、左 |

> 也可以分开指定上下左右，如 border 中写法

当我们给盒子指定 padding 值之后，发生了 2 件事情:

* 内容和边框有了距离，添加了内边距。

* padding**影响了盒子实际大小**。 也就是说，如果盒子已经有了宽度和高度，此时再指定内边框，会撑大盒子。



### 外边距 `margin`🔥

#### 使用

margin 清除周围的（外边框）元素区域。margin 没有背景颜色，是完全透明的。

| 值的个数                    | 含义                      |
| --------------------------- | ------------------------- |
| margin: 5px;                | 1个值，代表上下左右       |
| margin: 5px 10px;           | 2个值，代表上下、左右     |
| margin: 5px 10px 20px;      | 3个值，代表上、左右、下   |
| margin: 5px 10px 20px 30px; | 4个值，代表上、右、下、左 |

> 也可以分开指定上下左右，如 border 中写法

| 值       | 说明                                        |
| :------- | :------------------------------------------ |
| auto     | 设置浏览器边距。 这样做的结果会依赖于浏览器 |
| *length* | 定义一个固定的margin（使用像素，pt，em等）  |
| *%*      | 定义一个使用百分比的边距                    |

> Margin可以使用负值，重叠的内容。



#### 应用

**margin 典型应用**——让**块级盒子水平居中**，但需满足两个条件

* 盒子必须指定了width

* 盒子的左右margin都设置为auto

  ```css
  div {
    margin: 0 auto
  }
  ```

  **若是行内块元素或行内元素需要水平居中**，可以给其父元素添加`text-align: center`即可



#### 外边距合并问题

使用 margin 定义块元素的**垂直外边距**时，可能会出现外边距的合并，**合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。**主要有两种情况

* **相邻块元素垂直外边距的合并（上下边框）**

  当上下相邻的两个块元素(兄弟关系)相遇时，如果上面的元素有下外边距 margin-bottom，下面的元素有上外边距 margin-top ，则他们之间的垂直间距不是 margin-bottom 与 margin-top 之和。**取两个值中的较大者这种现象被称为相邻块元素垂直外边距的合并**。

  解决方案：

  * 所以**尽量只给一个盒子添加 margin 值**。

  <img src="./images/image-20191223002453257.png" alt="image-20191223002453257" style="zoom:50%;" />

* **嵌套块元素垂直外边距的塌陷（上下边框）**

  对于两个嵌套关系(父子关系)的块元素，父元素有上外边距同时子元素也有上外边距，此时父元素会塌陷较大的外边距值。即子元素想距离父元素上边距失效。

  <img src="images/image-20191223003825165.png" alt="image-20191223003825165" style="zoom:50%;" />

  解决方案：

  * 可以为父元素定义上边框。
  * 可以为父元素定义上内边距。
  * 可以为父元素添加 overflow:hidden。**推荐**
  * 还有其他方法，比如浮动、固定，绝对定位的盒子不会有塌陷问题，后面咱们再总结。





### 影响盒子实际大小🔥

#### 解决

* **border 和 padding** 会额外增加盒子的实际大小（不是width和height）。因此我们有两种方案解决：
  * 若测量时**包含了border和padding**，则需要设置 width/height 时**减去border和padding**，可能要减2次
  * **测量盒子大小的时候，不量边框。**（只针对只有border没有padding的情况）

* **但是若没有指定width或height，则给定padding不会改变盒子大小width或height（相对应）**

  没width则不改变width，没height则不改变width

  即使子节点和父节点一样宽，也不要指定宽度，100%也不行，否则使用padding也会改变盒子大小



#### padding影响盒子好处

* 新浪导航案例

  padding内边距可以撑开盒子，我们可以做非常巧妙的运用。因为每个导航栏里面的**字数不一样多**，我们可以**不用给每个盒子宽度了**，直接给 **padding** 最合适，且 a 标签为行内元素，需转为行内块元素才能修改宽高





### 清除内外边距🔥

网页元素很多都带有默认的内外边距，而且不同浏览器默认的也不一致。因此我们在布局前，首先要清除下网页元素的内外边距。一般放在CSS第一行。

```css
* {
  padding:0; /* 清除内边距 */ 
  margin:0; /* 清除外边距 */
}
```

注意：**行内元素为了照顾兼容性，尽量只设置左右内外边距**，不要设置上下内外边距。但是转换为块级和行内块元素就可以都设置了



### 盒子阴影 `box-shadow`🔥

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

| 值         | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| *h-shadow* | **必需**。水平阴影的位置。允许负值。                         |
| *v-shadow* | **必需**。垂直阴影的位置。允许负值。                         |
| *blur*     | 可选。模糊距离。                                             |
| *spread*   | 可选。阴影的尺寸。                                           |
| *color*    | 可选。阴影的颜色。请参阅 CSS 颜色值。                        |
| inset      | 可选。将外部阴影 (outset) 改为内部阴影。不能写outset这个值否则失效 |

> ⚠️ **影子不占用空间**，不影响其他盒子排列





## 标准流/普通流/文档流

> CSS 提供了三种传统布局方式：文档流、浮动、定位。移动端或现代布局会有新的方式

标签按照规定好默认方式排列

* 块级元素会独占一行，从上向下顺序排列

  常用元素:div、hr、p、h1~h6、ul、ol、dl、form、table

* 行内元素会按照顺序，从左到右顺序排列，碰到父元素边缘则自动换行

  常用元素:span、a、i、em 等

以上都是标准流布局，我们前面学习的就是标准流，标准流是最基本的布局方式。





## float 浮动

### 为什么需要浮动

* 如何让多个块级盒子(div)水平排列成一行？比较难，虽然转换为行内块元素可以实现一行显示，但是他们之间会有大的**空白缝隙**

* 如何实现两个盒子的左右对齐？

总结：有很多的布局效果，标准流没有办法完成，此时就可以利用浮动完成布局。 因为**浮动可以改变元素标签默认的排列方式**，浮动最典型的应用就是**让多个块级元素一行内排列显示**

**网页布局第一准则：多个块级元素纵向排列找标准流，多个块级元素横向排列找浮动。**



### 什么是浮动

float 属性用于**创建浮动框**，**将其移动到一边**，**直到左边缘或右边缘触及 包含块 或 另一个浮动框 的边缘**。

```css
选择器 { 
  float: 属性值; 
}
```

| 值      | 描述                                                 |
| :------ | :--------------------------------------------------- |
| left    | 元素向左浮动。                                       |
| right   | 元素向右浮动。                                       |
| none    | 默认值。元素不浮动，并会显示在其在文本中出现的位置。 |
| inherit | 规定应该从父元素继承 float 属性的值。                |



### 浮动特性🔥

加了浮动之后的元素，会具有很多特性，需要我们掌握的：

* 脱离标准普通流的控制（浮）移动到指定位置（动），俗称**脱标**。浮动的盒子**不再保留原先的位置**，可能与标准流盒子重叠
* 如果**多个盒子都设置了浮动**，则它们会按照属性值**一行内显示（无空隙）并且顶端对齐排列**
* 任何元素都可以浮动。**不管原先是什么模式的元素**，添加浮动之后**具有行内块元素相似的特性**
  * 如果块级盒子没有设置宽度，**默认宽度和父级一样宽**，但是添加浮动后，它的**宽度根据内容来决定**
  * 浮动的盒子中间是没有缝隙的，是**紧挨**着一起的
  * 行内元素可以不用转换为块级或行内块元素，直接设置宽高



### 浮动和标准流父级搭配🔥

为了**约束浮动元素位置**，我们网页布局一般采取的策略是：

* 先用标准流的**父元素排列上下位置**
* 之后内部**子元素采取浮动排列左右位置**。符合网页布局第一准侧.



## position 定位

#### 1、float

- ==当一个元素浮动之后，它会被**移出正常的文档流**，然后向左或者向右**平移**，一直平移直到碰到了所处的**容器的边框**，或者碰到**另外一个浮动的元素**。==

  - 当框 1 向左浮动时，它脱离文档流并且向左移动，直到它的左边缘碰到包含框的左边缘，覆盖框2

  - 如果把三个框都向左浮动，那框1向左浮动直到碰到包含框，另外两个框向左浮动直到碰到前一个浮动框

    ![](images/css_positioning_floating_left_example.png)

  - 如果包含框太窄，无法容纳水平排列的三个浮动元素，那么其它浮动块向下移动，直到有足够的空间；如果浮动元素的高度不同，那么当它们向下移动时可能被其它浮动元素“卡住”

    ![](images/css_positioning_floating_left_example_2.png)

- `float: none | left | right;` ：对象向左边|右边浮动

  - `clear: none | left | right | both;`：规定元素的哪一侧不允许其他浮动元素

#### 2、position

- **position**的属性值：
  - **absolute** ：生成**绝对定位的元素**，相对于 static 定位以外的第一个**父元素**进行定位。 
    - 可以使用top、bottom等属性进行定位
  - **relative** ：生成**相对定位**的元素，相对于**其正常位置**进行定位 
    - 可以使用top、bottom等属性进行定位



## 框架

### 1 bootstrap

> 详细内容访问[Bootstrap中文网](http://www.bootcss.com/)

- **引入依赖**

  - css：`bootstrap.css`
  - js：`jquery.js`、`popper.js`(用于弹窗、提示、下拉菜单。版本3没有这个)、`bootstrap.js`

- **响应式布局**：一个网站可以兼容多个终端

  ```html
  <meta charset="UTF-8">
  <!--响应式 meta 标签;viewport宽度；初始缩放值；最小/最大缩放值；是否允许用户缩放-->
  <!--还有minimum-scale；maximum-scale；user-scalable=true/false-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--文档兼容模式-->
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  ```

  - viewport
    - 移动设备上的就是**设备的屏幕上能用来显示我们的网页的那一块区域**
  - px
    - css中1px并不等于设备的1px

- 步骤

  1. 定义布局容器：`container`、`.container-fluid`
  2. 定义行：`row`
  3. 定义列：`col-xs-*`、`col-sm-*`、`col-md-*`、`col-lg-*`、`hidden-**`（可以让元素在某个屏幕大小设备**不显示**）

#### 1.1 布局容器

- Bootstrap 需要为页面内容和栅格系统包裹一个容器
  - `.container` **类**用于固定宽度（根据不同设备左右有固定留白，但xs没有留白）并支持响应式布局的容器
  - `.container-fluid` **类**用于 100% 宽度，占据全部视口（viewport）的容器

#### 1.2 栅格系统

Bootstrap提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口(viewport)尺寸的增加，系统会自动分为最多**12列**

- 栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。工作**原理**如下：
  - “行（row）”必须包含在 `.container` （固定宽度）或 `.container-fluid` （100% 宽度）中，以便为其赋予合适的排列（**aligment**）和内补（**padding**）。
  - 通过“行（row）”在水平方向创建一组“列（column）”。
  - 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为“行（row）”的直接子元素。
  - 类似 `.row` 和 `.col-xs-4` 这种预定义的类，可以用来快速创建栅格布局。Bootstrap 源码中定义的 mixin 也可以用来创建语义化的布局。
  - 通过为“**列（column）”设置 `padding` 属性**，从而创建列与列之间的间隔（gutter）。通过**为 `.row` 元素设置负值 `margin`** 从而抵消掉为 `.container` 元素设置的 `padding`，也就间接为“行（row）”所包含的“列（column）”抵消掉了`padding`。==多列嵌套时，可以通过==`padding:0`==来取消内边距，使得元素占满viewport==
  - 负值的`margin`就是下面的示例为什么是向外突出的原因。在栅格列中的内容排成一行。
  - 栅格系统中的列是通过指定1到12的值来表示其**跨越的范围**。例如，三个等宽的列可以使用三个 `.col-xs-4` 来创建。
  - 如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体**另起一行排列**。
  - **向上兼容且不向下兼容**：**栅格类适用于与屏幕宽度大于或等于分界点大小的设备** ， 并且**针对小屏幕设备覆盖栅格类（可能每个列占一行）**。 因此，在元素上应用任何 `.col-md-*`栅格类适用于与屏幕宽度大于或等于分界点大小的设备 ， 并且针对小屏幕设备覆盖栅格类。 因此，在元素上应用任何 `.col-lg-*`不存在， 也影响大屏幕设备。

#### 1.3 全局CSS样式、组件、插件

**全局CSS样式**

- 按钮： `<button>` (建议使用)、`<a>`、 `<input>` 。`class="btn btn-default"`
- 图片：`img-responsive"`、`img-rounded`(方)、`img-circle`(圆)、`img-thumbnail`(相框)
- 表格：`table`、`table-bordered`、`table-hover`
- 表单：

**组件**

- 导航条
- 分页：！！！

**插件**

- 轮播图

#### 1.4 其他详细的看文档去吧！



### 2 AdminLTE

- AdminLTE简介

  AdminLTE是一款建立在bootstrap和jquery之上的开源的模板主题工具，它提供了一系列响应的、 可重复使用的组件，并内置了多个模板页面；同时自适应多种屏幕分辨率，兼容PC和移动端。通 过AdminLTE，我们可以快速的创建一个响应式的Html5网站。AdminLTE框架在网页架构与设计 上，有很大的辅助作用，尤其是前端架构设计师，用好AdminLTE 不但美观，而且可以免去写很大 CSS与JS的工作量。从GitHub获取[AdminLTE源码](https://github.com/almasaeed2010/AdminLTE)

  AdminLTE依赖于两个框架Bootstrap3与JQuery1.11+

- AdminLTE结构介绍

  ```
  AdminLTE/ 
  ├── dist/ 
  │   ├── CSS/ 
  │   ├── JS 
  │   ├── img 
  ├── build/ 
  │   ├── less/ 
  │   │   ├── AdminLTE's Less files 
  │   └── Bootstrap-less/ (Only for reference. No modifications have been made) 
  │       ├── mixins/
  │       ├── variables.less 
  │       ├── mixins.less 
  └── plugins/    
      ├── All the customized plugins CSS and JS files
  ```

- AdminLTE布局与皮肤

  - 布局

    `.wrapper`包住了body下的所有代码

    `.main-header`里是网站的logo和导航栏的代码

    `.main-sidebar`里是用户面板和侧边栏菜单的代码

    `.content-wrapper`里是页面的页面和内容区域的代码 

    `.main-footer`里是页脚的代码

    `.control-sidebar`里是页面右侧侧边栏区域的代码

  - 布局选项

    `fixed`：固定

    `layout-boxed`：盒子布局

    `layout-top-nav`：顶部隐藏

    `sidebar-collapse`：侧边栏隐藏

    `sidebar-mini`：侧边栏隐藏时有小图标

  - 皮肤

    `skin-blue`：蓝色

    `skin-black`：黑色

    `skin-purple`：紫色

    `skin-yellow`：黄色 

    `skin-red`：红色

    `skin-green`：绿色



- **AdminLTE2-IT黑马-定制版**

  传智播客研究院针对英文版本AdminLTE进行了汉化，并优化与定制了部分页面，方便我们的学习 与使用。后续SSM综合练习课程中使用的界面就是基于AdminLTE2-IT黑马-定制版。从GitHub[获取源码](https://github.com/itheima2017/adminlte2-itheima)，也可以[在线进行浏览](http://research.itcast.cn/adminlte2-itcast/release/dist/pages/all-admin-index.html)。

  minLTE2-IT黑马-定制版是基于FIS3进行开发，在目录结构中assets、modules、pages、 plugins都是前端开发时所使用到的，最终发布的就是release。所以对于我们使用AdminLTE2-IT黑 马-定制版来说，我们只需要**关注release目录**下的结构就可以。

  在release目录下有**css、img、pages、plugins**目录。前两者就不在解决pages是产生的一些定制的页面，而plugins中是相关的插件，例如jquery、bootstrap等相关的css与js文件。

