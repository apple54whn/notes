# Spring Security Boot

## 创建工程

### Maven 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

其他详见代码



### 配置

只是用于`/`映射到`/login`，但是此处的`/login`是 Spring Security 提供的，所以必须使用 redirect 重定向到。当然也可以在 Controller 中直接指定，无需在此配置类中声明。

```java
/**
 * 相当于 SpringMVC 的配置
 * <p>
 * 我们有多种方法来配置DispatcherServlet，与之类似，启用Spring MVC组件的方法也不只一种。
 * 从前，Spring是使用XML进行配置的，可以使用<mvc:annotation-driven>启用注解驱动的Spring MVC。
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /* 视图解析器不需要了，直接在 application 配置文件中配置即可 */

    /**
     * 配置视图控制器
     *
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // /login 是跳转到 spring security 提供的登录页面，而不是自己的（若不写成 redirect 则无法访问到，虽然其他的请求都可以拦截到登录页面，但是这个不行！必须写 redirect）
        registry.addViewController("/").setViewName("redirect:/login");
    }

}
```





## 安全配置 🔥

### WebSecurityConfig

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    /**
     * 配置用户信息服务（这里就是查询的用户信息，可自定义其他非内存方法）
     * Spring Security会使用它来获取用户信息。暂时使用InMemoryUserDetailsManager实现类，并在其中分别创建了zhangsan、lisi两个用户，并设置密码和权限。
     *
     * @return
     */
    @Bean
    public UserDetailsService userDetailsService() {
        // 这里的用户名密码可以理解为数据库或其他地方存储的
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(User.withUsername("zhangsan").password("123").authorities("p1").build());
        manager.createUser(User.withUsername("lisi").password("456").authorities("p2").build());
        return manager;
    }

    /**
     * 密码加密方式（此处使用不加密的）
     *
     * @return
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Spring Security 会根据此配置来决定密码是否编码
        return NoOpPasswordEncoder.getInstance();
    }


    /**
     * 拦截机制
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            // ant 风格的路径
            .antMatchers("/r/r1").hasAuthority("p1")
            .antMatchers("/r/r2").hasAuthority("p2")
            .antMatchers("/r/**").authenticated()// url匹配/r/**的资源，经过认证后才能访问
            .anyRequest().permitAll()// 其他url完全开放
            .and()
            // 支持form表单认证，认证成功后转向/login-success（此处controller必须使用post请求）
            .formLogin().successForwardUrl("/login-success");
    }

}
```

不再需要 Spring Security 初始化配置，以上配置已经可以使用了



## 认证、会话、授权

同 Spring Security





## 测试资源

```java
@RestController
@RequestMapping
public class LoginController {


    /**
     * 登录成功后重定向的url
     *
     * @return
     */
    @PostMapping(value = "/login-success", produces = {"text/plain;charset=utf-8"})
    public String loginSuccess() {
        return "登录成功 login-success";
    }


    /**
     * 访问资源r1
     *
     * @param session
     * @return
     */
    @GetMapping(value = "/r/r1", produces = "text/plain;charset=utf-8")
    public String accessR1(HttpSession session) {
        return "访问资源r1";
    }

    /**
     * 访问资源r2
     *
     * @param session
     * @return
     */
    @GetMapping(value = "/r/r2", produces = "text/plain;charset=utf-8")
    public String accessR2(HttpSession session) {
        return "访问资源r2";
    }
}
```

若是没有权限的用户访问，则返回 403（无权限，拒绝访问）