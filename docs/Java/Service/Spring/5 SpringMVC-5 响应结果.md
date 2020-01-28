# 响应结果

## @ResponseBody

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



## ModelAndView...

* `ModelAndView` 是 SpringMVC 为我们提供的一个类，其对象也可以用作控制器方法的返回值。 两个方法： 

    ```java
    @RequestMapping("/testReturnModelAndView") 
    public ModelAndView testReturnModelAndView() {  
        ModelAndView mv = new ModelAndView();  
        mv.addObject("username", "张三");  //存储的request域中
        mv.setViewName("success"); 
        return mv; 
    }
    ```

* `Model`/`ModelMap`

    除了`ModelAndView`以外，还可以使用`Model`(接口)来**向页面传递数据**，在参数里**直接声明Model即可**

    使用Model可以不使用ModelAndView对象，Model对象可以向页面传递数据，View对象可以使用String返回值替代。**其本质都是使用Request域对象传递数据**

    ```java
    model.addAttribute("item", item);
    return "itemEdit";
    ```

    `ModelMap`是`Model`接口的实现类，也可以通过`ModelMap`向页面传递数据。效果一样，同上代码

    



## String—无@ResponseBody

Controller 中方法返回字符串可以**指定逻辑视图名**，通过**视图解析器解析为物理视图地址**。SpringBoot 默认查找 template 目录。

* `forward:`**转发**

    `return "forward:success"; `也可以添加后缀如html

* `redirect:`**重定向**

    `return "redirect:fail"; `



## void & ajax

- 在Controller方法形参上可以绑定原生ServletAPI，使用request或response**指定响应结果**。

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





