# Box Model 盒子模型

盒子模型：**所有 HTML 元素可以看作盒子**，在 CSS 中，"box model"这一术语是用来设计和布局时使用。CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：**外边距，边框，内边距 和 实际内容**。盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

![CSS box-model](./images/box-model-20191222195705802.gif)



## `box-sizing` 盒子大小 🔥

CSS3 中可以通过 `box-sizing` 来指定盒模型，这样我们计算盒子大小的方式就发生了改变。有 2 个值

- `content-box`：即设置`width`和`height`仅针对`content`，最终盒子大小为 content + padding + border。
- `border-box`：CSS3，即设置`width`和`height`针对 content + padding + border。

如果盒子模型我们改为了 `border-box` ， 那 padding 和 border 就不会撑大盒子了，前提 padding 和 border 不会超过 width 宽度。

如果盒子模型我们改为了`content-box`且没有指定 width 或 height（即使子节点和父节点一样宽，也不要指定宽度，100%也不行），则给定 padding 不会改变盒子大小 width 或 height（相对应），没 width 则不改变 width，没 height 则不改变 height。

但是 `padding`可以撑开盒子，我们可以做非常巧妙的运用。因为每个导航栏里面的**字数不一样多**，我们可以**不用给每个盒子宽度了**，直接给 **padding** 最合适，且 a 标签为行内元素，需转为行内块元素才能修改宽高



## `width` 宽度

*   `width` 设置盒子的宽度

*   `min-width` 代表最小宽度，最终值大于等于`min-width`，**多用于 PC 网站，固定最小宽度**
*   `max-width` 代表最大宽度，最终值小于等于`max-width`，用于`inline-block`的元素内容，超过即换行



## `height` 高度

*   `height` 设置盒子的高度

*   `min-height` 代表最小高度，最终值大于等于`min-height`，**多用于 PC 网站，固定最小高度**
*   `max-height` 代表最大高度，最终值小于等于`max-width`，用于固定最大高度，超过可通过`overflow`隐藏



## `padding` 内边距

padding 属性用于设置内边距，即 border 与 content 之间的距离。也可以分开指定上下左右。

| 值的个数                     | 含义                       |
| ---------------------------- | -------------------------- |
| padding: 5px;                | 1 个值，代表上下左右       |
| padding: 5px 10px;           | 2 个值，代表上下、左右     |
| padding: 5px 10px 20px;      | 3 个值，代表上、左右、下   |
| padding: 5px 10px 20px 30px; | 4 个值，代表上、右、下、左 |

在`box-sizing`为`content-box`时，padding **影响了盒子实际大小**。 也就是说，如果盒子已经有了宽度和高度，此时再指定内边框，会撑大盒子。



## `border` 边框 

### `border` 缩写🔥

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

注意边框的层叠性



### `border-width` 宽度

* 同其他



### `border-style` 样式

- none：没有边框即忽略所有边框的宽度，默认
- solid：边框为单实线，**常用**
- dashed：边框为虚线，**常用**
- dotted：边框为点线
- double：双线
- ...



### `border-color` 颜色

* 同其他
* `transparent`透明



### 边框的形状 🔥

如下代码：

```html
<style>
  div {
    display: inline-block;
  }
  .border-shape-1 {
    width: 100px;
    height: 100px;
    border-top: 50px solid red;
    border-right: 50px solid blue;
    border-bottom: 50px solid green;
    border-left: 50px solid skyblue;
  }

  .border-shape-2 {
    /* 宽度必须给0，否则独占一行，默认为父容器宽度。高度可以不给，通过内容撑起来 */
    width: 0;
    border-top: 100px solid red;
    border-right: 100px solid blue;
    border-bottom: 100px solid green;
    border-left: 100px solid skyblue;
  }
  
  .border-shape-3 {
    /* 宽度必须给0，否则独占一行，默认为父容器宽度。高度可以不给，通过内容撑起来 */
    width: 0;
    border-top: 200px solid red;
    border-left: 200px solid skyblue;
    /* 上左，上右改变分割线方向 */
    /* border-right: 200px solid blue; */
  }

  /* 也可以配合3种示例，结合旋转实现 */
  .border-shape-4 {
    /* 宽度必须给0，否则独占一行，默认为父容器宽度。高度可以不给，通过内容撑起来 */
    width: 0;
    border: 100px solid transparent;
    border-left: 100px solid skyblue;
  }

  .border-shape-5 {
    /* 宽度必须给0，否则独占一行，默认为父容器宽度。高度可以不给，通过内容撑起来 */
    width: 0;
    border-top: 200px solid red;
    border-right: 100px solid blue;
    border-left: 100px solid skyblue;
  }
</style>
<div class="border-shape-1"></div>
<div class="border-shape-2"></div>
<div class="border-shape-3"></div>
<div class="border-shape-4"></div>
<div class="border-shape-5"></div>
```

显示效果如下：

![image-20200314195937235](./images/image-20200314195937235.png)





### `border-collapse` 表格边框🔥

border-collapse 属性控制浏览器绘制表格边框的方式。它控制相邻单元格的边框。

```css
border-collapse: collapse || separate; 
```

* collapse：**合并**，表示相邻边框合并在一起，**常用**
* separate：分开



### `border-radius`圆角边框🔥

> radius：半径

可以**分别给四个角**都设置角度

* 左上、 右上、 右下、 左下
* 左上和右下、 右上和左下
* 甚至还能直接指定top、bottom、left、right，**必须前两个在前面**
* 可以对每个角的x, y设置不同的角度
* 若单位为%，则参考的是**当前盒子的宽度**

案例

* 如何让一个盒子变**圆形**：给`border-radius`为正方盒子 width 和 height（相等） 的一半，如50%

    ```css
    div{
      border-radius: 50%
    }
    ```

* 如何让一个盒子变**圆角矩形**：给`border-radius `为盒子 height 的一半，如50%



## `outline`轮廓线

不属于盒子模型。同 `border` 相比，`outline`不会增加盒子的大小，默认显示在`border`外面，**取值同** `border`。

可用于分析网站布局；也可用于去掉`input`或`a`（tab选中）或`textraea`的 focus 轮廓蓝线。

* `none`：取消，写`0`也可



## `margin` 外边距

### `margin` 缩写 🔥

margin 清除周围的（外边框）元素区域。margin 没有背景颜色，是完全透明的。也可以分开指定上下左右。

| 值的个数                    | 含义                       |
| --------------------------- | -------------------------- |
| margin: 5px;                | 1 个值，代表上下左右       |
| margin: 5px 10px;           | 2 个值，代表上下、左右     |
| margin: 5px 10px 20px;      | 3 个值，代表上、左右、下   |
| margin: 5px 10px 20px 30px; | 4 个值，代表上、右、下、左 |

> Margin 可以使用负值，重叠的内容。



### `margin` 负值 🔥

问题1：**有间隙的格子布局**时一行中最后一个元素的`margin-right`总会多余

解决：

*   选择一行最后一个元素，添加`class`，去除`margin-right`

*   使用伪类选择器（IE8不支持）

*   **增大包含块的宽度**。`.container`固定宽度> `.wrap`>很多`item`。`.wrap`一般是`ul`

    给`.wrap`+负`margin`即可增大`.wrap`宽度；或直接给`.wrap`宽度增大

::: tip 参考

[W3文档](https://www.w3.org/TR/CSS2/visudet.html)

'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' = width of containing block。即width of containing block一定时，'margin-right'为负值且其他值不变，则'width'变大。

:::

问题2：**无间隙的格子布局**，需要对变粗的边界进行合并，可以使用负`margin`





### 块级盒子水平居中 🔥

**margin 典型应用**——让**块级盒子水平居中**，但需满足两个条件

- 子盒子必须指定了 width

- 子盒子的左右 margin 都设置为 auto

  ```css
  div {
    width: 100px;
    margin: 0 auto;
  }
  ```

若是**行内元素**或**行内块元素**的**内容**需要**水平居中**，可以给其父元素添加`text-align: center`即可

::: tip margin 水平居中原理

对**块元素所属行的剩余空间的分配**问题。`auto`则表示剩余空间都给这侧。据此可以实现左对齐，右对齐。

垂直居中需要使用**定位和移动**，**移动父元素高度的一半并减去子元素盒子高度的一半**。

:::



### 边界折叠问题

两个**块级元素**（block）的上外边距(margin-top)和下外边距(margin-bottom)同时都有设定时只会只会保留最大边距，这种行为称为边界折叠（margin collapsing），有时也翻译为外边距重叠。**只有垂直外边距会发生该问题**。

有三种情况会形成外边距重叠：

#### 同一层相邻元素之间

相邻的两个元素之间的外边距重叠，除非后一个元素加上[clear-fix清除浮动](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)。

如下图，上面的元素有下外边距 margin-bottom，下面的元素有上外边距 margin-top ，则他们之间的垂直间距不是 margin-bottom 与 margin-top 之**和**。对于段落正好可以使用该副作用

<img src="./images/image-20191223002453257.png" alt="image-20191223002453257" style="zoom:50%;" />

```html
<style>   
  p:nth-child(1){   
    margin-bottom: 13px; 
  }   
  p:nth-child(2){  
    margin-top: 87px;  
  } 
</style>

<p>下边界范围会...</p>
<p>...会跟这个元素的上边界范围重叠。</p>
```

解决方案：

*   尽量只给一个盒子添加 margin 值





#### 没有内容将父元素和后代元素分开

如果没有边框border，内边距padding，行内内容，也没有创建块级格式上下文或清除浮动来分开一个块级元素的上边界margin-top 与其内一个或多个后代块级元素的上边界margin-top；

或没有边框，内边距，行内内容，高度height，最小高度min-height或 最大高度max-height 来分开一个块级元素的下边界margin-bottom与其内的一个或多个后代后代块元素的下边界margin-bottom

则就会出现父块元素和其内后代块元素外边界重叠，**重叠部分最终会溢出到父级块元素外面**。

如下吐，对于两个嵌套关系（父子关系）的块元素，父元素有上外边距同时（其实父元素可以没有外边距）子元素也有上外边距，此时父元素会**塌陷**较大的外边距值。即**子元素想距离父元素上边距失效（即父子元素上边框还是重合的）**。注意**以内容区域为视角**看问题。下外边距同理（但是必须父元素的高度是`auto`）

  <img src="./images/image-20191223003825165.png" alt="image-20191223003825165" style="zoom:50%;" />

```html
<style type="text/css">
  section    {
    margin-top: 13px;
    margin-bottom: 87px;
  }

  header {
    margin-top: 87px;
  }

  footer {
    margin-bottom: 13px;
  }
</style>

<section>
  <header>上边界重叠 87</header>
  <main></main>
  <footer>下边界重叠 87 不能再高了</footer>
</section>
```

解决方案：

- 可以为父元素定义`border-top/bottom`

- 可以为父元素定义`padding-top/bottom`

- **触发BFC**（推荐）

    - 可以为父元素添加 `overflow`属性，且值不为`visible`，即`auto/hidden/scroll`
    - **浮动**
    - **绝对定位**

    

::: tip 提示

BFC：block fromat context。类似结界。如何触发呢：

- 添加 `overflow`属性，且值不为`visible`，即`auto/hidden/scroll`
- **浮动**
- **绝对定位**

:::



#### 空的块级元素

当一个块元素上边界margin-top 直接贴到元素下边界margin-bottom时也会发生边界折叠。这种情况会发生在一个块元素完全没有设定边框border、内边距paddng、高度height、最小高度min-height 、最大高度max-height 、内容设定为inline或是加上clear-fix的时候。

```html
<style>
  p {
    margin: 0;  
  }
  div {
    margin-top: 13px;
    margin-bottom: 87px;
  }
</style>

<p>上边界范围是 87 ...</p>
<div></div>
<p>... 上边界范围是 87</p>
```

-   上述情况的组合会产生更复杂的外边距折叠。
-   即使某一外边距为0，这些规则仍然适用。因此就算父元素的外边距是0，第一个或最后一个子元素的外边距仍然会“溢出”到父元素的外面。
-   如果参与折叠的外边距中包含负值，折叠后的外边距的值为最大的正边距与最小的负边距（即绝对值最大的负边距）的和,；也就是说如果有-13px 8px 100px叠在一起，边界范围的技术就是 100px -13px的87px。
-   如果所有参与折叠的外边距都为负，折叠后的外边距的值为最小的负边距的值。这一规则适用于相邻元素和嵌套元素。





## `box-shadow` 盒子阴影 🔥

同类型的还有`text-shadow`，用得少，见属性笔记

```css
box-shadow: h-shadow v-shadow blur spread color inset;/* 与顺序无关 */
```

| 值         | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| _h-shadow_ | **必需**。水平阴影的位置。允许负值。                         |
| _v-shadow_ | **必需**。垂直阴影的位置。允许负值。                         |
| _blur_     | 可选。**模糊半径**，阴影的**发散程度**                       |
| _spread_   | 可选。阴影的尺寸，就是**阴影向四周延伸的大小**               |
| _color_    | 可选。阴影的颜色。请参阅 CSS 颜色值。                        |
| inset      | 可选。将外部阴影 (outset) 改为内部阴影。不能写 outset 否则失效 |

可以通过`,`设置多个值

```css
div {
  box-shadow: 5px 5px 10px, -5px -5px 10px;/* 对应x y blur, y x blur. 但是明显对角线割裂了，不推荐 */
}
```

::: tip 注意

**影子不占用空间**，不影响其他盒子排列

:::


