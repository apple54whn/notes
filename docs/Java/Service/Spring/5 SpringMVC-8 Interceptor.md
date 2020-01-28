# Interceptor

## 简介

- 拦截器类似于Servlet 开发中的过滤器Filter，用于对处理器进行预处理和后处理。AOP思想的具体应用
- 区别：
    - 过滤器是 servlet 规范中的一部分，任何 java web 工程都可以使用。 
    - 拦截器是 SpringMVC 框架自己的，只有使用了 SpringMVC 框架的工程才能用。 
    - 过滤器在 url-pattern 中配置了`/*`之后，可以对所有要访问的资源拦截。 
    - **拦截器**它是**只会拦截访问的控制器方法**，如果访问的是 jsp,html,css,image 或者 js 是不会进行拦截的

## 使用

- **实现HandlerInterceptor接口，并重写三个默认方法**

    ```java
    public class HandlerInterceptor1 implements HandlerInterceptor {
        // Controller执行前调用此方法
        // 返回true表示放行，返回false不放行
        // 这里可以加入登录校验、权限拦截等
        @Override
        public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
            System.out.println("HandlerInterceptor1....preHandle");
            return true;
        }
    
        // controller执行后但未返回视图前调用此方法，且只有所有preHandle返回true时调用
        // 这里可在返回用户前对模型数据进行加工处理，比如这里加入公用信息以便页面显示
        @Override
        public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3) throws Exception {
            System.out.println("HandlerInterceptor1....postHandle");
        }
    
        // controller执行后且视图返回后调用此方法，且只有preHandle返回true才调用
        // 这里可得到执行controller时的异常信息
        // 这里可记录操作日志
        @Override
        public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3) throws Exception {
            System.out.println("HandlerInterceptor1....afterCompletion");
        }
    }
    ```

* **拦截器配置**

    ```xml
    //spring-config.xml
    <!-- 配置拦截器 -->
    <mvc:interceptors>
        <mvc:interceptor>
            <!-- /user/* 请求进入拦截器 -->
            <mvc:mapping path="/user/*" />
            <!-- 配置具体的拦截器 -->
            <bean class="cn.itcast.ssm.interceptor.HandlerInterceptor1" />
        </mvc:interceptor>
        <mvc:interceptor>
            <!-- 所有的请求都进入拦截器 -->
            <mvc:mapping path="/**" />
            <!-- 配置具体的拦截器 -->
            <bean class="cn.itcast.ssm.interceptor.HandlerInterceptor2" /> <!--ref也可以，但必须有@Component注解 -->
        </mvc:interceptor>
    </mvc:interceptors>
    
    //需要释放静态资源
    ```

    

## 总结

- preHandle按拦截器定义顺序调用，**返回false时后续拦截器将不调用**
- postHandler按拦截器定义逆序调用，且只有**所有preHandle返回true时调用**
- afterCompletion按拦截器定义逆序调用，且**只有preHandle返回true才调用**，与上一条不同



## 应用

* 有一个登录页面，需要写一个Controller访问登录页面

* 登录页面有一提交表单的动作。需要在Controller中处理

    * 判断用户名密码是否正确（在控制台打印）
    * 如果正确,向session中写入用户信息（写入用户名username）
    * 跳转到商品列表

* 拦截器

    * 拦截用户请求，判断用户是否登录（登录请求不能拦截）
    * 如果用户已经登录。放行
    * 如果用户未登录，跳转到登录页面。

    ```java
    public class LoginInterceptor implements HandlerInterceptor{ 
    	@Override  
        Public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception { 
            //如果是登录页面则放行   
            if(request.getRequestURI().indexOf("login.action")>=0)
                return true;   
            HttpSession session = request.getSession(); 
      
            //如果用户已登录也放行   
            if(session.getAttribute("user")!=null)
                return true;   
            
            //用户没有登录挑战到登录页面   
            request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);   
            return false;  
        } 
    } 
    ```





