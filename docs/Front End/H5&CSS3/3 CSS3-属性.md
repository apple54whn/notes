# CSS3 属性

并不存在真正意义上的 CSS3，只是对某些 Module Level 3 的统称，某些 Level 3是否成为标准还需查阅文档

## `transform-origin`原点🔥

`transform-origin`属性让你更改一个元素变形的原点。

*   一个值

    设置x轴的原点

*   两个值

    设置x轴和y轴的原点

*   值可以是

    *   `<length>`：从**左上角开始计算**
    *   `<percentage>`：参考**元素本身的大小**
    *   `left`, `right`, `center`, `top`, `bottom`关键字中的一个（**常用**）



## `transform` 形变🔥

**`transform`**属性允许你**平移，旋转，缩放，倾斜**指定元素。这是通过**修改 CSS 视觉格式化模型的坐标空间**来实现的。

### `translate(tx,ty)`平移

*   `translate(tx, ty)`或`translate(tx)`。第二个参数不写默认为 0
*   可以简写为`translateX(tx)`或`translateY(ty)`
*   单位
    *   可以是`px`；
    *   `%`（相对于元素自己）



### `translate3D(tx,ty,tz)`3D平移

*   `tz`为 0 时可以认为就是`translate(tx,ty)`

*   可以简写为`translateX(tx)`或`translateY(ty)`或`translateZ(tz)`



### `scale(sx,sy)`缩放

*   `scale(sx,sy)`或`scale(sx)`。第二个参数不写**默认为`sx`以保持等比缩放**
*   可以简写为`scaleX(sx)`或`scaleY(sy)`
*   数字
    *   1：保持不变
    *   2：放大一倍
    *   0.5：缩小一半
*   **不支持百分比**



### `scale3d(sx,sy,sz)`3D缩放

*   `sz`为 1 时可以认为就是`scale(sx,sy)`

*   可以简写为`scaleX(sx)`或`scaleY(sy)`或`scaleZ(sz)`





### `rotate(deg)`旋转

*   一个值

    表示旋转的角度

*   值类型deg

    旋转的角度，正数为顺时针，负数为逆时针

    *   shan

*   旋转的原点受`transform-origin`影响



### `rotate3d(x,y,z,deg)`3D旋转

`x`,`y`,`z`都是1时可以认为就是`rotate(deg)`。但是这三个值暂时不知道干啥用，以后再研究。



### `skew(deg,deg)`倾斜

可能会形变，旋转并不会形变

*   一个值

    表示x轴上的倾斜

*   两个值

    表示x轴和y轴上的倾斜

*   值类型 deg

    倾斜的角度，正数为顺时针，负数为逆时针

*   旋转的原点受`transform-origin`影响

*   可以简写为`skewX(deg)`或`skewY(deg)`



## `transation` 过渡🔥

过渡 transition 是 CSS3 中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。虽然低版本浏览器不支持（IE9 以下版本）但是不影响页面布局。经常和 `:hover` 搭配使用。**谁做过渡给谁加**，控制多个元素可以在`,`后继续写，不能写多个`transation`

```css
transition: 要过渡的属性 持续时间 运动曲线 何时开始,要过渡的属性 持续时间 运动曲线 何时开始;
```

* 属性：要变化的 CSS 属性， 宽高、背景颜色、内外边距、形变都可以。如果想要所有的属性都变化过渡， 写all 即可。

* 持续时间：单位是秒（必须写单位），比如 0.5s

* 运动曲线：默认是 `ease`（可以省略）

    | 值                            | 描述                                                         |
    | :---------------------------- | :----------------------------------------------------------- |
    | linear                        | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
    | ease                          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
    | ease-in                       | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
    | ease-out                      | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
    | ease-in-out                   | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
    | cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |

* 何时开始：单位是秒（必须写单位），可以设置**延迟触发时间**，默认是 0s（可以省略）





## `filter` 滤镜🔥

`filter`属性将**模糊**或**颜色偏移**等图形效果应用于元素。

```css
filter: 函数();
```

* `blur` 模糊处理，数值越大越模糊，如`blur(5px)`



