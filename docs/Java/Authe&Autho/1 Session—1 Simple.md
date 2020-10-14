# Session—1 Simple

基于 Session 的认证机制由 Servlet 规范定制，Servlet 容器已实现，用户通过操作 HttpSession 的方法即可实现，如下是HttpSession 相关的操作API。

```java
HttpSession getSession(Boolean create);// 获取当前HttpSession对象

void setAttribute(String name,Object value);// 向session中存放对象

object getAttribute(String name);// 从session中获取对象

void removeAttribute(String name);// 移除session中对象

void invalidate();// 使HttpSession失效

// ......
```



## 创建工程

使用纯 JavaConfig 创建，Maven 及其他详见代码

### WebAppInitializer 配置

```java
/**
 * 相当于 /webapp/WEB-INF/web.xml，Spring 容器启动时会加载 WebApplicationInitializer 接口的所有实现类
 *
 * DispatcherServlet是Spring MVC的核心。在这里请求会第一次接触到框架，它主要负责将请求路由到其他的组件之中。
 * 按照传统的方式,像DispatcherServlet这样的Servlet会配置在web.xml文件中，这个文件会放到应用的WAR包里面。当然，这是配置DispatcherServlet的方法之一。
 * 但是，借助于Servlet3规范和Spring3.1的功能增强，这种方式已经不是唯一的方案了，这也不是我们本文所使用的配置方法。
 * 我们会使用java将DispatcherServlet配置在Servlet容器中，而不会再使用web.xml文件。如下程序清单展示了所需的java类。
 *
 * Spring Web应用中通常存在两个应用上下文，一个是DispatcherServlet创建的应用上下文，一个是ContextLoaderListener创建的应用上下文。
 * AbstractAnnotationConfigDispatcherServletInitializer会同时创建DispatcherServlet和ContextLoaderListener（查看源码）
 */
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * 返回的带有@Configuration注解的类将会用来配置ContextLoaderListener创建的应用上下文中的bean，
     * 通常是驱动应用后端的中间层和数据库组件。
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{RootConfig.class};
    }

    /**
     * 返回的带有@Configuration注解的类会用来定义DispatcherServlet应用上下文中的bean。
     * 包含Web组件的bean，如控制器、试图解析器以及处理器映射器等。
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfig.class};
    }

    /**
     * 将DispatcherServlet映射到"/"
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

}
```



### RootConfig 配置

```java
/**
 * 相当于 Spring 及其整合的如 Mybatis 等配置
 */
@Configuration
@ComponentScan(
        value = "top.conanan.security",
        excludeFilters = {
            // 需排除 Controller 注解（也会自动包含 RestController）
                @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class)
        })
public class RootConfig {
}
```





### WebConfig 配置

```java
/**
 * 相当于 SpringMVC 的配置
 * <p>
 * 我们有多种方法来配置DispatcherServlet，与之类似，启用Spring MVC组件的方法也不只一种。
 * 从前，Spring是使用XML进行配置的，可以使用<mvc:annotation-driven>启用注解驱动的Spring MVC。
 */
@Configuration
@EnableWebMvc// 启用 Spring MVC 注解驱动，替代处理器映射器、处理器适配器。
@ComponentScan(
        value = "top.conanan.security.controller",
        includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class),
        useDefaultFilters = false// 必须有！这里仅仅扫描 Controller
)
// extends WebMvcConfigurerAdapter 在 Spring 5.0 已经 Deprecated
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private SimpleAuthenticationInterceptor simpleAuthenticationInterceptor;

    /**
     * 配置视图解析器
     *
     * @param registry
     */
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/views/", ".jsp");
    }

    /**
     * 配置视图控制器
     *
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("login");
    }
}
```











## 实现认证功能 🔥

### 认证页面

认证页面就不再赘述了

```jsp
<%@ page contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>用户登录</title>
</head>
<body>
<form action="login" method="post">
    用户名：<input type="text" name="username"><br>
    密&nbsp;&nbsp;&nbsp;码: <input type="password" name="password"><br>
    <input type="submit" value="登录">
</form>
</body>
</html>
```



### login 页面的控制器配置

见 WebConfig 中，直接拦截到 login 页面

```java
/**
     * 配置视图控制器
     *
     * @param registry
     */
@Override
public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/").setViewName("login");
}
```





### 认证接口！！！🔥

用户进入认证页面，输入账号和密码，点击登录，请求/login进行身份认证。

1.  定义认证接口，此接口用于对传来的用户名、密码校验，若成功则返回该用户的详细信息，否则抛出错误异常

    ```java
    /**
     * 认证服务接口
     */
    public interface AuthenticationService {
    
        /**
         * 用户认证
         * @param authenticationRequest 用户认证请求（包括账号和密码等）
         * @return 认证成功的用户信息
         */
        UserDto authentication(AuthenticationRequest authenticationRequest);
    }
    ```

2.  认证请求结构

    ```java
    /**
     * 用户认证请求参数
     */
    @Data
    public class AuthenticationRequest {
    
        private String username;
    
        private String password;
    }
    ```

3.  认证成功后返回的用户详细信息，也就是当前登录用户的信息

    ```java
    /**
     * 用户身份信息
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class UserDto {
    
        public static final String SESSION_USER_KEY = "_user";
    
        private String id;
    
        private String username;
    
        private String password;
    
        private String fullName;
    
        private String mobile;
    }
    ```
    
4.  认证实现类，根据用户名查找用户信息，并校验密码，这里模拟了两个用户

    ```java
    @Service
    public class AuthenticationServiceImpl implements AuthenticationService {
    
        /**
         * 用户认证，校验用户信息是否合法
         * @param authenticationRequest 用户认证请求（包括账号和密码等）
         * @return 认证成功的用户信息
         */
        @Override
        public UserDto authentication(AuthenticationRequest authenticationRequest) {
    
            // 校验参数是否为空
            if (authenticationRequest == null
                    || StringUtils.isEmpty(authenticationRequest.getUsername())
                    || StringUtils.isEmpty(authenticationRequest.getPassword())){
                throw new RuntimeException("账号或密码为空");
            }
    
            // 模拟用户查询
            UserDto user = getUserDto(authenticationRequest.getUsername());
    
            // 判断用户是否为空
            if (user == null){
                throw new RuntimeException("查询不到该用户");
            }
    
            // 校验密码
            if (!authenticationRequest.getPassword().equals(user.getPassword())){
                throw new RuntimeException("账号或密码错误");
            }
    
            // 认证成功返回用户信息
            return user;
        }
    
    
        /**
         * 根据用户名查询用户信息（一般不放在这里）
         * @param username 用户名
         * @return
         */
        public UserDto getUserDto(String username){
            return userMap.get(username);
        }
    
    
        // 模拟用户信息
        private Map<String,UserDto> userMap = new HashMap<>();
    
        {
            userMap.put("zhangsan", new UserDto("100001", "zhangsan", "123", "张三", "88880001"));
            userMap.put("lisi", new UserDto("100002", "lisi", "456", "李四", "88880002"));
        }
    
    }
    ```

5.  登录Controller，对/login请求处理，它调用AuthenticationService完成认证并返回登录结果提示信息

    ```java
    @RestController
    @RequestMapping
    public class LoginController {
    
        @Autowired
        private AuthenticationService authenticationService;
    
        /**
         * 登录
         * @param authenticationRequest
         * @param session
         * @return
         */
        @PostMapping(value = "/login", produces = {"text/plain;charset=utf-8"})
        public String login(AuthenticationRequest authenticationRequest, HttpSession session){
            UserDto userDto = authenticationService.authentication(authenticationRequest);
            return userDto.getUsername()+"登录成功";
        }
    }
    ```

到目前为止最基础的认证功能已经完成，它**仅仅实现了对用户身份凭证的校验**，若某用 户认证成功，只能说明他是该系统的一个合法用户，仅此而已。



## 实现会话功能 🔥

会话是指用户登入系统后，系统会记住该用户的登录状态，他可以在系统连续操作直到退出系统的过程。相对于 HTTP 的无状态协议来说。

认证的目的是对系统资源的保护，每次对资源的访问，系统必须得知道是谁在访问资源，才能对该请求进行合法性拦截。因此，在认证成功后，一般会把认证成功的用户信息放入Session中，在后续的请求中，系统能够从 Session 中获取到当前用户，用这样的方式来实现会话机制。 

### 增加会话控制 

首先在UserDto中定义一个SESSION_USER_KEY，作为Session中存放登录用户信息的key

```java
public static final String SESSION_USER_KEY = "_user";
```

修改LoginController，认证成功后，将用户信息放入当前会话。并增加用户登出方法，登出时将session置为失效

```java
@RestController
@RequestMapping
public class LoginController {

    @Autowired
    private AuthenticationService authenticationService;

    /**
     * 登录
     * @param authenticationRequest
     * @param session
     * @return
     */
    @PostMapping(value = "/login", produces = {"text/plain;charset=utf-8"})
    public String login(AuthenticationRequest authenticationRequest, HttpSession session){
        UserDto userDto = authenticationService.authentication(authenticationRequest);

        // 登录成功存入 session
        session.setAttribute(UserDto.SESSION_USER_KEY, userDto);
        return userDto.getUsername()+"登录成功";
    }

    /**
     * 退出
     * @param session
     * @return
     */
    @GetMapping(value = "/logout", produces = "text/plain;charset=utf-8")
    public String logout(HttpSession session){
        // 使会话无效
        session.invalidate();
        return "退出成功";
    }
}
```



### 增加测试资源

```java
/**
     * 访问资源r1
     * @param session
     * @return
     */
@GetMapping(value = "/r/r1", produces = "text/plain;charset=utf-8")
public String accessR1(HttpSession session){
    String fullName;
    Object object = session.getAttribute(UserDto.SESSION_USER_KEY);
    if (object == null){
        fullName = "匿名";
    } else {
        UserDto userDto = (UserDto) object;
        fullName = userDto.getFullName();
    }
    return fullName + "访问资源r1";
}
```

测试结果说明，在用户登录成功时，该用户信息已被成功放入 session，并且后续请求可以正常从 session 中获取当前登录用户信息，符合预期结果。

实际中不会在每个 Controller 中写，会**在拦截器中统一拦截**，见下一章节。



## 实现授权功能 🔥

现在我们已经完成了用户身份凭证的校验以及登录的状态保持，并且我们也知道了如何获取当前登录用户（从 Session中获取）的信息，接下来，用户访问系统需要经过授权，即需要完成如下功能： 

*   匿名用户（未登录用户）访问拦截：禁止匿名用户访问某些资源
*   登录用户访问拦截：根据用户的权限决定是否能访问某些资源

步骤如下：

### 增加权限数据

在UserDto里增加权限属性，用于表示该登录用户所拥有的权限，同时修改 UserDto 的构造方法

```java
/**
 * 用户身份信息
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    public static final String SESSION_USER_KEY = "_user";

    private String id;

    private String username;

    private String password;

    private String fullName;

    private String mobile;

    // 用户权限
    private Set<String> authorities;
}
```

并在 AuthenticationServiceImpl 中为模拟用户初始化权限，其中张三给了p1权限，李四给了p2权限。

```java
// 模拟用户信息
private Map<String,UserDto> userMap = new HashMap<>();

{
    HashSet<String> authorities1 = new HashSet<>();
    authorities1.add("p1");// permission 1，令其和 r/r1 绑定

    HashSet<String> authorities2 = new HashSet<>();
    authorities2.add("p2");// permission 2，令其和 r/r2 绑定


    userMap.put("zhangsan", new UserDto("100001", "zhangsan", "123", "张三", "88880001", authorities1));
    userMap.put("lisi", new UserDto("100002", "lisi", "456", "李四", "88880002", authorities2));
}
```



### 增加测试资源

实现针对不同的用户能访问不同的资源，前提是得有多个资源，因此在LoginController中增加测试资源2

```java
/**
     * 访问资源r2
     * @param session
     * @return
     */
@GetMapping(value = "/r/r2", produces = "text/plain;charset=utf-8")
public String accessR2(HttpSession session){
    String fullName;
    Object object = session.getAttribute(UserDto.SESSION_USER_KEY);
    if (object == null){
        fullName = "匿名";
    } else {
        UserDto userDto = (UserDto) object;
        fullName = userDto.getFullName();
    }
    return fullName + "访问资源r2";
}
```



### 实现授权拦截器

在interceptor包下定义SimpleAuthenticationInterceptor拦截器，实现授权拦截： 

*   校验用户是否登录 

*   校验用户是否拥有操作权限

```java
@Component
public class SimpleAuthenticationInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 校验用户请求的 url 是否在用户的权限内
        HttpSession session = request.getSession();
        Object object = session.getAttribute(UserDto.SESSION_USER_KEY);
        if (object == null){
            // 未登录
            writeContent(response, "请先登录");
            return false;
        }

        UserDto userDto = (UserDto) object;
        // 请求的 url（requestURI 包括查询参数）
        String requestURI = request.getRequestURI();
        if (requestURI.contains("/r/r1") && userDto.getAuthorities().contains("p1")) {
            return true;
        }

        if (requestURI.contains("/r/r2") && userDto.getAuthorities().contains("p2")){
            return true;
        }

        writeContent(response, "没有权限，拒绝访问");
        return false;
    }

    private void writeContent(HttpServletResponse response, String content) throws IOException {
        response.setContentType("text/html;charset=utf-8");
        PrintWriter writer = response.getWriter();
        writer.write(content);
        writer.close();
    }
}
```

在 WebConfig 中配置拦截器

```java
/**
     * 配置拦截器
     *
     * @param registry
     */
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry
        .addInterceptor(simpleAuthenticationInterceptor)
        .excludePathPatterns("/", "/login", "/logout") // 放行登录等资源
        .addPathPatterns("/r/**");// 其实这行写了后就不用再放行上面那些资源了
}
```



