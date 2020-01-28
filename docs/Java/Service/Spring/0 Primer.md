# 0 Primer

**框架**（Framework）是整个或部分系统的**可重用设计**，表现为一组抽象构件及构件实例间交互的方法；另一种定义认为，框架是可被应用开发者定制的应用骨架。前者是从应用方面而后者是从目的方面给出的定义。

框架一般处在低层应用平台（如 J2EE）和高层业务逻辑之间的中间层。 

## 简介

随着动态语言的流行 (Ruby、Groovy、Scala、Node.js)，Java 的开发显得格外的笨重：J2EE笨重的开发、**繁多的配置**、**依赖管理的耗时耗力**、低下的开发效率、复杂的部署流程以及第三方技术集成难度大。

在上述环境下，Spring Boot 应运而生。它使用 “**约定大于配置**” （项目中存在大量的配置，此外还内置了一个习惯性的配置，让你无需手动进行配置）的理念让你的项目快速的运行起来。使用 Spring Boot 很容易创建一个独立运行（运行 Jar，内嵌 Servlet 容器）准生产级别的基于 Spring 框架的项目，使用 Spring Boot 你可以不用或者只需很少的 Spring 配置。Spring Boot 可以称之为 **新一代 Jakarta EE 开发标准**

- **优点**：

    - 快速构建项目：SpringBoot不是对Spring功能上的增强，而是提供了一种快速使用Spring的方式
    - 对主流开发框架的无配置集成
    - 项目可独立运行，无需外部依赖 Servlet 容器
    - 提供运行时的应用监控
    - 极大地提高了开发、部署效率
    - 与云计算的天然集成

- **核心功能**

    - **起步依赖（starter-*）**

        起步依赖本质是一个Maven项目对象模型（POM），定义了对其他库的传递依赖，这些东西加在一起即支持某项功能。

    - **自动配置**

        Spring Boot的自动配置是一个运行时（更准确地说，是应用程序启动时）的过程，考虑了众多因素，才决定Spring配置应该用哪个，不该用哪个。该过程是Spring自动完成的。



## Spring 简史

### Spring 1.x 时代

在 Spring1.x 时代，都是通过 xml 文件配置 bean，随着项目的不断扩大，需要将 xml 配置分放到不同的配置文件中，需要频繁的在 java 类和 xml 配置文件中切换。

>   POJO：比JavaBean更纯净的简单类或接口，主要用于数据的临时传递，它只能装载数据， 作为数据存储的载体，而不具有业务逻辑处理的能力。
>
>   JavaBean：虽然数据的获取与POJO一样，但是JavaBean当中可以有其它的方法。

### Spring 2.x 时代

随着 JDK 1.5 带来的注解支持，Spring2.x 可以使用注解对 Bean 进行申明和注入，大大的减少了 xml 配置文件，同时也大大简化了项目的开发。

那么，问题来了，究竟是应该使用 xml 还是注解呢？

最佳实践：

-   应用的基本配置用 xml，比如：数据源、资源文件等
-   业务开发用注解，比如：Service 中注入 bean 等

### Spring 3.x 时代

从 Spring 3.x 开始提供了 Java 配置方式，使用 Java 配置方式可以更好的理解你配置的 Bean，并且 Spring 4.x 和 Spring boot 都推荐使用 java 配置的方式。

### Spring 5.x 时代

Spring 5.x 是 Java 界首个支持响应式的 Web 框架，是 Spring 的一个重要版本，距离 Spring4.x 差不多四年。在此期间，大多数增强都是在 Spring Boot 项目中完成的，其最大的亮点就是提供了完整的端到端响应式编程的支持（新增 Spring WebFlux 模块）。

Spring WebFlux 同时支持使用旧的 Spring MVC 注解声明 `Reactive Controller`。和传统的 `MVC Controller` 不同，`Reactive Controller` 操作的是 **非阻塞** 的 `ServerHttpRequest` 和 `ServerHttpResponse`，而不再是 Spring MVC 里的 HttpServletRequest 和 HttpServletResponse。

至此也代表着 Java 正式迎来了响应式异步编程的时代。



## Hello World

### POM

使用 Spring Initializr 初始化 Spring Boot 项目： https://start.spring.io/，IDEA中自带。根据需求选择需要的依赖：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
  <!--所有的springboot工程都必须继承spring-boot-starter-parent，也可以去掉并自定义-->
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.2.2.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
  
  <!--该项目的Maven坐标-->
	<groupId>top.conanan</groupId>
	<artifactId>study-spring-boot</artifactId>
	<version>1.0.0-SNAPSHOT</version>
  
	<name>study-spring-boot</name>
	<description>Demo project for Spring Boot</description>

  <!--选择JDK版本后自动配置-->
	<properties>
		<java.version>11</java.version> <!--Java8 这里显示为1.8-->
	</properties>

  <!--依赖-->
	<dependencies>
    <!--web功能的起步依赖，若是个普通Java工程，则会是spring-boot-starter-->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--自动添加的测试配置。Spring Boot 2.2.2目前使用的是 JUnit5-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
			<exclusions>
				<exclusion>
					<groupId>org.junit.vintage</groupId>
					<artifactId>junit-vintage-engine</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
   
    <!--Spring Boot DevTools提供快速应用程序重启，LiveReload和配置，以增强开发体验。-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
			<optional>true</optional>
		</dependency>
    <!--Lombok Java注释库，有助于减少样板代码。-->
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>
    <!--Spring配置处理器为开发人员生成元数据，以便在使用自定义配置键时提供上下文帮助和“代码完成”（ex.application.properties）-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-configuration-processor</artifactId>
			<optional>true</optional>
		</dependency>
    
    <!--Spring Boot Actuator支持内置（或自定义）端点，可以监控和管理应用程序，例如应用程序运行状况，指标，会话等。用于 Ops -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
	</dependencies>

  <!--自动添加的maven插件，这个插件可将应用打包成可执行的jar包。可以通过java -jar 包名来运行应用-->
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>
```

### Application

* 默认生成的 Spring Boot 项目。主程序已经生成好了，我们只需要我们自己的逻辑

  ```java
  //声明该类是一个SpringBoot引导类
  @SpringBootApplication
  public class StudySpringBootApplication {
  	//main是java程序的入口
  	public static void main(String[] args) {
      //run方法 表示运行SpringBoot的引导类  run参数就是SpringBoot引导类的字节码对象
  		SpringApplication.run(StudySpringBootApplication.class, args);
  	}
  }
  ```

### resources

目录结构

- `static`：保存所有的静态资源； js、css、images等
- `templates`：保存所有的模板页面；（Spring Boot默认jar包使用嵌入式的Tomcat，默认不支持JSP页面）；可以使用模板引擎如`freemarker`、`thymeleaf`
- `application.properties`：Spring Boot应用的配置文件，可以修改一些默认设置
- 可以手动新建目录，如`mapper`

### HelloController

必须在引导类`StudySpringBootApplication`**同级包或者子级包**中创建，才能被扫描到

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello(){
        return "study spring boot";
    }
}
```

run 后可使用 Terminal 测试：`curl http://localhost:8080/hello`

上述POM中有actuator用于检查应用状态，`curl http://localhost:8080/actuator/health`，返回如下，注意只能用于 run 模式运行的应用，debug 模式不起作用

```json
{"status":"UP"}
```

### Test

```java
// Spring Boot 2.2.2目前使用的是 JUnit5。很多处和 JUnit4 不一样。如不需要添加注解 @RunWith(SpringRunner.class)
// 使用webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT后，每次启动测试都会随机生成一个 port
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class StudySpringBootApplicationTests {

	@Autowired
	private HelloController helloController;

	@LocalServerPort
	private int port;

  // Test 特有的，只需注入即可
	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	void hello() {
		System.out.println("hello");
		System.out.println(helloController);
	}

	@Test
	public void greetingShouldReturnDefaultMessage() throws Exception {
		String s = restTemplate.getForObject("http://localhost:" + port + "/hello", String.class);
		System.out.println(s);
	}
}
```

`@SpringBootTest`annotation tells Spring Boot to go and look for a main configuration class (one with `@SpringBootApplication` for instance), and use that to start a Spring application context. You can run this test in your IDE or on the command line (`mvn test` or `gradle test`) and it should pass. 

- Maven打包：`mvn clean package -Dmaven.test.skip`

  可以看到带有`.original`的为原始包，和带有所有依赖的`jar`包，可以执行`java -jar`启动



## 原理分析

### 起步依赖原理分析

按住Ctrl点击pom.xml中的spring-boot-starter-parent，跳转到了spring-boot-starter-parent的pom.xml，xml配置如下（配置了配置文件名称位置等信息）：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.1.2.RELEASE</version>
    <relativePath>../../spring-boot-dependencies</relativePath>
</parent>
......
```

按住Ctrl点击pom.xml中的spring-boot-dependencies，跳转到了spring-boot-dependencies的pom.xml，xml配置如下：

```xml
<properties>
    <activemq.version>5.15.8</activemq.version>
    <antlr2.version>2.7.7</antlr2.version>
    <appengine-sdk.version>1.9.71</appengine-sdk.version>
    <artemis.version>2.6.3</artemis.version>
    <aspectj.version>1.9.2</aspectj.version>
    ......
</properties>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot</artifactId>
            <version>2.1.2.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-test</artifactId>
            <version>2.1.2.RELEASE</version>
        </dependency>
        ......
    </dependencies>
</dependencyManagement>
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.johnzon</groupId>
                <artifactId>johnzon-maven-plugin</artifactId>
                <version>${johnzon.version}</version>
            </plugin>
            ......
        </plugins>
    </pluginManagement>
</build>
```

从上面的spring-boot-dependencies的pom.xml中我们可以发现，一部分坐标的**版本、依赖管理、插件管理**已经定义好，所以我们的SpringBoot工程继承spring-boot-starter-parent后已经具备**版本锁定**等配置了。所以起步依赖作用就是进行**依赖的传递**。

同理spring-boot-starter-web就是将web开发要使用的spring-web、spring-webmvc等坐标进行了“打包”，这样我们的工程只要引入spring-boot-starter-web起步依赖的坐标就可以进行web开发了，同样体现了依赖传递的作用。

### 自动配置原理解析

按住Ctrl点击查看启动类MySpringBootApplication上的注解@SpringBootApplication，源码如下：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = {
		@Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {

	/**
	 * Exclude specific auto-configuration classes such that they will never be applied.
	 * @return the classes to exclude
	 */
	@AliasFor(annotation = EnableAutoConfiguration.class)
	Class<?>[] exclude() default {};

	... ... ...

}
```

其中，

`@ComponentScan`：组件扫描，但是仅扫描注解了`@SpringBootApplication`类所在的同级包和子级包

`@SpringBootConfiguration`：等同与`@Configuration`，既标注该类是Spring的一个配置类

`@EnableAutoConfiguration`：SpringBoot自动配置功能开启

按住Ctrl点击查看注解`@EnableAutoConfiguration`

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
	... ... ...
}
```

其中，

`@AutoConfigurationPackage`**：**自动配置包**，**如下注解的简写`@Import(AutoConfigurationPackages.Registrar.class)` Spring底层注解`@Import`，给容器中导入一个组件；导入的组件由`AutoConfigurationPackages.Registrar.class`指定，这个类有一个方法，通过注解metadata，将主配置类（`@SpringBootApplication`）所在包及下面所有子包里面的所有组件扫描到Spring容器

`@Import(AutoConfigurationImportSelector.class) `导入了`AutoConfigurationImportSelector`类

按住Ctrl点击查看`AutoConfigurationImportSelector`源码

```java
public String[] selectImports(AnnotationMetadata annotationMetadata) {
    ... ... ...
        List<String> configurations = getCandidateConfigurations(annotationMetadata,
                                                                 attributes);
    configurations = removeDuplicates(configurations);
    Set<String> exclusions = getExclusions(annotationMetadata, attributes);
    checkExcludedClasses(configurations, exclusions);
    configurations.removeAll(exclusions);
    configurations = filter(configurations, autoConfigurationMetadata);
    fireAutoConfigurationImportEvents(configurations, exclusions);
    return StringUtils.toStringArray(configurations);
}


protected List<String> getCandidateConfigurations(AnnotationMetadata metadata,
                                                  AnnotationAttributes attributes) {
    List<String> configurations = SpringFactoriesLoader.loadFactoryNames(
        getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader());

    return configurations;
}
```

其中，`SpringFactoriesLoader.loadFactoryNames` 方法的作用就是从`META-INF/spring.factories`文件中读取指定类对应的全类名的列表，如xxxAutoConfiguration

![1550170881470](./images/1550170881470.png)

`spring-autoconfigure-metadata.properties` 文件中有关自动配置的配置信息如下：

```
org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration,\
......
```

上面配置文件存在大量的以Configuration为结尾的类名称，这些类就是存有自动配置信息的类，而SpringApplication在获取这些类名后再加载

我们以`ServletWebServerFactoryAutoConfiguration`为例来分析源码：

```java
@Configuration
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnClass(ServletRequest.class)
@ConditionalOnWebApplication(type = Type.SERVLET)
@EnableConfigurationProperties(ServerProperties.class)
@Import({ ServletWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar.class,
		ServletWebServerFactoryConfiguration.EmbeddedTomcat.class,
		ServletWebServerFactoryConfiguration.EmbeddedJetty.class,
		ServletWebServerFactoryConfiguration.EmbeddedUndertow.class })
public class ServletWebServerFactoryAutoConfiguration {
	......
}

```

其中，`@EnableConfigurationProperties(ServerProperties.class) `代表加载`ServerProperties`服务器配置属性类

进入ServerProperties.class源码如下：

```java
@ConfigurationProperties(prefix = "server", ignoreUnknownFields = true)
public class ServerProperties {
    /**
	 * Server HTTP port.
	 */
    private Integer port;
    /**
	 * Network address to which the server should bind.
	 */
    private InetAddress address;
	......
}

```

其中，`prefix = "server"` 表示SpringBoot配置文件中的前缀，SpringBoot会将配置文件中以server开始的属性映射到该类的字段中。如在`application.properties`中配置`server.port=80`即可改变当前服务器的HTTP端口号

### 自动配置总结

- **SpringBoot启动会加载大量的自动配置类**
- **我们看我们需要的功能有没有SpringBoot默认写好的自动配置类；**
- **我们再来看这个自动配置类中到底配置了哪些组件；（只要我们要用的组件有，我们就不需要再来配置了）**
- **给容器中自动配置类添加组件的时候，会从properties类中获取某些属性。我们就可以在配置文件中指定这些属性的值；**
- **自动配置类对应属性类**
    - xxxxAutoConfigurartion：自动配置类；给容器中添加组件
    - xxxxProperties:封装配置文件中相关属性；

### 配置信息的查询

SpringBoot的配置文件，主要的目的就是对配置信息进行修改的，但在配置时的key从哪里去查询呢？我们可以查阅[官方文档](https://docs.spring.io/spring-boot/docs/2.1.2.RELEASE/reference/htmlsingle/#common-application-properties)

常用的配置摘抄如下：

```properties
# QUARTZ SCHEDULER (QuartzProperties)
spring.quartz.jdbc.initialize-schema=embedded # Database schema initialization mode.
spring.quartz.jdbc.schema=classpath:org/quartz/impl/jdbcjobstore/tables_@@platform@@.sql # Path to the SQL file to use to initialize the database schema.
spring.quartz.job-store-type=memory # Quartz job store type.
spring.quartz.properties.*= # Additional Quartz Scheduler properties.

# ----------------------------------------
# WEB PROPERTIES
# ----------------------------------------

# EMBEDDED SERVER CONFIGURATION (ServerProperties)
server.port=8080 # Server HTTP port.
server.servlet.context-path= # Context path of the application.
server.servlet.path=/ # Path of the main dispatcher servlet.

# HTTP encoding (HttpEncodingProperties)
spring.http.encoding.charset=UTF-8 # Charset of HTTP requests and responses. Added to the "Content-Type" header if not set explicitly.

# JACKSON (JacksonProperties)
spring.jackson.date-format= # Date format string or a fully-qualified date format class name. For instance, `yyyy-MM-dd HH:mm:ss`.

# SPRING MVC (WebMvcProperties)
spring.mvc.servlet.load-on-startup=-1 # Load on startup priority of the dispatcher servlet.
spring.mvc.static-path-pattern=/** # Path pattern used for static resources.
spring.mvc.view.prefix= # Spring MVC view prefix.
spring.mvc.view.suffix= # Spring MVC view suffix.

# DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
spring.datasource.driver-class-name= # Fully qualified name of the JDBC driver. Auto-detected based on the URL by default.
spring.datasource.password= # Login password of the database.
spring.datasource.url= # JDBC URL of the database.
spring.datasource.username= # Login username of the database.

# JEST (Elasticsearch HTTP client) (JestProperties)
spring.elasticsearch.jest.password= # Login password.
spring.elasticsearch.jest.proxy.host= # Proxy host the HTTP client should use.
spring.elasticsearch.jest.proxy.port= # Proxy port the HTTP client should use.
spring.elasticsearch.jest.read-timeout=3s # Read timeout.
spring.elasticsearch.jest.username= # Login username.
```







### @Conditional细节

- **@Conditional派生注解（Spring注解版原生的@Conditional作用）**

- 作用：必须是@Conditional**指定的条件成立**，才给容器中**添加组件**，**配置类**里面的所有内容才**生效**

    | @Conditional扩展注解            | 作用（判断是否满足当前指定条件）                 |
    | ------------------------------- | ------------------------------------------------ |
    | @ConditionalOnJava              | 系统的java版本是否符合要求                       |
    | @ConditionalOnBean              | 容器中存在指定Bean；                             |
    | @ConditionalOnMissingBean       | 容器中不存在指定Bean；                           |
    | @ConditionalOnExpression        | 满足SpEL表达式指定                               |
    | @ConditionalOnClass             | 系统中有指定的类                                 |
    | @ConditionalOnMissingClass      | 系统中没有指定的类                               |
    | @ConditionalOnSingleCandidate   | 容器中只有一个指定的Bean，或者这个Bean是首选Bean |
    | @ConditionalOnProperty          | 系统中指定的属性是否有指定的值                   |
    | @ConditionalOnResource          | 类路径下是否存在指定资源文件                     |
    | @ConditionalOnWebApplication    | 当前是web环境                                    |
    | @ConditionalOnNotWebApplication | 当前不是web环境                                  |
    | @ConditionalOnJndi              | JNDI存在指定项                                   |

- 我们可以通过在**配置文件中启用 debug=true属性；来让控制台打印自动配置报告**，这样我们就可以很方便的知道哪些自动配置类生效；

    ```java
    =========================
    AUTO-CONFIGURATION REPORT
    =========================
    
    Positive matches:（自动配置类启用的）
    -----------------
    
       DispatcherServletAutoConfiguration matched:
          - @ConditionalOnClass found required class 'org.springframework.web.servlet.DispatcherServlet'; @ConditionalOnMissingClass did not find unwanted class (OnClassCondition)
          - @ConditionalOnWebApplication (required) found StandardServletEnvironment (OnWebApplicationCondition)
            
        
    Negative matches:（没有启动，没有匹配成功的自动配置类）
    -----------------
    
       ActiveMQAutoConfiguration:
          Did not match:
             - @ConditionalOnClass did not find required classes 'javax.jms.ConnectionFactory', 'org.apache.activemq.ActiveMQConnectionFactory' (OnClassCondition)        
    ```











