# Controller & Mapping

## @Controller

不多解释了吧



## @RestController

是`@Controller`和`@ResponseBody`的组合





## @RequestMapping

作用：用于**建立请求 URL** 和**处理请求方法**之间的对应**关系**。**所有请求方法都会经过此路由**

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

* **`value`**：用于指定**请求的 URL数组**。它和 **path** 属性的作用是一样的。**大小写敏感**。

* **`method`**：用于指定**请求的方式**，值为`RequestMethod`枚举类**数组**。

    可以有**多个请求方式映射一个方法**，下面的简写注解不可以在同一个方法中使用多个，否则**只有最先写的起作用**！

* `params`：用于指定限制请求参数的条件。它支持简单的表达式。要求请求参数的key和value必须和配置的一模一样。如：

    * `params = {"accountName"}`，表示请求参数必须有 accountName 
    * `params = {"moeny!100"}`，表示请求参数中 money 不能是 100

* `headers`：用于限定发送的请求中必须包含某请求头



## @GetMapping

用在方法上，替代方法的`@RequestMapping`

## @PostMapping

用在方法上，替代方法的`@RequestMapping`

## @PutMapping

用在方法上，替代方法的`@RequestMapping`

## @DeleteMapping

用在方法上，替代方法的`@RequestMapping`

## @PatchMapping

用在方法上，替代方法的`@RequestMapping`。部分更新



