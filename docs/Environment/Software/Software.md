# Software

## VSCode

### PATH

安装后`command + shift + p` ，输入`shell command`，选择安装 Code 到 PATH 中，之后就可以在命令行中输入 s`code [path]` 打开文件夹

### open in browser
open in browser

### Live Server Plugin

使用 Live Server 可以启动本地服务器，来运行静态或动态页面



### Emmet 语法

前身是 Zen coding，它使用缩写来提高 HTML 和 CSS 的编写速度，VSCode 默认已集成该语法。需配合`tab`

#### 生成 HTML

- html 骨架：使用`!`
- 多个标签：`div*10`
- 父子级关系的标签：可以用 `>` 比如`ul > li`，可多级
- 兄弟级关系的标签：可以用`+`
- 如果生成带有类名或者id名字的，  可在标签后加 `.demo.demo2`  或者  `#two` ，不加标签默认为`div`
- 如果生成的类名是有顺序的（从1开始）， 可以使用自增符号`$`，`span.hello$*5`
- 如果生成的标签默认显示文本，可以使用`{}`，`a{百度一下}`
- 可以自由组合，发挥想象力



#### 生成 CSS

- 自己按吧。。。



#### 自动格式化代码

在设置中查找`emmet.includ`，编辑JSON文件，粘贴如下配置（有提示可手动输入）

```json
"editor.formatOnType": true,
"editor.formatOnPaste": true,
"editor.formatOnSave": true
```

