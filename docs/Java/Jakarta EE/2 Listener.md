# 2 Listener

> web的三大组件之一

## 事件监听机制

* 事件源（被监听对象）：小偷
* 事件（事件源行为）：偷东西
* 监听器（用于监听事件源的对象）：警察，监听器中的方法：抓捕
    * 它是一个**接口**，内容由我们来实现
    * 它需要**注册**，例如注册在按钮上
    * 监听器中的方法，会在特殊**事件发生时被调用**
* 注册监听：将事件、事件源、监听器绑定在一起。 当事件源上发生某个事件后，执行监听器中的方法



## 编写 Listener

* Java Web中完成编写监听器（以后写监听器机会很少！）

    - 写一个监听器类(实现某个监听器接口)，重写方法

    - 注册，即配置。

    - 可以通过`getInitParameter()`获取初始化参数，加载资源文件

        - 注解：`@WebListener`

        - web.xml

            ```xml
            <listener>
                <listener-class>cn.itcast.web.listener.ContextLoaderListener</listener-class>
            </listener>
            <!--还可以指定初始化参数-->
            <context-param>
                <param-name>contextConfig</param-name>
                <param-value>/WEB-INF/classes/prop.xml</param-value>
            </context-param>
            ```



## Java Web中8个监听器

### 监听 ServletContext

* 生命周期监听：<span style="background:yellow">**ServletContextListener**</span>，有两个方法，一个在服务器启动后调用，一个在服务器正常关闭前调用
    * `void contextInitialized(ServletContextEvent sce)`：**ServletContext对象创建后**会调用该方法
    * `void contextDestroyed(ServletContextEvent sce)`：**ServletContext对象被销毁之前**会调用该方法
* 属性监听：**ServletContextAttributeListener**，它有三个方法，在添加、替换、移除属性时调用
    * void attributeAdded(ServletContextAttributeEvent event)：添加属性时
    * void attributeReplaced(ServletContextAttributeEvent event)：替换属性时
    * void attributeRemoved(ServletContextAttributeEvent event)：移除属性时

### 监听 HttpSession

* 生命周期监听：**HttpSessionListener**，它有两个方法，一个在出生时调用，一个在死亡时调用

    * void sessionCreated(HttpSessionEvent se)：创建session时
    * void sessionDestroyed(HttpSessionEvent se)：销毁session时

* 属性监听：**HttpSessioniAttributeListener**，它有三个方法，在添加、替换、移除属性时调用

    * void attributeAdded(HttpSessionBindingEvent event)：添加属性时
    * void attributeReplaced(HttpSessionBindingEvent event)：替换属性时
    * void attributeRemoved(HttpSessionBindingEvent event)：移除属性时

* **感知监听**：用来**添加到JavaBean上（需实现接口）**，**不需要在web.xml中注册**

    * **HttpSessionBindingListener**：添加到javabean上，javabean就知道自己是否添加到session中

    * **HttpSessionActivationListener**：监听JavaBean(实现序列化接口)是否随Session被钝化、活化

        * Session的序列化：context.xml中打开被注释掉的Manager即可不允许Session序列化

        * Tomcat会在session长时间不被使用时**钝化**session对象，所谓钝化session，就是把session通过序列化的方式**保存到硬盘文件中**。当用户再使用session时，Tomcat还会把钝化的对象再活化session，所谓活化就是把硬盘文件中的session在反序列化回内存

            ```xml
            <!--配置Tomcat钝化session参数;放到tomcat\conf\catalina\localhost\项目名-->
            <Context>
            	<Manager className="org.apache.catalina.session.PersistentManager" maxIdleSwap="1">
            		<Store className="org.apache.catalina.session.FileStore" directory="mysession"/>
            	</Manager>
            </Context>
            ```

### 监听 ServletRequest

* 生命周期监听：**ServletRequestListener**，它有两个方法，一个在出生时调用，一个在死亡时调用
    * void requestInitialized(ServletRequestEvent sre)：创建request时
    * void requestDestroyed(ServletRequestEvent sre)：销毁request时
* 属性监听：**ServletRequestAttributeListener**，它有三个方法，在添加、替换、移除属性时调用
    * void attributeAdded(ServletRequestAttributeEvent srae)：添加属性时
    * void attributeReplaced(ServletRequestAttributeEvent srae)：替换属性时
    * void attributeRemoved(ServletRequestAttributeEvent srae)：移除属性时

### 事件对象

* **ServletContextEvent**：`ServletContext getServletContext()`，**可以获取`ServletContext`**

* ServletContextAttributeEvent：

    - ServletContext getServletContext()；

    - String getName()：获取属性名

    - Object getValue()：获取属性值

* HttpSessionEvent：HttpSession getSession()

* HttpSessionBindingEvent：略

* ServletRequestEvent ：

    * ServletContext getServletContext()；
    * ServletRequest getServletRequest()；

* ServletRequestAttributeEvent ：略

