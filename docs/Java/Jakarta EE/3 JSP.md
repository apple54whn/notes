# 3 JSP（不需要学了）

## JSP 简介

* JSP（java server pages）其实就是Servlet，用于简化Servlet的书写
    - Servlet：
        - 优点：动态资源，可以编程
        - 缺点：不适合设置html响应体，需要大量的response.getWriter().print("< html>")
    - html：
        - 优点：不用为输出html标签而发愁
        - 缺点：html是静态页面，不能包含动态信息
    - JSP：
        - 优点：在原有html的基础上添加java脚本，构成jsp页面

* **JSP原理**
    * 当**jsp页面第一次被访问**时，**服务器会把jsp编译成java文件**（这个java其实**继承一个servlet**类）
    * 然后再把**java编译成.class**
    * 然后**创建该类JSP(Servlet)对象**
    * 最后**调用它的service()方法**（第二次请求同一jsp时，直接调用service()方法）
* JSP和Servlet的分工
    - Servlet：作为请求中**处理数据**的环节
    - JSP：作为**请求发起页面**，例如显示表单、超链接。作为**请求结束页面**，例如显示数据

## JSP的脚本

* JSP= html + Java脚本 + JSP标签(指令)
* 3种Java脚本：
    * `<%...%>`：定义的java代码，在service方法中。**service方法**中可以定义什么，该脚本中就可以定义什么。
    * `<%=...%>`：定义的java代码，会输出到页面上。**输出语句**中可以定义什么，该脚本中就可以定义什么
    * `<%!...%>`：定义的java代码，在jsp转换后的java**类的成员位置**
* `<%-- ... --%>`：**注释**，也可以注释HTML。当服务器把jsp编译成java文件时已经忽略了注释部分！**不会发送至客户端**
    * 但是HTML中注释会发送并可以从查看源代码中找到，虽然页面中不显示
* JSP对应的Java文件：java脚本直接显示，html输出用write，变量输出用print

## JSP九大内置对象

- pageContext（PageContext）：当前页面共享数据。页面上下文对象，可以获取其他8个对象，一个顶9个！
- application（ServletContext）：整个应用程序，所有用户间共享数据
- session（HttpSession）：一次会话的多个请求间。在JSP页面中设置`<%@page session=”false”%>`就不能使用Session
- request（HttpServletRequest）：一次请求访问的多个资源（请求转发）
- response（HttpServletResponse）：响应对象
- out（JspWriter）：用来向客户端发送文本数据。**先执行response.getWriter()，后执行out**
- page（当前JSP的类型即Servlet对象）：当前JSP页面的“this”，即Servlet对象；
- config（ServletConfig）：对应“真身”中的ServletConfig
- exception（Throwable）：只有在错误页面中可以使用这个对象，即`isErrorPage`为true



> Servlet中有三大域，而JSP中有四大域，它就是最后一个域对象！
>
> - ServletContext：整个应用程序
> - session：整个会话(一个会话中只有一个用户)
> - request：一个请求链！
> - pageContext：一个jsp页面！这个域是在**当前jsp页面**和当前jsp页面中使用的**标签**之间共享数据！

- PageContext域对象

    - **代理其他域**：pageContext.setAttribute("xxx", "XXX", PageContext.SESSION_SCOPE);

    - **全域查找**：pageContext.findAttribute("xxx")；**从小到大**，依次（四大域对象）查找！




## JSP三大指令

作用：用于**配置JSP页面**，**导入资源文件**。一个jsp页面中，可以有0~N个指令的定义！可以放在任意位置

格式：`<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 ... %>`

- **page**

    - **`contentType`**和`pageEncoding`

        - `contentType`：**添加一个响应头，等同于**`response.setContentType("text/html;charset=utf-8");`
        - `pageEncoding`：它指定当前jsp页面的编码，在服务器要把jsp编译成.java时需要使用`pageEncoding`!
        - 如果两个属性只提供一个，那么另一个的默认值为设置那一个。如果两个属性都没有，那么默认为iso

    - `import`：**导包**！可以出现多次

    - `language`：指定当前jsp编译后的语言类型，默认值为java。

    - `errorPage`和`isErrorPage`

        - `errorPage`：当前页面如果抛出异常，那么要转发到哪一个页面，由errorPage来指定

        - `isErrorPage`：它指定当前页面是否为处理错误的页面！当该属性为true时，这个页面会设置状态码为500！而且这个页面可以使用9大内置对象中的**`exception`**!

            ```xml
            <error-page>
                <error-code>404</error-code>
                <location>/error/errorPage.jsp</location>
            </error-page>
            <error-page>
                <error-code>500</error-code>
                <location>/error/errorPage.jsp</location>
            </error-page>
            <error-page>
                <exception-type>java.lang.RuntimeException</exception-type>
                <location>/index.jsp</location>
            </error-page>
            ```

    - 基本没用：

        - autoFlush和buffer
            - autoFlush：指定jsp的输出流缓冲区满时，是否自动刷新！默认为true，如果为false，那么在缓冲区满时抛出异常！
            - buffer：指定缓冲区大小，默认为8kb，通常不需要修改！
        - isELIgnored：是否忽略el表达式，默认值为false，不忽略，即支持！

        - info：信息！
        - isThreadSafe：当前的jsp是否支持并发访问！值为false，没人用
        - session：当前页面是否支持session，如果为false，那么当前页面就没有session这个内置对象！
        - extends：让jsp生成的servlet去继承该属性指定的类！

- **include**：静态**包含**

    - 作用：把页面分解，使用包含的方式组合在一起，这样一个页面中不变的部分，就是一个独立jsp，而我们只需要处理变化的页面。
    - 与RequestDispatcher的include()方法的功能相似！
        - `<%@include%>`它是在jsp编译成java文件时完成的！他们共同生成一个java文件，然后再生成一个class！
        - RequestDispatcher的`include()`是一个方法，包含和被包含的是两个servlet，即两个.class！他们只是把响应的内容在运行时合并了！

- **taglib**：导入标签库，`<%@taglib prefix="s" uri="/struts-tags"%> 前缀的用法< s:text>`

    - `prefix`：指定标签库在本页面中的**前缀**！自定义！

    - `uri`: 指定标签库的**位置**！


> JSP动作标签
>
> 与html提供的标签有本质的区别，动作标签是由服务器来解释执行！它与java代码一样，都是在服务器端执行的！
>
> html由浏览器来执行！
>
> - `<jsp:forward>`：**转发**！它与RequestDispatcher的forward方法是一样的，一个在Servlet中使用，一个在jsp中使用
> - `<jsp:include>`：**包含**：它与RequestDispatcher的include方法是一样的，一个在Servlet中使用，一个在jsp中使用
>     - < %@include>和< jsp:include>有什么不同！
> - `<jsp:param>`：它用来作为forward和include的子标签！用来给转发或包含的页面传递参数！



## EL表达式

1. 概念：**EL（Expression Language）** 表达式语言
2. 作用：**替换**和**简化jsp页面**中**java代码的编写**。EL替代的是`<%= ... %>`，也就是说，**EL只能做输出**
3. 语法：`${表达式}`
4. 注意：

  * **JSP默认支持EL表达式的**。如果要**忽略**EL表达式
    1. 设置JSP中page指令中：`isELIgnored="true"` 忽略当前JSP页面中所有的EL表达式
    2. `\${表达式}` ：忽略当前这个EL表达式

5. 使用：

    1. **运算**：

      * 运算符：

        1. 算数运算符： `+` `-` `*` `/(或div)` `%(或mod)`
        2. 比较运算符： `>` `<` `>=` `<=` `==` `!=`
        3. 逻辑运算符： `&&(或and)` `||(或or)` `!(或not)`
        4. 空运算符： `empty`

          * 功能：用于判断字符串、集合、数组对象是否为null或者长度是否为0
          * `${empty list}`：判断字符串、集合、数组对象是否为null或者长度为0
          * `${not empty str}`：表示判断字符串、集合、数组对象是否不为null 并且 长度>0

    2. **获取值**

      3. el表达式**只能**从**域对象**中获取值

      4. 语法：

           1. `${域名称.键名}`：从指定域中获取指定键的值

              * 域名称：
                  1. `pageScope`		--> pageContext
                  2. `requestScope` 	--> request
                  3. `sessionScope` 	--> session
                  4. `applicationScope` --> application（ServletContext）
              * 举例：在request域中存储了`name=张三`。获取：`${requestScope.name}`，没有就展示空串
                  2. `${键名}`：表示**依次从最小的域中**查找是否有该键对应的值，直到找到为止。
                  3. 获取对象、List集合、Map集合的值

                1. **对象**：`${域名称.键名.属性名}`
                   * 本质上会去调用对象的`getter方法`。属性和成员变量不同，只有getter、setter方法的称**逻辑视图**

                2. **List**集合：`${域名称.键名[索引]}`

                3. **Map**集合：`${域名称.键名["key名称"]}`或`${域名称.键名.key名称}`

    5. 隐式对象：

        * el表达式中有11个隐式对象
            * **pageContext**：
                * 获取其他9个内置对象，有个cookie它获取不到
                * `${pageContext.request.contextPath}`：动态获取**虚拟目录**

## JSTL标签库

1. 概念：JavaServer Pages Tag Library  **JSP标准标签库**。是由Apache组织提供的开源的免费的jsp标签`<标签>`

2. 作用：用于简化和替换jsp页面上的java代码

3. 使用步骤：

    1. 导入jstl相关jar包
    2. 引入标签库，taglib指令：  `<%@ taglib %>`
    3. 使用标签

4. 常用的JSTL标签

    1. `if`：相当于java代码的if语句

        1. 属性：`test`必须属性，接受boolean表达式
            1. 如果表达式为true，则显示if标签体内容，如果为false，则不显示标签体内容
            2. 一般情况下，test属性值会**结合el表达式**一起使用
        2. 注意：`c:if`标签**没有else**情况，想要else情况，则可以在定义一个`c:if`标签

        ```jsp
        <c:if test="${not empty list}">  <%-- number % 2 != 0 --%>
            <p>遍历集合</p>
        </c:if>
        ```

    2. `choose`：相当于java代码的switch语句

        1. 使用choose标签声明         			相当于switch声明
        2. 使用when标签做判断         			相当于case
        3. 使用otherwise标签做其他情况的声明    	相当于default

        ```jsp
        <c:set var="score" value="${param.score }"/>
        <c:choose>
            <c:when test="${score > 100 || score < 0}">错误的分数：${score }</c:when>
            <c:when test="${score >= 90 }">A级</c:when>
            <c:when test="${score >= 80 }">B级</c:when>
            <c:when test="${score >= 70 }">C级</c:when>
            <c:when test="${score >= 60 }">D级</c:when>
            <c:otherwise>E级</c:otherwise>
        </c:choose>
        ```

    3. `foreach`：相当于java代码的for语句

        ```jsp
        <c:forEach var="i" begin="1" end="10" step="2">//循环变量、开始、结束、设置步长(默认1)
            ${i}<br/>
        </c:forEach>
        //13579
        
        <c:forEach items="${strs }" var="str">//循环目标、变量
            ${str }<br/>
        </c:forEach>
        
        //可以使用varStatus来创建循环状态变量，用于遍历容器   
        <c:forEach var="item" items="${ns }" varStatus="vs">
            <c:if test="${vs.first }">第一行：</c:if>               <!--first：是否为第一个元素-->
            <c:if test="${vs.last }">最后一行：</c:if>              <!--last：是否为最后一个元素-->
            <c:out value="第${vs.count }行: "/>                     <!--count：循环的次数，从1开始-->
            <c:out value="[${vs.index }]: "/>                      <!--index：循环元素的索引-->
            <c:out value="name: ${vs.current }"/><br/>             <!--current：当前元素。或直接用var变量-->
        </c:forEach>
        ```

  * 需求：在request域中有一个存有User对象的List集合。需要使用jstl+el将list集合数据展示到jsp页面的表格table中

    ```jsp
    <table border="1">
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>生日</th>
        </tr>
        <c:forEach items="${list}" var="user" varStatus="s">
            <tr>
                <td>${s.count}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.birStr}</td>
            </tr>
        </c:forEach>
    </table>
    ```



