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
* `Object getBean([String beanName ,] [Class c])`





## `@Configuration`配置类 🔥

### `@Configuration`

用于**指定当前类是一个Spring配置类**，其底层还是`@Componet`，当创建容器时会从该类上加载注解。当**配置类**作为 AnnotationConfigApplicationContext 构造器的**参数**时，该注解可以不写（不推荐）

- `value`用于指定配置类的字节码，一般不用



### 容器 & Bean 测试步骤

1.  Maven 依赖

    ```xml
    <dependencies>
      <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.5.RELEASE</version>
      </dependency>
    
      
      <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.12</version>
      </dependency>
    
      <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
      <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.6.2</version>
        <scope>test</scope>
      </dependency>
    </dependencies>
    ```

2.  POJO

    ```java
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Person {
    
        private String name;
        private Integer age;
    
    }
    ```

3.  配置类

    ```java
    @Configuration// 该类为 容器构造器参数时，可省略该注解（不推荐）
    public class MainConfig {
    
        @Bean("person")
        public Person getPerson(){
            return new Person("conanan",18);
        }
    }
    ```

4.  测试类

    ```java
    @Test
    public void testBean(){
      ApplicationContext context = new AnnotationConfigApplicationContext(MainConfig.class);
      Person person = context.getBean(Person.class);
      System.out.println(person);
    
      String[] beanNamesForType = context.getBeanNamesForType(Person.class);
      System.out.println(Arrays.toString(beanNamesForType));
    }
    ```

    



## 注册组件—包扫描 & 四大注解🔥

::: tip

适用于自己写的类

:::

### `@ComponentScans`

用于多个`@ComponentScan`。属性有`value`数组，可以包含多个` @ComponentScan`。Java 8 后使用下面的



### ` @ComponentScan`  🔥

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

* `useDefaultFilters`在**仅使用指定的规则时**需要将这个值设置为`false`。默认为`true`，即扫描上面四个注解

    若该值为`true`，则扫描该四个注解并匹配上述规则。一般不会这样做（很傻逼）

    若该值为`false`，则仅需匹配上述规则

    注意：`@Componet`注解是上述三个注解的底层实现，若`exclude`后则四个注解都不会扫描到

    

### 自定义`FilterType`  🔥

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
        System.out.println("--->"+className);
        return className.contains("er");
    }
}
```

```java
@Configuration
@ComponentScan(
        value = "conanan",
        includeFilters = {
                @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Controller.class}),
                // Student 没有添加任何注解
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {Student.class}),
                // CUSTOM 会过滤上面过滤后的类（防止影响可以注释掉）
                @ComponentScan.Filter(type = FilterType.CUSTOM, classes = {MyTypeFilter.class}) 
        },
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = {Service.class})
        },
        useDefaultFilters = false
)
public class IOCConfig {

    @Bean("person")
    public Person getPerson(){
        return new Person("conanan",18);
    }
}
```





### Stereotype Annotations 🔥

stereotype annotations：模式注解

- `@Component`：用于**把当前类对象存入Spirng容器中**。

    注解在实现类上不指定 value 会自动指定 value（抽象类的名词，比如删除 Impl）

    - 属性：`value`：用于指定bean的id。不写时默认为当前类名，且首字母小写

- `@Controller`**或**`@RestController`：表现层

- `@Service`：业务层

- `@Repository`：持久层

    以上三个注解的作用和属性与`@Componet`一致，且底层就是`@Componet`，是Spring提供明确的三层架构使用的注解，使三层对象更加清晰，也可以使用`@Scope`、`@Conditional`注解，详见注册组件—Bean章节：




## 注册组件—Bean 🔥

::: tip

适用于第三方包

:::

### `@Bean`  🔥

用于把当前**方法的返回值**作为bean对象**注册存入Spring容器**中。该注解**只能写在方法上**

* `value`或`name`用于指定**bean的id**。没写则默认为**当前方法的名称**
* 细节：当我们使用注解配置方法时，如果**方法有参数**，Spring框架会去容器中查找有没有可用的bean对象。查找的方式和`@Autowired`注解的作用是一样的





### `@Scope`  🔥

用于指定bean的作用范围。也可以放置注解在定义的4个组件上

`value`指定范围的取值。常用有：

- `singleton`：**单例**【默认】，一个应用只有一个对象的实例，**IoC容器启动时则会自动创建对象并放入容器**，且**注入**（原因是 Bean 的实例化需要所有属性都实例化）

    - `@Lazy`：懒加载，修改单例对象创建时间，变为获取对象时才创建（只创建一次），但还是单例。

        可用于所有 Bean，不单单是`@Bean`，还有各种`@Componet`等等

- `prototype`：**多例**，**只有每次获取对象时，才会重新创建对象实例**

- `request`：WEB 项目中，Spring 为**每个请求**创建一个bean实例

- `session`：WEB 项目中，Spring 为**每个会话**创建一个bean实例

- `global-session`：作用于**集群(Portlet)环境的全局会话范围**，当不是集群(Portlet)环境时，它就是session

```java
@Configuration
public class IOCConfig {

    @Bean("person")
    @Scope("singleton")
    @Lazy
    public Person getPerson(){
        return new Person("conanan",18);
    }
}
```





### `@Primary` 🔥

在Bean对象添加此注解，则首先注入这个Bean。若`@Qualifier`指定了，则这个注解失效



### `@Conditional`🔥

**条件判断**，**满足**当前条件，**这个 Bean 才能被注册到容器中**。**Spring Boot中使用非常多**

可以标在类（满足条件则类中所有Bean才会注册）和方法（只限制这个方法的Bean）上

* `value`为实现了`Condition`接口的实现类数组，实现类需重写`matches`方法

    ```java
    @Configuration
    public class IOCConfig {
    
      @Bean("mac-person")
        @Conditional(MacCondition.class)
        public Person person(){
            return new Person("conanan",18);
        }
    
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
    
            String property = environment.getProperty("os.name");// 也可以直接获取 application.yml 等中的配置
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
    
            Environment environment = context.getEnvironment();
    
            String property = environment.getProperty("os.name");
            return Objects.requireNonNull(property).contains("Mac");
        }
    }
    ```

    ```java
    @Test
    public void testBean(){
      // 获得容器
      ApplicationContext context = new AnnotationConfigApplicationContext(IOCConfig.class);
      printBeansName(context);
    
    }
    
    private void printBeansName(ApplicationContext context){
      String[] beanDefinitionNames = context.getBeanDefinitionNames();
      for (String beanDefinitionName : beanDefinitionNames) {
        System.out.println(beanDefinitionName);
      }
    }
    ```



### `@Conditional`派生注解

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






### `@Profile`

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







## 注册组件—`@Import` 🔥

::: tip

用于**快速导入其他配置类（不像@Bean只能一个个导入）**，也可以理解为**直接导入第三方组件**，只能标注在类、接口、枚举类上

:::

### `Class`

`value`用于指定其他配置类的**Class**，是数组，被导入的其他配置类也不用加`@Configuration`注解

注册的**Bean的id为组件的全类名**；**若是配置类则还会注册配置的Bean**（id为指定的或方法名）

```java
@Import({Color.class,Red.class,MyImportSelector.class,MyImportBeanDefinitionRegistrar.class})
//@Import导入组件，id默认是组件的全类名
public class IOCConfig {}
```



### `ImportSelector` 🔥

`ImportSelector`接口：返回需要导入的组件的全类名数组，需要自定义类实现该接口。**Springboot中使用很多**🔥

注册的**Bean的id为组件的全类名**

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



### `ImportBeanDefinitionRegistrar`

`ImportBeanDefinitionRegistrar`接口：手动注册Bean到容器中，需要自定义类实现该接口

**可以指定 bean 名称**

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



## 注册组件—`FactoryBean`

与`@Import`**调用无参构造创建Bean**不同的是，它**利用工厂获取Bean**。多用于**整合Spring和其他框架**的底层代码

不能在 ColorFactoryBean 类上使用 @Component 注解，没用！！！

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
	/** 
	 * 控制 Bean 是否为单例
   * true：这个bean是单实例，在容器中保存一份
   * false：多实例，每次获取都会创建一个新的bean；
   */
	@Override
	public boolean isSingleton() {
		return false;
	}
}
```

```java
// 不能在 ColorFactoryBean 类上使用 @Component 注解，没用！！！
@Bean
public ColorFactoryBean colorFactoryBean(){
    return new ColorFactoryBean();
}
```

```java
@Test
public void testBean(){
  // 获得容器
  ApplicationContext context = new AnnotationConfigApplicationContext(IOCConfig.class);
  printBeansName(context);

  // 工厂Bean获取的是工厂bean调用getObject创建的对象
  Object bean1 = context.getBean("colorFactoryBean");
  System.out.println(bean1.getClass());// class top.conanan.bean.Color
  Color bean3 = context.getBean(Color.class);
  System.out.println(bean3.getClass());// class top.conanan.bean.Color

  Object bean2 = context.getBean("&colorFactoryBean");
  System.out.println(bean2.getClass());// class top.conanan.bean.ColorFactoryBean
  ColorFactoryBean bean4 = context.getBean(ColorFactoryBean.class);
  System.out.println(bean4.getClass());// class top.conanan.bean.ColorFactoryBean

  // No bean named 'top.conanan.bean.Color' available. Color,color 都不行
  // Object color = context.getBean("top.conanan.bean.Color");

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



## 注入组件

::: tip

作用和xml配置文件中的`<bean>`标签编写`<property>`标签实现功能一致。利用DI完成依赖关系赋值

:::

### 注入方式



#### Field 注入

Spring 不推荐，但是最方便

```java
@Autowired
private HelloService helloService;
```



#### setter 注入

```java
@Component
public class HelloController {

    private TestComponet testComponet;

    @Autowired// 不能省略
    public void setTestComponet(TestComponet testComponet) {
        this.testComponet = testComponet;
    }

    public void test(){
        System.out.println(testComponet);
    }
}
```

```java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private HelloController helloController;

    @Test
    void contextLoads() {
        helloController.test();
    }
}
```





#### 构造器注入

Spring 官方不推荐使用 Field 注入，推荐使用构造器注入（就是比较麻烦）

```java
@Component
public class HelloController {

    private final TestComponet testComponet;

    //@Autowired// 可以省略
    public HelloController(TestComponet testComponet) {
        this.testComponet = testComponet;
    }

    public void test(){
        System.out.println(testComponet);
    }
}
```

```java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private HelloController helloController;

    @Test
    void contextLoads() {
        helloController.test();
    }
}
```



### `@Autowired`🔥

*   **byType**：一般**在 IoC 容器启动时**自动**按照类型注入**。首先按照类型去找（**包括子类、实现类**），只要容器中**有唯一一个** Bean 对象类型和要注入的变量**类型匹配**，就注入成功，**一个都没有**则**报错**，无法启动！

*   **byName**：如果有**多个类型匹配到**，则使用**变量名称**作为 Bean 的 id，在 Spring 容器查找，找到了也可以注入成功，否则报错。可以**据此来注入一个接口，但是变量名称修改为实现类的名称**，即可完成**切换**注入实现类（不理想）

* 出现的位置：**属性**，**方法**（get、set），**构造器**，**参数**
    * 标注在方法的参数位置：@Bean+方法参数；参数从容器中获取；@Autowired可以**省略**
    * 标在构造器上：如果组件只有一个有参构造器，这个有参构造器的@Autowired可以**省略**

- 可以使用`required=false`指定后，IoC 容器启动时注入失败也不会报错（了解）



### `@Qualifier`🔥

*   在自动按照类型注入的**基础之上**，**再按照 Bean 的 id 注入**

*   在给**类成员注入时不能单独使用**，但是**给方法参数注入时可以单独使用**

- 属性：`value`用于指定注入的bean的id





### `@Resource`

JaveEE（JSR250）的注解，耦合性低

*   可以和@Autowired一样实现自动装配功能，默认是**按照组件名称进行装配的**，找不到再看类型装配。可以独立使用。

*   不支持@Primary功能；不支持@Autowired（reqiured=false）;

- 属性：`name`用于指定注入的bean的id



### `@Inject`

JaveEE（JSR330）的注解，耦合性低（也不一定，对于 Spring 开发来说）

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





