# 1 HTML

## 引言

### Rendering Engine

Rendering Engine：排版引擎、解释引擎、渲染引擎，现在流行称为浏览器内核。负责读取网页内容，整理讯息，计算网页的显示方式并显示页面。

| 浏览器  |      内核      | 备注                                                         |
| :------ | :------------: | :----------------------------------------------------------- |
| IE      |    Trident     | IE、猎豹安全、360极速浏览器、百度浏览器                      |
| firefox |     Gecko      | 可惜这几年已经没落了，打开速度慢、升级频繁、猪一样的队友flash、神一样的对手chrome。 |
| Safari  |     webkit     | 现在很多人错误地把 webkit 叫做 chrome内核（即使 chrome内核已经是 blink 了）。 |
| chrome  | Chromium/Blink | 在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。大部分国产浏览器最新版都采用Blink内核。二次开发 |
| Opera   |     blink      | 现在跟随chrome用blink内核。                                  |

> 移动端的浏览器内核主要说的是系统内置浏览器的内核。Android 手机而言，使用率最高的就是 Webkit 内核，大部分国产浏览器宣称的自己的内核，基本上也是属于webkit二次开发。iOS以及WP7平台上，由于系统原因，系统大部分自带浏览器内核，一般是Safari或者IE内核Trident的
>

### Web 标准

**构成：** 主要包括结构（Structure）、表现（Presentation）和行为（Behavior）三个方面



## HTML 结构

> HyperText Markup Language：超文本标记语言

在 VSCode 中按下 `html:5`或`!`即可出现如下代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

### `<!DOCTYPE>` 

声明位于文档中的最前面的位置，处于 `<html>` 标签之前。此标签可告知浏览器文档使用哪种 HTML 或 XHTML 规范。html 就代表HTML5。



## 根元素`<html>`

`<html>`：表示一个HTML文档的**根（顶级元素）**，所有其他元素必须是此元素的后代

### `lang`

文档语言，常用的有`lang="zh-CN`或`lang="en"`，考虑浏览器和操作系统的兼容性，目前仍然使用 `zh-CN` 属性值。对于程序来说没有太大的作用，但是它可以告诉浏览器，搜索引擎，一些处理 HTML 的程序对页面语言内容来做一些对应的处理或者事情：

* 根据根据 lang 属性来设定不同语言的 css 样式，或者字体
* 告诉**搜索引擎**做精确的识别
* 让语法检查程序做**语言识别**
* 帮助**翻译工具**做识别
* 帮助**网页阅读程序**做识别等等

### `xmlns`

指派文档的 XML 命名空间。默认是`http://www.w3.org/1999/xhtml`，只在XHTML中必要。





## 头元素`<head>`

> **规定文档相关的配置信息（元数据）**，包括文档的标题，引用的文档样式和脚本等。
>
> 文档元数据 Metadata：元数据（Metadata），含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如：搜索引擎SEO、浏览器 等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。

### `<base>` 

指定用于一个文档中包含的所有**相对 URL 的根 URL**。一份中只能有一个。一个文档的基本 URL，可以通过使用 `document.baseURI` 的 JS 脚本查询。

必须有`href`属性，可选择`target`属性

### `<meta>`

该元素表示那些不能由其它HTML元相关元素 (`<base>`, `<link>`, `<script>`, `<style>` 或 `<title>`) 之一表示的任何**元数据信息**。

* charset

  这个属性是让 浏览器根据编码去解码对应的 html 内容，不一定文件就是这个编码。统一使用`UTF-8`





### `<title>`

 该元素定义文档的**标题**，显示在浏览器的标题栏或标签页上。它只可以包含文本，若是包含有标签，则包含的任何标签都不会被解释。

### `<link>`

该元素规定了外部资源与当前文档的关系。这个元素最常于链接 **CSS** 样式表，还能被用来创建站点图标（比如PC端的“**favicon**”图标和移动设备上用以显示在主屏幕的图标）甚至一些其他事情。

### `<style>`

该元素包含文档的样式信息或者文档的部分内容。默认情况下，该标签的样式信息通常是 **CSS** 的格式。



## 分区根元素`<body>`

* `<body>`：该元素表示文档的内容。`document.body`属性提供了可以轻松访问文档的 body 元素的脚本。

### 内容分区（逻辑分区）

内容分区元素允许你将文档内容从**逻辑上进行组织划分**。使用包括页眉(header)、页脚(footer)、导航(nav)和标题(h1~h6)等分区元素，来为页面内容创建明确的大纲，以便区分各个章节的内容。





## 主要标签

- **文字、注释标签**

  `<h1>标题</h1>`    **标题**，取值1~6从大到小。是==**块级标签**==，自动在其前后加==**空行**==

  `<p style="color: blue;size: 14px;">html</p>`   **段落**，是==**块级标签**==，自动在其前后加==**空行**==

  `<div></div>`   ==**块级标签**==，自动==**换行**==

  `<span></span>`   **内联标签**，一行内显示

  `<pre></pre>`   **预格式**文本，保留原有格式

  `<hr/>`   **横线**，也称空元素

  `<br/>`   **换行**，也称空元素

  `&lt;`、`&gt;`、`&amp;`、**`&nbsp;`**、`&copy;`、`&reg;`  分别为：<、>、 **空格**、 &、 &copy;、 &reg;  **特殊字符**

  `<!--注释-->`   **注释**

- 文字修饰标签

  `<b>`**粗体**`</b>`  

  `<i>`***斜体***`</i>`   

  `<strong>`**强调文本**`</strong>` 

  `<em>`***强调文本***`</em>`  

  `<header>`页眉`</header`：语义标签，只提高可读性

  `<footer>`页脚`</footer`：语义标签，只提高可读性

  `<del>`**删除线**`</del>`  ，不赞成使用`<s></s>`

  `<sup>`**上标**`</sup>`

  `<sub>`**下标**`</sub>`

  `<u>`下划线`</u>`   不赞成使用

- HTML样式(style)尽量使用CSS来操作

  - 字体、颜色、尺寸：`<p style="font-family: Consolas;color: white;font-size: 20px;">内容</p>`
  - 文本对齐、背景颜色：`<p style="text-align: center;background-color: gray">内容</p>`

- **列表标签**

  `<ol>` `<ul>` `<li>`   **有序、无序、列表**，**`reversed`**列表倒序

  - `type='1'或'a'或'i'或'A'或'I'`请使用CSS替代；`start`HTML5不支持，请使用CSS替代；

  `<dl>` `<dt>` `<dd>`   **列表**带有**项目**和**描述**

- **图像标签**

  `<img src = 'test.jpg' width='400' height='300'alt='无法显示'/>` 

  - 相对路径：以`.`开头，如`./`代表当前目录；`../`代表上级目录

- **超链接标签**

  `<a href='https://www.qq.com' target='_blank'>新窗口打开QQ</a>`：`target`默认是`_self`；

  - 在**定位资源**时：（填`#`默认跳转当前页）

    ```html
    <a id='top'>top</a>
    <a href='#top'>returnTop</a>
    ```

  - `href`中添加`javascript:void(0);`可以**禁止跳转**

  - 在**发送邮件**时：`<a href="mailto:xxx@gmail.com">联系我们</a>`

  - 可以**包裹`<img>`标签**

- **表格标签**

  ```html
  <!--表格框。      边沿与内容间距、单元格间距，背景颜色，HTML5不支持，推荐在CSS中改变。width、height属性也不赞成使用-->
  <table border='1' cellpadding='10' cellspacing='10' bgcolor="aqua"> 
  	<caption>表格标题</caption>
  	<thead>
  		<tr>
  			<th colspan='3'>姓名（跨三列）</th>
  		</tr>
  	</thead>
  	<tbody>
  		<tr>
  			<td rowspan='3'>张三（跨三行）</td>
  		</tr>
  	</tbody>
  	<tfoot>
  		<tr>
  			<td>备注</td>
  		</tr>
      </tfoot>
  </table>
  ```

  > 注意：表格中占多行的只属于第一行，占多列同理

- **表单标签**：提交用户数据到服务器 

  `<form></form>`: 定义一个表单的范围 

  - **action**：提交到地址，默认提交到当前的页面（可以是一个页面，也可以是后台代码）

  - **method**：常用的有两种  get和post，默认是get请求 

    - **GET和POST区别**

      1. get请求地址栏会携带提交的数据（封装到请求行中），post不会携带（封装在请求体里面，http协议）
      2. get请求数据有大小的限制，post没有限制
      3. get请求安全级别较低，post较高

    - form表单不支持其他请求方式，使用时需要在input中添加一个**`_method`属性**，Ajax方式示例：

      注意：Java后端需**配置`HiddenHttpMethodFilter`**

      ```javascript
      $.ajax({
          url:"/user",
          type: "POST",
          data: {
              "_method":"DELETE",
              "body":$("#form1").serialize()
          },
          success : function (href) {
              location.href = href;
          }
      })
      ```

  - **enctype**：一般请求下不需要这个属性，做**文件上传**时候需要设置这个属性 

  - **输入项**`<input type="输入项类型">`

    ```html
    <input maxlength=""      size=""     placeholder=""  readonly  required autofocus ><!--推荐用CSS修改部分-->
        内容最大长度    以字符数计的可见宽度    占位符          只读	   必填   自动获得焦点
    ```

    - `<label for="input_id">`姓名：`</label>`：`for`和`input中id`对应，点`label`区域则`input`获得焦点

    - **text**：文本 (**指定name属性**)

    - **password**：密码(**指定name属性**)

    - **radio**：单选(**指定相同name属性**，**value**) ，checked[=checked]，判断时可以通过true或false

    - **checkbox**：多选(**指定相同name属性**，**value**) ，checked[=checked]，判断时可以通过true或false

      > 注意：**checked、selected、readonly、required、autofocus值填任意都是代表选中等其字面意思**

    - **file**：上传文件(**指定name属性**)

    - **hidden**：隐藏域(**指定name属性**，**value**)：页面看不到但数据会被提交

    - ==**submit**==：提交按钮，点击后跳转至指定action或本页

      还可以获取**form**，使用**其`submit()`方法，返回false（true或无返回值都将跳转）**！用于Ajax提交表单

      ```html
      <a onclick="document:loginForm.submit()">登陆</a> <!--这样也可以提交，但是会跳转。了解-->
      ```

      可以使用==**普通button**==，配合JS来使用Ajax提交表单。**type需指定为button**，否则浏览器会将值设置为submit

      ```html
      <input type="submit"/> <!--默认为提交（中文环境）、submit（英文环境）-->
      <input type="submit" value="注册"/>
      ```

      可以使用form的`onsubmit`事件，如`onsubmit = "return checkForm()"`，必须加return，并且方法返回boolean类型，true提交，false不提交

    - **image**：图片提交按钮`<input type="image" src="图片路径"/> `

    - **reset**：重置按钮`<input type="reset"/> `，也可以指定value更改按钮显示信息

    - **button**：普通按钮，和JS使用

    - HTML5新添加的type类型

      - **date**：定义 date 控件（包括年、月、日，不包括时间）
      - time：定义用于输入时间的控件（不带时区）
      - **datetime-local**：定义 date 和 time 控件（包括年、月、日、时、分、秒、几分之一秒，不带时区）
      - **email**：定义用于 e-mail 地址的字段，会用正则自动校验
      - **url**：定义用于输入 URL 的字段，会用正则自动校验
      - **number**：定义用于输入数字的字段
      - color：定义拾色器 
      - range：定义用于精确值不重要的输入数字的控件（比如 slider 控件）

  - **下拉输入项select(指定name属性，option中指定value属性)**，不指定value则默认为标签中数据

    ```html
    <select name="birth" multiple  size="2">
        				 可以多选   可见选项数目
    	<option value="1991" selected>1991</option>
    	<option value="1992">1992</option>
    	<option value="1993">1993</option>
    </select>
    ```

  - 文本域textarea(**指定name属性**)：目前都不用了

    ```html
    <textarea cols="10" rows="10">我是...</textarea>
    ```

> 框架标签，不赞成使用
>
> ```html
> <frameset rows="80,*">                        //把页面划分成上下两部分 
> <frame name="top" src="a.html">             //上面页面
> <frameset cols="150,*">                     //把下面部分划分成左右两部分
> 		<frame name="lower_left" src="b.html">  //左边的页面
> 		<frame name="lower_right" src="c.html"> //右边的页面
> 	</frameset> 
> </frameset> 
> ```
>
> 点击左边的页面超链接，内容显示在右边的页面中
>
> ```html
> <a href="01-hello.html" target="right">超链接1</a>
> ```



