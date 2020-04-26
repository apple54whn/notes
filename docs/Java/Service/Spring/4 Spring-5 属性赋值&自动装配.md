# 属性赋值 & 自动装配

## 属性赋值

### `@Value`

用于注入基本类型和String数据

- 属性：`value`指定数据的值。

    - 基本类型和String

    - 使用SpEL（写法：`#{表达式}`）

    - 可以取出配置文件如properties中的值（也存在于运行环境变量里面）：`${}`，结合`@PropertySource注解`

        ```java
        public class Person {
            @Value("张三")
            private String name;
            @Value("#{20-2}")
            private Integer age;
            @Value("${person.nickName}")
            private String nickName;
            ......
        }
        ```

        ```java
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        String property = environment.getProperty("person.nickName");
        ```



### `@PropertySource`

用于**指定properties文件的位置**，是重复注解

- `value`指定文件的**名称和路径**数组。关键字：**classpath**，表示类路径下





## 自动装配

> 作用和xml配置文件中的`<bean>`标签编写`<property>`标签实现功能一致。利用DI完成依赖关系赋值

- **`@Autowired`**

    自动**按照类型注入**

    首先按照类型去找，只要容器中**有唯一一个**bean对象类型和要注入的变量**类型匹配**，就注入成功，一个都没有则报错

    如果有**多个类型匹配到**，使用要注入的对象**变量名称**作为bean的id，在spring容器查找，找到了也可以注入成功，否则报错

    * 出现的位置：**属性**，方法（get、set），构造器，参数
        * 标注在方法的参数位置：@Bean+方法参数；参数从容器中获取；@Autowired可以**省略**
        * 标在构造器上：如果组件只有一个有参构造器，这个有参构造器的@Autowired可以**省略**

    - 可以使用`required=false`指定后，注入失败也不会报错（了解）
    - `@Primary`：在Bean对象添加此注解，则首先注入这个Bean。若`@Qualifier`指定了，则这个注解失效

- **`@Qualifier`**

    在自动按照类型注入的**基础之上**，**再按照 Bean 的 id 注入**

    注意：在给**类成员注入时不能单独使用**，但是**给方法参数注入时可以单独使用**

    - 属性：`value`用于指定注入的bean的id

- **`@Resource`**JaveEE（JSR250）的注解，耦合性低

    可以和@Autowired一样实现自动装配功能，默认是**按照组件名称进行装配的**，找不到再看类型装配。可以独立使用。

    没有能支持@Primary功能没有支持@Autowired（reqiured=false）;

    - 属性：`name`用于指定注入的bean的id

- **`@Inject`**：JaveEE（JSR330）的注解，耦合性低（也不一定，对于 Spring 开发来说）

    - 需要导入`javax.inject`依赖。和@Autowired的功能一样，只是没有required=false的功能

    以上四个注解都**只能注入其他bean类型数据**，而基本类型和String无法注入。集合类型注入只能用xml、javaConfig实现

> AutowiredAnnotationBeanPostProcessor：解析完成自动装配功能（以上四个）；	



* 自定义组件想要使用Spring容器底层的一些组件（ApplicationContext，BeanFactory，xxx）

    * 自定义组件需要实现xxxAware（参考Aware接口设计）：在创建对象的时候，会调用接口规定的方法注入相关组件
    * xxxAware：功能实现使用的是xxxProcessor，如ApplicationContextAware->ApplicationContextAwareProcessor

    ```java
    @Component
    public class Red implements ApplicationContextAware,BeanNameAware,EmbeddedValueResolverAware {
    	
    	private ApplicationContext applicationContext;
    
    	@Override
    	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    		System.out.println("传入的ioc："+applicationContext);
    		this.applicationContext = applicationContext;
    	}
    
    	@Override
    	public void setBeanName(String name) {
    		System.out.println("当前bean的名字："+name);
    	}
    
    	@Override
    	public void setEmbeddedValueResolver(StringValueResolver resolver) {
    		String resolveStringValue = resolver.resolveStringValue("你好 ${os.name} 我是 #{20*18}");
    		System.out.println("解析的字符串："+resolveStringValue);
    	}
    }
    ```




*   注意：`@Qualifier`给方法参数注入时可以单独使用

    ```java
    //@Configuration
    @ComponentScan("com.itheima")
    @Import(JdbcConfig.class)
    @PropertySource("classpath:jdbcConfig.properties")
    public class SpringConfiguration {
    
    }
    ```

    ```java
    public class JdbcConfig {
    
        @Value("${jdbc.driver}")
        private String driver;
    
        @Value("${jdbc.url}")
        private String url;
    
        @Value("${jdbc.username}")
        private String username;
    
        @Value("${jdbc.password}")
        private String password;
    
        /**
         * 用于创建一个QueryRunner对象
         * @param dataSource
         * @return
         */
        @Bean(name="runner")
        @Scope("prototype")
        public QueryRunner createQueryRunner(@Qualifier("ds2") DataSource dataSource){
            return new QueryRunner(dataSource);
        }
    
        /**
         * 创建数据源对象
         * @return
         */
        @Bean(name="devDataSource")
        public DataSource createDataSource(){
            try {
                DruidDataSource dataSource = new DruidDataSource();
                dataSource.setDriverClassName(driver);
                dataSource.setUrl(url);
                dataSource.setUsername(username);
                dataSource.setPassword(password);
                return dataSource;
            }catch (Exception e){
                throw new RuntimeException(e);
            }
        }
    
        @Bean(name="testDataSource")
        public DataSource createDataSource1(){
            try {
                ComboPooledDataSource ds = new ComboPooledDataSource();
                ds.setDriverClassName(driver);
                ds.setJdbcUrl("jdbc:mysql://localhost:3306/eesy02");
                ds.setUser(username);
                ds.setPassword(password);
                return ds;
            }catch (Exception e){
                throw new RuntimeException(e);
            }
        }
    }
    ```

    ```properties
    #jdbcConfig.properties
    jdbc.driver=com.mysql.jdbc.Driver
    jdbc.url=jdbc:mysql://localhost:3306/eesy
    jdbc.username=root
    jdbc.password=1234
    ```

    ```java
    ApplicationContext ac = new AnnotationConfigApplicationContext(com.itheima.config.SpringConfiguration.class);
    JdbcTemplate jdbcTemplate = ac.getBean("runner", QueryRunner.class);
    .....
    ```

