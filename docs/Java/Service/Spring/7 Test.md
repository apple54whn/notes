# 6 Test

## 简介

使用 Spring Test 和 Spring Boot 特性来测试。将从一个应用程序上下文成功加载的简单测试开始，然后使用 Spring 的 MockMvc继续测试web层。 

项目搭建就不再赘述，web项目即可。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.2.2.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>testing-web</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>testing-web</name>
	<description>Demo project for Spring Boot</description>

	<properties>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

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
	</dependencies>

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





## 被测试Controller

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
```





## 测试用例

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
public class HttpRequestTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void greetingShouldReturnDefaultMessage() throws Exception {
        String s = restTemplate.getForObject("http://localhost:" + port + "/hello", String.class);
        assertThat(s).contains("Hello World");
        log.info(port+"");
    }
}
```

* `@SpringBootTest`注释告诉Spring Boot**查找一个主要的配置类**（例如，一个带有`@SpringBootApplication`的类），然后使用该类来**启动Spring应用程序上下文**。您可以在IDE或命令行中运行此测试（通过运行`./mvnw`测试或`./gradlew`测试）。

* 注意，使用`webEnvironment=RANDOM_PORT`启动服务器时使用了一个随机端口（这对于**避免测试环境中的冲突**非常有用），并使用`@LocalServerPort`注入了该端口。另外，请注意Spring Boot已经自动为您提供了一个`TestRestTemplate`。你所要做的就是通过` @Autowired `注入它。



另一种有用的方法是根本不启动服务器，只启动完整的Spring应用程序上下文，只测试其下的层。示例Spring在这一层处理传入的HTTP请求并将其传递给控制器，这样，几乎使用了整个堆栈，代码调用的方式与处理实际HTTP请求的方式完全相同，但是不需要启动服务器。为此，使用Spring的MockMvc，并通过在测试用例上使用`@AutoConfigureMockMvc`注释请求将其注入。 

```java
@SpringBootTest
@AutoConfigureMockMvc// 注入MockMvc
@Slf4j
public class DemoApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
    public void testHello() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/hello").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World"));
        String contentAsString = resultActions.andReturn().getResponse().getContentAsString();
        log.info(contentAsString);
    }
}
```

我们还可以使用`@WebMvcTest`将测试范围缩小到web层

```java
@WebMvcTest
@Slf4j
public class HelloControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHello() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/hello").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World"));
        String contentAsString = resultActions.andReturn().getResponse().getContentAsString();
        log.info(contentAsString);
    }
}
```

 测试断言与前一种情况相同。但是，在这个测试中，Spring Boot只实例化web层，而不是整个上下文。在具有多个控制器的应用程序中，您甚至可以通过使用来请求仅实例化一个控制器。

```java
@WebMvcTest
@Slf4j
public class HelloControllerTest {
    
    private final HelloService service;

	public HelloService(HelloService service) {
		this.service = service;
	}

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHello() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/hello").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World"));
        String contentAsString = resultActions.andReturn().getResponse().getContentAsString();
        log.info(contentAsString);
    }
}
```

Spring自动将服务依赖项注入控制器（构造器自动注入，详细查看Spring章节）

我们可以使用`@MockBean`为`HelloService`创建和注入一个`mock`（如果不这样做，应用程序上下文将无法启动）

```java
@WebMvcTest
@Slf4j
public class HelloControllerTest {
    
    @MockBean
    private HelloService service;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHello() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/hello").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Hello World"));
        String contentAsString = resultActions.andReturn().getResponse().getContentAsString();
        log.info(contentAsString);
    }
}
```





## 总结

### `@SpringBootTest`

注释告诉Spring Boot**查找一个主要的配置类**（例如，一个带有`@SpringBootApplication`的类），然后使用该类来**启动Spring应用程序上下文**。



### `@WebMvcTest`

仅用于测试控制器层，您需要使用模拟对象提供所需的剩余依赖项。 



### `@DataJpaTest`

for testing the repository layer



### `@RestClientTests`

for testing REST clients



### `@JsonTest`

for testing the JSON marshalling and unmarshalling