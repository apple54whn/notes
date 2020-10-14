# 请求参数的绑定

## Servlet API

**控制器**(处理器)**形参**中添加如下类型的参数，处理适配器会默认识别并进行赋值

- `HttpServletRequest`：通过request对象获取请求信息
- `HttpServletResponse`：通过response处理响应信息
- `HttpSession`：通过session对象得到session中存放的对象

## 表单绑定

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





## 常用注解

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

作用：用于**获取请求体**内容（**GET**也有），常用于**JSON数据封装**。不使用则得到是`key=value&key=value`结构的数据。

属性：`required`是否必须有请求体，默认为 true，即使是 GET 请求也必须添加请求体！

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





### `@DateTimeFormat`

直接在JavaBean**属性**上添加注释即可（在get或set方法上添加，命名规范的话字段上添加也行。由于一般自动生成，所以都行）

```java
@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
private Date creationTime;
```





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





## 自定义类型转换器

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



