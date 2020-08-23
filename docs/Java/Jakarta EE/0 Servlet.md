# Servlet

Servlet（server applet）是运行在服务器端的小程序。是 Java EE 规范之一。是 **JavaWeb 三大组件之一**（Servlet、Filter、Listener），可以**接收请求数据、处理请求、完成响应**。

Servlet 实质就是一个**接口**，定义了**Java 类能被**浏览器访问到（**或者说被 Tomcat 等 Servlet 容器识别**）的**规则**。那么浏览器如何访问Servlet？

给 Servlet 指定一个**路径**，浏览器通过访问路径来访问，一般路径配置在**web.xml**中或直接**注解**（Servlet 3 后）



## 实现 Servlet 的方式

1. 实现`javax.servlet.Servlet`接口

2. 继承`javax.servlet.GenericServlet`抽象类

3. 继承`javax.servlet.http.HttpServlet`抽象类 

    通常我们会去继承`HttpServlet`类来完成我们的Servlet，但学习还要从`javax.servlet.Servlet`接口开始

### 实现 Servlet 接口

#### 实现 javax.servlet.Servlet 接口

```java
//初始化，在Servlet对象创建后马上执行，只执行一次
public void init(ServletConfig servletConfig) throws ServletException {
	System.out.println("init...");
}
//获取Servlet配置信息,
public ServletConfig getServletConfig() {
	return null;
}
//服务，每次处理请求会被调用
public void service(ServletRequest servletRequest, ServletResponse servletResponse) 
		throws ServletException,  IOException {
		System.out.println("service...");
		servletResponse.getWriter().write("hello servlet.");	
}
//获取Servlet信息，如版本，作者等。一般不会去实现
public String getServletInfo() {
	return null;
}
//销毁，服务器正常关闭，在Servlet被销毁之前调用，只会被调用一次
public void destroy() {
	System.out.println("destroy...");
}
```

#### 配置web.xml

```xml
<servlet>
    <servlet-name>name</servlet-name>//相同代号
    <servlet-class>cn.itcast01.AServlet</servlet-class>//要访问的类，全类名
</servlet>
<servlet-mapping>
    <servlet-name>name</servlet-name>//相同代号
    <url-pattern>/MyServlet</url-pattern>//设置URL
</servlet-mapping>
<!--  访问时：http://localhost:8080/MyServlet ，前提是IDEA中Application context配置的是“/” -->
```

#### 执行原理

1. 当Tomcat服务器接受到客户端浏览器的请求后，会解析请求URL路径，获取访问的Servlet的资源路径

2. 查找web.xml文件，是否有对应的`<url-pattern>`标签体内容。

3. 如果有，则通过`<servlet-name>`找到对应的`<servlet-class>`全类名

4. Tomcat会将字节码文件加载进内存，并且通过反射创建其对象，调用其方法

    即Servlet**类**由我们来写，但**对象由服务器来创建**，并且**由服务器来调用相应的方法**

#### 生命周期方法

* `void init(ServletConfig)`：**创建Servlet对象后**立即执行初始化方法（只1次）；
    * Servlet的`init`方法只执行一次，说明**一个Servlet在内存中只存在一个对象(单例)**
        * 多用户同时访问可能存在线程安全问题
        * 解决：尽量不要在Servlet中定义成员变量。即使定义了成员变量，也不要对其修改值
    * Servlet什么时候被创建？
        1. **默认**情况下，**第一次被访问时**，Servlet被创建。即`<load-on-startup>`的值默认为负数。
        2. 可以**配置**执行Servlet的**创建时机**，在注解中配置`loadOnStartup`，给出一个**非负整数**即可，数字**越小优先级越高**。

* `void service(ServletRequest request, ServletResponse response)`：**每次处理请求**时都会被调用；

* `void destroy()`：服务器**正常关闭**，**销毁Servlet对象前**执行释放资源的方法（只1次）；



### 继承 GenericServlet 抽象类

#### 继承javax.servlet.GenericServlet抽象类

* `GenericServlet`是`Servlet`接口的**实现类**，但它是一个**抽象类**，它**唯一的抽象方法就是`service()`方法**，它将Servlet接口中的其他4个方法做了空实现。

* GenericServlet**实现了ServletConfig接口**（4个方法）

* GenericServlet**添加了`init()`方法**，该方法会**被`init(ServletConfig)`方法调用**

    如果希望对Servlet进行初始化，那么**应该重写`init()`方法**，而不是`init(ServletConfig)`方法



### 继承 HttpServlet 抽象类

#### 继承javax.servlet.http.HttpServlet抽象类

`HttpServlet`是`GenericServlet`接口的实现类，但它也是一个**抽象类**。对HTTP协议的一种封装，简化操作

#### HttpServlet处理请求顺序

1. Tomcat**调用HttpServlet继承的**生命周期方法`service(ServletRequest sr, ServletResponse srr)`对参数进行**强转**为HTTP协议相关的参数类型
2. 然后**调用HttpServlet本类的**`service(HttpServletRequest sr, HttpServletResponse srr)`方法
3. 获取请求方法，**根据请求方式**来调用`doGet()`或`doPost()`或其他，需自己**重写**，否则调用到该方法时返回`405`

```java
//注解的方式直接配置web.xml
@WebServlet("/ServletAuto")
public class ServletAuto extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
     throws ServletException,IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException, IOException {
        response.getWriter().write("hello auto");
    }
}
```



## ServletConfig

* ServletConfig接口是Servlet中的`init()`方法的参数类型，服务器会在调用`init()`方法时传递ServletConfig对象给`init()`

    **ServletConfig对象封装**了Servlet在`web.xml`中的**配置信息**，它对应`<servlet>`元素

    ```xml
    <servlet>
        <servlet-name>daihao1</servlet-name>
        <servlet-class>cn.itcast01.AServlet</servlet-class>
        <init-param>
            <param-name>name</param-name>
            <param-value>zhangsan</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>daihao1</servlet-name>
        <url-pattern>/Aservlet</url-pattern>
    </servlet-mapping>
    ```

* API如下：

    * String **getInitParameter**(String name)：获取**初始化参数**
    * Enumeration **getInitParameterNames**()：获取**所有初始化参数的名称**
    * ServletContext **getServletContext**()：**获取ServletContext对象**，这个对象稍后介绍
    * String getServletName()：获取Servlet配置名，即`<servlet-name>`的值；不常用



## ServletContext

* Java Web四大域对象（前三个为Servlet三大域对象）：

    * application(当前web应用)：**ServletContext**

    * session(一次会话)：**HttpSession**

    * request(一次请求)：**ServletRequest**

    * page(jsp有效)：**PageContext**

* ServletContext：**代表整个web应用**，可以**和程序的容器**(服务器)来**通信**，服务器会为每个应用/WEB站点创建一个ServletContext对象。**创建在服务器启动后**完成，**销毁在服务器正常吃关闭前**完成。**一个项目只有一个ServletContext对象**，我们可以在N多个Servlet中来获取这个唯一的对象，以传递数据
* 获取
    * 通过**`HttpServlet`**或`GenericServlet`获取：`this.getServletContext();`
    * 通过**`request`**对象获取：`request.getServletContext();`	
* 功能：
    1. **获取MIME类型**：`String getMimeType(String file)  `
        * MIME类型：在互联网通信过程中定义的一种文件数据类型。格式：`大类型/小类型`，`text/html`、`image/jpeg`
    2. **域对象**：**共享数据**。ServletContext对象范围是**所有用户所有请求的数据**
        * `getAttribute(String name)`：**获取**域对象中的数据
        * `setAttribute(String name,Object value)`：**存储**一个域属性
        * `removeAttribute(String name)`：**移除**域对象中的域属性，name指定域属性不存在时不变化
        * `Enumeration getAttributeNames()`：获取所有域属性的名称`
    3. 🔥获取**文件的真实**(服务器)**路径**：`String getRealPath(String path)`，即当前Web应用下的资源路径，例子如下：
        - web目录下资源访问：`getRealPath("/b.txt")`
        - WEB-INF目录下的资源访问：`getRealPath("/WEB-INF/c.txt")`
        - src目录下的资源访问：`getRealPath("/WEB-INF/classes/a.txt")`，由于src中的文件最终都会放在classes下


* **获取资源相关方法对比**

    * **获取真实(服务器)路径：`getRealPath(String path)`**，可查找范围最广泛
    * **通过类加载器获取资源**：`getResourceAsStream(String path);`，根据classes或src来判断路径
        * `/WEB-INF/classes`（src中的文件最终都会放在classes下）和`/WEB-INF/lib`每个**jar**包！
    * **Class类获取资源**：`InputStream getResourceAsStream(String path)`，
        * 路径以`/`开头，相对classes路径；路径不以`/`开头，相对当前class文件路径

* 网站访问量

    ```java
    ServletContext servletContext = this.getServletContext();
    Integer count = (Integer) servletContext.getAttribute("count");
    if(count==null){
        servletContext.setAttribute("count",1);
    }else {
        servletContext.setAttribute("count",count+1);
    }
    count = (Integer) servletContext.getAttribute("count");
    resp.getWriter().write("invite:"+count+"times");
    ```

*   获取应用/WEB站点初始化参数（getInitParameter()）
    *   Servlet也可以获取初始化参数，但它是局部的参数(一个Servlet只能获取自己的初始化参数，不能获取别人的，即初始化参数只为一个Servlet准备)
    *   可以配置**应用的初始化参数**，为所有Servlet而用！这需要使用ServletContext才能使用
    *   可以使用ServletContext来获取在web.xml文件中配置的**应用初始化参数**！注意，应用初始化参数与Servlet初始化参数不同（Spring中有使用）

  ```xml
  <context-param>
      <param-name>name</param-name>
      <param-value>zhangsan</param-value>
  </context-param>
  ```

  ```java
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      ServletContext servletContext = this.getServletContext();
      String msg =(String)servletContext.getInitParameter("name");
      response.getWriter().write(msg);
  }
  ```



​	

## Servlet3.0

> JavaEE 6.0 版本及之后的新版本都支持

* 好处：

    * 支持**注解配置**。可以**不需要web.xml了**。

* 步骤：

    1. 创建JavaEE项目，选择Servlet的版本3.0以上，可以不创建web.xml

    2. 定义一个类，实现Servlet接口并重写方法

    3. 在类上使用`@WebServlet`注解，进行配置。`@WebServlet("资源路径")`，可以省略`value`或`urlPatterns`

        ```JAVA
        @Target({ElementType.TYPE})
        @Retention(RetentionPolicy.RUNTIME)
        @Documented
        public @interface WebServlet {
            String name() default "";//相当于<Servlet-name>
        
            String[] value() default {};//代表urlPatterns()属性配置
        
            String[] urlPatterns() default {};//相当于<url-pattern>
        
            int loadOnStartup() default -1;//相当于<load-on-startup>
            WebInitParam[] initParams() default {};
            boolean asyncSupported() default false;
            String smallIcon() default "";
            String largeIcon() default "";
            String description() default "";
            String displayName() default "";
        }
        ```

* **urlpartten**：**Servlet访问路径**，用**value**替代了，所以可以不写

    - **一个Servlet**可以定义**多个访问路径** ： `@WebServlet({"/d4","/dd4","/ddd4"})`
    - **路径定义规则**：
        - **`/`**：**仅不会匹配.jsp**，需要**释放静态资源**，（查看Tomcat中web.xml中介绍）
            - 它的**优先级最低**，如果一个请求没有人处理，会执行该DefaultServlet！其实我们在访问index.html时也是在执行该DefaultServlet。
            - **不会重写其他Servlet**：即不匹配JSP是因为任何URL后缀为jsp的访问，都会执行名为jsp的Servlet
        - **`/*`**：带通配符（匹配所有**路径型和后缀型**URL，包括.html、.jsp等），**不建议使用**，**除非用在Filter中**
            - **会重写其他Servlet**：在访问jsp时会报404
        - `/xxx`：路径匹配
        - `/xxx/xxx`：多层路径，称之为目录结构
        - `*.do`：扩展名匹配，*前不能有/，否则报错





## Request

### Request继承体系

```
ServletRequest 接口
      |
     继承
      |
HttpServletRequest 接口
      |
     实现
      |
org.apache.catalina.connector.RequestFacade 类，由 Tomcat 提供，若是其他容器则不一样
```

以上体系Response也适用

### 获取请求消息数据

* 获取**请求行**数据：如`GET /day14/login?name=zhangsan HTTP/1.1`

    * 获取请求方式：`String getMethod()`，如`GET` 。HttpServlet已经在内部使用了，以后用不到
    * 获取**请求URL**：`StringBuffer getRequestURL()`，如`http://localhost/day14/login/a.html`。**统一资源定位符**
    * 获取**请求URI**：`String getRequestURI()`，如`/day14/login`。**统一资源标识符**，它**包括URL**
    * 获取**虚拟目录**：`String getContextPath()`，如`/day14`
    * 获取Servlet路径：`String getServletPath()`，如`/login`
    * 获取get方式请求参数：`String getQueryString()`，如`name=zhangsan`，以后用不到
    * 获取协议及版本：`String getProtocol()`，如`HTTP/1.1`
    * 获取客户机的**IP地址**：`String getRemoteAddr()`

* 获取**请求头**数据

    * 通过**请求头的名称获取请求头的值**：`String getHeader(String name)`，不区分大小写。如User-Agent、Referer
    * 获取所有的请求头名称：`Enumeration<String> getHeaderNames()`：

* 获取**请求体**数据（只有POST请求方式，才有请求体，在请求体中封装了POST请求的请求参数）。步骤：

    1. **获取流对象**

        * `BufferedReader getReader()`：获取**字符输入流**，只能操作字符数据

        * `ServletInputStream getInputStream()`：获取**字节输入流**，可以操作所有类型数据。继承了InputStream。在**文件上传**知识点后讲解

    2. **再从流对象中拿数据**

### 获取**请求参数通用方**式

* 获取**请求参数通用方**式（不论get还是post请求方式都可以使用）

    * **`String getParameter(String name)`**：==根据**参数名称获取参数值**==    username=zs&password=123

    * `String[] getParameterValues(String name)`：根据参数名称获取参数值的**数组** hobby=xx&hobby=game

    * **`Map<String,String[]> getParameterMap()`**：==获取**所有参数的map集合**==

    * `Enumeration<String> getParameterNames()`：获取所有请求的参数名称

    * **中文乱码问题**：

        * GET方式：Tomcat 8及以上版本已经将get方式乱码问题解决了
        * POST方式：会乱码。在获取参数前，**设置request的编码`request.setCharacterEncoding("utf-8");`**

    * 获取的**参数封装为JavaBean**可以利用 Spring 或其他提供的 BeanUtils 工具类，**简化数据封装**

        * JavaBean：标准的Java类，功能为封装数据。要求如下：

            1. **类**必须被**public**修饰
            2. 必须提供**公有的空参的构造器**
            3. 属性一般使用private修饰
            4. 对属性提供**公共get(或is)和set方法**，若只有get方法或set方法，那么这个属性是只读或只写属性！
                * **属性**：**setter和getter方法截取后的产物，与成员变量名无关**。getName() --> Name--> name

        * 方法

            * `setProperty(Object bean, String propName)`

            * `getProperty(Object bean,String propName,String propValue)`：操作的是**属性**

            * **`populate(Object obj , Map map)`**：将**map**集合的键值对信息，封装到对应的**JavaBean**对象中

                ```java
                User user = new User();
                Map<String, String[]> map = request.getParameterMap();
                BeanUtils.populate(user,map); //populate需要try...catch。spring的beanutils可能不一样
                ```



### 请求转发

* **请求转发**：一种在服务器**内部**的资源跳转方式

    * 步骤：

        1. **request获取请求转发器对象**：**`RequestDispatcher getRequestDispatcher(String path)`**，**Servlet路径**

        2. 使用RequestDispatcher对象来进行**转发**：`forward(ServletRequest request, ServletResponse response) `

            - 请求包含：`include(request,response)`

                > 请求转发：由下一个Servlet完成响应体！当前Servlet可以设置响应头！（<span style="font-family:monaco;color:red;font-weight:bold">留头不留体</span>）
                > 请求包含：由两个Servlet共同未完成响应体！（<span style="font-family:monaco;color:red;font-weight:bold">都留</span>）

    * 特点：

        1. 浏览器**地址栏路径不发生变化**
        2. 转发是**一次请求一次响应**，使用同一个request和response！
        3. 只能转发到**当前服务器内部资源**中。

### request域

* 域对象：一个有作用范围的对象，可以在范围内共享数据
* **request域**：代表**一次请求的范围**，一般用于**请求转发**的多个资源中**共享数据**
    * 方法：
        1. **`void setAttribute(String name,Object obj)`**：存储数据
        2. **`Object getAttitude(String name)`**：通过键获取值
        3. **`void removeAttribute(String name)`**：通过键移除键值对



### 用户登录案例需求

*   编写login.html登录页面：username & password 两个输入框

    login.html中form表单的action路径的写法：**虚拟目录+Servlet的资源路径**

*   使用Druid数据库连接池技术,操作mysql，day14数据库中user表

*   使用JdbcTemplate技术封装JDBC

*   登录成功跳转到SuccessServlet展示：登录成功！用户名,欢迎您

*   登录失败跳转到FailServlet展示：登录失败，用户名或密码错误



## Response

### Response继承体系

​	`ServletResponse`           —— 接口
​		|	继承
​	`HttpServletResponse`	  —— 接口
​		|	实现
​	`org.apache.catalina.connector.ResponseFacade`  ——类  (Tomcat编写的)



### 设置响应行中状态码

* **<span style="background:yellow">setStatus(int sc)</span>** --> **设置此响应的状态码**，可以用来发送302、200或者404、500等
    * sendError(int sc [,String msg]) --> 发送错误状态码，还可以带一个错误信息！



### 设置响应头

头就是一个**键值对**！可能会存在一个头（一个名称，一个值），也可能会存在一个头（一个名称，多个值！）

* **<span style="background:yellow">setHeader(String n, String val)</span>**：适用于<span style="background:yellow">**单值**</span>的响应头，例如：response.setHeader("aaa", "AAA")

    * addHeader(String name, String value)：适用于多值的响应头，为每个值分别调用

    * `<meta>`**标签代替响应头**

        ```html
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        ```

* **Refresh案例**（3秒后跳转至另一个页面）也可以理解为定时重定向

    ```java
    response.getWriter().write("after 3s ...");
    //url也可以改为www.baidu.com，若不设置这个参数，就跳转至当前页面
    response.setHeader("Refresh","3,url='DServlet'");
    ```

* **禁用浏览器缓存**(Cache-Control、pragma、expires)

    ```java
    response.setHeader("Cache-Control","no-cache");
    response.setHeader("Pragma", "no-cache");//编译指示
    response.setDateHeader("Expires", -1);//失效时间
    ```



### 设置响应体

> response的两个流，用来向客户端发送数据（不能同时使用，否则抛**IllegalStateException**异常）

* **ServletOutputStream（字节输出流）：`resopnse.getOutputStream()`**

* **PrintWriter（字符输出流，需要设置编码）：`response.getWriter()`**，不需要刷新缓冲区



### 重定向

* **重定向**：**资源跳转的方式**

* 设置**状态码**为302，设置**响应头**`Location`

    ```java
    response.setStatus(302);
    response.setHeader("location","/day15/responseDemo2");
    ```

* 简单的重定向方法：**`response.sendRedirect()`**

    ```java
    response.sendRedirect("/day15/responseDemo2");
    ```

* **forward和redirect的区别**

    * 转发的特点：forward
        1. **地址栏路径不变**
        2. 转发是**一次请求**，可以**使用request域**来共享数据
        3. 转发只能**访问当前服务器下的资源**
    * 重定向的特点：redirect
        1. **地址栏**发生**变**化
        2. 重定向是**两次请求**。**不能使用request域**来共享数据
        3. 重定向**可以访问其他站点**(服务器)的资源



### 路径的写法

* **相对路径**：通过相对路径不可以确定唯一资源，以**`./`开头（或不写它）的路径**。如：`./index.html`
    * 规则：找到当前资源所属目录和目标资源所属目录之间的相对位置关系。`./`：当前目录；`../`:后退一级目录
* **绝对路径**：通过绝对路径可以确定唯一资源，以**`/`开头的路径**。如：`/day15/responseDemo2`
    * 规则：判断定义的路径是**给谁用**的？**判断将来请求从哪儿发出**
        * **给客户端浏览器使用**：需要**加虚拟目录**(项目的访问路径)，建议**动态获取：`request.getContextPath()`**
            * `<a>`，`<form>`，`redirect路径`。。。
        * **给服务器使用**：**不需要加虚拟目录**
            * `forward路径`





### 输出字符数据到浏览器—乱码

由于浏览器默认使用 GBK 或 GB2312 或 UTF-8，而服务器获取的**流**默认使用 ISO8859-1（应该是使用的 Servlet 容器如 Tomcat 设置的），不支持中文。且编码解码不同，必乱码。

可通过如下代码查到服务器获取的**流**的编码

```java
response.getCharacterEncoding()
```

如何解决中文乱码呢？

**获取字符输出流之前**设置该**流的默认编码**，告诉浏览器**响应体使用的编码**

```java
System.out.println(response.getCharacterEncoding());// ISO-8859-1
System.out.println(response.getContentType());// null

// response.setCharacterEncoding("UTF-8");

// 设置 setContentType 后会自动设置 CharacterEncoding
// response.setHeader("Content-type","text/html;charset=utf-8");// setHeader 封装后的方法如下
response.setContentType("application/json;charset=utf-8");// 纯文本也可以设置为 text/plain;charset=utf-8

System.out.println(response.getCharacterEncoding());// UTF-8
System.out.println(response.getContentType());// application/json;charset=utf-8
```





### 输出字节数据到浏览器

* `getBytes()`，获取字节输出流外，其他和输出字符数据没什么区别



### 验证码案例

> 本质：图片
> 目的：**防止恶意表单注册**

```java
//1.创建验证码图片对象
BufferedImage image = new BufferedImage(100,50,BufferedImage.TYPE_INT_RGB);

//2.美化图片
//2.1 填充背景色
Graphics g = image.getGraphics();//画笔对象
g.setColor(Color.PINK);//设置画笔颜色
g.fillRect(0,0,width,height);

//2.2画边框
g.setColor(Color.BLUE);
g.drawRect(0,0,width - 1,height - 1);

String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789";
//生成随机角标
Random ran = new Random();
for (int i = 1; i <= 4; i++) {
    int index = ran.nextInt(str.length());
    char ch = str.charAt(index);//随机字符
    g.drawString(ch+"",width/5*i,height/2);//写验证码
}

//2.4画干扰线
g.setColor(Color.GREEN);
//随机生成坐标点
for (int i = 0; i < 10; i++) {
    int x1 = ran.nextInt(width);
    int x2 = ran.nextInt(width);
    int y1 = ran.nextInt(height);
    int y2 = ran.nextInt(height);
    g.drawLine(x1,y1,x2,y2);
}

//3.将图片输出到页面展示
ImageIO.write(image,"jpg",response.getOutputStream());
```

```javascript
//点击图片更换下一张
document.getElementById("verifyCode").onclick = function () {
    //加时间戳的毫秒值
    var date = new Date().getTime();
    this.src = "/day15/checkCodeServlet?" + date;
}
```



## URL编码

* 表单的类型：Content-Type: application/x-www-form-urlencoded，就是把中文转换成%后面跟两位的16进制

    为什么要用它：在客户端和服务器之间传递中文时需要把它转换成网络适合的方式

* **它不是字符编码**，它是用来在客户端与服务器之间传递参数用的一种方式

* URL编码需要先指定一种字符编码，把**字符串解码后，得到byte[]，然后把小于0的字节+256，再转换成16进制。前面再添加一个%**

* **POST**请求默认就使用URL编码！tomcat会自动使用URL解码

    ```java
    String username = URLEncoder.encode(username, "utf-8");//URL编码：
    String username = URLDecoder.decode(username, "utf-8");//URL解码：
    ```

    最后我们需要把链接中的中文参数，使用url来编码！学了jsp就可以





## 文件下载案例

* 文件下载需求：

    1. 页面显示超链接
    2. 点击超链接后弹出下载提示框
    3. 完成图片文件下载

* 分析：

    1. 超链接指向的资源如果能够被浏览器解析，则在浏览器中展示，如果不能解析，则弹出下载提示框。不满足需求
    2. 要求任何资源都必须弹出下载提示框
    3. 使用响应头设置资源的打开方式：`content-disposition:attachment;filename=xxx`

* 步骤：

    1. 定义页面，编辑超链接href属性，指向Servlet，**传递资源名称`?filename=xxx`**
    2. 定义Servlet
      3. 获取文件名称
      4. 使用字节输入流加载文件进内存
      5. 指定response的响应头： `content-disposition:attachment;filename=xxx`
      6. 将数据写出到response输出流

* 中文文件名问题

    * 解决思路：
        1. 获取客户端使用的浏览器版本信息
        2. 根据不同的版本信息，设置filename的编码方式不同

    ```java
    //1.获取请求参数，文件名称
    String filename = request.getParameter("filename");
    //2.使用字节输入流加载文件进内存
    //2.1找到文件服务器路径
    String realPath = this.getServletContext().getRealPath("/img/" + filename);
    //2.2用字节流关联
    FileInputStream fis = new FileInputStream(realPath);
    
    //3.设置response的响应头
    //3.1设置响应头类型：content-type
    String mimeType = servletContext.getMimeType(filename);//获取文件的mime类型
    response.setHeader("content-type",mimeType);
    //3.2设置响应头打开方式:content-disposition
    
    //解决中文文件名问题
    //1.获取user-agent请求头、
    String agent = request.getHeader("user-agent");
    //2.使用工具类方法编码文件名即可
    filename = DownLoadUtils.getFileName(agent, filename);
    response.setHeader("content-disposition","attachment;filename="+filename);
    
    //4.将输入流的数据写出到输出流中
    ServletOutputStream sos = response.getOutputStream();
    byte[] buff = new byte[1024 * 8];
    int len = 0;
    while((len = fis.read(buff)) != -1){
        sos.write(buff,0,len);
    }
    fis.close();
    ```

