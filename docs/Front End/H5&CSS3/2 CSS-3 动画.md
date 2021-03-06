# 动画

并不存在真正意义上的 CSS3，只是对某些 Module Level 3 的统称，某些 Level 3 是否成为标准还需查阅文档

## `transform-origin`形变原点 🔥

`transform-origin`属性让你更改一个元素变形的原点。默认值：`50% 50% 0`

- 一个值

  设置 x 轴的原点

- 两个值

  设置 x 轴和 y 轴的原点

- 值可以是

  - `<length>`：从**左上角开始计算**
  - `<percentage>`：参考**元素本身的大小**
  - `left`, `right`, `center`, `top`, `bottom`关键字中的两个（**常用**）



## `transform` 形变 🔥

**`transform`**属性允许你**平移，旋转，缩放，倾斜**指定元素。这是通过**修改 CSS 视觉格式化模型的坐标空间**来实现的。可使用多个`function`，空格分割即可。**不影响页面布局！**



### `translate(tx,ty)`平移

- `translate(tx, ty)`或`translate(tx)`。第二个参数不写默认为 0
- 可以简写为`translateX(tx)`或`translateY(ty)`
- 单位
  - 可以是`px`；
  - `%`（相对于元素自己宽度或高度）

用处：

*   `hover`时平移



### `translate3D(tx,ty,tz)`3D 平移

*   配合3D动画，且需要设置网页的视距

- `tz`为 0 时可以认为就是`translate(tx,ty)`

- 可以简写为`translateX(tx)`或`translateY(ty)`或`translateZ(tz)`



### `scale(sx,sy)`缩放

- `scale(sx,sy)`或`scale(sx)`。第二个参数不写**默认为`sx`以保持等比缩放**
- 可以简写为`scaleX(sx)`或`scaleY(sy)`
- 数字
  - 1：保持不变
  - 2：放大一倍
  - 0.5：缩小一半
- **不支持百分比**

用处：

*   `hover`时缩放



### `scale3d(sx,sy,sz)`3D 缩放

*   配合3D动画，且需要设置网页的视距

- `sz`为 1 时可以认为就是`scale(sx,sy)`

- 可以简写为`scaleX(sx)`或`scaleY(sy)`或`scaleZ(sz)`



### `rotate(deg)`旋转

- 一个值

  表示旋转的角度

- 值类型 deg

  旋转的角度，正数为顺时针，负数为逆时针

  - shan

- 旋转的原点受`transform-origin`影响。默认按照z轴的和元素中心

- 可以简写为`rotateX(rx)`或`rotateY(ry)`或`rotateZ(rz)`

用处：

*   `hover`时卡片背面
*   钟表🕙

::: demo [vanilla]

```html
<html>
    <div class="clock">
    <div class="hour"></div>
    <div class="min"></div>
    <div class="sec"></div>
</div>
</html>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* 设置表的样式 */
    .clock {
        width: 500px;
        height: 500px;
        margin: 0 auto;
        margin-top: 100px;
        border-radius: 50%;
        position: relative;
        background-image: url(./img/13/bg3.jpg);
        background-size: cover;
    }

    .clock > div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .hour {
        margin: 16% auto;
        height: 34%;
        width: 7px;
        background-color: skyblue;
        transform-origin: bottom center;
        animation: run 8640s steps(60) infinite; /*秒数除以10方便观察*/
    }

    .min {
        margin: 13% auto;
        height: 37%;
        width: 5px;
        background-color: green;
        transform-origin: bottom center;
        animation: run 360s steps(60) infinite; /*秒数除以10方便观察*/
    }

    .sec {
        margin: 10% auto;
        height: 40%;
        width: 2px;
        background-color: red;
        transform-origin: bottom center;
        animation: run 6s steps(60) infinite; /*秒数除以10方便观察*/
    }

    @keyframes run {
        from {
            transform: rotateZ(0);
        }

        to {
            transform: rotateZ(360deg);
        }
    }
</style>

```

:::



### `rotate3d(x,y,z,deg)`3D 旋转

*   配合3D动画，且需要设置网页的视距

*   `x`,`y`都是 0 且`z`是 1 时可以认为就是`rotate(deg)`按照z轴旋转。



### `skew(deg,deg)`倾斜

可能会形变，旋转并不会形变

- 一个值

  表示 x 轴上的倾斜

- 两个值

  表示 x 轴和 y 轴上的倾斜

- 值类型 deg

  倾斜的角度，正数为顺时针，负数为逆时针

- 旋转的原点受`transform-origin`影响

- 可以简写为`skewX(deg)`或`skewY(deg)`



### `backface-visibility`元素背面

*   `visiable`：默认为显示，透视效果

*   `none`：不显示

## `transition` 过渡动画 🔥

过渡 transition 是 CSS3 中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。虽然低版本浏览器不支持（IE9 以下版本）但是不影响页面布局。经常和 `:hover` 搭配使用。**谁做过渡给谁加**，控制多个元素可以在`,`后继续写，但不能写多个`transition`（MDN文档中体现在`#`）。

*   这个属性是用来进行**过渡动画**，**只能控制首尾**两个值。
*   大部分属性都支持过渡效果，注意过渡时必须是从一个**有效数值**向另外一个**有效数值**进行过渡（auto就不是有效值）

```css
transition: 要过渡的属性 持续时间 运动曲线 何时开始, 要过渡的属性 持续时间 运动曲线 何时开始;
```

- `property`：要变化的 CSS 属性， 宽高、背景颜色、内外边距、形变都可以。如果想要所有的属性都变化过渡， 写 all 即可。

- `duration`：持续时间，单位是秒（必须写单位），比如 .5 s

- `timing-function`：过渡的时序函数，运动曲线，默认是 `ease`（可以省略）

  | 值                                   | 描述                                                         |
  | :----------------------------------- | :----------------------------------------------------------- |
  | linear                               | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
  | ease                                 | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
  | ease-in                              | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
  | ease-out                             | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
  | ease-in-out                          | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
  | cubic-bezier(_n_,_n_,_n_,_n_)        | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |
  | steps(number_of_steps [, direction]) | 分步执行过渡效果，可以对多帧图片使用，模拟动画               |

- `delay`：过渡效果的延迟，等待一段时间后在执行过渡，单位是秒（必须写单位），默认是 0s（可以省略）





## `@keyframes` & `animation` 动画 🔥

### 简介

使用`transition`只能进行**过渡动画**，且只能控制首尾两个值。

*   从关键帧动画的角度相当于**只是定义了两帧的状态**：第一帧和最后一帧
*   如果希望可以有**更多状态的变化**，可以直接使用关键帧动画

关键帧动画使用`@keyframes` 来**定义多个变化状态**，并且使用`animation-name`来**声明匹配**

1.  使用`@keyframes`创建一个规则，`@keyframes`中使用百分比定义各个阶段的样式。

    可以用`from`和`to`指定0%和100%

2.  通过`animation`将动画添加到属性上，具体取值如下：

    ```css
    animation: name duration timing-function delay iteration-count direction fill-mode;
    ```

*   `name`：要使用的`@keyframes`的 identifier。**必填**

*   `duration`：动画持续的时间，默认值为`0s`。**必填**

*   `timing-function`：指定动画的变化曲线，默认值为`ease`

*   `delay`：延迟执行时间，默认值为`0s`

*   `iteration-count`：指定动画的执行次数，默认值为1。值为`infinite`表示无限执行

*   `direction`：指定方向

    *   `normal` 默认值  从 from 向 to运行 每次都是这样 
    *   `reverse` 从 to 向 from 运行 每次都是这样 
    *   `alternate` 从 from 向 to运行 重复执行动画时反向执行
    *   `alternate-reverse` 从 to 向 from运行 重复执行动画时反向执行

*   `fill-mode`：执行动画最后保留哪一个值
    *   `none`：默认值，动画执行完毕元素回到原来位置
    *   `forwards`：动画执行完毕元素会停止在动画结束（最后一帧）的位置
    *   `backwards`：动画延时等待时，元素就会处于开始（第一帧）位置
    *   `both`：结合了forwards 和 backwards
    
*   `play-state`：**用在 JS 中，指定动画的运行或暂停！**
    *   `running`：默认值，当前动画正在运行
    *   `paused`：当前动画以被停止
    
    
    
    

### 案例1—移动的方块

::: demo [vanilla]

```html
<style>
  @keyframes box-frame-1 {
    from {
      transform: translate3d(0, 0, 0);
    }
    25% {
      transform: translate3d(200px, 0, 0);
    }
    50% {
      transform: translate3d(200px, 100px, 0);
    }
    75% {
      transform: translate3d(0, 100px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .box {
    width: 100px;
    height: 100px;
    background-color: skyblue;
  }

  .box:hover {
    animation: box-frame-1 4s;
  }
</style>
<html>
    <div class="box"></div>
</html>

```

:::



### 案例2—9个小球

::: demo [vanilla]

```html
<style>
    .outer {
        height: 500px;
        border-bottom: 10px black solid;
        margin: 50px auto;
        /* 解决margin重叠问题 */
        overflow: hidden;
    }
    .outer div {
        float: left;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #bfa;
        animation: ball 0.5s forwards ease-in-out infinite alternate;
    }

    div.box2 {
        background-color: orange;
        animation-delay: 0.1s;
    }

    div.box3 {
        background-color: yellow;
        animation-delay: 0.2s;
    }

    div.box4 {
        background-color: yellowgreen;
        animation-delay: 0.3s;
    }

    div.box5 {
        background-color: blue;
        animation-delay: 0.4s;
    }
    div.box6 {
        background-color: pink;
        animation-delay: 0.5s;
    }
    div.box7 {
        background-color: tomato;
        animation-delay: 0.6s;
    }
    div.box8 {
        background-color: skyblue;
        animation-delay: 0.7s;
    }
    div.box9 {
        background-color: chocolate;
        animation-delay: 0.8s;
    }

    /* 创建小球下落的动画 */
    @keyframes ball {
        from {
            margin-top: 0;
        }

        to {
            margin-top: 400px;
        }
    }
</style>
<html>
    <div class="outer">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>
        <div class="box4"></div>
        <div class="box5"></div>
        <div class="box6"></div>
        <div class="box7"></div>
        <div class="box8"></div>
        <div class="box9"></div>
    </div>
</html>

```

:::



### 骰子

```html
<style>
  html {
    perspective: 800px;
  }

  .cube {
    width: 200px;
    height: 200px;
    /* background-color: #bfa; */
    margin: 100px auto;
    /* 设置3d变形效果 */
    transform-style: preserve-3d;
    /* transform: rotateX(45deg) rotateZ(45deg); */
    animation: rotate 20s infinite linear;
    /* transform:rotateY(45deg) scaleZ(2); */
  }

  .cube > div {
    width: 200px;
    height: 200px;
    /* 为元素设置透明效果 */
    opacity: 0.7;
    position: absolute;
  }

  img {
    vertical-align: top;
  }

  .box1 {
    /* 虽然看似都是translateZ(100px)，但是这是根据rotate后的面来说的 */
    transform: rotateY(90deg) translateZ(100px);
  }

  .box2 {
    transform: rotateY(-90deg) translateZ(100px);
  }

  .box3 {
    transform: rotateX(90deg) translateZ(100px);
  }

  .box4 {
    transform: rotateX(-90deg) translateZ(100px);
  }

  .box5 {
    transform: rotateY(180deg) translateZ(100px);
  }

  .box6 {
    transform: rotateY(0deg) translateZ(100px);
  }

  @keyframes rotate {
    form {
      transform: rotateX(0) rotateZ(0);
    }

    to {
      transform: rotateX(1turn) rotateZ(1turn);
    }
  }
</style>
<!-- 创建一个外部的容器 -->
<div class="cube">
  <!-- 引入图片 -->
  <div class="box1">
    <img src="./img/14/1.jpg" />
  </div>

  <div class="box2">
    <img src="./img/14/2.jpg" />
  </div>

  <div class="box3">
    <img src="./img/14/3.jpg" />
  </div>

  <div class="box4">
    <img src="./img/14/4.jpg" />
  </div>

  <div class="box5">
    <img src="./img/14/5.jpg" />
  </div>

  <div class="box6">
    <img src="./img/14/6.jpg" />
  </div>
</div>
```





## `perspective` & `preserve-3d` 动画 🔥

前端东西很多对 IE 有兼容性问题，自己查文档，懒得逼逼

*   CSS 3D 动画：

    *   `perspective`：视距！一般给父元素设置即可继承
    *   `transform-style: preserve-3d`：若使用`transform`时体现 3D 效果，则需要此属性

    ```html
    <style>
      body {
        /* 视距，指元素距离屏幕的距离 */
        perspective: 1000px;
      }
      .container {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 100px auto;
      }
      .container .box {
        position: absolute;
        width: 200px;
        height: 200px;
        /* 意思为保持 3D 效果 */
        transform-style: preserve-3d;
      }
      .container .box1 {
        background-color: skyblue;
        transform: rotate3d(0, 1, 0, 75deg) translate3d(0, 0, -100px);
      }
      .container .box2 {
        background-color: orange;
        transform: rotate3d(0, 1, 0, 75deg) translate3d(0, 0, 0);
      }
      .container .box3 {
        background-color: blue;
        transform: rotate3d(0, 1, 0, 75deg) translate3d(0, 0, 100px);
      }
    </style>
    <div class="container">
      <div class="box box1"></div>
      <div class="box box2"></div>
      <div class="box box3"></div>
    </div>
    ```

    ![image-20200329170329307](./images/image-20200329170329307.png)

*   JS 3D 动画库（兼容性好）：

    *   [three.js](https://threejs.org/)





## `filter` 滤镜 🔥

`filter`属性将**模糊**或**颜色偏移**等图形效果应用于元素。

```css
filter: 函数();
```

- `blur` 模糊处理，数值越大越模糊，如`blur(5px)`
