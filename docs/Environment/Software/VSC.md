# VSCode

## PATH

安装后`command + shift + p` ，输入`shell command`，选择安装 Code 到 PATH 中，之后就可以在命令行中输入 s`code [path]` 打开文件夹



## Emmet 语法

前身是 Zen coding，它使用缩写来提高 HTML 和 CSS 的编写速度，VSCode 默认已集成该语法。需配合`tab`

### 生成 HTML

- `!`html 骨架

- `*`多个标签：`div*10`

- `>`父子级关系的标签：如`ul > li`，可多级

- `+`兄弟级关系的标签：可以用`+`

- `^`代表回到上一层级，可多次使用

- `()`分组，代表同一组

- `#id`、`.class`、`[title[="haha"]]`，可一次使用多个，最前面不加标签默认为`div`

- `{}`生成元素内容，如`a{百度一下}`

- `$`自增符号，如果生成的名称是有顺序的（从 1 开始）， 如`span.hello$*5`

    也可以多个`$$$`，生成从`001`开始的数字

- 隐式标签，默认为`div`；使用`ul>li`时可以省略`li`

```html
<!-- div>p>span^h2+a -->
<div>
  <p><span></span></p>
  <h2></h2>
  <a href=""></a>
</div>
```

```html
<!-- div>p>span^^h1+strong -->
<!-- (div>p>span)+h1+strong -->
<div>
  <p><span></span></p>
</div>
<h1></h1>
<strong></strong>
```

```html
<!-- #main.box[title="hehe$"]{我是div$}*3 -->
<div id="main" class="box" title="hehe1">我是div1</div>
<div id="main" class="box" title="hehe2">我是div2</div>
<div id="main" class="box" title="hehe3">我是div3</div>
```



### 生成 CSS

```css
/* 可单独写 */
/* w100+h200+m20-30-20--10+p30 */
width: 100px;
height: 200px;
margin: 20px 30px 20px -10px;
padding: 30px;
```

```css
/* fz16 */
font-size: 16px;
/* fz1.5 */
font-size: 1.5em;
/* fw700 */
font-weight: 700;
/* lh50px */
line-height: 50px;
/* bgc */
background-color: #fff;
```

```css
/* di */
display: inline;
/* db */
display: block;
/* dib */
display: inline-block;
```





## 设置

### Auto Save

*   可选 afterDelay，可设置秒数
*   可选 onFocusChange



## Extensions

### open in broswer

不多解释



### Live Server

不多解释



### pretty—自动格式化代码

在设置中（可用 command + shift + p 或 ctrl + shift + p 打开），可选择 UI 模式，搜索 format，保证如下选项都为 true 即可

```json
"editor.formatOnType": true,
"editor.formatOnPaste": true,
"editor.formatOnSave": true
```

可以安装 pretty 插件后选择 Default Formatter，推荐！

其实也不推荐！



## Vetur 🔥

安装后有配置

```json
"vetur.format.defaultFormatterOptions": {
    "prettier": {
        // 去掉分号
        "semi": false,
        // 单引号
        "singleQuote": true
    }
},
"vetur.completion.scaffoldSnippetSources": {},
```





### JS 自动缩进

```json
"editor.tabSize": 2,
"editor.detectIndentation": false
```







### JS & CSS Minifier（测试）

一般不使用它，有 NPM 配合其他