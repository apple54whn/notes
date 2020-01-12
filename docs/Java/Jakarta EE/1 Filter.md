# 1 Filter

* web中的过滤器：当访问服务器的资源时，过滤器可以**拦截请求**，增强Request、Response
* 过滤器的作用：一般用于完成**通用的操作**。如：**登录验证**、统一**编码处理**、**敏感字符过滤**……

## 快速入门

 1. 定义一个类，**实现接口Filter**

2. **复写方法**

3. **配置拦截路径**

  4. 注解

     ```java
     //访问所有资源之前，都会执行该过滤器。同Servlet一致，urlPatterns和value一致，可用value替代并省略
     @WebFilter("/*")
     public class FilterDemo implements Filter {
       
         @Override
         public void init(FilterConfig filterConfig) throws ServletException { }
     
         @Override
         public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, 
                              FilterChain filterChain) throws IOException, ServletException {
             System.out.println("filterDemo被执行了....");
             filterChain.doFilter(servletRequest,servletResponse);//放行
         }
     
         @Override
         public void destroy() {  }
     }
     ```

  5. web.xml

     ```xml
     <filter>
         <filter-name>demo</filter-name>
         <filter-class>cn.itcast.web.filter.FilterDemo</filter-class>
     </filter>
     <filter-mapping>
         <filter-name>demo</filter-name>
         <url-pattern>/*</url-pattern>    <!-- 拦截路径 -->
     </filter-mapping>
     ```



## Filter细节

### **配置**详解

**拦截路径配置**：`value[]`或`urlPatterns[]`属性

*   具体资源路径：`/index.jsp`只有访问index.jsp资源时，过滤器才会被执行

*   拦截目录：`/user/*`访问/user下的所有资源时，过滤器都会被执行

*   后缀名拦截：`*.jsp`访问所有后缀名为jsp资源时，过滤器都会被执行

*   拦截所有资源：`/*`访问所有资源时，过滤器都会被执行



### 拦截方式配置

**拦截方式配置**：**资源被访问的方式**，`dispatcherTypes[]`属性

- 注解配置：

    *   `REQUEST`：默认值。浏览器**直接请求**资源

    *   `FORWARD`：**转发**访问资源

    *   `INCLUDE`：包含访问资源

    *   `ERROR`：错误跳转资源

    *   `ASYNC`：异步访问资源，a    synchronize

- web.xml配置

    - 设置`<dispatcher></dispatcher>`标签即可



### 执行流程

1. 执行**过滤器**
2. 执行**放行后的资源**
3. 回来执行过滤器**放行代码后的代码**



### 生命周期方法

*   `init(FilterConfig)`：在**服务器启动后**，会创建Filter对象，然后调用`init`方法。**只执行一次**，用于加载资源

*   `doFilter(ServletRequest,ServletResponse,FilterChain)`：**每一次请求被拦截**时执行。可以执行多次。**放行后的`Request`和`Response`还是同一个**，类似转发

*   `destroy()`：在**服务器正常关闭前**，Filter对象被销毁。**只执行一次**，用于释放资源



### 过滤器链

**过滤器链**（配置多个过滤器），如果没有下一个过滤器那么执行的是目标资源，否则就执行下一个过滤器！如净水器过滤

*   执行顺序：如果有两个过滤器：过滤器1和过滤器2
    1.  过滤器1
    2.  过滤器2
    3.  资源执行
    4.  过滤器2
    5.  过滤器1 

*   过滤器先后顺序问题：
    1.  注解配置：按照类名的字符串按每个字符比较规则比较，值小的先执行。如：AFilter和BFilter，AFilter就先执行
    2.  web.xml配置： `<filter-mapping>`谁定义在上边，谁先执行



## 案例

### 登陆验证（权限控制）

*   需求：
    1.  访问usermanagement案例的资源。验证其是否登录
    2.  如果登录了，则直接放行。
    3.  如果没有登录，则跳转到登录页面，提示"您尚未登录，请先登录"

*   分析

    1.  将实现Filter接口的非HTTP相关**Request强转为HTTP相关**的，并获取`getRequestURI()`
    2.  将包含了**登陆**相关的**资源放行**，要注意**排除掉 `css/js/图片/验证码`等资源**
    3.  若不是登陆相关的资源，**获取`Session`域**中**登陆成功后保存的`user`属性**，**判断**它值不为`null`则放行
    4.  否则在`Request域`中保存相关**提示信息并转发**至`login.jsp`

    ```java
    @WebFilter("/*")
    public class LoginFilter implements Filter {
        
        public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
            
            HttpServletRequest request = (HttpServletRequest) req; //强制转换，否则没有如下方法
            String uri = request.getRequestURI(); //获取资源请求路径
            
            //判断是否包含登录相关资源路径,要注意排除掉 css/js/图片/验证码等资源
            if (uri.contains("/login.jsp") || uri.contains("/loginServlet") || uri.contains("/css/") || uri.contains("/js/") || uri.contains("/fonts/") || uri.contains("/checkCodeServlet")) {
                chain.doFilter(req, resp);//包含，用户就是想登录。放行
            } else {  //不包含，需要验证用户是否登录。从获取session中获取user
                Object user = request.getSession().getAttribute("user");
                if (user != null) { //登录了。放行
                    chain.doFilter(req, resp);
                } else { //没有登录。跳转登录页面            
                    request.setAttribute("login_msg", "您尚未登录，请登录");
                    request.getRequestDispatcher("/login.jsp").forward(request, resp);
                }
            }
        }
        public void init(FilterConfig config) throws ServletException {}
        public void destroy() {}
    }
    ```

    



### 敏感词汇过滤（动态代理）

* 需求：

    * 对usermanagement案例录入的数据进行敏感词汇过滤
    * 敏感词汇如笨蛋、傻瓜。如果是敏感词汇，替换为***

* 分析：

    1. 由于拦截的和放行的Request、Response为同一个，可以对getParameter()获取的参数修改后再保存至Request中，但是没有这种现有方法
    2. 可以采用**动态代理**对Request对象进行增强，增强获取参数相关方法
    3. 放行，传递代理对象

    ```java
    @WebFilter("/*")
    public class SensitiveWordsFilter implements Filter {
    
        public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
            //1.创建代理对象，增强getParameter方法
            ServletRequest proxy_req = (ServletRequest) Proxy.newProxyInstance(req.getClass().getClassLoader(), req.getClass().getInterfaces(), new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    //增强getParameter方法
                    //判断是否是getParameter方法
                    if (method.getName().equals("getParameter")) {
                        //增强返回值
                        //获取返回值
                        String value = (String) method.invoke(req, args);
                        if (value != null) {
                            for (String str : list) {
                                if (value.contains(str)) {
                                    value = value.replaceAll(str, "***");
                                }
                            }
                        }
                        return value;
                    }
                    //判断方法名是否是 getParameterMap
                    //判断方法名是否是 getParameterValue
                    //不是上述方法，则原样调用
                    return method.invoke(req, args);
                }
            });
            //2.放行
            chain.doFilter(proxy_req, resp);
        }
    
        private List<String> list = new ArrayList<String>();//敏感词汇集合
        public void init(FilterConfig config) throws ServletException {
    
            try {
                //1.获取文件真实路径
                ServletContext servletContext = config.getServletContext();
                String realPath = servletContext.getRealPath("/WEB-INF/classes/敏感词汇.txt");
                //2.读取文件
                BufferedReader br = new BufferedReader(new FileReader(realPath));
                //3.将文件的每一行数据添加到list中
                String line = null;
                while ((line = br.readLine()) != null) {
                    list.add(line);
                }
                br.close();           
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        public void destroy() {}
    }
    ```

>   代理模式可以查看 Core Java 中笔记



### 分 IP 统计网站访问次数

- 统计工作需要在所有资源之前都执行，那么就可以放到**Filter**中了,不做拦截操作！**获取map并保存数据**
- 用Map<String,Integer>来装载统计的数据,整个网站只需要一个**Map**即可！使用**ServletContextListener**，在服务器启动时完成创建，并保存到ServletContext中
- 打印Map中的数据



### 全站编码问题(增强 request)

```java
//装饰Request
public class EncodingRequest extends HttpServletRequestWrapper {
	private HttpServletRequest req;
	
	public EncodingRequest(HttpServletRequest request) {
		super(request);
		this.req = request;
	}
	public String getParameter(String name) {
		String value = req.getParameter(name);
		// 处理编码问题
		try {
			value = new String(value.getBytes("iso-8859-1"), "utf-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
		return value;
	}
}
```

```java
public void doFilter(ServletRequest request, ServletResponse response,
                     FilterChain chain) throws IOException, ServletException {
    request.setCharacterEncoding("utf-8");   // 处理post请求编码问题
    
    HttpServletRequest req = (HttpServletRequest) request;
		/*
		 * 调包request
		 * 1. 写一个request的装饰类
		 * 2. 在放行时，使用我们自己的request
		 */
    if(req.getMethod().equals("GET")) {
        EncodingRequest er = new EncodingRequest(req);
        chain.doFilter(er, response);
    } else if(req.getMethod().equals("POST")) {
        chain.doFilter(request, response);
    }
}
```



### 页面静态化(增强 response)

```java
public class StaticResponse extends HttpServletResponseWrapper {
	private PrintWriter pw;
	//String path：html文件路径！
	public StaticResponse(HttpServletResponse response, String path) 
			throws FileNotFoundException, UnsupportedEncodingException {
		super(response);
		// 创建一个与html文件路径在一起的流对象
		pw = new PrintWriter(path, "utf-8");
	}
	public PrintWriter getWriter() {
		// 返回一个与html绑定在一起的printWriter对象
		// jsp会使用它进行输出，这样数据都输出到html文件了。
		return pw;
	}
}
```

```java
public class StaticFilter implements Filter {
	private FilterConfig config;
	public void destroy() {}
	public void init(FilterConfig fConfig) throws ServletException {
		this.config = fConfig;
	}
	public void doFilter(ServletRequest request, 
			ServletResponse response, FilterChain chain) 
					throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		/*
		 * 1. 第一次访问时，查找请求对应的html页面是否存在，如果存在重定向到html
		 * 2. 如果不存在，放行！把servlet访问数据库后，输出给客户端的数据保存到一个html文件中
		 *   再重定向到html
		 * 一、获取category参数！
		 * category有四种可能：null --> null.html....
		 * html页面的保存路径, htmls目录下
		 * 判断对应的html文件是否存在，如果存在，直接重定向！
		 */
		String category = request.getParameter("category");
		String htmlPage = category + ".html";//得到对应的文件名称
		String htmlPath = config.getServletContext().getRealPath("/htmls");//得到文件目录
		File destFile = new File(htmlPath, htmlPage);
		if(destFile.exists()) {//如果文件存在
			// 重定向到这个文件
			res.sendRedirect(req.getContextPath() + "/htmls/" + htmlPage);
			return;
		}
		/*
		 * 二、如果html文件不存在，我们要生成html
		 * * 调包response，让它的getWriter()与一个html文件绑定，那么show.jsp的输出就到了html中
		 */
		StaticResponse sr = new StaticResponse(res, destFile.getAbsolutePath());
		chain.doFilter(request, sr);//放行，即生成了html文件
		// 这时页面已经存在，重定向到html文件
		res.sendRedirect(req.getContextPath() + "/htmls/" + htmlPage);
	}
}
```

