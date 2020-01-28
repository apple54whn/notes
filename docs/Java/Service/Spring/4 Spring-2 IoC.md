# IoC

## 引入—程序间耦合

- 在软件工程中，耦合指的就是就是**对象之间的依赖性**。对象之间的耦合越高，维护成本越高。因此对象的设计应使类和构件之间的耦合最小。软件设计中通常用耦合度和内聚度作为衡量模块独立程度的标准。**划分模块的一个准则**就是**高内聚低耦合**。

- **Bean**：计算机英语中，有**可重用组件**的含义

    JavaBean：用**Java语言编写的可重用组件**。JavaBean>实体类

- 实际开发中，应做到：**编译期不依赖**，**运行时才依赖**

- **解耦的思路（工厂模式）**：

    1. **读取配置文件的key**获取要创建对象的**全限定类名value**；
    2. 使用**反射创建对象**，避免使用new关键字；
    3. 定义一个map**容器**，在静态代码块中创建所有对象并存放。获取对象时直接返回对应key的value，是单例的



## 如何理解 IoC 和 DI

* **IoC（控制反转）**：**把创建对象的权利交给容器（或工厂）**。可以**解决程序之间的耦合**，解除代码中的依赖关系。==
* DI：依赖注入。即调用类对某一接口实现类的依赖关系由第三方容器或协作类注入，移除调用类对某一接口实现类的依赖
    * 一般完成特定的业务逻辑可能会需要多个类之间进行协作。按传统的做法，每个对象负责管理与自己互相协作的对象(它所依赖的对象)的引用，这会导致高度耦合并难以测试的代码。利用依赖注入，每个对象可以直接获取所依赖的对象





## `@Configuration`配置类

* **`@Configuration`**

    用于**指定当前类是一个Spring配置类**，当创建容器时会从该类上加载注解。

    - `value`用于指定配置类的字节码，一般不用
    - 细节：当**配置类**作为`AnnotationConfigApplicationContext`对象创建的**参数**时，该注解可以不写

    获取容器时使用 `AnnotationConfigApplicationContext(有@Configuration 注解的类.class)`来创建`ApplicationContext`对象。由于本身也是`@Component`，所以指定@ComponentScan时可以跳过此类（了解）

    * `String[] getBeanDefinitionNames()`：查询这个IoC容器中所有Bean的名称
    * `String[] getBeanNamesForType(Class c)`：查询这个IoC容器中指定类型的Bean的名称
    * `Map<String, Class >getBeansOfType(Class c)`：查询这个IoC容器中所有Bean的名称、和Bean对象
    * `Object getBean([String beanName ,] [Class c])`


## `@PropertySource`

用于**指定properties文件的位置**，是重复注解

- `value`指定文件的**名称和路径**数组。关键字：**classpath**，表示类路径下




## `@ComponentScan`注册组件

> 包扫描+组件标注注解（@Controller/@Service/@Repository/@Component）[自己写的类]

* `@ComponentScans`

    用于多个`@ComponentScan`。属性有`value`数组，可以包含多个` @ComponentScan`

* **` @ComponentScan`**

    指定Spring在**初始化容器**时**要扫描的包**（扫描4个注解的类），在JDK8之后是重复注解，直接写多个，不再使用上边那个

    * `value`或`basePackages`都是用于指定要扫描的包，都是数组类型

    * `excludeFilters`指定扫描的时候按照什么规则排除那些组件

    * `includeFilters`指定扫描的时候只需要包含哪些组件

        值为`Filter[]`，使用`@Filter`注解，属性有`type`（如下）、`classes`（Class类型）

        * `FilterType.ANNOTATION`：按照带有的**注解类型**
        * `FilterType.ASSIGNABLE_TYPE`：按照**给定的具体类型**
        * `FilterType.ASPECTJ`：使用ASPECTJ表达式
        * `FilterType.REGEX`：使用正则指定
        * `FilterType.CUSTOM`：使用自定义规则，需要自定义`TypeFilter`的实现类，重写`match`方法

    * `useDefaultFilters`在使用指定的规则时需要将这个值设置为`false`

        ```java
        public class MyTypeFilter implements TypeFilter {
            /**
        	 * metadataReader：读取到的当前正在扫描的类的信息
        	 * metadataReaderFactory:可以获取到其他任何类信息的
        	 */
            @Override
            public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory)
                throws IOException {
                //获取当前类注解的信息
                AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
                //获取当前正在扫描的类的类信息
                ClassMetadata classMetadata = metadataReader.getClassMetadata();
                //获取当前类资源（类的路径）
                Resource resource = metadataReader.getResource();
        
                String className = classMetadata.getClassName();
                System.out.println("--->"+className);
                if(className.contains("er")){
                    return true;
                }
                return false;
            }
        }
        ```

        ```java
        @ComponentScan(value="com.atguigu",includeFilters = {
            @Filter(type=FilterType.ANNOTATION,classes={Controller.class}),
            @Filter(type=FilterType.ASSIGNABLE_TYPE,classes={BookService.class}),
            @Filter(type=FilterType.CUSTOM,classes={MyTypeFilter.class})
        },useDefaultFilters = false)	
        ```

> 作用和xml配置文件中编写`<bean>`标签实现功能一致

- **`@Component`**：用于==**把当前类对象存入Spirng容器中**==。注解在实现类上不指定value会自动指定value（删除Impl）

    - 属性：`value`：用于指定bean的id。不写时默认为当前类名，且首字母小写

- **`@Controller`**或**`@RestController`**：表现层

- **`@Service`**：业务层

- **`@Repository`**：持久层

    以上三个注解的作用和属性与`@Componet`一致，是Spring提供明确的三层架构使用的注解，使三层对象更加清晰

    也可以使用`@Scope`、`@Conditional`注解，如下：





## `@Bean`注册组件

> 导入的第三方jar包里面的组件

* **`@Bean`**

    用于把当前**方法的返回值**作为bean对象**注册存入Spring容器**中。该注解**只能写在方法上**

    * `value`或`name`用于指定**bean的id**。没写则默认为**当前方法的名称**
    * 细节：当我们使用注解配置方法时，如果**方法有参数**，Spring框架会去容器中查找有没有可用的bean对象。查找的方式和`@Autowired`注解的作用是一样的

* **`@Scope`**：用于指定bean的作用范围。也可以放置注解在定义的4个组件上

    - `value`指定范围的取值。常用有：
        - **`singleton`**：**单例**【默认】，一个应用只有一个对象的实例，IoC容器启动时则会创建对象并放入容器
            - `@Lazy`：懒加载，修改单例对象创建时间，变为获取对象时才创建，但还是单例
        - **`prototype`**：**多例**，每次获取对象时，都会重新创建对象实例。
        - `request`：WEB 项目中，Spring 为**每个请求**创建一个bean实例
        - `session`：WEB 项目中，Spring 为**每个会话**创建一个bean实例
        - `global-session`：作用于**集群(Portlet)环境的全局会话范围**，当不是集群(Portlet)环境时，它就是session

* **`@Profile`**

    指定**组件**在哪个环境的情况下才能被注册到容器中，不指定，任何环境下都能注册这个组件

    * 加了环境标识的**bean**，只有这个环境被激活的时候才能注册到容器中。默认不写是default环境，即没有标注环境标识的bean在任何环境下都是加载的

    * 写在**配置类上**，只有是指定的环境的时候，整个配置类里面的所有配置才能开始生效

        ```java
        @Profile("test")
        ```

    使用：

    * 运行时使用命令行动态参数：虚拟机参数位置写上`-Dspring.profiles.active=test`

    * 代码的方式激活某种环境

        ```java
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
        applicationContext.getEnvironment().setActiveProfiles("dev","test");//设置需要激活的环境
        applicationContext.register(MainConfigOfProfile.class);//注册主配置类
        applicationContext.refresh();//启动刷新容器
        ```

* **`@Conditional`**

    类中组件统一设置。**满足当前条件**，这个配置的**bean注册才能生效**。可以标在类和方法上。**Springboot中使用很多**

    * `value`为实现了`Condition`接口的数组，实现类重写`matches`方法

        ```java
        //判断是否linux系统
        public class LinuxCondition implements Condition {
        
            /**
        	 * ConditionContext：判断条件能使用的上下文（环境）
        	 * AnnotatedTypeMetadata：注释信息
        	 */
            @Override
            public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
                // TODO是否linux系统
                //1、能获取到ioc使用的beanfactory
                ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
                //2、获取类加载器
                ClassLoader classLoader = context.getClassLoader();
                //3、获取当前环境信息
                Environment environment = context.getEnvironment();
                //4、获取到bean定义的注册类
                BeanDefinitionRegistry registry = context.getRegistry();
        
                
                //可以判断容器中的bean注册情况，也可以给容器中注册bean
                boolean definition = registry.containsBeanDefinition("person");
                
                String property = environment.getProperty("os.name");
                if(property.contains("linux")){
                    return true;
                }
                return false;
            }
        }
        ```

        ```java
        @Conditional(LinuxCondition.class)//可以标在类（满足条件则类中所有Bean才会注册）和方法（只限制这个方法的Bean）上
        @Bean("linus")
        public Person person02(){
            return new Person("linus", 48);
        }
        ```



## `@Import`注册组件

* **`@Import`**

    用于**导入其他的配置类**也可以理解为**直接导入第三方组件**，只能标注在类、接口、枚举类上

    * `value`用于指定其他配置类的**字节码**，是数组，被导入的其他配置类也不用加`@Configuration`注解

        注册的Bean的id为组件的全类名；若是配置类则还会注册配置的Bean（id为指定的或方法名）

        ```java
        @Import({Color.class,Red.class,MyImportSelector.class,MyImportBeanDefinitionRegistrar.class})
        //@Import导入组件，id默认是组件的全类名
        public class MainConfig2 {
        ```

        * **`ImportSelector`**接口：返回需要导入的组件的全类名数组，需要自定义类实现该接口。**Springboot中使用很多**

            ```java
            //自定义逻辑返回需要导入的组件
            public class MyImportSelector implements ImportSelector {
                //返回值，就是到导入到容器中的组件全类名
                //AnnotationMetadata:当前标注@Import注解的类的所有注解信息
                @Override
                public String[] selectImports(AnnotationMetadata importingClassMetadata) {
                    return new String[]{"com.atguigu.bean.Blue","com.atguigu.bean.Yellow"};
                }
            }
            ```

        * `ImportBeanDefinitionRegistrar`接口：手动注册Bean到容器中，需要自定义类实现该接口

            ```java
            public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
                /**
            	 * AnnotationMetadata:当前标注@Import注解的类的所有注解信息
            	 * BeanDefinitionRegistry:BeanDefinition注册类；
            	 * 把所有需要添加到容器中的bean；调用BeanDefinitionRegistry.registerBeanDefinition手工注册进来
            	 */
                @Override
                public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
                    boolean definition = registry.containsBeanDefinition("com.atguigu.bean.Red");
                    boolean definition2 = registry.containsBeanDefinition("com.atguigu.bean.Blue");
                    if(definition && definition2){
                        //指定Bean定义信息；（Bean的类型，Bean。。。）
                        RootBeanDefinition beanDefinition = new RootBeanDefinition(RainBow.class);
                        //注册一个Bean，指定bean名
                        registry.registerBeanDefinition("rainBow", beanDefinition);
                    }
                }
            }
            ```



## FactoryBean注册组件

与`@Import`不同的是，它是调用无参构造创建Bean，而这个利用工厂获取Bean。多用于**整合Spring和其他框架**的底层代码

```java
//创建一个Spring定义的FactoryBean
public class ColorFactoryBean implements FactoryBean<Color> {
	//返回一个Color对象，这个对象会添加到容器中
	@Override
	public Color getObject() throws Exception {
		System.out.println("ColorFactoryBean...getObject...");
		return new Color();
	}
	@Override
	public Class<?> getObjectType() {
		return Color.class;
	}
	//是否为单例？
	@Override
	public boolean isSingleton() {
		return false;
	}
}
```

```java
@Bean
public ColorFactoryBean colorFactoryBean(){
    return new ColorFactoryBean();
}
```

```java
//工厂Bean获取的是工厂bean调用getObject创建的对象
Object bean1 = applicationContext.getBean("colorFactoryBean");
System.out.println("bean的类型："+bean1.getClass());//Color的全限定类名

Object bean2 = applicationContext.getBean("&colorFactoryBean");
System.out.println(bean2.getClass());//ColorFactoryBean的全限定类名
```





## Bean的生命周期方法

> 作用和xml配置文件中的`<bean>`标签编写`<init-method>`和`<destroy-method>`标签实现功能一致
>
> 一个是Bean创建并赋值完成后调用，一个是容器关闭（单例）或GC（多例）

------

1、`@Bean`指定类中的`init-method`和`destroy-method`方法。注意scope不同时区别。。

```java
@Bean(initMethod="init",destroyMethod="detory")
public Car car(){
    return new Car();
}
```

------

2、通过让Bean实现`InitializingBean`（重写初始化方法afterPropertiesSet），`DisposableBean`（重写销毁方法destroy）

------

3、JSR250定义的注解，只能定义在**方法上**

- `@PostConstruct`：在bean创建完成并且赋值完成；来执行初始化方法
- `@PreDestroy`：在销毁bean之前通知我们进行清理工作。单例中需要关闭容器（使用实现类的方法，如close）

```java
@Component
public class Dog {
	public Dog(){
		System.out.println("dog constructor...");
	}

	@PostConstruct
	public void init(){
		System.out.println("Dog....@PostConstruct...");
	}

	@PreDestroy
	public void detory(){
		System.out.println("Dog....@PreDestroy...");
	}
}
```

------

4、Spring提供的`BeanPostProcessor`接口：bean的后置处理器，在**所有bean初始化前后**进行一些处理工作

* `postProcessBeforeInitialization`：在自定义初始化之前工作
* `postProcessAfterInitialization`：在自定义初始化之后工作

```java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {

	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		System.out.println("postProcessBeforeInitialization..."+beanName+"=>"+bean);
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		System.out.println("postProcessAfterInitialization..."+beanName+"=>"+bean);
		return bean;
	}
}
```

> 源码：
>
> 遍历得到容器中所有的BeanPostProcessor；挨个执行beforeInitialization，一但返回null，跳出for循环，不会执行后面的BeanPostProcessor.postProcessorsBeforeInitialization
>
> BeanPostProcessor原理：
>
> populateBean(beanName, mbd, instanceWrapper); //给bean进行属性赋值
>
> initializeBean：
>
> ​	applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
>
> ​	invokeInitMethods(beanName, wrappedBean, mbd); //执行自定义初始化
>
> ​	applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
>
> Spring底层对 BeanPostProcessor 的使用：bean赋值，注入其他组件，@Autowired，生命周期注解功能，@Async等等





## 属性赋值

**`@Value`**：用于注入基本类型和String数据

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



## xml 配置（旧）

### 步骤

1. 在resources中创建`spring-config.xml`或`applicationContext.xml`文件。（约束在参考中搜索`xmlns`即可找到）

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd">
    </beans>
    ```

2. 在配置文件中**配置让 spring 创建的对象**（原理和引入中工厂模式一致）

    ```xml
    <bean id="accountDao" class="com.itheima.dao.impl.AccountDaoImpl"></bean>
    <bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"></bean>
    ```

3. 获取Spring IoC核心容器，并根据id获取对象

    ```java
    ApplicationContext ac = new ClassPathXmlApplicationContext("spring-config.xml");
    AccountDao accountDao = (AccountDao) ac.getBean("accountDao"); //需要强转
    AccountService accountService = ac.getBean("accountService", AccountService.class); //传字节码文件对象，不用强转
    ```



### Spirng中容器接口及其实现类

* ~~`BeanFactory`顶层容器接口。创建对象采用**延迟加载**方式（何时使用何时创建，多例适用）~~
* **`ApplicationContext`**容器接口。创建对象采用**立即加载**方式（==**读完配置文件**，**默认情况下就创建(可修改)**==，单例适用）
    * **`ClassPathXmlApplicationContext`**，基于xml配置的实现类。只能加载**类路径**下的配置文件
    * `FileSystemXmlApplicationContext`，基于xml配置的实现类。可以加载**磁盘任意路径**的配置文件（需有访问权限）
    * **`AnnotationConfigApplicationContext`**，基于注解配置的实现类。读取**注解**创建容器



### Spirng对Bean的管理细节

**bean标签**

* 作用：**配置对象让spring来创建的**。默认情况下它调用的是类中的**无参构造函数**。如果没有无参构造函数则不能创建成功。 
* 属性：
    * **`id`**：给对象在容器中提供一个**唯一标识**，用于获取对象
    * **`class`**：指定**类的全限定类名**，用于**反射创建对象**，默认情况下调用无参构造函数
    * **`scope`**：**指定对象的作用范围**
        * **`singleton`**：**单例**的（默认），一个应用只有一个对象的实例，它的作用范围就是**整个应用** 
        * **`prototype`**：**多例**的，每次访问对象时，都会重新创建对象实例。
        * `request`：WEB 项目中，Spring 为**每个请求**创建一个bean实例
        * `session`：WEB 项目中，Spring 为**每个会话**创建一个bean实例
        * `global-session`：作用于**集群(Portlet)环境的全局会话范围**，当不是集群(Portlet)环境时，它就是session
    * `init-method`：指定类中的初始化方法名称
    * `destroy-method`：指定类中销毁方法名称。单例中需要关闭容器（使用实现类的方法）

**Bean对象的生命周期**

- **单例对象：生命周期和容器相同**，一个应用只有一个对象的实例，它的作用范围就是整个应用
    - 出生：当容器创建时出生（读取完配置文件）
    - 存活：只要容器存在，对象一直存活
    - 死亡：容器销毁，对象消亡
- **多例对象**：每次访问对象时，都会重新创建对象实例。
    - **出生**：当我们**使用对象**时，**Spring框架为我们创建**
    - **存活**：对象只要在**使用过程中，就一直存活**
    - **死亡**：当对象**长时间不使用，且没有别的对象引用**时，由Java的**GC**机制回收

**创建Bean的三种方式**

1. **使用默认构造方法创建**

    配置文件中使用`bean`标签以及`id`和`class`属性，且没有其他属性和标签时~。若类中没有默认构造方法，则对象无法创建

    ```xml
    <bean id="accountDao" class="com.itheima.dao.impl.AccountDaoImpl"></bean>
    ```

2. 使用**普通工厂中的方法**创建对象（也称使用某个类中的方法创建对象），并存入Spirng容器

    ```xml
    <bean id="accountDaoFactory" class="com.itheima.factory.AccountDaoFactory"></bean>
    <bean id="accountDao" factory-bean="accountDaoFactory" factory-method="getAccountDao"></bean>
    ```

3. 使用**静态工厂中的静态方法**创建对象（也称使用某个类中的静态方法创建对象），并存入Spirng容器

    ```xml
    <bean id="accountDao" class="com.itheima.factory.AccountDaoFactory" factory-method="getAccountDao"></bean>
    ```



### 依赖注入

> 我们的业务层仍会调用持久层的方法，在使用 spring 之后，就让 **spring 来维护**了他们的**依赖关系**。就是让框架把持久层对象传入业务层，不用自己去获取。

DI（Dependency Injection）：**依赖注入**，即是**依赖关系的维护**交由Spirng管理。

能注入的数据有三类：（不适用于经常变换的数据）

* **基本类型和String**
* **其他bean类型**（在配置文件或注解中配置过的bean）
* **复杂类型/集合类型**：如Array、List、Set、Map、Properties



**构造方法注入**

使用类中的构造方法给成员变量赋值。注意：赋值的操作不是我们自己做的，而是通过配置的方式，让spring框架来为我们注入

* 要求：类中需要提供一个**对应参数列表的构造方法**
* 标签：`bean`标签中**`constructor-arg`**
    * 属性：
        * ~~`index`：指定参数在构造函数参数列表的索引位置，从0开始。不常用。~~
        * ~~`type`：指定参数在构造函数中的数据类型。不常用。~~
        * **`name`**：指定**参数在构造函数中的名称**
        * **`value`**：它能赋的值是**基本数据类型**和 **String 类型** 
        * **`ref`**：它能赋的值是**其他 bean 类型**，也就是说，必须得是**配置过的 bean** 

```xml
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"> 
    <constructor-arg name="name" value=" 张三 "></constructor-arg>  <!--String类型-->
    <constructor-arg name="age" value="18"></constructor-arg>       <!--基本类型-->
    <constructor-arg name="birthday" ref="now"></constructor-arg>   <!--其他bean类型-->
</bean> 
<bean id="now" class="java.util.Date"></bean> 
```

* 优势：在获取bean对象时，注入数据是必须的操作，否则对象无法创建成功。
* 弊端：优势也是其弊端，改变了bean对象的实例化方式。创建对象时，即使用不到这些数据，也必须提供。

> c-命名空间注入（本质是构造方法注入）：无法实现装配集合



**set方法注入(使用最多)**

* 要求：就是在类中**提供需要注入成**员的 **set 方法**
* 标签：`bean`标签中**`property`**
    * 属性：
        * **`name`**：找的是类中 **set 方法后面的部分** 
        * **`value`**：它能赋的值是**基本数据类型**和 **String 类型**
        * **`ref`**：它能赋的值是**其他 bean 类型**，也就是说，必须得是**配置过的 bean** 

```xml
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl">   
    <property name="name" value="test"></property> <!--String类型-->
    <property name="age" value="21"></property>    <!--基本类型-->
    <property name="birthday" ref="now"></property> <!--其他bean类型-->
</bean> 
<bean id="now" class="java.util.Date"></bean>
```

* 优势：创建对象时，注入的参数没有明确限制，可以直接使用默认构造方法
* 弊端：优势也是其弊端，若某个成员必须有值，则获取对象时有可能set方法没有执行

> p-命名空间注入（本质还是调用 set 方法）：无法实现装配集合



**注入集合属性**

就是给类中的**集合成员传值**，可以采用set方法注入的方式，只不过变量的数据类型都是集合

* 注入集合数据：只要**==结构相同，标签可以互换==** 
    * List结构可以用：array、list、set
    * Map结构可以用：map、entry；props、prop。但是properties只能存储键值都是字符串的数据。

```xml
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"> 
 <!-- 在注入集合数据时，只要结构相同，标签可以互换 -->  
    <!-- 给数组注入数据 -->  
    <property name="myStrs"> 
        <set>    
            <value>AAA</value>    
            <ref bean="car"></ref><!--也可以引用类型。只是列出来参考，实际不会这样存储不同类型数据-->
        </set> 
    </property> 
    <!-- 注入 list 集合数据 -->  
    <property name="myList">   
        <array>    
            <value>AAA</value>    
            <ref bean="car"></ref><!--也可以引用类型。只是列出来参考，实际不会这样存储不同类型数据-->
        </array>  
    </property>  
    <!-- 注入 set 集合数据 -->  
    <property name="mySet"> 
        <list>    
            <value>AAA</value>    
            <ref bean="car"></ref><!--也可以引用类型。只是列出来参考，实际不会这样存储不同类型数据-->
        </list>  
    </property> 
    <!--=============================================-->
    <!-- 注入 Map 数据 -->  
    <property name="myMap">   
        <map>    
            <entry key="testA" value="aaa"></entry> 
            <entry key-ref="car" value-ref="car"></entry> <!--key,value,key-ref,value-ref  共4种组合 -->
            
            <!--value-type="cn.itcast.pojo.Car"   可以不设置，设置后值类型唯一-->
      <!--  <entry key="testB">   也可以这样写，但是麻烦  
                <value>bbb</value> 
            </entry>  --> 
        </map>
    </property> 
    <!-- 注入 properties 数据--> 
    <property name="myProps"> 
          <props> 
            <prop key="testA">aaa</prop>    
            <prop key="testB">bbb</prop>   
        </props> 
    </property> 
</bean>
<!--========================被引用的测试bean =====================================-->
<bean name="car" class="cn.itcast.pojo.Car">
    <property name="name" value="BMW"></property>
    <property name="color" value="red"></property>
</bean>
```







