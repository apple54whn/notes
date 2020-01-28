# Servlet 3.0及纯注解配置

这章节就是试试，但是在纯注解配置Mybatis时失败，令人遗憾。

详细的查看文档，搜索JCP并搜Servlet下载即可

------

## ServletContainerInitializer

文档的8.2.4章节—Shared libraries（共享库） / runtimes pluggability（运行时可插拔性）

1. Servlet容器启动会扫描，当前应用里面每一个jar包的ServletContainerInitializer的实现
2. 提供ServletContainerInitializer的实现类，必须绑定在META-INF/services/javax.servlet.ServletContainerInitializer，文件的内容就是ServletContainerInitializer实现类的全类名

总结：容器在启动应用的时候，会扫描当前应用每一个jar包里面META-INF/services/javax.servlet.==**ServletContainerInitializer**==
指定的实现类，启动并运行这个实现类的方法；`@HandlesTypes`注解用于传入感兴趣的类型。



## ServletContext注册三大组件

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



## 与SpringMVC整合

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



