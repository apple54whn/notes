# DB

Spring Boot 可以自动配置嵌入式（embedded）数据库如：H2, HSQL, Derby 等。你不需要提供任何连接的 URL，你只需要包含对要使用的嵌入式数据库的构建依赖项

## DataSource

通过使用数据库连接池也可以**自动配置**生产数据库。Spring Boot 使用以下算法（algorithm）来选择特定的实现：

1.  如果 HikariCP 存在，我们总是选择它，由于它的高性能和高并发。
2.  另外，如果 Tomcat 数据库连接池存在，我们选择它
3.  如果上述 2 个都不存在，若 Commons DBCP2 存在，我们选择它
4.  如果你使用了`spring-boot-starter-jdbc` 或 `spring-boot-starter-data-jpa` starters，你将自动获得对 HikariCP 的依赖

你也可以完全绕过（bypass）上述算法，通过设置 `spring.datasource.type` 属性来指定连接池。如果您在 Tomcat 容器中运行应用程序，这一点尤其重要，因为缺省情况下提供了`tomcat-jdbc`。若自定义数据源 Bean，则不会发生自动配置。

## HikariCP

> Hikari Connection Poor

### 什么是 HikariCP❓

[HiKariCP](https://github.com/brettwooldridge/HikariCP) 是数据库连接池的一个后起之秀，号称性能最好，可以完美地 PK 掉其他连接池。是一个高性能的 JDBC 连接池，基于 BoneCP 做了不少的改进和优化。超快，快到连 Spring Boot 2 都宣布支持了。

### 什么是 BoneCP❓

传说中 BoneCP 在快速这个特点上做到了极致，官方数据是 C3P0 等的 25 倍左右，以下为性能测试报告。

#### 单线程

- 1,000,000 获取连接/释放连接请求
- 获取/释放连接之间没有延迟
- 连接池范围：20-50
- 增量：5
- 线程：1
- 分区：1

![img](../images/ae19aac80c50404.jpg)

#### 多线程

- 500 个线程分别获取释放 100 个连接
- 在获取连接和释放连接之间引入了 10ms 的延迟 `Thread.sleep()`，模拟连接完成工作
- 连接池范围：50-200
- 增量：5
- 线程：5

![img](../images/1db8b584e0e7a03.jpg)

#### Prepared Statement

- 500 个线程分别获取释放 100 个连接
- 无延迟
- 连接池范围：50-200
- 增量：5
- 线程：5

![img](../images/f976c3fb5ce1233.png)

### HikariCP 的 Power 💥

BoneCP 作者放弃维护，并在 Github 项目主页推荐大家使用 HikariCP，Hikari（ひかり [hi·ka·'lē] ） 来自日文，是 **光** 的意思。这个产品的口号是 **快速、简单、可靠**

#### 优化

- **字节码精简 ：** 优化代码，直到编译后的字节码最少，这样，CPU 缓存可以加载更多的程序代码
- **优化代理和拦截器 ：** 减少代码，例如 HikariCP 的 Statement proxy 只有 100 行代码，只有 BoneCP 的十分之一
- **自定义数组类型（FastStatementList）代替 ArrayList ：** 避免每次 `get()` 调用都要进行 range check，避免调用 `remove()` 时的从头到尾的扫描
- **自定义集合类型（ConcurrentBag）：** 提高并发读写的效率
- **其他针对 BoneCP 缺陷的优化：** 比如对于耗时超过一个 CPU 时间片的方法调用的研究（但没说具体怎么优化）

#### 代码量

几个连接池的代码量对比（代码量越少，一般意味着执行效率越高、发生 BUG 的可能性越低）

| Pool     | Files | Code  |
| :------- | :---- | :---- |
| Vibur    | 34    | 1927  |
| HikariCP | 21    | 2228  |
| Tomcat   | 31    | 6345  |
| BoneCP   | 49    | 7293  |
| C3P0     | 120   | 15550 |

#### 速度

别人发推文测试 Hikari 速度

![img](../images/daf29bd1cc47347.jpg)

#### 稳定性

![img](../images/1396c369655fa4b.png)

#### 可靠性

另外，关于可靠性方面，也是有实验和数据支持的。对于数据库连接中断的情况，通过测试 `getConnection()`，各种 CP 的不相同处理方法如下（所有 CP 都配置了跟 `connectionTimeout` 类似的参数为 5 秒钟）

- **HikariCP(A)：** 等待 5 秒钟后，如果连接还是没有恢复，则抛出一个 `SQLExceptions` 异常；后续的 `getConnection()` 也是一样处理
- **C3P0(C-)：** 完全没有反应，没有提示，也不会在 `CheckoutTimeout` 配置的时长超时后有任何通知给调用者；然后等待 2 分钟后终于醒来了，返回一个 error
- **Tomcat(F)：** 返回一个 connection，然后调用者如果利用这个无效的 connection 执行 SQL 语句 结果可想而知；大约 55 秒之后终于醒来了，这时候的 `getConnection()` 终于可以返回一个 error，但没有等待参数配置的 5 秒钟，而是立即返回 error
- **BoneCP(C)：** 跟 Tomcat 的处理方法一样；也是大约 55 秒之后才醒来，有了正常的反应，并且终于会等待 5 秒钟之后返回 error 了

### 配置 HikariCP 🎩

#### POM

如果你使用了

`spring-boot-starter[-data]-jdbc` 或

`spring-boot-starter-data-jpa`或

`mybatis-spring-boot-starter` starters，你将自动获得对 HikariCP 的依赖。例如 Mybatis

```xml
<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
  <version>2.1.1</version>
</dependency>
```

#### YAML

```yaml
spring:
  datasource:
    # type: com.zaxxer.hikari.HikariDataSource # 可省略，Spring Boot 会自动检测
    # driver-class-name: com.mysql.cj.jdbc.Driver # 可省略，Spring Boot 会自动检测
    url: jdbc:mysql://172.16.154.11:3306/test?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 123456
    hikari:
      minimum-idle: 5
      idle-timeout: 600000
      maximum-pool-size: 10
      auto-commit: true
      pool-name: MyHikariCP
      max-lifetime: 1800000
      connection-timeout: 30000
      connection-test-query: SELECT 1
```

> You should at least specify the URL by setting the `spring.datasource.url` property. Otherwise, Spring Boot tries to auto-configure an embedded database.
>
> You often do not need to specify the `driver-class-name`, since Spring Boot can deduce it for most databases from the `url`.
>
> See [`DataSourceProperties`](https://github.com/spring-projects/spring-boot/tree/v2.2.2.RELEASE/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jdbc/DataSourceProperties.java) for more of the supported options. These are the standard options that work regardless of the actual implementation. It is also possible to fine-tune implementation-specific settings by using their respective prefix (`spring.datasource.hikari.*`, `spring.datasource.tomcat.*`, and `spring.datasource.dbcp2.*`). Refer to the documentation of the connection pool implementation you are using for more details.

## 集成 H2 数据库

H2 是一个内存数据库，方便测试。

## 集成 Mybatis

### 起步依赖

使用 Spring Initializr 添加 DevTools、Web、MySQL、**MyBatis**依赖

```xml
<!-- MySQL连接驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<!--mybatis起步依赖-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>

```

### 数据库连接和 MyBatis 配置

在 application.properties/yml 中添加数据库的连接信息、Spring Boot 集成 MyBatis 的配置

```properties
#数据库连接信息
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3308/test?serverTimezone=GMT%2B8&useSSL=false
spring.datasource.username=root
spring.datasource.password=w111151

#spring集成Mybatis环境
#pojo别名扫描包，不配置也行，需要指定全类名
mybatis.type-aliases-package=com.example.domain
#加载Mybatis映射文件，不配置也行，只需要*mapper.xml在@Mapper注解的接口的同一包中！
mybatis.mapper-locations=classpath:mapper/*Mapper.xml

```

```yaml
#数据库连接信息
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3308/test?serverTimezone=GMT%2B8&useSSL=false
    username: root
    password: w111151

#spring集成Mybatis环境
mybatis:
  #pojo别名扫描包
  type-aliases-package: com.example.domain
  #加载Mybatis映射文件
  mapper-locations: classpath:mapper/*Mapper.xml
```

### 创建 user 表对应的实体类

在 test 数据库中创建 user 表

```sql
-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhangsan', '123', '张三');
INSERT INTO `user` VALUES ('2', 'lisi', '123', '李四');

```

com.example.domain.User

```java
public class User {
    // 主键
    private Long id;
    // 用户名
    private String username;
    // 密码
    private String password;
    // 姓名
    private String name;

    //此处省略getter和setter方法 .. ..

}

```

### 编写 Mapper 接口

com.example.mapper.UserMapper

```java
@Mapper
public interface UserMapper {
	public List<User> queryUserList();
}

```

注意：`@Mapper`标记该类是一个 mybatis 的 mapper 接口，**可以被 spring boot 自动扫描到 spring 上下文中**

### 配置 Mapper 映射文件

在 src\main\resources\mapper 路径下加入 UserMapper.xml 配置文件

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.itheima.mapper.UserMapper">
    <select id="queryUserList" resultType="user">
        select * from user
    </select>
</mapper>

```

### 编写测试 Controller

com.example.controller.UserController

```java
@RestController
public class UserController {

    @Autowired
    private UserMapper userMapper;//报错，没有此类型的bean。但是可以使用，在运行期会创建好bean。还可以添加component之类注解

    @RequestMapping("/queryUser")
    public List<User> queryUser() {
        List<User> users = userMapper.queryUserList();
        return users;
    }
}

```

测试略

## 集成 JUnit

### 添加 JUnit 的起步依赖

一般使用 Spring Initializr 添加 Web 依赖后会自动导入**JUnit**起步依赖

```xml
<!--测试的起步依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

```

### 编写测试类

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringbootMybatisApplication.class)//不指定会从main下找启动类，加载Spring容器。但须在同一包中！
public class MapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void test() {
        List<User> users = userMapper.queryUserList();
        System.out.println(users);
    }

}

```

其中，

SpringRunner 继承自 SpringJUnit4ClassRunner，使用哪一个 Spring 提供的测试测试引擎都可以

```java
public final class SpringRunner extends SpringJUnit4ClassRunner


```

@SpringBootTest 的属性指定的是引导类的字节码对象

## 集成 Spring Data JPA

### 起步依赖

使用 Spring Initializr 添加 DevTools、Web、MySQL、**JPA**依赖

```xml
<!-- MySQL连接驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<!-- Spring Data JPA的起步依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

```

### 数据库连接和 JPA 配置

在 application.properties/yml 中添加数据库的连接信息、Spring Boot 集成 Spring Data JPA 的配置

```yaml
spring:
  #DB Configuration:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3308/test?serverTimezone=GMT%2B8&useSSL=false
    username: root
    password: w111151
  #JPA Configuration:
  jpa:
    database: mysql
    show-sql: true
    generate-ddl: true
    hibernate:
      ddl-auto: update
      #命名策略，瞎选的
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
        implicit-strategy: org.hibernate.boot.model.naming.ImplicitNamingStrategyComponentPathImpl
        #Hibernate 4 naming strategy fully qualified name. Not supported with Hibernate 5
        #strategy: org.hibernate.cfg.ImprovedNamingStrategy
```

```properties
#DB Configuration:
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3308/test?serverTimezone=GMT%2B8&useSSL=false
spring.datasource.username=root
spring.datasource.password=w111151

#JPA Configuration:
spring.jpa.database=MySQL
spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update

#Configure Hibernate Naming Strategy，瞎选的，不知道区别

spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.hibernate.naming.implicit-strategy=org.hibernate.boot.model.naming.ImplicitNamingStrategyComponentPathImpl

#Hibernate 4 naming strategy fully qualified name. Not supported with Hibernate 5
#spring.jpa.hibernate.naming_strategy=org.hibernate.cfg.ImprovedNamingStrategy


```

### 创建实体配置实体

若实体类不在启动类包中，需要添加注解如`@EntityScan("com.xuecheng.domain")`来扫描实体类

```java
@Entity
public class User {
    // 主键
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column可以省略，采用默认配置，若要具体配置，需要写上
    private Long id;
    // 用户名
    private String username;
    // 密码
    private String password;
    // 姓名
    private String name;

    //此处省略setter和getter方法... ...
}

```

### 编写 UserRepository

```java
public interface UserRepository extends JpaRepository<User,Long>, JpaSpecificationExecutor<User> {
}

```

### 编写测试类

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringbootJpaApplication.class)
public class JpaTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testJpa(){
        List<User> all = userRepository.findAll();
        System.out.println(all);
    }
}

```

注意：如果是 jdk9，执行报错如下：

原因：jdk 缺少相应的 jar

解决方案：手动导入对应的 maven 坐标，如下：

```xml
<!--jdk9需要导入如下坐标-->
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.0</version>
</dependency>

```

## 集成 Spring Data Redis

### 起步依赖

使用 Spring Initializr 添加 DevTools、Web、MySQL、JPA、**Redis**依赖

```xml
<!-- 配置使用redis启动器 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>


```

### 配置 redis 的连接信息

```yaml
spring:
  redis:
    #url包括以下host，port，password
    url: redis://user:password@example.com:6379
    host: localhost
    port: 6379
    password: w111151
```

```properties
#Redis
spring.redis.host=127.0.0.1
spring.redis.port=6379


```

### 注入 RedisTemplate 测试 redis 操作

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringbootJpaApplication.class)
public class RedisTest {

    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void test() throws JsonProcessingException {
        //1.从Redis中获取数据，一般为JSON字符串
        String userListJson = redisTemplate.boundValueOps("user.findAll").get();
        //2.判断Redis中是否存在该数据
        //2.1不存在，从数据库查，并保存到Redis
        if (userListJson==null){
            List<User> all = userRepository.findAll();
            //转为JSON字符串，Web环境默认导入了Jackson
            ObjectMapper objectMapper = new ObjectMapper();
            userListJson = objectMapper.writeValueAsString(all);
            redisTemplate.boundValueOps("user.findAll").set(userListJson);
            System.out.println("从数据库查询");
        } else {
            //2.2存在
            System.out.println("从Redis查询");
        }
        System.out.println(userListJson);
    }
}
```
