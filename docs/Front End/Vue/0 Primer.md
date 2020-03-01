# 简介

## Vue.js 是什么

Vue 是一套用于构建用户**界面**的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以**自底向上逐层应用**。Vue 的核心库只**关注视图层**，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。



## 安装

官方的[安装文档](https://cn.vuejs.org/v2/guide/installation.html)

### script 引入

直接下载并用 `<script>`标签引入，Vue 会被注册为一个**全局变量**。

::: tip

在开发环境下不要使用压缩版本，不然你就失去了所有常见错误相关的警告!

*   开发版本：包含完整的警告和调试模式
*   生产版本：删除了警告，33.30KB min+gzip

:::



### CDN

看文档



### NPM

在用 Vue 构建大型应用时推荐使用 NPM 安装[[1\]](https://cn.vuejs.org/v2/guide/installation.html#footnote-1)。NPM 能很好地和诸如 [webpack](https://webpack.js.org/) 或 [Browserify](http://browserify.org/) 模块打包器配合使用。同时 Vue 也提供配套工具来开发[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)。

```bash
# 最新稳定版
$ npm install vue
```

推荐更换为 cnpm



### 其他





## Hello World

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue</title>
</head>

<body>
    <div id="demo">
        <h1>当前计数{{count}}</h1>
        <!-- <button @click='count++'>-</button>也可这样写，但不推荐 -->
        <button @click='decrement'>-</button>
        <button @click="increment">+</button>
    </div>

    <script src="./lib/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#demo',
            data: {
                count: 0
            },
            methods: {
                // 方法不推荐使用“箭头函数”，因为不能传递 this 对象
                increment: function (e) {
                    this.count++
                    // 默认方法会传递对象e，包含 MouseEvent 对象，其中有 target 属性包含了触发该事件的元素
                    // 但是若上述 HTML 中改为 @click='sub()' 则不包含该对象
                    console.log(e)
                },
                decrement () {
                    this.count--
                }
            }
        })
    </script>
</body>

</html>
```







## option

在`new Vue({})`中的 option 可以传递什么选项呢？[文档](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE)

### el—DOM

-   **类型**：`string | Element`

-   **限制**：只在用 `new` **创建实例时生效**。

-   **详细**：

    提供一个在页面上已存在的 **DOM 元素作为 Vue 实例的挂载目标**。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。在实例挂载之后，元素可以用 `vm.$el` 访问。如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 `vm.$mount()` 手动开启编译。

    ::: danger 注意

    提供的元素只能作为挂载点。不同于 Vue 1.x，所有的挂载元素**会被 Vue 生成的 DOM 替换**。因此**不推荐**挂载 root 实例到 `<html>` 或者 `<body>` 上。

    :::

    

### data—数据

-   **类型**：`Object | Function`

-   **限制**：组件的定义**只接受** `function`。

-   **详细**：

    Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够**响应数据变化**。**对象必须是纯粹的对象 (含有零个或多个的 key/value 对)**：浏览器 API 创建的原生对象，原型上的属性会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。

    **一旦观察过，你就无法在根数据对象上添加响应式属性**。因此推荐在创建实例之前，就声明所有的根级响应式属性。

    实例创建之后，可以通过 `vm.$data` 访问原始数据对象。Vue 实例也**代理**了 data 对象上所有的**属性**，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

    以 `_` 或 `$` 开头的属性 **不会** 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些属性。

    当一个**组件**被定义，`data` 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象。类似于`data`是个**静态全局变量**。

    如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象。

-   **示例**：

    ```js
    var data = { a: 1 }
    
    // 直接创建一个实例
    var vm = new Vue({
      data: data
    })
    vm.a // => 1
    vm.$data === data // => true
    
    // Vue.extend() 中 data 必须是函数
    var Component = Vue.extend({
      data: function () {
        return { a: 1 }
      }
    })
    ```

    注意，如果你为 `data` 属性使用了箭头函数，则 `this` **不会指向这个组件的实例**，不过你仍然可以将其实例作为函数的第一个参数来访问。

    ```js
    data: vm => ({ a: vm.myProp })
    ```



### props—数据

-   **类型**：`Array | Object`

-   **详细**：

    props 可以是数组或对象，用于**接收来自父组件的数据**。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。

    你可以基于对象的语法使用以下选项：

    -   `type`: 可以是下列原生构造函数中的一种：`String`、 `Number`、 `Boolean`、 `Array`、 `Object`、 `Date`、 `Function`、`Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 prop 是否是给定的类型，否则抛出警告。Prop 类型的[更多信息在此](https://cn.vuejs.org/v2/guide/components-props.html#Prop-类型)。
    -   `default`: `any`
        为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。
    -   `required`: `Boolean`
        定义该 prop 是否是必填项。在非生产环境中，如果这个值为 truthy 且该 prop 没有被传入的，则一个控制台警告将会被抛出。
    -   `validator`: `Function`
        自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出。你可以在[这里](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)查阅更多 prop 验证的相关信息。

-   **示例**：

    ```js
    // 简单语法
    Vue.component('props-demo-simple', {
      props: ['size', 'myMessage']
    })
    
    // 对象语法，提供验证
    Vue.component('props-demo-advanced', {
      props: {
        // 检测类型
        height: Number,
        // 检测类型 + 其他验证
        age: {
          type: Number,
          default: 0,
          required: true,
          validator: function (value) {
            return value >= 0
          }
        }
      }
    })
    ```

-   **参考**：[Props](https://cn.vuejs.org/v2/guide/components-props.html)



### methods—数据

-   **类型**：`{ [key: string]: Function }`

-   **详细**：

    methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 Vue 实例。

    ::: danger 注意

    注意，**不应该使用箭头函数来定义 method 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。

    :::

-   **示例**：

    ```js
    var vm = new Vue({
      data: { a: 1 },
      methods: {
        plus: function () {
          this.a++
        }
      }
    })
    vm.plus()
    vm.a // 2
    ```

-   **参考**：[事件处理器](https://cn.vuejs.org/v2/guide/events.html)





## MVVM

### 简介

**MVVM**（**Model–view–viewmodel**）是一种软件[架构模式](https://zh.wikipedia.org/wiki/架构模式)。

MVVM 有助于将[图形用户界面](https://zh.wikipedia.org/wiki/图形用户界面)的开发与[业务逻辑](https://zh.wikipedia.org/w/index.php?title=业务逻辑&action=edit&redlink=1)或[后端](https://zh.wikipedia.org/wiki/前端和后端)逻辑（*数据模型*）的开发[分离](https://zh.wikipedia.org/wiki/关注点分离)开来，这是通过[置标语言](https://zh.wikipedia.org/wiki/置标语言)或GUI代码实现的。MVVM的**VM**是一个值转换器，[[1\]](https://zh.wikipedia.org/wiki/MVVM#cite_note-MVVM-eliminates-valueconverters-1) 这意味着 VM 负责从 Model 中暴露（转换）[数据对象](https://zh.wikipedia.org/wiki/对象_(计算机科学))，以便轻松管理和呈现对象。在这方面，VM 比 V 做得更多，并且处理大部分 V 的显示逻辑。VM 可以实现[中介者模式](https://zh.wikipedia.org/wiki/中介者模式)，组织对 V 所支持的[用例](https://zh.wikipedia.org/wiki/用例)集的后端逻辑的访问。

MVVM是[马丁·福勒](https://zh.wikipedia.org/wiki/马丁·福勒)的 PM（Presentation Model）设计模式的变体。MVVM 以相同的方式抽象出视图的状态和行为，但 PM 以不依赖于特定用户界面平台的方式抽象出视图（创建了 VM）。MVVM和PM都来自[MVC](https://zh.wikipedia.org/wiki/MVC)模式。

### 组成

-   模型

    *模型*是指代表真实状态内容的[领域模型](https://zh.wikipedia.org/wiki/领域模型)（面向对象），或指代表内容的[数据访问层](https://zh.wikipedia.org/w/index.php?title=数据访问层&action=edit&redlink=1)（以数据为中心）。

-   视图

    就像在[MVC](https://zh.wikipedia.org/wiki/MVC)和[MVP](https://zh.wikipedia.org/wiki/Model-view-presenter)模式中一样，视图是用户在屏幕上看到的结构、布局和外观（UI）。

-   视图模型

    *视图模型*是暴露公共属性和命令的视图的抽象。MVVM没有MVC模式的控制器，也没有MVP模式的presenter，有的是一个*绑定器*。在视图模型中，绑定器在视图和[数据绑定器](https://zh.wikipedia.org/w/index.php?title=数据绑定器&action=edit&redlink=1)之间进行通信。

-   **绑定器**

    声明性数据和命令绑定隐含在MVVM模式中。在Microsoft[解决方案堆](https://zh.wikipedia.org/w/index.php?title=解决方案堆&action=edit&redlink=1)中，绑定器是一种名为[XAML](https://zh.wikipedia.org/wiki/XAML)的[标记语言](https://zh.wikipedia.org/wiki/置标语言)。绑定器使开发人员免于被迫编写样板式逻辑来同步视图模型和视图。在微软的堆之外实现时，声明性数据绑定技术的出现是实现该模式的一个关键因素。



### Vue

![MVVM](./images/mvvm.png)

*   ViewModel

    同步 Model 和 View 的对象。在Vue.js中，**每个 Vue 实例都是一个 ViewModel**。它们由`Vue`构造函数或其子类实例化：

    ```js
    var vm = new Vue({ /* options */ })
    ```

*   View

    由Vue实例管理的实际DOM。

    ```js
    vm.$el // The View
    ```

    Vue.js使用基于DOM的模板。每个Vue实例都与一个对应的DOM元素相关联。创建Vue实例后，它递归遍历根元素的所有子节点，同时设置必要的数据绑定。在视图被编译之后，它会对数据变化做出反应。

    使用Vue.js时，除了自定义指令（稍后说明）之外，您几乎不需要亲自接触DOM。数据更改时，视图更新将自动触发。这些视图更新是非常精细的，精度可降至textNode。它们也可以**批处理**并**异步执行**以提高性能。

*   Model

    稍微修改的普通JavaScript对象。

    ```js
    vm.$data // The Model
    ```

    在Vue.js中，模型只是简单的JavaScript对象或数据对象。 一旦在Vue实例中将对象用作数据，它就会变成反应性（响应式）的。 您可以操纵它们的属性，并且Vue实例正在观察它们且在他们被更改时收到通知。 Vue.js通过将数据对象的属性转换为ES5 getter / setter来实现透明的反应性。 无需进行脏检查，也不必明确通知Vue更新视图。 每当数据更改时，视图都会在下一帧更新。

    Vue实例代理它们所观察的数据对象上的所有属性。所以一旦一个对象`{a: 1}`被观察到，两个`vm.$data`。和`vm.a`将返回相同的值，并设置`vm.a = 2`将修改`vm.$data`。

    数据对象在适当的地方进行了修改，因此通过引用修改它与修改`vm.$data`具有相同的效果。这使得多个Vue实例可以观察同一段数据。在较大的应用程序中，还建议将Vue实例视为纯视图，并将数据操作逻辑外部化到更离散的存储层。

    这里需要注意的是，**一旦开始观察，Vue.js将无法检测到新添加或删除的属性**。为了解决这个问题，使用`$add`、`$set`和`$delete`方法对观察到的对象进行了扩充。

    下面是在Vue.js中如何实现响应性更新的高级概述：

    ![Data Observation](./images/data.png)

    

    

    

    

    

## 响应式原理

[响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)





## 生命周期

[官方文档](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

### 中文版

<img src="./images/lifecycle.png" alt="Vue 实例生命周期"  />

### 英文版

![The Vue Instance Lifecycle](./images/lifecycle-20200219000859420.png)