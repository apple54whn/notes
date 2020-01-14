# 5 SpringMVC

## 三层架构及MVC模型

三层架构

* 表现层（web）：接收客户端请求，向客户端响应结果。包括控制层(接收请求)、展示层(展示结果)，采用MVC模型 
* 业务逻辑层（service）：处理具体的业务逻辑，包括事务
* 持久层（dao）：数据持久化，即和数据库交互，对数据库表进行增删改查 

MVC模型（Model View Controller），即模型视图控制器，每个部分各司其职。 

* Model：数据模型，JavaBean的类，用来进行数据封装
* View：指jsp或者html。作用一般就是展示数据的。通常视图是依据模型数据创建的
* Controller：是应用程序中处理用户交互的部分，作用一般就是处理程序逻辑的，整个流程的控制器。可以数据校验等



## SpringMVC 概述

### 概述

* 是一种基于**Java**实现的MVC设计模型的**请求驱动**类型的**轻量级WEB框架**。 
* Spring MVC属于SpringFrameWork的后续产品，已经**融合在Spring Web Flow**里面。Spring 框架提供 了构建 Web 应用程序的全功能 MVC 模块。 
* 使用 Spring **可插入的 MVC 架构**，从而在使用Spring进行WEB开发时，可以选择使用Spring的 SpringMVC框架或集成其他MVC开发框架，如Struts1(现在一般不用)，Struts2等。 

SpringMVC 和 Struts2 的优劣分析

* 共同点：  
    * 它们都是表现层框架，都是基于 MVC 模型编写的。  
    * 它们的底层都离不开原始 ServletAPI。  
    * 它们处理请求的机制都是一个核心控制器。 
* 区别：
    * Spring MVC 的入口是 Servlet, 而 Struts2 是 Filter 
    * Spring MVC 是基于方法设计的，而 Struts2 是基于类，Struts2 每次执行都会创建一个动作类，比Spring MVC会稍慢
    * Spring MVC 使用更加简洁,同时还支持 JSR303, 处理 ajax 的请求更方便 
    * Struts2 的 OGNL 表达式使页面的开发效率相比 Spring MVC 更高些，但执行效率并没有比 JSTL 提 升，尤其是 struts2 的表单标签，远没有 html 执行效率高



### 执行过程分析

>   Java配置也类似

1. 当启动Tomcat服务器的时候，因为配置了`load-on-startup`标签，所以会创建`DispatcherServlet`对象， 并分局初始化参数加载`spring-config.xml`配置文件或`SpringConfiguration`配置类 
2. 由于开启了注解扫描，那么`HelloController`对象就会被创建
3. 从index.jsp发送请求，请求会先到达`DispatcherServlet`前端控制器，根据配置`@RequestMapping`注解找到执行的方法
4. 根据执行方法的返回值，再根据配置的视图解析器，去指定的目录下查找指定名称的JSP文件 
5. Tomcat服务器渲染页面，做出响应 



### 组件分析

在 SpringMVC 的各个组件中，**处理器映射器**、**处理器适配器**、**视图解析器**称为 SpringMVC 的三大组件。 我们只需要编写处理具体业务的**控制器**以及**视图**。

* **DispatcherServlet**

    前端控制器：用户请求到达前端控制器，它就相当于 mvc 模式中的 c，dispatcherServlet 是整个流程控制的中心，由 它调用其它组件处理用户的请求，dispatcherServlet 的存在降低了组件之间的耦合性

* **HandlerMapping**

    处理器映射器：HandlerMapping 负责根据用户请求找到 Handler 即处理器，SpringMVC 提供了不同的映射器实现不同的 映射方式，例如：配置文件方式，实现接口方式，注解方式等。 

* **Handler**

    它就是我们开发中要编写的具体业务控制器。由 DispatcherServlet 把用户请求转发到 Handler。由 Handler 对具体的用户请求进行处理。

* **HandlAdapter**

    通过 HandlerAdapter 对处理器进行执行，这是**适配器模式**的应用，通过扩展适配器可以对更多类型的处理器进行执行

* **View Resolver**

    View Resolver 负责将处理结果生成 View 视图，View Resolver 首先根据逻辑视图名解析成物理视图名 即具体的页面地址，再生成 View 视图对象，最后对 View 进行渲染将处理结果通过页面展示给用户

* **View**

    SpringMVC 框架提供了很多的 View 视图类型的支持，包括：jstlView、freemarkerView、pdfView 等。最常用的视图就是jsp，一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面



## `@*Controller`

### `@Controller`

不多解释了吧



### `@RestController`

是`@Controller`和`@ResponseBody`的组合



## `@*Mapping`

### `@requestMapping`

作用：用于**建立请求 URL** 和**处理请求方法**之间的对应**关系**

```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface RequestMapping {
    String name() default "";

    @AliasFor("path")
    String[] value() default {};
    @AliasFor("value")
    String[] path() default {};

    RequestMethod[] method() default {};
    String[] params() default {};
    String[] headers() default {};
    String[] consumes() default {};
    String[] produces() default {};
}
```

出现位置： 

* **类**上：请求URL的**第一级访问目录**，模块化管理。此处不写的话，就相当于应用的根目录。写的话需要以`/`开头，如`/user`

* **方法**上：请求 URL 的**第二级访问目录**。 如`/add`。但是RESTful风格的可以使用`@***Mapping`替代

    当使用分级配置时，前端页面的请求路径中，要么写绝对路径即带`/`和项目名，要么写**相对路径不带`/`**（表示相对应用的根目录），否则404

属性：

* **`value`**：用于指定**请求的 URL**。它和 **path** 属性的作用是一样的。**大小写敏感**
* **`method`**：用于指定**请求的方式**，值为`RequestMethod`枚举类
* `params`：用于指定限制请求参数的条件。它支持简单的表达式。要求请求参数的key和value必须和配置的一模一样。如：
    * `params = {"accountName"}`，表示请求参数必须有 accountName 
    * `params = {"moeny!100"}`，表示请求参数中 money 不能是 100
* `headers`：用于限定发送的请求中必须包含某请求头



### `@GetMapping`

用在方法上，替代方法的`@RequestMapping`

### `@PostMapping`

用在方法上，替代方法的`@RequestMapping`

### `@PutMapping`

用在方法上，替代方法的`@RequestMapping`

### `DeleteMapping`

用在方法上，替代方法的`@RequestMapping`

### `@PatchMapping`

用在方法上，替代方法的`@RequestMapping`





## 请求参数的绑定—表单绑定

1. 表单提交的数据都是k=v格式的 `username=haha&password=123`，**key就是表单中`name`的值**
2. SpringMVC 的参数绑定过程是把**表单提交的请求参数**，作为控制器中**方法的参数**进行绑定的 

### 基本数据类型和字符串类型

当**请求的参数名称**和**处理器形参名称**一致时（**区分大小写**）会将请求参数与形参进行绑定

注意：参数类型**推荐**使用**包装数据类型**，因为基础数据类型不可为null；布尔类型的参数，请求的参数值为true或false，1或0

```java
@RequestMapping("/edit")
public String queryItemById(Integer id) {
    System.out.println(id);
    return "success";
}
```



### POJO 类型及它的关联对象

要求表单中**参数名称**和 POJO 类的**属性名称**保持一致。并且控制器方法的**参数类型是 POJO 类型**

```java
public class Account implements Serializable { 
    private Integer id;  
    private String name;  
    private Float money;  
    private Address address;  
    //getters and setters 
} 
```

```java
public class Address implements Serializable {    
    private String provinceName;  
    private String cityName;  
    //getters and setters 
}
```

```html
<form action="account/saveAccount" method="post"> 
    账户名称：<input type="text" name="name" ><br/> 
    账户金额：<input type="text" name="money" ><br/>  
    账户省份：<input type="text" name="address.provinceName" ><br/>  
    账户城市：<input type="text" name="address.cityName" ><br/>  
    <input type="submit" value=" 保存 "> 
</form>
```

```java
@RequestMapping("/saveAccount") 
public String saveAccount(Account account) {  
    System.out.println("保存了账户。。。。"+account);  
    return "success"; 
}
```



### POJO 类中包含集合类型参数

第一种：（如下面代码）

* 要求集合类型的请求参数必须在 **POJO** 中。在表单中**请求参数名称**要和 POJO 中集合**属性名称相同**。
* **给 List 集合中的元素赋值，使用下标**。 
* **给 Map 集合中的元素赋值，使用键值对**。 

第二种

* 接收的请求参数是 json 格式数据。需要借助一个注解实现。 

```java
public class User implements Serializable {    
    private String username;  
    private String password;  
    private Integer age;  
    private List<Account> accountList;  
    private Map<String,Account> accountMap;    
    //getters and setters
}
```

```html
<form action="account/updateAccount" method="post">
    用户名称：<input type="text" name="username"><br/>
    用户密码：<input type="password" name="password"><br/>
    用户年龄：<input type="text" name="age"><br/>
    账户 1 名称：<input type="text" name="accountList[0].name"><br/>
    账户 1 金额：<input type="text" name="accountList[0].money"><br/>
    账户 2 名称：<input type="text" name="accountList[1].name"><br/>
    账户 2 金额：<input type="text" name="accountList[1].money"><br/>
    账户 3 名称：<input type="text" name="accountMap['one'].name"><br/>
    账户 3 金额：<input type="text" name="accountMap['one'].money"><br/>
    账户 4 名称：<input type="text" name="accountMap['two'].name"><br/>
    账户 4 金额：<input type="text" name="accountMap['two'].money"><br/>
    <input type="submit" value=" 保存 ">
</form>
```

```java
@RequestMapping("/updateAccount") 
public String updateAccount(User user) {  
    System.out.println("更新了账户。。。。"+user);  
    return "success"; 
}
```





## 请求参数的绑定—常用注解

### `@RequestParam`

作用：把请求中指定名称的参数给控制器中的形参赋值。 但是还不如参数名称一致好使。可以用于**分页Map中默认值设置**

属性：

* `value`或`name`：请求参数中的名称。若参数名称(name)和形参一致，可以不用指定value或name
* `required`：请求参数中是否必须提供此参数。默认值：true。表示必须提供，如果不提供将报错
* `defaultValue`：请求参数默认值

```html
<a href="springmvc/useRequestParam?name=test">requestParam 注解</a> 
```

```java
@RequestMapping("/useRequestParam") 
public String test( 
    @RequestParam("name")String username, 
    @RequestParam(value="age",required=false,defaultValue="88")Integer age){
    
   	System.out.println(username+","+age);  
    return "success"; 
}
```



### `@PathVariable`

作用：用于**绑定 url 中的占位符**。例如：请求 url 中 `/delete/{id}`，这个`{id}`就是 url 占位符。  url 支持占位符是 spring3.0 之后加入的。是 springmvc 支持 RESTful 风格 URL 的一个重要标志。 

属性：  

- `value`或`name`：用于指定 url 中占位符名称。若占位符名称和形参一致，可以不用指定value。
- `required`：是否必须提供占位符。 

```html
<a href="springmvc/usePathVariable/100">pathVariable 注解</a> 
```

```java
@RequestMapping("/usePathVariable/{sid}") 
public String usePathVariable(@PathVariable("sid") Integer sid){  
    System.out.println(sid);  
    return "success"; 
}
```



### `@RequestBody`

作用：用于**获取请求体**内容。直接使用得到是`key=value&key=value`结构的数据。**get 请求方式不适用**。常用于**Json数据封装**

属性：`required`是否必须有请求体，默认为true。当取值为true时，get请求方式会报错；若为false，get请求得到是null

```html
<form action="springmvc/useRequestBody" method="post">
    用户名称：<input type="text" name="username" ><br/>  
    用户密码：<input type="password" name="password" ><br/>  
    用户年龄：<input type="text" name="age" ><br/> 
 <input type="submit" value=" 保存 "> </form>
```

```java
@RequestMapping("/useRequestBody") 
public String useRequestBody(@RequestBody(required=false) String body){  
    System.out.println(body);  
    return "success"; 
}
```





## 请求参数的绑定—`Servlet API` 及`Model`等

### Servlet 原生 API

**控制器**(处理器)**形参**中添加如下类型的参数，处理适配器会默认识别并进行赋值

- `HttpServletRequest`：通过request对象获取请求信息
- `HttpServletResponse`：通过response处理响应信息
- `HttpSession`：通过session对象得到session中存放的对象



### 默认支持的参数类型—`ModelAndView`等

- `Model`/`ModelMap`

    - 除了`ModelAndView`以外，还可以使用`Model`(接口)来**向页面传递数据**，在参数里**直接声明Model即可**

        使用Model可以不使用ModelAndView对象，Model对象可以向页面传递数据，View对象可以使用String返回值替代。==**其本质都是使用Request域对象传递数据**==

        ```java
        model.addAttribute("item", item);
        return "itemEdit";
        ```

    - `ModelMap`是`Model`接口的实现类，也可以通过`ModelMap`向页面传递数据。效果一样，同上代码



## 请求参数的绑定—其他注解

### `@DateTimeFormat`

直接在JavaBean**属性**上添加注释即可（在get或set方法上添加，命名规范的话字段上添加也行。由于一般自动生成，所以都行）

```java
@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
private Date creationTime;
```









## 请求参数的绑定—自定义类型转换器

除了类型转换器，SpringMVC还提供了**注解`@DateTimeFormate`来转换日期格式**。查看5常用注解这一章。

SpringMVC还可以实现一些**数据类型自动转换**。内置转换器全都在`org.springframework.core.convert.support`包下。如String转Integer等等

如遇**特殊类型转换**要求，比如日期数据有很多种格式，SpringMVC没办法把带`-`字符串转换成日期类型，需要我们自己编写**自定义类型转换器**。步骤如下：

1. 定义一个类，**实现 Spring提供的 `Converter` 接口**，该接口有两个泛型。

    ```java
    //Converter<S, T>：  S:source,需要转换的源的类型；T:target,需要转换的目标类型
    @Componet
    public class StringToDateConverter implements Converter<String, Date> {
        @Override
        public Date convert(String source) {
            DateFormat format = null;
            try {
                if (StringUtils.isEmpty(source)) {
                    throw new NullPointerException("请输入要转换的日期");
                }
                format = new SimpleDateFormat("yyyy-MM-dd");
                Date date = format.parse(source);
                return date;
            } catch (Exception e) {
                throw new RuntimeException("输入日期有误");
            }
        }
    }
    ```

2. 在 spring配置文件中**配置类型转换器**。JavaConfig暂时不会怎么配置

    spring 配置类型转换器的机制是，将自定义的转换器注册到类型转换服务中去。 

    ```xml
    <!-- 配置类型转换器工厂 --> 
    <bean id="converterService"   class="org.springframework.context.support.ConversionServiceFactoryBean"> 
    <!--FormattingConversionServiceFactoryBean可以让SpringMVC支持和@DateTimeFormat等Spring内部自定义的转换器，建议-->
     <!-- 给工厂注入一个新的类型转换器 -->      
        <property name="converters"> 
          <array> 
           <!-- 配置自定义类型转换器 -->       
              <ref bean="stringToDateConverter"/>
          </array>      
        </property> 
    </bean>
    <!-- 配置spring开启注解mvc的支持，替代处理器映射器和处理器适配器配置，并配置类型转换器 -->
    <mvc:annotation-driven conversion-service="conversionService" />
    ```





## 响应数据、结果视图

### 返回String

* **逻辑视图名**

    Controller中方法返回字符串可以**指定逻辑视图名**，通过**视图解析器解析为物理视图地址**。 

    > 如：`return "success"; `指定逻辑视图名，经过视图解析器解析为 jsp 物理路径如`/WEB-INF/pages/success.jsp` 

* `forward:`**转发**

    `return "forward:pages/success.jsp"; `则路径必须写成实际视图 url，不能写逻辑视图

* `redirect:`**重定向**

    `return "redirect:testReturnModelAndView"; `路径可以不添加项目名称，会自动添加

    需要注意的是，如果是重定向到 jsp 页面，则 jsp 页面不 能写在 WEB-INF 目录中，否则无法找到



### void 配合Ajax

- 在Controller方法形参上可以绑定原生ServletAPI，使用request或response**指定响应结果**。常与`@ResponseBody`一起使用

    ```java
    //使用request请求转发页面
    request.getRequestDispatcher("页面路径").forward(request, response);
    //通过response页面重定向
    response.sendRedirect("url")
    //通过response指定响应结果，例如响应json数据如下
    response.setCharacterEncoding("utf-8"); 
    response.setContentType("application/json;charset=utf-8"); 
    response.getWriter().write("{\"abc\":123}");
    ```



### ModelAndView 等

* ModelAndView 是 SpringMVC 为我们提供的一个对象，该对象也可以用作控制器方法的返回值。 该对象中有两个方法： 

    ```java
    @RequestMapping("/testReturnModelAndView") 
    public ModelAndView testReturnModelAndView() {  
        ModelAndView mv = new ModelAndView();  
        mv.addObject("username", "张三");  //存储的request域中
        mv.setViewName("success"); 
        return mv; 
    }
    ```



### `@ResponseBody`

用于将 Controller 的方法返回的对象，通过 `HttpMessageConverter` 接口转换为指定格式的数据如：`json`,`xml` 等，通过 Response 响应给客户端。如果需要SpringMVC支持JSON，必须加入JSON的处理**jar包**：如Jackson，SpringBoot默认配置。

```java
@RequestMapping("/testJson")  
@ResponseBody
public Address testJson(@RequestBody Address address) {        
    System.out.println(address);        
    address.setAddressName("上海");        
    return address;    
}
```

```javascript
 $(function(){        
     // 绑定点击事件        
     $("#btn").click(function(){            
         $.ajax({                
             url:"user/testJson",  
             type:"post", 
             contentType:"application/json;charset=UTF-8",
             data:'{"addressName":"哈哈","addressNum":100}',
             success:function(data){                    
                 alert(data);                    
                 alert(data.addressName);                
             }
             dataType:"json",                                           
         });        
     });    
 }); 
```





## RESTful

- RESTful是一个资源定位及资源操作的风格。使用POST、DELETE、PUT、GET，使用不同方法对资源进行操作，分别对应  添加、 删除、修改、查询

- 需求：RESTful方式实现商品信息查询，返回json数据

    - **从URL上获取参数**：根据id查询商品，使用RESTful风格开发的接口地址是：http://127.0.0.1/item/1

        - 注解**`@RequestMapping("item/{id}")`**声明请求的URL，`{xxx}`为占位符，请求的URL是“`item /1`”

        - 使用**`@PathVariable() Integer id`**获取URL上的数据

            ```java
            @RequestMapping("item/{id}")
            public @ResponseBody Item queryItemById(@PathVariable Integer id) {
                Item item = this.itemService.queryItemById(id);
                return item;
            }
            ```

            - 如果`@RequestMapping`中表示为"`item/{id}`"，id和形参名称一致，`@PathVariable`不用指定名称。如果不一致，例如"`item/{ItemId}`"则需要指定名称`@PathVariable("itemId")`

        - **注意**：

            - @PathVariable是获取url上数据的。@RequestParam获取请求参数的（包括post表单提交）
            - 如果加上@ResponseBody注解，就不会走视图解析器，不会返回页面，返回如json数据。如果不加，就走视图解析器，返回页面

* 注意：
    * 表单只支持GET、POST请求，若要发送其他请求，表单本身设置为POST请求，并需要input中属性`name="_method" value="PUT"`，Ajax中查看HTML章节
    * 后端中需要配置过滤器`org.springframework.web.filter.HiddenHttpMethodFilter`
    * 但是 Ajax 支持其他类型的请求



## 不常用注解

### `@RequestHeader`

一般不怎么用

* 作用：用于获取请求消息头。 
* 属性：`value`提供消息头名称。`required`是否必须有此消息头 



### `@CookieValue`

一般不怎么用

* 作用：用于把指定 cookie 名称的值传入控制器方法参数。 
* 属性：`value`指定 cookie 的名称。`required`是否必须有此 cookie



### `@SessionAttribute`

* 作用：用于多次执行控制器方法间的参数共享。 

* 属性：

    * `value`：用于指定存入的属性名称  
    * `type`：用于指定存入的数据类型。 

    ```java
    @Controller("sessionAttributeController") 
    @RequestMapping("/springmvc") 
    @SessionAttributes(value= {"username","password","age"},types= {String.class,Integer.class})//存入到session域 
    public class SessionAttributeController { 
        @RequestMapping("/testPut")    
        public String testPut(Model model){           
            model.addAttribute("username", "泰斯特");           
            model.addAttribute("password","123456");           
            model.addAttribute("age", 31);   
            //跳转之前将数据保存到 username、password 和 age 中，因为注解@SessionAttribute 中有这几个参数 
            return "success"; 
        }
        
        @RequestMapping("/testGet")       
        public String testGet(ModelMap model){           
            System.out.println(model.get("username")+";"+model.get("password")+";"+model.get("age"));           
            return "success";       
        } 
        
        @RequestMapping("/testClean")        
        public String complete(SessionStatus sessionStatus){         
            sessionStatus.setComplete();            
            return "success";        
        }
    }
    ```



### `@ModelAttribute`

该注解是 SpringMVC4.3 版本以后新加入的。它可以用于修饰方法和参数。 

- 出现在**方法上**，表示当前方法会在**控制器的方法执行之前先执行**。它可以修饰没有返回值和有具体返回值的方法
- 出现在**参数上**，获取**指定的数据给参数赋值**

* 属性：`value`用于获取数据的 key。key 可以是 **POJO** 的属性名称，也可以是 **map** 结构的 key。 

* 应用场景：当表单提交数据不是完整的实体类数据时，保证**没有提交数据的字段**使用**数据库对象原来的数据**。

    我们在编辑一个用户时，用户有一个创建信息字段，该字段的值是不允许被修改的。在提交表单数据是肯定没有此字段的内容，一旦更新会把该字段内容置为 null，此时就可以使用此注解解决问题。但是这种问题有其他办法解决。

* 基于POJO 属性的基本使用

    ```html
    <a href="springmvc/testModelAttribute?username=test">测试 modelattribute</a> 
    ```

    ```java
    @ModelAttribute  
    public void showModel(User user) {   
        System.out.println("执行了 showModel 方法"+user.getUsername());  
    } 
    @RequestMapping("/testModelAttribute") 
    public String testModelAttribute(User user) {   
        System.out.println("执行了控制器的方法"+user.getUsername());   
        return "success";  
    }
    //执行了 showModel 方法
    //执行了控制器的方法
    ```

* 基于 Map 的应用场景示例 1：ModelAttribute 修饰方法带返回值 

    ```html
    <!--需求：  修改用户信息，要求用户的密码不能修改 -->
    <form action="springmvc/updateUser" method="post"> 
        用户名称：<input type="text" name="username" ><br/>  
        用户年龄：<input type="text" name="age" ><br/>  
        <input type="submit" value=" 保存 "> 
    </form> 
    ```

    ```java
    // 模拟修改用户方法 
    @RequestMapping("/updateUser") 
    public String testModelAttribute(User user) {  
        System.out.println("控制器中处理请求的方法：修改用户："+user);  
        return "success"; 
    }
    @ModelAttribute public User showModel(String username) {  
        //模拟去数据库查询  
        User abc = findUserByName(username); 
        System.out.println("执行了 showModel 方法"+abc);  
        return abc; 
    } 
    // 模拟去数据库查询 
    private User findUserByName(String username) {  
        User user = new User();  
        user.setUsername(username);
        user.setAge(19);  
        user.setPassword("123456");  
        return user; 
    }
    //输出会给未提交的age字段赋值19，其他的使用提交的数据
    ```

* 基于 Map 的应用场景示例 2：ModelAttribute 修饰方法不带返回值 

    ```java
    @RequestMapping("/updateUser") 
    public String testModelAttribute(@ModelAttribute("abc")User user) {  
        System.out.println("控制器中处理请求的方法：修改用户："+user);  
        return "success"; 
    }
    @ModelAttribute 
    public void showModel(String username,Map<String,User> map) { 
     	//模拟去数据库查询  
        User user = findUserByName(username); 
        System.out.println("执行了 showModel 方法"+user);  
        map.put("abc",user); 
    } 
    // 模拟去数据库查询 
    private User findUserByName(String username) {  
        User user = new User();  
        user.setUsername(username);
        user.setAge(19);  
        user.setPassword("123456");  
        return user; 
    }
    //输出会给未提交的age字段赋值19，其他的使用提交的数据
    ```



## 处理 Multipart 数据

pom.xml中添加依赖

```xml
<dependency>            
    <groupId>commons-fileupload</groupId>            
    <artifactId>commons-fileupload</artifactId>            
    <version>1.3.1</version>        
</dependency>        
<dependency>            
    <groupId>commons-io</groupId>            
    <artifactId>commons-io</artifactId>            
    <version>2.4</version>        
</dependency
```

### 文件上传的回顾 

* **form表单的`enctype`取值必须是`multipart/form-data`**(默认值是`application/x-www-form-urlencoded`)。`enctype`代表表单请求正文的类型
* `method` 属性取值必须是 `Post`
* 提供一个**文件选择域**`<input type="file" />  `

```html
<form action="user/fileupload" method="post" enctype="multipart/form-data">       
    选择文件：<input type="file" name="upload"/><br/>        
    <input type="submit" value="上传文件"/>    
</form>
```

```java
@RequestMapping(value="/fileupload")    
public String fileupload(HttpServletRequest request) throws Exception {        
    // 先获取到要上传的文件目录        
    String path = request.getSession().getServletContext().getRealPath("/uploads");        
    // 创建File对象，一会向该路径下上传文件        
    File file = new File(path);        
    // 判断路径是否存在，如果不存在，创建该路径        
    if(!file.exists()) {            
        file.mkdirs();        
    }        
    // 创建磁盘文件项工厂        
    DiskFileItemFactory factory = new DiskFileItemFactory();        
    ServletFileUpload fileUpload = new ServletFileUpload(factory);        
    // 解析request对象        
    List<FileItem> list = fileUpload.parseRequest(request);        
    // 遍历        
    for (FileItem fileItem : list) {            
        // 判断文件项是普通字段，还是上传的文件            
        if(fileItem.isFormField()) {                            

        }else {                
            // 上传文件项
            // 获取到上传文件的名称                
            String filename = fileItem.getName();               
            // 上传文件                
            fileItem.write(new File(file, filename));                
            // 删除临时文件                
            fileItem.delete();            
        }        
    }                
    return "success";    
}
```





### SpringMVC传统方式的文件上传

传统方式的文件上传，指的是我们**上传的文件和访问的应用存在于同一台服务器上**。 并且上传完成之后，浏览器可能跳转。 

```java
@RequestMapping(value="/fileupload2")    
public String fileupload2(HttpServletRequest request,MultipartFile upload) throws Exception {        
    System.out.println("SpringMVC方式的文件上传...");        
    // 先获取到要上传的文件目录        
    String path = request.getSession().getServletContext().getRealPath("/uploads");        
    // 创建File对象，一会向该路径下上传文件        
    File file = new File(path);        
    // 判断路径是否存在，如果不存在，创建该路径        
    if(!file.exists()) {            
        file.mkdirs();        
    }        
    // 获取到上传文件的名称        
    String filename = upload.getOriginalFilename();        
    String uuid = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();        
    // 把文件的名称唯一化        
    filename = uuid+"_"+filename;        
    // 上传文件        
    upload.transferTo(new File(file,filename));        
    return "success";    
}
```

* SpringBoot配置

    

* JavaConfig配置**MultipartResolver**接口的实现类

    - `CommonsMultipartResolver`：使用Jakarta Commons FileUpload解析multipart请求

    - **`StandardServletMultipartResolver`**：依赖于**Servlet3.0**对multipart请求支持（**始于Spring3.1**）

        选择这个，它使用Servlet所提供的功能支持，不依赖其他项目。它**没有构造器参数和属性**

        ```java
        @Bean
        public MultipartResolver multipartResolver() throws IOException {
            return new StandardServletMultipartResolver();
        }
        ```

        如果配置DispatcherServlet的Servlet初始化类继承了**AbstractAnnotationConfigDispatcherServletInitializer**或AbstractDispatcherServletInitializer的话，通过**重载customize Registration()方法**（它会得到Dynamic参数）来配置multipart的具体细节

        ```java
        //class Config extends AbstractAnnotationConfigDispatcherServletInitializer
        @Override
        protected void customizeRegistration(Dynamic registration) {
            registration.setMultipartConfig(new MultipartConfigElement("/tmp/file/uploads",2097152,4194304,0));
            //location,maxFileSize,maxRequestSize,fileSizeThreshold(为0则上传文件写到磁盘)
        }
        ```

* 在`spring-config.xml`配置文件解析器

    ```xml
    <!-- 配置文件上传解析器，id是固定的！！！--> 
    <bean id="multipartResolver"  class="org.springframework.web.multipart.commons.CommonsMultipartResolver"> 
     <!-- 设置上传文件的最大尺寸为 5MB -->  
        <property name="maxUploadSize">   
            <value>5242880</value>  
        </property> 
    </bean>
    ```

    



### SpringMVC跨服务器方式的文件上传

在实际开发中，我们会有很多处理不同功能的服务器（不是服务器集群），目的是让服务器各司其职，从而提高我们项目的运行效率。例如： 

* 应用服务器：负责部署我们的应用 
* 文件服务器：负责存储用户上传文件的服务器
* 数据库服务器：运行我们的数据库 
* ……

步骤：

1. **搭建图片服务器** 

    1. 根据文档配置tomcat9的服务器，现在是2个服务器 
    2. 导入资料中day02_springmvc5_02image项目，作为图片服务器使用 

2. 实现SpringMVC跨服务器方式文件上传

    1. 导入依赖的jar包的坐标（sun公司提供的，下面导包时注意）

        ```xml
        <dependency>            
            <groupId>com.sun.jersey</groupId>            
            <artifactId>jersey-core</artifactId>            
            <version>1.18.1</version>        
        </dependency>        
        <dependency>            
            <groupId>com.sun.jersey</groupId>            
            <artifactId>jersey-client</artifactId>            
            <version>1.18.1</version>        
        </dependency>
        ```

    2. 控制器

        ```java
        @RequestMapping(value="/fileupload3")
        public String fileupload3(MultipartFile upload) throws Exception {        
            System.out.println("SpringMVC跨服务器方式的文件上传...");                
            // 定义图片服务器的请求路径        
            String path = "http://localhost:9090/day02_springmvc5_02image/uploads/";//创建好该文件夹              
            // 获取到上传文件的名称        
            String filename = upload.getOriginalFilename();        
            String uuid = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();        
            // 把文件的名称唯一化        
            filename = uuid+"_"+filename;        
            // 向图片服务器上传文件                
            // 创建客户端对象        
            Client client = Client.create();        
            // 连接图片服务器        
            WebResource webResource = client.resource(path+filename);        
            // 上传文件        
            webResource.put(upload.getBytes());        
            return "success";    
        }
        ```

    3. **配置文件解析器**，同上





## 异常处理器

### SpringBoot版





### SpringMVC版

- SpringMVC在处理请求过程中出现异常信息交由异常处理器进行处理，自定义异常处理器可以实现一个系统的异常处理逻辑

- 思路：

    - 系统中异常包括两类：**预期异常**和运行时异常**RuntimeException**，前者通过捕获异常从而获取异常信息，后者主要通过规范代码开发、测试通过手段减少运行时异常的发生
    - 系统的dao、service、controller出现都通过throws Exception向上抛出，最后由SpringMVC**前端控制器交由异常处理器**进行异常处理

- **自定义异常类(继承Exception或RuntimeException)**：为了区别不同的异常,通常根据异常类型进行区分

    ```java
    public class MyException{
        public MyException(){};
        public MyException(String msg){
            super(msg);
        };
    }
    ```

- **自定义异常处理器(实现HandlerExceptionResolver)**，并**在`spring-config.xml`中配置或使用`@Component`**

    ```java
    @Component
    public class CustomExceptionResolver implements HandlerExceptionResolver {
       	//handler:异常处理器对象。发生异常的地方，包名+类名+方法名(形参)的字符串，用于日志
        @Override
        public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,Exception exception) {
            
            ModelAndView modelAndView = new ModelAndView();
            // 定义异常信息
            String msg = "";
    
            // 判断异常类型
            if (exception instanceof MyException) {
                // 如果是自定义异常，读取异常信息
                msg = exception.getMessage();
            } else {
                //简写
                msg = "服务器访问量过大，请您稍后..."
                //或 如果是运行时异常，则取错误堆栈，从堆栈中获取异常信息
                //Writer out = new StringWriter();
                //PrintWriter s = new PrintWriter(out);
                //exception.printStackTrace(s);
                //msg = out.toString();
    
            }
            // 把错误信息发给相关人员,邮件,短信等方式
            // 返回错误页面，给用户友好页面显示错误信息
           
            modelAndView.addObject("msg", msg);
            modelAndView.setViewName("error");
    
            return modelAndView;
        }
    }
    ```





## 拦截器

- 类似于Servlet 开发中的过滤器Filter，用于对处理器进行预处理和后处理。AOP思想的具体应用
- 区别：
    - 过滤器是 servlet 规范中的一部分，任何 java web 工程都可以使用。 
    - 拦截器是 SpringMVC 框架自己的，只有使用了 SpringMVC 框架的工程才能用。 
    - 过滤器在 url-pattern 中配置了`/*`之后，可以对所有要访问的资源拦截。 
    - **拦截器**它是**只会拦截访问的控制器方法**，如果访问的是 jsp,html,css,image 或者 js 是不会进行拦截的

使用步骤：

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

* 总结：

    - preHandle按拦截器定义顺序调用，**返回false时后续拦截器将不调用**
    - postHandler按拦截器定义逆序调用，且只有**所有preHandle返回true时调用**
    - afterCompletion按拦截器定义逆序调用，且**只有preHandle返回true才调用**，与上一条不同



* 应用

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







## Servlet 3.0及纯注解配置

这章节就是试试，但是在纯注解配置Mybatis时失败，令人遗憾。

详细的查看文档，搜索JCP并搜Servlet下载即可

------

### ServletContainerInitializer

文档的8.2.4章节—Shared libraries（共享库） / runtimes pluggability（运行时可插拔性）

1. Servlet容器启动会扫描，当前应用里面每一个jar包的ServletContainerInitializer的实现
2. 提供ServletContainerInitializer的实现类，必须绑定在META-INF/services/javax.servlet.ServletContainerInitializer，文件的内容就是ServletContainerInitializer实现类的全类名

总结：容器在启动应用的时候，会扫描当前应用每一个jar包里面META-INF/services/javax.servlet.==**ServletContainerInitializer**==
指定的实现类，启动并运行这个实现类的方法；`@HandlesTypes`注解用于传入感兴趣的类型。



### ServletContext注册三大组件

```java
//容器启动的时候会将@HandlesTypes指定的这个类型下面的子类（实现类，子接口等）传递过来；
//传入感兴趣的类型；
@HandlesTypes(value={HelloService.class})
public class MyServletContainerInitializer implements ServletContainerInitializer {

	/**
	 * 应用启动的时候，会运行onStartup方法；
	 * 
	 * Set<Class<?>> arg0：感兴趣的类型的所有子类型；
	 * ServletContext arg1:代表当前Web应用的ServletContext；一个Web应用一个ServletContext；
	 * 
	 * 1）、使用ServletContext注册Web组件（Servlet、Filter、Listener）
	 * 2）、使用编码的方式，在项目启动的时候给ServletContext里面添加组件；
	 * 		必须在项目启动的时候来添加；
	 * 		1）、ServletContainerInitializer得到的ServletContext；
	 * 		2）、ServletContextListener得到的ServletContext；
	 */
	@Override
	public void onStartup(Set<Class<?>> arg0, ServletContext sc) throws ServletException {
		System.out.println("感兴趣的类型：");
		for (Class<?> claz : arg0) {
			System.out.println(claz);
		}
		
		//注册组件  ServletRegistration  
		ServletRegistration.Dynamic servlet = sc.addServlet("userServlet", new UserServlet());
		//配置servlet的映射信息
		servlet.addMapping("/user");
		
		
		//注册Listener
		sc.addListener(UserListener.class);
		
		//注册Filter  FilterRegistration
		FilterRegistration.Dynamic filter = sc.addFilter("userFilter", UserFilter.class);
		//配置Filter的映射信息
		filter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");		
	}
}
```



### 与SpringMVC整合

> 查看Spring官方文档即可

<img src="./images/mvc-context-hierarchy-9020383.png" alt="mvc-context-hierarchy" style="zoom:67%;" />

**原理**

1、web容器在启动的时候，会扫描每个jar包下的META-INF/services/javax.servlet.ServletContainerInitializer

2、加载这个文件指定的类SpringServletContainerInitializer

3、spring的应用一启动会加载感兴趣的WebApplicationInitializer接口的下的所有组件；

4、并且为WebApplicationInitializer组件创建对象（组件不是接口，不是抽象类）

​	1）、AbstractContextLoaderInitializer：创建根容器；createRootApplicationContext()；

​	2）、AbstractDispatcherServletInitializer：
​			创建一个web的ioc容器；createServletApplicationContext();
​			创建了DispatcherServlet；createDispatcherServlet()；
​			将创建的DispatcherServlet添加到ServletContext中；
​				getServletMappings();

​	3）、AbstractAnnotationConfigDispatcherServletInitializer：注解方式配置的DispatcherServlet初始化器
​			创建根容器：createRootApplicationContext()
​					getRootConfigClasses();传入一个配置类
​			创建web的ioc容器： createServletApplicationContext();
​					获取配置类；getServletConfigClasses();
​	
总结：以注解方式来启动SpringMVC；**继承`AbstractAnnotationConfigDispatcherServletInitializer`**；**实现抽象方法**指定DispatcherServlet等的配置信息（和在web.xml中功能一致）；

------

定制SpringMVC；

1. `@EnableWebMvc`：开启SpringMVC定制配置功能；与`<mvc:annotation-driven/>`功能一致
2. 配置组件（视图解析器、视图映射、静态资源映射、拦截器。。。） 
    1. 实现`WebMvcConfigurer`重写全部方法！！！可以配置任何东西。不如下面的实现类方便。
    2. 继承`WebMvcConfigurerAdapter`（Spring5.0后过时）
    3. **实现`WebMvcConfigurer `接口**

```java
//web容器启动的时候创建对象；调用方法来初始化容器以前前端控制器
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	//获取根容器的配置类；（Spring的配置文件）   父容器；
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class<?>[]{RootConfig.class};
	}

	//获取web容器的配置类（SpringMVC配置文件）  子容器；
	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class<?>[]{AppConfig.class};
	}

	//获取DispatcherServlet的映射信息
	//  /：拦截所有请求（包括静态资源（xx.js,xx.png）），但是不包括*.jsp；
	//  /*：拦截所有请求；连*.jsp页面都拦截；jsp页面是tomcat的jsp引擎解析的；
	@Override
	protected String[] getServletMappings() {
		return new String[]{"/"};
	}
    
    //该方法下的所有过滤器都会映射到DispatcherServlet
    @Override
    protected Filter[] getServletFilters() {
        //编码过滤器
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter("UTF-8",true);
        //解决PUT、DELETE等请求的过滤器
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();

        return new Filter[]{characterEncodingFilter,hiddenHttpMethodFilter};
    }

    @Override
    protected WebApplicationContext createServletApplicationContext() {
        return super.createServletApplicationContext();
    }
}
```

```java
@Configuration
@ComponentScan(value="cn.itcast",excludeFilters={
    @Filter(type=FilterType.ANNOTATION,classes={Controller.class})
})//扫描cn.itcast下的除过Controller的所有组件，不能添加useDefaultFilters
@EnableTransactionManagement//开启事务
@PropertySource("classpath:JdbcConfig.properties")//导入外部配置文件
@Configuration
public class RootConfig {

    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;


    @Bean
    public DataSource dataSource(){
        //DriverManagerDataSource dataSource = new DriverManagerDataSource();//使用spring提供的DataSource
        DruidDataSource dataSource = new DruidDataSource();//配置Druid的DataSource
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource){
        return new JdbcTemplate(dataSource);
    }
    
    //配置事务管理器
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource){
        return new DataSourceTransactionManager(dataSource);
    }


   /**配置mybatis，执行后总是报NullPointerException，毫无头绪。上面的JdbcTemplate成功了

    //配置SqlSessionFactory，利用org.mybatis.spring提供的SqlSessionFactoryBean
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource){
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        
        //数据源
        sqlSessionFactoryBean.setDataSource(dataSource);
        
        //pageHelper的拦截器插件配置
        PageInterceptor pageInterceptor = new PageInterceptor();
        Properties properties = new Properties();
        properties.setProperty("helperDialect","mysql");
        properties.setProperty("reasonable","true");
        pageInterceptor.setProperties(properties);
        sqlSessionFactoryBean.setPlugins(new Interceptor[]{pageInterceptor});

        return sqlSessionFactoryBean.getObject();  //mybatis-spring整合的文档是这么写的
    }

    //配置Mapper接口扫描
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("cn.itcast.dao");
        return mapperScannerConfigurer;
    } */
}
```

```java
@Configuration
@ComponentScan(value = "cn.itcast.controller", includeFilters = {
        @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Controller.class)
}, useDefaultFilters = false)//必须添加useDefaultFilters
@EnableWebMvc
public class AppConfig implements WebMvcConfigurer  {

    @Autowired
    private ApplicationContext servletApplicationContext;

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        //模板解析器
        SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
        templateResolver.setApplicationContext(this.servletApplicationContext);//必须有
        templateResolver.setPrefix("/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode("HTML");
        templateResolver.setCharacterEncoding("UTF-8");

        //模板引擎
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        //Thymeleaf视图解析器
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setTemplateEngine(templateEngine);
        viewResolver.setCharacterEncoding("UTF-8");

        registry.viewResolver(viewResolver);

        //registry.jsp("/views/",".jsp");
    }

    //释放静态资源
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    //拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyFirstInterceptor()).addPathPatterns("/**");
    }
}
```

> 以上配置，在dao层查询时会报空指针异常，暂时GG。同样的xml配置OK。我不OK了！！！

纯注解配置时由于Maven的原因，需要配置如下plugin

```xml
<plugin>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.6</version>
    <configuration>
        <warSourceDirectory>WebContent</warSourceDirectory>
        <failOnMissingWebXml>false</failOnMissingWebXml>
    </configuration>
</plugin>
```



