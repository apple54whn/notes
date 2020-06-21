# 入门

[官方文档](https://cli.vuejs.org/zh/)

## 安装

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

用这个命令来检查其版本是否正确：

```bash
vue --version
```



## 创建项目

### vue create

运行以下命令来创建一个新项目：

```bash
vue create hello-world
```



### vue ui

也可以通过 `vue ui` 命令以图形化界面创建和管理项目：

```bash
vue ui
```

上述命令会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程。



### 拉取 2.x 模板 (旧版本)

Vue CLI >= 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2 (`vue-cli`) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具：

```bash
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

我tm模版下载了半天没成功！算逑了

不过 2.x 生成的代码有许多配置（大致能看懂），3.x 开始后就隐藏了，所以可以用于学习了解





## runtime + compiler & runtime

**推荐 runtime**

### 区别

区别看下面俩 main.js

runtime + compiler：

```js
import Vue form 'vue'
import App form './App'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
```

从 template --parse--> ast --render--> vdom --> UI

compiler：

```js
import Vue form 'vue'
import App form './App'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App)
})
```

直接 --render--> vdom --> UI。即使是 .vue 文件中的 template 也会被 vue-template-compiler parse，查看对象中不再有 template，而是有个 render() 函数替代直接渲染



### render

*   普通用法

    ```js
    import Vue form 'vue'
    import App form './App'
    
    Vue.config.productionTip = false
    
    new Vue({
        el: '#app',
        // createElement('标签名', {标签的属性}, [])
        render: createElement => createElement('h2',
                                              {class: 'box'},
                                               ['Hello World', createElement('button',
                                                                            {class: 'btn'},
                                                                            ['按钮'])]
                                              )
    })
    ```

*   传入组件对象。直接 --render--> vdom --> UI

    ```js
    import Vue form 'vue'
    import App form './App'
    
    Vue.config.productionTip = false
    
    const cpn = {
        template: '<div>{{message}}</div>',
        data(){
            return {
                message: '我是组件message'
            }
        }
    }
    
    new Vue({
        el: '#app',
        // render: createElement => createElement(cpn)
        
        // 同样的 App 组件也可以直接传递
        // render: createElement => createElement(App)
        // 精简
        render: h => h(App)
    })
    ```

    