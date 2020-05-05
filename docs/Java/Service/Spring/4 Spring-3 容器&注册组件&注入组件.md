# 容器 & 注册组件 & 注入组件

## 容器接口及其实现类

### 接口及实现类

* `BeanFactory`顶层容器接口。创建对象采用**延迟加载**方式（何时使用何时创建，多例适用）
* `ApplicationContext`容器接口。创建对象采用**立即加载**方式（**读完配置文件**，**默认情况下就创建(可修改)**，单例适用）
    * `ClassPathXmlApplicationContext`，基于xml配置的实现类。只能加载**类路径**下的配置文件
    * `FileSystemXmlApplicationContext`，基于xml配置的实现类。可以加载**磁盘任意路径**的配置文件（需有访问权限）
    * `AnnotationConfigApplicationContext`，基于注解配置的实现类。读取**注解**创建容器



### 常用方法

::: tip

获取容器时使用 `AnnotationConfigApplicationContext(有@Configuration 注解的类.class)`来创建`ApplicationContext`对象。由于本身也是`@Component`，所以指定@ComponentScan时可以跳过此类（了解）

:::

* `String[] getBeanDefinitionNames()`：查询这个IoC容器中所有Bean的名称
* `String[] getBeanNamesForType(Class c)`：查询这个IoC容器中指定类型的Bean的名称
* `Map<String, Class >getBeansOfType(Class c)`：查询这个IoC容器中所有Bean的名称、和Bean对象
* `Object getBean([String beanName] [,Class c])`





## @Configuration 配置类 🔥

### @Configuration

用于**指定当前类是一个 Spring 配置类**，其底层还是`@Componet`，当创建容器时会从该类上加载注解。当**配置类**作为 AnnotationConfigApplicationContext 构造器的**参数**时，该注解可以不写（不推荐）

- `value`用于指定配置类的字节码，一般不用



### 测试步骤

1.  Maven 依赖

    ```xml
    <dependencies>
        <!--context 默认传递依赖 core、beans、expression、aop 等-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
    
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.12</version>
        </dependency>
    
    	<!-- junit5 使用查看 Github 示例 -->    
        <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.6.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    ```

2.  此时使用 Maven 来编译会警告 Java 版本，可以在 POM.mxl 中添加如下配置（Spring Boot 就是添加的这种）。

    可查看 [Maven 文档](http://maven.apache.org/plugins/maven-compiler-plugin/examples/set-compiler-source-and-target.html)配置

    ```xml
    <properties>
        <java.version>1.8</java.version>
        <maven.compiler.source>${java.version}</maven.compiler.source>
        <maven.compiler.target>${java.version}</maven.compiler.target>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <resource.delimiter>@</resource.delimiter>
    </properties>
    ```

3.  POJO

    ```java
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Person {
    
        private String name;
        private Integer age;
    
    }
    ```

4.  配置类

    ```java
    // 配置类==配置文件
    @Configuration// //告诉Spring这是一个配置类。该类为 容器构造器参数时，可省略该注解（不推荐）
    // 每次测试时记得将其他 @Configuration 注释掉，或着注释掉 @ComponentScan
    public class IocConfig1 {
    
        @Bean
        public Person person(){
            return new Person("person",1);
        }
    
        @Bean
        @Primary
        public Person person2(){
            return new Person("person2",2);
        }
    
    }
    ```

5.  测试类

    ```java
    public class IocConfig1Test {
    
    
        @Test
        public void test(){
            ApplicationContext context = new AnnotationConfigApplicationContext(IocConfig1.class);
    
            // 根据 bean 名称获取。有多个时取第一个（使用@Primary也没用，暂时就这样）
            Person person1 = (Person) context.getBean("person");
            System.out.println(person1);
    
            // 根据 bean 类型（包括子类、实现类）获取。
            // 只要容器中有唯一一个 Bean 对象类型和要注入的变量类型匹配，就注入成功，一个都没有则报错
            // 如果有多个类型匹配到，则报错。可以使用 @Primary 来指定
            Person person2 = context.getBean(Person.class);
            System.out.println(person2);
    
            // 根据 bean 名称和类型获取
            Person person3 = context.getBean("person", Person.class);
            System.out.println(person3);
    
            // 获取所有该类型的 bean
            Map<String, Person> beansOfType = context.getBeansOfType(Person.class);
            beansOfType.forEach((name,person)->{
                System.out.println(name+":"+person);
            });
    
            // 获取所有该类型的 bean 名称
            String[] beanNamesForType = context.getBeanNamesForType(Person.class);
            System.out.println(Arrays.toString(beanNamesForType));
    
    
            // 获取容器中所有 bean 名称
            String[] beanDefinitionNames = context.getBeanDefinitionNames();
            System.out.println(Arrays.toString(beanDefinitionNames));
    
        }
    }
    ```

    



## 注册组件—包扫描 & 注解🔥

::: tip

适用于自己写的类

:::

### @ComponentScans

用于多个`@ComponentScan`。属性有`value`数组，可以包含多个` @ComponentScan`。Java 8 后使用下面的



### @ComponentScan  🔥

在JDK8之后是重复注解，直接写多个，不再使用上边那个

扫描规则：

*   指定 value 或 bashPackages 即Spring在**初始化容器**时**要扫描的包**，将扫描该包及其子包下的**所有类**，然后根据规则排除

*   不指定则扫**描配置类所在包及其子包下的所有类**，然后根据规则排除。

*   **默认包括 @Componet 及其派生类，如 @Componet、@Controller、@Service、@Repository、@Configuration 等**

属性：

* `value`或`basePackages`都是用于指定要扫描的包，都是数组类型

* `excludeFilters`指定扫描的时候按照什么规则排除那些组件

* `includeFilters`指定扫描的时候只需要包含哪些组件

    值为`Filter[]`，使用`@Filter`注解，属性有`type`（如下）、`classes`（Class类型）

    * `FilterType.ANNOTATION`：按照带有的**注解类型**
    * `FilterType.ASSIGNABLE_TYPE`：按照**给定的具体类型**
    * `FilterType.ASPECTJ`：使用ASPECTJ表达式
    * `FilterType.REGEX`：使用正则指定
    * `FilterType.CUSTOM`：使用自定义规则，需要自定义`TypeFilter`的实现类，重写`match`方法

* `useDefaultFilters`在**使用指定的规则时**需要将这个值设置为`false`。默认为`true`

    *   若该值为`true`，则扫描该五个注解并匹配上述规则。一般不会这样做（很傻逼）

    *   若该值为`false`，则**仅**需匹配上述规则

::: 注意

*   `@Componet`注解是上述四个注解的底层实现，若`exclude`后则四个注解都不会扫描到

*   `includeFilters` 和 `excludeFilters` 会共同作用，必须都满足（且以 `excludeFilters` 为准）
*   上述扫描的类型指的都是**该类及其子类**，**该注解及其子注解**

:::



### 自定义 FilterType  🔥

```java
/**
 * 自定义 TypeFilter
 */
public class MyTypeFilter implements TypeFilter {
    /**
     *
     * @param metadataReader 读取到的当前正在扫描的类的信息
     * @param metadataReaderFactory 可以获取到其他任何类信息的
     * @return boolean
     * @throws IOException
     */
    @Override
    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
        //获取当前类注解的信息
        AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
        //获取当前正在扫描的类的类信息
        ClassMetadata classMetadata = metadataReader.getClassMetadata();
        //获取当前类资源（类的路径）
        Resource resource = metadataReader.getResource();

        String className = classMetadata.getClassName();
        if (className.endsWith("er")){
            System.out.println("er --->"+className);
            return true;
        } else {
            System.out.println("not er --->"+className);
            return false;
        }
    }
}
```

```java
/**
 * 包扫描 + 注解。实际中也不会这样写，太乱。可能只用简单的，或只使用自定义Filter
 */
// 配置类==配置文件
@Configuration// 告诉Spring这是一个配置类。该类为 容器构造器参数时，可省略该注解（不推荐）
// 每次测试时记得将其他 @Configuration 注释掉，或着注释掉 @ComponentScan
@ComponentScan(
        value = "top.conanan",
        includeFilters = {
                @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Controller.class}),
                // Student 没有添加任何注解，也被注册到容器中了
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {Student.class}),
                // CUSTOM 自定义 Filter
                @ComponentScan.Filter(type = FilterType.CUSTOM, classes = {MyTypeFilter.class})
        },
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Service.class})
        },
        useDefaultFilters = false)
// includeFilters 和 excludeFilters 会共同作用，必须都满足（且以 excludeFilters 为准）
public class IocConfig2 {
}
```





### Stereotype Annotations 🔥

stereotype annotations：模式注解

- `@Component`：用于**把当前类对象存入Spirng容器中**。

    注解在实现类上不指定 value 会自动指定 value。且注册的是**对象**，所以抽象类或接口无法被注册，都是实**现类才能被注册**

    - 属性：`value`：用于指定 bean 的 id。不写时默认为**当前类名，且首字母小写**

- `@Controller`**或**`@RestController`：表现层

- `@Service`：业务层

- `@Repository`：持久层

    以上三个注解的作用和属性与`@Componet`一致，且底层就是`@Componet`，是Spring提供明确的三层架构使用的注解，使三层对象更加清晰，也可以使用`@Scope`、`@Conditional`注解，详见注册组件—Bean章节：




## 注册组件—@Bean 🔥

::: tip

适用于第三方包

:::

### @Bean 🔥

用于把当前**方法的返回值**作为bean对象**注册存入Spring容器**中。该注解**只能写在方法上**

* `value`或`name`用于指定 **bean 的 id**。没写则默认为**当前方法的名称**
* 细节：当我们使用注解配置方法时，如果**方法有参数**，Spring框架会去容器中查找有没有可用的bean对象。查找的方式和`@Autowired`注解的作用是一样的





### @Scope 🔥

用于指定bean的作用范围。也可以放置注解在定义的4个组件上（除过 @Configuration，因为没作用）

`value`指定范围的取值。常用有：

- `singleton`：**单例**【默认】，一个应用只有一个对象的实例，**IoC容器启动时则会自动创建对象并放入容器**。需要注入的此时也会**注入**组件，原因是 Bean 的实例化需要所有属性都实例化

    - `@Lazy`：懒加载，**只针对单例对象**的创建时间，变为获取对象时才创建（只创建一次），但还是单例。

        可用于所有 Bean，不单单是`@Bean`，还有各种`@Componet`等等

- `prototype`：**多例**，IoC容器启动时不会创建对象，**只有每次获取对象时，才会重新创建对象实例**

- `request`：WEB 项目中，Spring 为**每个请求**创建一个bean实例

- `session`：WEB 项目中，Spring 为**每个会话**创建一个bean实例

- `global-session`：作用于**集群(Portlet)环境的全局会话范围**，当不是集群(Portlet)环境时，它就是session

```java
/**
 * 包扫描 + 注解
 */
// 配置类==配置文件
@Configuration// 告诉Spring这是一个配置类。该类为 容器构造器参数时，可省略该注解（不推荐）
// 每次测试时记得将其他 @Configuration 注释掉，或着注释掉 @ComponentScan
public class IocConfig2 {

    @Bean
    @Scope("prototype")
    public Person person() {
        System.out.println("给容器中添加 Bean person");
        return new Person("lisi",2);
    }
}
```





### @Primary 🔥

在Bean对象添加此注解，则**首先注入**这个Bean。若`@Qualifier`指定了，则这个注解失效





### @Conditional 🔥

**条件判断**，**满足**当前条件，**这个 Bean 才能被注册到容器中**。**Spring Boot中使用非常多**

可以标在**类**：满足条件则类中所有 Bean 才会注册

可以标在**方法**：只限制这个方法的 Bean

* `value`为实现了`Condition`接口的实现类数组，实现类需重写`matches`方法

    ```java
    /**
     * Condition
     */
    // 配置类==配置文件
    @Configuration// 告诉Spring这是一个配置类。该类为 容器构造器参数时，可省略该注解（不推荐）
    // 每次测试时记得将其他 @Configuration 注释掉，或着注释掉 @ComponentScan
    public class IocConfig3 {
    
        @Bean("mac-person")
        @Conditional(MacCondition.class)
        public Person person(){
            return new Person("mac",18);
        }
    
        //可以标在类（满足条件则类中所有Bean才会注册）和方法（只限制这个方法的Bean）上
        @Conditional(LinuxCondition.class)
        @Bean("linus-person")
        public Person person02(){
            return new Person("linus", 48);
        }
    }
    ```

    ```java
    public class LinuxCondition implements Condition {
        /**
         *
         * @param context 判断条件能使用的上下文（环境）
         * @param metadata 注释信息
         * @return boolean
         */
        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
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
    
            // 也可以直接获取 application.yml 等中的配置
            String property = environment.getProperty("os.name");
            System.out.println("os.name:"+property);
            return Objects.requireNonNull(property).contains("linux");
        }
    }
    ```

    ```java
    public class MacCondition implements Condition {
        /**
         *
         * @param context 判断条件能使用的上下文（环境）
         * @param metadata 注释信息
         * @return boolean
         */
        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
    
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
    
            // 也可以直接获取 application.yml 等中的配置
            String property = environment.getProperty("os.name");
            System.out.println("os.name:"+property);
            return Objects.requireNonNull(property).contains("Mac");
        }
    }
    ```

    ```java
    public class IocConfig3Test {
    
        private ApplicationContext context;
    
        @BeforeEach
        public void init(){
            context = new AnnotationConfigApplicationContext(IocConfig3.class);
            System.out.println("容器创建完成");
        }
    
        @Test
        public void test(){
        }
    
        @AfterEach
        public void destroy(){
    
            System.out.println("======获取容器中所有 Person bean 名称=====");
            String[] beanNamesForType = context.getBeanNamesForType(Person.class);
            for (String s : beanNamesForType) {
                System.out.println(s);
            }
        }
    }
    ```



::: tip

Mac 下无法通过 IDEA 的 VM options 来切换 OS

:::



### @Conditional 派生注解 🔥

Spring注解版原生的@Conditional作用

- 作用：必须是@Conditional**指定的条件成立**，才给容器中**添加组件**，**配置类**里面的所有内容才**生效**

    | @Conditional扩展注解            | 作用（判断是否满足当前指定条件）                             |
    | ------------------------------- | ------------------------------------------------------------ |
    | @ConditionalOnJava              | 系统的 Java 版本是否符合要求                                 |
    | @ConditionalOnBean              | 容器中存在指定Bean                                           |
    | @ConditionalOnMissingBean       | 容器中不存在指定Bean                                         |
    | @ConditionalOnExpression        | 满足SpEL表达式                                               |
    | @ConditionalOnClass             | 系统中有指定的类                                             |
    | @ConditionalOnMissingClass      | 系统中没有指定的类                                           |
    | @ConditionalOnSingleCandidate   | 容器中只有一个指定的Bean，或者有多个，但是这个Bean是首选Bean |
    | @ConditionalOnProperty          | 系统中指定的属性是否有指定的值                               |
    | @ConditionalOnResource          | **类路径**下是否存在指定资源文件                             |
    | @ConditionalOnWebApplication    | 当前是web环境                                                |
    | @ConditionalOnNotWebApplication | 当前不是web环境                                              |
    | @ConditionalOnJndi              | JNDI存在指定项                                               |






### @Profile 🔥

指定**组件**在哪个环境的情况下才能被注册到容器中，不指定，任何环境下都能注册这个组件

* 加了环境标识的**bean**，只有这个环境被激活的时候才能注册到容器中。默认不写是default环境，即没有标注环境标识的bean组件在任何环境下都将被注册到容器中

* 写在**配置类上**，只有是指定的环境的时候，整个配置类里面的所有配置才能开始生效

* 写在**方法**上，只限定方法返回的 Bean

    application.yml（目前解析只能这样写，缩近方式获取不到）

    ```yml
    db.url: jdbc:mysql://localhost:3306/test
    db.driverClass: com.mysql.cj.jdbc.Driver
    db.username: root
    db.password: 123456
    ```

    DataSourceConfig.Class

    ```java
    @Configuration
    @PropertySource("classpath:/application.yml")
    public class DataSourceConfig implements EmbeddedValueResolverAware {
    
        private StringValueResolver resolver;
    
        private String url;
    
        @Value("${db.username}")
        private String username;
    
        @Value("${db.driverClass}")
        private String driverClass;
    
        @Bean("hikariDataSource")
        @Profile({"prod"})
        public DataSource dataSourceProd(@Value("${db.password}") String password){
    
            HikariConfig config = new HikariConfig();
            url = resolver.resolveStringValue("${db.url}");
            config.setJdbcUrl(url);
            // config.setDriverClassName(driverClass);// 自动检测
            config.setUsername(username);
            config.setPassword(password);
            return new HikariDataSource(config);
        }
    
    
        @Bean("druidDataSource")
        @Profile({"dev"})
        public DataSource dataSourceDev(@Value("${db.password}") String password){
            DruidDataSource druidDataSource = new DruidDataSource();
            url = resolver.resolveStringValue("${db.url}");
            druidDataSource.setUrl(url);
            // druidDataSource.setDriverClassName(driverClass);// 自动检测
            druidDataSource.setUsername(username);
            druidDataSource.setPassword(password);
            return druidDataSource;
        }
    
        @Override
        public void setEmbeddedValueResolver(StringValueResolver resolver) {
            this.resolver = resolver;
        }
    }
    ```

使用（两种）：

* 运行时使用命令行动态参数：虚拟机参数位置写上`-Dspring.profiles.active=test`。Mac 下还是失败 😣

* 代码的方式激活某种环境

    ```java
    public class ProfileTest {
    
        private AnnotationConfigApplicationContext context;
    
        @BeforeEach
        public void init(){
            // context = new AnnotationConfigApplicationContext(DataSourceConfig.class);
            context = new AnnotationConfigApplicationContext();
            // 如下就是有参构造的内部实现，多了环境设置
            context.getEnvironment().setActiveProfiles("prod","test");// 设置需要激活的环境
            context.register(DataSourceConfig.class);// 注册主配置类
            context.refresh();// 启动刷新容器
            System.out.println("容器创建完成");
        }
    
        @Test
        public void test1(){
        }
    
        @AfterEach
        public void destroy(){
            // 获取容器中所有 bean 名称
            System.out.println("======获取容器中所有 bean 名称=====");
            String[] beanDefinitionNames = context.getBeanDefinitionNames();
            for (String beanDefinitionName : beanDefinitionNames) {
                System.out.println(beanDefinitionName);
            }
            System.out.println("======获取容器中所有 bean 名称=====");
    
        }
    }
    ```







## 注册组件—@Import 🔥

::: tip

用于**快速导入其他配置类（不像@Bean只能一个个导入）**，也可以理解为**直接导入第三方组件**，只能标注在类、接口、枚举类上

:::

### Class

`value`用于指定其他配置类的**Class**，是数组，被导入的其他配置类也不用加任何注解，只是一个普通类

*   注册的**Bean的id为组件的全类名**
*   **若是配置类则还会注册配置类配置的Bean**（id为指定的或方法名）

```java
@Import({Color.class,Red.class,MyImportSelector.class,MyImportBeanDefinitionRegistrar.class})
//@Import导入组件，id默认是组件的全类名
public class IOCConfig {}
```



### ImportSelector 🔥

`ImportSelector`接口：返回需要导入的组件的全类名数组，需要自定义类实现该接口。**Springboot中使用很多**🔥

*   注册的**Bean的id为组件的全类名**

```java
/**
 * 自定义逻辑返回需要导入的组件
 */
public class MyImportSelector implements ImportSelector {
    /**
     *
     * @param importingClassMetadata 当前标注@Import注解的类的其他所有注解
     * @return 要导入到容器中的组件全类名
     */
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{"top.conanan.bean.Yello","top.conanan.bean.Blue"};
    }

  	/**
  	 * TODO
  	 */
    @Override
    public Predicate<String> getExclusionFilter() {
        return null;
    }
}
```



### ImportBeanDefinitionRegistrar

`ImportBeanDefinitionRegistrar`接口，手动注册Bean到容器中，需要自定义类实现该接口。**可以指定 bean 名称**

```java
public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    /**
     * 把所有需要添加到容器中的bean；调用BeanDefinitionRegistry.registerBeanDefinition手工注册进来
     *
     * @param importingClassMetadata 当前标注@Import注解的类的所有注解信息
     * @param registry BeanDefinition注册类
     * @param importBeanNameGenerator TODO
     */
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry, BeanNameGenerator importBeanNameGenerator) {
        // 注意 Bean 名称
        boolean definition1 = registry.containsBeanDefinition("top.conanan.bean.Red");
        boolean definition2 = registry.containsBeanDefinition("top.conanan.bean.Yello");
        boolean definition3 = registry.containsBeanDefinition("top.conanan.bean.Blue");

        System.out.println(""+definition1+definition2+definition3);
        if (definition1 && definition2 && definition3){
            // 指定 Bean 的定义信息：Bean 的类型，Bean ...
            RootBeanDefinition rootBeanDefinition = new RootBeanDefinition(RainBow.class);
            // 可以指定 bean 名称
            registry.registerBeanDefinition("rainBow",rootBeanDefinition);
        }
    }
}
```



## 注册组件—FactoryBean

与`@Import`**调用无参构造创建Bean**不同的是，它**利用工厂获取Bean**。多用于**整合Spring和其他框架**的底层代码

不能在 ColorFactoryBean 类上使用 @Component 注解，没用！！！

```java
/**
 * 创建一个Spring定义的FactoryBean，范型代表要创建的对象类型
 */
public class ColorFactoryBean implements FactoryBean<Color> {
    /**
     * 返回一个Color对象，这个对象会添加到容器中
     *
     * @return 返回一个Color对象
     * @throws Exception
     */
    @Override
    public Color getObject() throws Exception {
        System.out.println("ColorFactoryBean...getObject...");
        return new Color();
    }

    @Override
    public Class<?> getObjectType() {
        return Color.class;
    }

    /**
     * 控制 Bean 是否为单例
     * * true：这个bean是单实例，在容器中保存一份
     * * false：多实例，每次获取都会创建一个新的bean；
     */
    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

```java
/**
 * FactoryBean
 */
// 配置类==配置文件
@Configuration// 告诉Spring这是一个配置类。该类为 容器构造器参数时，可省略该注解（不推荐）。
// 每次测试时记得将其他 @Configuration 注释掉，或着注释掉 @ComponentScan
// @Import(ColorFactoryBean.class)// 也可以使用 @Bean 来注册 bean，并可以自定义 bean name
public class IocConfig7 {

    @Bean
    public ColorFactoryBean colorFactoryBean(){
        return new ColorFactoryBean();
    }

}
```

```java
/**
 * FactoryBean
 */
public class IocConfig7Test {

    private ApplicationContext context;

    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(IocConfig7.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test(){

        // 工厂Bean获取的是工厂bean调用getObject创建的对象。但是容器内始终没有通过getObject创建的对象，只有 ColorFactoryBean
        Object bean1 = context.getBean("colorFactoryBean");
        System.out.println(bean1.getClass());// class top.conanan.bean.Color
        Color bean3 = context.getBean(Color.class);
        System.out.println(bean3.getClass());// class top.conanan.bean.Color

        // 查看 BeanFactory 工厂类接口即可看到该 Field： String FACTORY_BEAN_PREFIX = "&";
        Object bean2 = context.getBean("&colorFactoryBean");
        System.out.println(bean2.getClass());// class top.conanan.bean.ColorFactoryBean
        ColorFactoryBean bean4 = context.getBean(ColorFactoryBean.class);
        System.out.println(bean4.getClass());// class top.conanan.bean.ColorFactoryBean

        // No bean named 'top.conanan.bean.Color' available. Color,color 都不行
        // Object color = context.getBean("color");
    }

    @AfterEach
    public void destroy(){
        // 获取容器中所有 bean 名称
        System.out.println("======获取容器中所有 bean 名称=====");
        String[] beanDefinitionNames = context.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            System.out.println(beanDefinitionName);
        }
        System.out.println("======获取容器中所有 bean 名称=====");
    }
}
```



## 注册组件—总结

*   包扫描+组件标注注解（@Controller/@Service/@Repository/@Component）：**自己写的类**
*   `@Bean`：导入的**第三方**包里面的组件
*   `@Import`：**快速给容器中导入一个组件**
    *   @Import(要导入到容器中的组件)；容器中就会自动注册这个组件，id默认是全类名
    *   ImportSelector🔥：返回需要导入的组件的全类名数组。Spring Boot 中使用非常多
    *   ImportBeanDefinitionRegistrar：手动注册bean到容器中
*   使用Spring提供的 FactoryBean（工厂Bean）。多用于**整合Spring和其他框架**的底层代码
    *   默认获取到的是工厂bean调用getObject创建的对象
    *   要获取工厂Bean本身，我们需要给id前面加一个`&`，`&colorFactoryBean`



## 注入组件—自动注入

::: tip

作用和xml配置文件中的`<bean>`标签编写`<property>`标签实现功能一致。利用DI完成依赖关系赋值

AutowiredAnnotationBeanPostProcessor：后置处理器，解析完成自动装配功能（以下四个）	

:::



### @Autowired 🔥

*   **byType**：一般**在 IoC 容器启动时**自动**按照类型注入**。首先按照类型去找（**包括子类、实现类**），当容器中**有唯一一个** Bean 对象类型和要注入的变量**类型匹配**，就注入成功，**一个都没有**则**报错**，无法启动！类比仅使用 IoC 容器获取 Bean。

*   **byName**：如果有**多个类型匹配到**，则使用**变量名称**作为 Bean 的 id，在 Spring 容器查找，找到了也可以注入成功，否则报错。类比仅使用 IoC 容器获取 Bean。可以**据此来注入一个接口，但是变量名称修改为实现类的名称**，即可完成**切换**注入实现类（不理想）。
*   可以使用`required=false`指定后，IoC 容器启动时注入失败也不会报错（了解）

* 出现的位置如下：
    * 标在构造器上：如果组件只有一个构造器且为有参构造器，这个有参构造器的@Autowired可以**省略**
    * @Bean + 方法参数：参数从容器中获取，则@Autowired可以**省略**



#### FIELD 属性

Spring 不推荐，但是最方便

```java
@ToString
public class Boss1 {

    @Autowired
    private Car car;

    public void print(){
        System.out.println(car);
    }
}
```

```java
public class Car {
}
```

```java
@Configuration
@Import({Boss1.class, Car.class})
public class DiConfig1 {

}
```

```java
public class DiConfig1Test {

    private ApplicationContext context;

    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(DiConfig1.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test1(){
        Boss1 boss1 = context.getBean(Boss1.class);
        boss1.print();

        Car car = context.getBean(Car.class);
        System.out.println(car);// 这个car和上面那个一致
    }
}
```







#### METHOD 方法注入（setter 注入）

Spring 容器创建当前对象时，就会调用该方法，完成赋值。方法参数的值会自动从容器中获取

```java
@ToString
public class Boss2 {

    private Car car;

    public Car getCar() {
        return car;
    }

    @Autowired
    public void setCar(Car car) {
        this.car = car;
    }
}
```

```java
public class Car { }
```

```java
@Configuration
@Import({Boss2.class, Car.class})
public class DiConfig1 {

}
```

```java
public class DiConfig1Test {

    private ApplicationContext context;

    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(DiConfig1.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test2(){
        Boss2 boss2 = context.getBean(Boss2.class);
        System.out.println(boss2);

        Car car = context.getBean(Car.class);
        System.out.println(car);// 这个car和上面那个一致
    }
}
```





#### CONSTRUCTOR—构造器

*   Spring 官方不推荐使用 Field 注入，推荐使用构造器注入（就是比较麻烦）

*   **如果组件只有一个构造器且是有参构造器**，这个有参构造器上的@Autowired可以**省略**

```java
@ToString
public class Boss3 {

    private Car car;

    public Boss3(){
        System.out.println("Boss3 无参构造");
    }

    @Autowired// 有多个则不能省略
    public Boss3(Car car){
        this.car = car;
        System.out.println("Boss3 有参构造");
    }
}
```

```java
public class Car {
}
```

```java
@Configuration
@Import({Boss3.class, Car.class})
public class DiConfig1 {

}
```

```java
public class DiConfig1Test {

    private ApplicationContext context;

    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(DiConfig1.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test3(){
        Boss3 boss3 = context.getBean(Boss3.class);
        System.out.println(boss3);

        Car car = context.getBean(Car.class);
        System.out.println(car);// 这个car和上面那个一致
    }
}
```







#### PARAMETER—参数 🔥

*   @Bean+方法参数，则参数从容器中获取，此时@Autowired可以**省略**

```java
@ToString
public class Boss4 {

    private Car car;

    public Boss4(){
        System.out.println("Boss4 无参构造");
    }

    public Boss4(Car car){
        this.car = car;
        System.out.println("Boss4 有参构造");
    }
}
```

```java
public class Car {
}
```

```java
@Configuration
@Import({Car.class})
public class DiConfig1 {

    @Bean
    /*@Autowired*/
    public Boss4 boss4(/*@Autowired*/ Car car){
        return new Boss4(car);
    }
}
```

```java
public class DiConfig1Test {

    private ApplicationContext context;

    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(DiConfig1.class);
        System.out.println("容器创建完成");
    }

	 @Test
    public void test4(){
        Boss4 boss4 = context.getBean(Boss4.class);
        System.out.println(boss4);

        Car car = context.getBean(Car.class);
        System.out.println(car);// 这个car和上面那个一致
    }
}
```







### @Qualifier 🔥

*   在自动按照类型注入的**基础之上**，**再按照 Bean 的 id 注入**

*   在给**类成员注入时不能单独使用**，但是**给方法参数注入时可以单独使用**

- 属性：`value`用于指定注入的bean的id

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





### @Primary 🔥

在 @Bean 对象添加此注解，则首先注入这个Bean。若`@Qualifier`指定了，则这个注解失效



### @Resource

JaveEE（JSR250）的注解，耦合性低

*   可以和@Autowired一样实现自动装配功能，默认是**按照组件名称进行装配的**，找不到再看类型装配。可以独立使用。

*   不支持@Primary功能；不支持@Autowired（reqiured=false）;

- 属性：`name`用于指定注入的bean的id



### @Inject

JaveEE（JSR330）的注解，耦合性低（也不一定，对于 Spring 开发来说）

- 需要导入`javax.inject`依赖。
- 和@Autowired的功能一样，可以使用@Qualifier，只是没有required=false的功能





## 注入组件—Aware接口

若自定义组件想要**使用 Spring 容器底层的一些组件**，如：ApplicationContext，BeanFactory 等到

* 自定义组件需要**实现 xxxAwar**e（参考Aware接口设计）：在**创建该组件对象**的时候，会调用接口规定的方法注入相关组件
* xxxAware：**功能实现使用对应的xxxProcessor**，如：ApplicationContextAware —> ApplicationContextAwareProcessor

```java
public class Red implements ApplicationContextAware, BeanNameAware, EmbeddedValueResolverAware {

    private ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
        System.out.println("传入的IoC: " + applicationContext);
        // 传入的IoC: org.springframework.context.annotation.AnnotationConfigApplicationContext@df27fae, started on Wed May 06 00:37:46 CST 2020
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("当前 bean 的名字: " + name);
        // 当前 bean 的名字: top.conanan.aware.Red
    }

    @Override
    public void setEmbeddedValueResolver(StringValueResolver resolver) {
        String resolveStringValue = resolver.resolveStringValue("你好 ${os.name} 我是 #{20*18}");
        System.out.println("解析的字符串："+resolveStringValue);
        // 解析的字符串：你好 Mac OS X 我是 360
    }
}
```

```java
@Configuration
@Import(Red.class)
public class AwareConfig1 {

}
```

```java
public class AwareConfig1Test {

    private ApplicationContext context;

    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(AwareConfig1.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test1(){
    }

    @AfterEach
    public void destroy(){
        // 获取容器中所有 bean 名称
        System.out.println("======获取容器中所有 bean 名称=====");
        String[] beanDefinitionNames = context.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            System.out.println(beanDefinitionName);
        }
        System.out.println("======获取容器中所有 bean 名称=====");
    }
}
```




*   




## 面向对象中变化的应对方案

### 策略模式

*   制定一个 Interface，用多个类实现该 Interface

    常规配置：key: value；XML 配置：类/对象

    *   @Autowired 的 byName 切换 Bean
    *   @Qualifier 制定 name 的 Bean
    *   有选择的只注入一个 Bean（其他注释掉）
    *   `@Primary`首先注入，推荐
    *   `@Conditional`等，推荐



### 配置

*   一个类，使用**属性（可读取配置）来解决变化**。如 JDBC 的 url 等。相比第一个方法不灵活（只能修改配置，不能修改类），当然可以实现一个 Interface 来综合使用。
    *   配置文件集中性
    *   清晰，没有业务逻辑



根据需要选择上述两种方案





