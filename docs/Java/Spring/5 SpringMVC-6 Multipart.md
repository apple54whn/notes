# Multipart

pom.xml中添加依赖（可不加）

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

## 文件上传的回顾 

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





## SpringMVC传统方式的文件上传

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

    



## SpringMVC跨服务器方式的文件上传

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



