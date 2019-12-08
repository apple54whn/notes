# 入门

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

*   使用 Spring Initializr 初始化 Spring Boot 项目： https://start.spring.io/，IDEA中自带。根据需求选择需要的依赖：

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

* `resources`文件夹中目录结构

  - `static`：保存所有的静态资源； js、css、images等
  - `templates`：保存所有的模板页面；（Spring Boot默认jar包使用嵌入式的Tomcat，默认不支持JSP页面）；可以使用模板引擎如freemarker、thymeleaf
  - `application.properties`：Spring Boot应用的配置文件，可以修改一些默认设置
  - 可以手动新建目录，如`mapper`

* `HelloController`：必须在引导类`StudySpringBootApplication`**同级包或者子级包**中创建，才能被扫描到

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

* `StudySpringBootApplicationTests`

  ```java
  // Spring Boot 2.2.2目前使用的是 JUnit5。很多处和 JUnit4 不一样了
  @SpringBootTest
  public class StudySpringBootApplicationTests {
  
  	@Test
  	void hello() {
  		System.out.println("hello");
  	}
  }
  ```

* Maven打包：`mvn clean package -Dmaven.test.skip`

  可以看到带有`.original`的为原始包，和带有所有依赖的`jar`包，可以执行`java -jar`启动

## 热部署

热部署失效：原因是因为Intellij IEDA默认情况下不会自动编译，需要对IDEA进行自动编译的设置（Debug模式没此问题）

![](./images/1548621994782.png)

`Shift + Ctrl + Alt + /` （Mac：`Shift + Command + Alt + /`），选择Registry...

![](./images/1548622068044.png)



## 自定义 Parent

若需要使用自定义的parent，不使用官方提供的，可以按如下配置（仅作为示例）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>geektime.demo</groupId>
	<artifactId>helloworld</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>HelloWorld</name>
	<description>Demo project for Spring Boot</description>

	<properties>
		<java.version>1.8</java.version>
	</properties>

	<dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-dependencies</artifactId>
				<version>2.1.1.RELEASE</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
	</dependencyManagement>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<version>2.1.1.RELEASE</version>
				<executions>
					<execution>
						<goals>
							<goal>repackage</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>
```











