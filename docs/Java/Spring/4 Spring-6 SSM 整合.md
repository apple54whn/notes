

# SSM 整合

整合的思路：

1. 先搭建整合的**环境** 
2. 先把**Spring**的配置搭建完成 
3. 再使用**Spring整合SpringMVC**框架 
4. 最后使用**Spring整合MyBatis**框架 

## XML + 注解方式 + Maven 模块

### 创建数据库和表结构

```sql
create database ssm; 
use ssm; 
create table account(    
    id int primary key auto_increment,    
    name varchar(20),    
    money double
);
```

### 创建maven_parent父工程

会使用到工程的聚合和拆分的概念，这个技术在maven高级会讲

打包方式选择**pom**（有子模块默认使用pom方式打包），只需要`pom.xml`文件，如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itheima</groupId>
    <artifactId>maven</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    
    <!--统一管理jar包版本-->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>

        <spring.version>5.1.1.RELEASE</spring.version>
        <slf4j.version>1.6.6</slf4j.version>
        <log4j.version>1.2.12</log4j.version>
        <shiro.version>1.2.3</shiro.version>
        <mysql.version>8.0.12</mysql.version>
        <mybatis.version>3.4.6</mybatis.version>
        <spring.security.version>5.1.1.RELEASE</spring.security.version>
    </properties>

    <!-- 锁定jar包版本 -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-web</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-webmvc</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-tx</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-test</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis</artifactId>
                <version>${mybatis.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    <!--项目依赖jar包-->
    <dependencies>
        <!-- spring -->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.6.8</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>
        
        <!--SpringMVC核心-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-orm</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>${spring.version}</version>
        </dependency>
	   
        <!--使用Spring的JdbcTemplate。使用mybatis时可以不导入-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <!--JUnit测试-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope><!--手动测试时需要修改scope-->
        </dependency>
	    <!--mysql连接驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>${mysql.version}</version>
        </dependency>
	    <!--servlet包-->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
		<!--jsp-->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.0</version>
            <scope>provided</scope>
        </dependency>
		<!--jstl-->
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>

        <!-- log start -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>${log4j.version}</version>
        </dependency>
        
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>${slf4j.version}</version>
        </dependency>
        
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>${slf4j.version}</version>
        </dependency>
        <!-- log end -->
        
        <!--mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>${mybatis.version}</version>
        </dependency>
	    <!--mybatis和spring整合包-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.3.2</version>
        </dependency>
        <!--Druid连接池，也可以用Spring自带的-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.0.9</version>
        </dependency>
        <!--c3p0连接池，也可以用Spring自带的-->
        <dependency>
            <groupId>com.mchange</groupId>
            <artifactId>c3p0</artifactId>
            <version>0.9.5.2</version>
            <type>jar</type>
            <scope>compile</scope>
        </dependency>
        
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>5.1.2</version>
        </dependency>
        <!--springsecurity-->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-web</artifactId>
            <version>${spring.security.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-config</artifactId>
            <version>${spring.security.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-core</artifactId>
            <version>${spring.security.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-taglibs</artifactId>
            <version>${spring.security.version}</version>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
             <!-- 设置编译版本为 1.8 -->     
            <plugin>       
                <groupId>org.apache.maven.plugins</groupId>       
                <artifactId>maven-compiler-plugin</artifactId>       
                <version>3.1</version >       
                <configuration>         
                    <source>1.8</source>         
                    <target>1.8</target>         
                    <encoding>UTF-8</encoding>       
                </configuration>     
            </plugin>  
            <!--添加tomcat7插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
            </plugin>
        </plugins>
    </build>
    
    <!--下面为IDEA自动生成的maven插件，可以删除掉-->
    <build> 
        <finalName>ssm</finalName>
        <pluginManagement>
            <plugins>
                <plugin>
                    <artifactId>maven-clean-plugin</artifactId>
                    <version>3.0.0</version>
                </plugin>
                ...还有好多
            </plugins>
        </pluginManagement>
    </build>
</project>
```

### 创建maven_dao子模块

打包方式为**jar**包（默认为jar方式打包），domain也可以从中脱离出来。`applicationContext-dao.xml`如下：

整合MyBatis思路：

1. 数据库的连接以及数据库连接池交给spring容器来完成
2. SqlSessionFactory对象应该放到spring容器中作为单例存在
3. 代理模式开发，应该从spring容器中直接获得mapper的动态代理对象

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
			    http://www.springframework.org/schema/beans/spring-beans.xsd
			    http://www.springframework.org/schema/context
			    http://www.springframework.org/schema/context/spring-context.xsd">
    <!--组件扫描配置。不扫描由SpringMVC控制的Controller注解-->
    <context:component-scan base-package="com.itheima.dao"/>
    <!--也可以用如下中配置方法
    <context:component-scan base-package="com.itheima">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Repository"/>
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan> -->
    
    <!-- 加载配置文件 -->
    <context:property-placeholder location="classpath:jdbcConfig.properties"/>

    <!--配置Druid DataSource连接池，交给IoC管理-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    
    <!-- 也可以配置c3p0连接池，交给IoC管理。 
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driver}" />
        <property name="jdbcUrl" value="${jdbc.url}" />
        <property name="user" value="${jdbc.username}" />
        <property name="password" value="${jdbc.password}" />
    </bean> -->

    <!--配置SqlSession工厂，交给IoC管理-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>  <!--注入DataSource-->
        <property name="plugins"> <!--PageInterceptor配置-->
            <array>
                <bean class="com.github.pagehelper.PageInterceptor">
                    <property name="properties">
                        <value>
                            helperDialect=mysql
                            reasonable=true
                        </value>
                    </property>
                </bean>
            </array>
        </property>
    </bean>

    <!--扫描Mapper代理模式接口所在包-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.itheima.dao"/>
    </bean>
</beans>
```

```properties
#JdbcConfig.properties
jdbc.driver=com.mysql.cj.jdbc.Driver 
jdbc.url=jdbc:mysql://localhost:3306/bxgtest?serverTimezone=GMT%2B8&useSSL=false
jdbc.username=root
jdbc.password=w1111
```





### 创建maven_service子模块

打包方式是**jar**包（默认为jar方式） ，`applicationContext-service.xml`如下：

整合思路：除了业务，**事务**也应该交由Spring的声明式事务管理

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop
                           http://www.springframework.org/schema/aop/spring-aop.xsd
                           http://www.springframework.org/schema/tx
                           http://www.springframework.org/schema/tx/spring-tx.xsd">
    <!--组件扫描配置。不扫描由SpringMVC控制的Controller注解。-->
    <context:component-scan base-package="com.itheima.service"/>

    <!--配置事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    
    <!--也可以开启对事务的注解支持-->
    <tx:annotation-driven transaction-manager="transactionManager"/>

    
    <!--以下为xml配置，暂不推荐-->
    <!--配置事务通知-->
    <tx:advice id="txAdvice">
        <tx:attributes>
            <tx:method name="*" propagation="REQUIRED"/> <!--可以不配置propagation，默认为REQUIRED-->
            <tx:method name="find*" propagation="SUPPORTS" read-only="true"/>
        </tx:attributes>
    </tx:advice>

    <!--配置切面（切点和通知的关系）-->
    <aop:config>
        <aop:pointcut id="pt1" expression="execution(* com.itheima.service.impl.*.*(..))"/>
        <aop:advisor advice-ref="txAdvice" pointcut-ref="pt1"/>
    </aop:config>
</beans>
```



### 创建maven_web子模块

打包方式是**war**包

思路：

* `web.xml`配置：在项目服务器启动时创建**`DispatcherServlet`前端控制器**的并加载`springmvc.xml`配置的容器。
* `web.xml`配置：**`ContextLoaderListener`监听器**，在项目服务器启动时加载所有`applicationContext*.xml`的容器。
    * `classpath`和`classpath*`都是加载类路径下的资源和依赖的jar包中的资源（先后顺序）
        * `classpath`只会返回第一个匹配的资源（有误！！！）
        * `classpath*`会返回路径下匹配的所有资源，可以使用通配符
* `web.xml`配置：**`CharacterEncodingFilter`编码过滤器**，设置Request、Response编码
* `springmvc.xml`中配置处理器映射器、处理器适配器、视图解析器、释放静态资源

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                             http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
         version="2.5">

 
    <!-- 配置ContextLoaderListener监听器，加载所有applicationContext.xml并创建spring容器 -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <!-- 配置参数加载类路径的配置文件，不配置默认扫描WEB-INF下的applicationContext -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath*:applicationContext*.xml</param-value>
    </context-param>


    <!-- 配置SpringMVC的前端控制器：服务器启动后创建，并加载springmvc.xml配置文件创建springmvc容器 -->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- 配置初始化参数，用于读取 springmvc 的配置文件 --> 
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc.xml</param-value>
        </init-param>
        <!-- 配置 servlet 的对象的创建时间点：应用加载时创建。取值只能是非 0 正整数，表示启动顺序 -->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern> 
    </servlet-mapping>
    
    
     <!--配置编码过滤器-->    
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <!-- 设置过滤器中的属性值 --> 
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param> 
        <!-- 是否强制Request、Response编码 -->   
        <init-param> 
            <param-name>forceEncoding</param-name>    
            <param-value>true</param-value> 
        </init-param> 
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern> <!-- 过滤所有请求 --> 
    </filter-mapping>
    
    <!--RESTful开发时，处理DELETE、PUT等请求。前端提交信息需要_method-->
    <filter>
        <filter-name>hiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>hiddenHttpMethodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    
    <!--释放静态资源方式1：配置DefaultServlet的静态资源url，直接过滤静态资源 
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>/css/*</url-pattern>
        <url-pattern>/img/*</url-pattern>
        <url-pattern>/plugins/*</url-pattern>
        <url-pattern>/templates/*</url-pattern>
    </servlet-mapping>  -->
</web-app>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
			    http://www.springframework.org/schema/beans/spring-beans.xsd
			    http://www.springframework.org/schema/context
			    http://www.springframework.org/schema/context/spring-context.xsd
			    http://www.springframework.org/schema/mvc
			    http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--组件扫描，只扫描controller包下的类。也可以用applicationContext中配置方法-->
    <context:component-scan base-package="com.itheima.controller"/>

    <!--开启对SpringMVC注解的支持，替代处理器映射器、处理器适配器-->
    <mvc:annotation-driven/>
    
    <bean id="applicationContext" class="org.springframework.context.support.ClassPathXmlApplicationContext"/>

    <!--模板解析器-->
    <bean id="templateResolver" class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
        <property name="applicationContext" ref="applicationContext"/>
        <property name="prefix" value="/templates/"/>
        <property name="suffix" value=".html"/>
        <property name="templateMode" value="HTML"/>
        <property name="characterEncoding" value="UTF-8"/><!--解决页面乱码！-->
    </bean>
    <!--模板引擎-->
    <bean id="templateEngine" class="org.thymeleaf.spring5.SpringTemplateEngine">
        <property name="templateResolver" ref="templateResolver"/>
    </bean>
    <!--Thymeleaf视图解析器-->
    <bean class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
        <property name="templateEngine" ref="templateEngine"/>
        <property name="characterEncoding" value="UTF-8"/><!--解决页面乱码！-->
    </bean>


    <!--JSP视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--（推荐）释放静态资源方式3：将SpringMVC处理不了的请求交给Tomcat，静态资源就可以访问了-->
    <mvc:default-servlet-handler/>

    <!--释放静态资源方式2： location表示路径，mapping表示文件，**表示该目录下的文件以及子目录的文件 
    <mvc:resources mapping="/static/**" location="/static/"/>   静态资源放入static目录即可只写这一句
    <mvc:resources mapping="/css/**" location="/css/" />
    <mvc:resources mapping="/images/**" location="/images/"/>
    <mvc:resources mapping="/js/**" location="/js/" /> 
    -->
    
    <!--aop注解支持-->
    <aop:aspectj-autoproxy proxy-target-class="true"/>
</beans>
```

日志输出

```properties
#log4j.properties
# Configure logging for testing: optionally with log file
log4j.rootLogger=WARN, stdout
# log4j.rootLogger=WARN, stdout, logfile

log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d %p [%c] - %m%n

log4j.appender.logfile=org.apache.log4j.FileAppender
log4j.appender.logfile.File=target/spring.log
log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
log4j.appender.logfile.layout.ConversionPattern=%d %p [%c] - %m%n
```





### 各子模块间依赖

web依赖于service；service依赖于dao（如下）

```xml
<dependency>
    <groupId>com.itheima</groupId>
    <artifactId>maven_dao</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

### 运行项目

方法一：

- 在maven_web子模块的 pom.xml 中配置 tomcat 插件运行

    运行 ssm_web 工程它会**从本地仓库下载依赖的 jar 包**（需要将maven_web所依赖的所有模块发布至本地仓库，直接install父工程也行），所以当 ssm_web 依赖的 jar 包内容修改了必须及时发布到本地仓库，比如：ssm_web 依赖的 ssm_service 修改了，需要及时将ssm_service 发布到本地仓库。 

方法二：

- **在maven_parent父工程的 pom.xml 中配置 tomcat插件运行**，自动聚合并执行（**推荐**）

    如果子工程都在本地，采用方法2则不需要子工程修改就立即发布到本地仓库，父工程会自动聚合并使用最新代码执行。 

    注意：如果子工程和父工程中都配置了tomcat 插件，运行的端口和路径以子工程为准。 

方法三：

- 使用本地Tomcat部署





## JavaConfig—SSM

### POM

使用 Maven 创建 Web 项目，需要添加没自动添加的文件夹

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>top.conanan</groupId>
  <artifactId>CRM-JavaConfig</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <name>CRM-JavaConfig</name>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <!--根据自己的Java版本选择-->
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>

    <!--spring最新-->
    <org.springframework.version>5.2.6.RELEASE</org.springframework.version>
    <!--JUnit5最新-->
    <junit.jupiter.version>5.6.2</junit.jupiter.version>
    <!--jackson最新-->
    <jackson.version>2.11.0</jackson.version>


    <mysql.mysql-connector-java>8.0.19</mysql.mysql-connector-java>
    <com.alibaba.druid>1.1.22</com.alibaba.druid>
    <!--mybatis & mybatis 整合 spring 最新版-->
    <org.mybatis.version>3.5.4</org.mybatis.version>
    <org.mybatis.mybatis.spring.version>2.0.4</org.mybatis.mybatis.spring.version>



  </properties>

  <dependencies>
    <!--spring-->
    <!--spring-context：在基础ioc功能上提供扩展服务，此外还提供许多企业级服务的支持，如邮件服务、任务调度、JNDI定位，EJB集成、远程访问、缓存以及多种视图层框架的支持。 包括
        spring-core: Spring 核心包。其中包括 Spring-jcl（日志）
        spring-beans：Spring ioc基础实现，包含访问配置文件、创建和管理 bean 等。其中包括 spring-core
        spring-aop: Spring 的 AOP 实现。一般实际使用时会添加 AspectJ 的依赖 org.aspectj:aspectjweaver
        spring-expression：Spring 表达式？
    -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${org.springframework.version}</version>
    </dependency>
    <!--spring-context 的扩展，用于 cache、mail、scheduling、freemarker 等。包括 spring-context -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context-support</artifactId>
      <version>${org.springframework.version}</version>
    </dependency>
    <!--包含web应用开发时用到spring框架所需要的核心类，包括自动载入WebApplicationContext特性的类-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>${org.springframework.version}</version>
    </dependency>
    <!--包含spring mvc框架相关的所有类。包含国际化、标签、Theme、视图展现的FreeMarker、JasperReports、 Tiles、Velocity、XSLT相关类-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${org.springframework.version}</version>
    </dependency>
    <!--spring事务-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>${org.springframework.version}</version>
    </dependency>


    <!-- AspectJ Runtime -->
    <dependency>
      <groupId>org.aspectj</groupId>
      <artifactId>aspectjrt</artifactId>
      <version>1.9.5</version>
    </dependency>
    <!--AspectJ Weaver-->
    <dependency>
      <groupId>org.aspectj</groupId>
      <artifactId>aspectjweaver</artifactId>
      <version>1.9.5</version>
    </dependency>
    
    <!-- jackson -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-core</artifactId>
      <version>${jackson.version}</version>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>${jackson.version}</version>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-annotations</artifactId>
      <version>${jackson.version}</version>
    </dependency>


    <!--lombok-->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.12</version>
    </dependency>



    <!-- servlet-api -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
    </dependency>
    <!--jsp-api-->
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>javax.servlet.jsp-api</artifactId>
      <version>2.3.3</version>
      <scope>provided</scope>
    </dependency>
    <!-- jstl -->
    <dependency>
      <groupId>javax.servlet.jsp.jstl</groupId>
      <artifactId>jstl-api</artifactId>
      <version>1.2</version>
    </dependency>




    <!-- common-lang -->
    <dependency>
      <groupId>commons-lang</groupId>
      <artifactId>commons-lang</artifactId>
      <version>2.6</version>
    </dependency>



    <!-- cglib -->
    <dependency>
      <groupId>cglib</groupId>
      <artifactId>cglib</artifactId>
      <version>3.1</version>
    </dependency>


    <!--数据库层-->
    <!--根据自己的mysql版本选择（升级）-->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql.mysql-connector-java}</version>
    </dependency>
    <!--对JDBC的简单封装，使用 Mybatis 等其他的可以注释掉该依赖-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>${org.springframework.version}</version>
    </dependency>
    <!--Mybatis-Plus-->
    <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus</artifactId>
      <version>3.3.1</version>
    </dependency>
    <!--Mybatis-Plus 代码生成（还依赖模版技术）-->
    <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-generator</artifactId>
      <version>3.3.1</version>
    </dependency>
    <!-- druid -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>${com.alibaba.druid}</version>
    </dependency>
    <!--HikariCP-->
    <dependency>
      <groupId>com.zaxxer</groupId>
      <artifactId>HikariCP</artifactId>
      <version>3.4.5</version>
    </dependency>




    <!--log-->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>1.7.30</version>
    </dependency>
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-log4j12</artifactId>
      <version>1.7.30</version>
    </dependency>
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
    </dependency>
    <!--log-->


    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.3.1</version>
    </dependency>


    <!-- standard -->
    <dependency>
      <groupId>taglibs</groupId>
      <artifactId>standard</artifactId>
      <version>1.1.2</version>
    </dependency>

    <dependency>
      <groupId>org.freemarker</groupId>
      <artifactId>freemarker</artifactId>
      <version>2.3.30</version>
    </dependency>
    <dependency>
      <groupId>dom4j</groupId>
      <artifactId>dom4j</artifactId>
      <version>1.6.1</version>
    </dependency>
    <dependency>
      <groupId>net.sourceforge.jexcelapi</groupId>
      <artifactId>jxl</artifactId>
      <version>2.6.12</version>
    </dependency>



    <!--对Junit等测试框架的封装，还需添加具体实现-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>${org.springframework.version}</version>
      <scope>test</scope>
    </dependency>
    <!--junit5（升级）-->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>${junit.jupiter.version}</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <finalName>CRM-XML</finalName>
    <resources>
      <resource>
        <directory>src/main/java</directory>
        <includes>
          <include>**/*.properties</include>
          <include>**/*.xml</include>
        </includes>
      </resource>
      <resource>
        <directory>src/main/resources</directory>
        <includes>
          <include>**/*.*</include>
        </includes>
      </resource>
    </resources>
  </build>
</project>

```



### log4j.properties

```properties
# Global logging configuration
log4j.rootLogger=ERROR, stdout
# MyBatis logging configuration...
log4j.logger.com._520it.p2p.mapper=TRACE
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
```





### db.properties

```properties
# 自动检测
db.driverClass=com.mysql.cj.jdbc.Driver
# localhost 时可以从 jdbc:mysql://localhost:3306/crm?...省略掉 IP + Port。MySQL8 必须指定 serverTimezone
db.url=jdbc:mysql://localhost:3306/crm?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&useSSL=true
db.username=root
db.password=123456
```



### WebAppInitializer

```java
/**
 * 相当于 /webapp/WEB-INF/web.xml
 *
 * DispatcherServlet是Spring MVC的核心。在这里请求会第一次接触到框架，它主要负责将请求路由到其他的组件之中。
 * 按照传统的方式,像DispatcherServlet这样的Servlet会配置在web.xml文件中，这个文件会放到应用的WAR包里面。当然，这是配置DispatcherServlet的方法之一。
 * 但是，借助于Servlet3规范和Spring3.1的功能增强，这种方式已经不是唯一的方案了，这也不是我们本文所使用的配置方法。
 * 我们会使用java将DispatcherServlet配置在Servlet容器中，而不会再使用web.xml文件。如下程序清单展示了所需的java类。
 *
 * Spring Web应用中通常存在两个应用上下文，一个是DispatcherServlet创建的应用上下文，一个是ContextLoaderListener创建的应用上下文。
 * AbstractAnnotationConfigDispatcherServletInitializer会同时创建DispatcherServlet和ContextLoaderListener（查看源码）
 */
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * 返回的带有@Configuration注解的类将会用来配置ContextLoaderListener创建的应用上下文中的bean，
     * 通常是驱动应用后端的中间层和数据库组件。
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{RootConfig.class};
    }

    /**
     * 返回的带有@Configuration注解的类会用来定义DispatcherServlet应用上下文中的bean。
     * 包含Web组件的bean，如控制器、试图解析器以及处理器映射器等。
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{WebConfig.class};
    }

    /**
     * 将DispatcherServlet映射到"/"
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }


    /**
     * Add the given filter to the ServletContext and map it to the DispatcherServlet
     */
    @Override
    protected FilterRegistration.Dynamic registerServletFilter(ServletContext servletContext, Filter filter) {

        // 编码过滤器
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter(StandardCharsets.UTF_8.toString(), true);
        servletContext.addFilter("characterEncodingFilter",characterEncodingFilter);
        // 还可以这样写
        // servletContext.setRequestCharacterEncoding(StandardCharsets.UTF_8.toString());
        // servletContext.setResponseCharacterEncoding(StandardCharsets.UTF_8.toString());


        // 解决 PUT 或 DELETE 请求。因为 Servlet 规范默认要求 ServletRequest.getParameter*() 系列方法只能获取 POST 请求的参数
        FormContentFilter formContentFilter = new FormContentFilter();
        servletContext.addFilter("formContentFilter", formContentFilter);
        // 解决 FORM 中 PUT、DELETE 等请求的过滤器（不常用）
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();
        servletContext.addFilter("hiddenHttpMethodFilter", hiddenHttpMethodFilter);

        return super.registerServletFilter(servletContext, filter);
    }


}
```





### RootConfig

```java
/**
 * 相当于 Spring 及其整合的如 Mybatis 等配置
 */
@Configuration
@ComponentScan(
        value = "com._520it.crm",
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class)
        })
@EnableAspectJAutoProxy// 开启 AOP
@EnableTransactionManagement(proxyTargetClass = true)// 开启注解配置事务（@Transactional）
public class RootConfig {
        
}
```



### WebConfig

```java
/**
 * 相当于 SpringMVC 的配置
 *
 * 我们有多种方法来配置DispatcherServlet，与之类似，启用Spring MVC组件的方法也不只一种。
 * 从前，Spring是使用XML进行配置的，可以使用<mvc:annotation-driven>启用注解驱动的Spring MVC。
 */
@Configuration
@EnableWebMvc// 启用 Spring MVC 注解驱动，替代处理器映射器、处理器适配器。
@ComponentScan(
        value = "com._520it.crm.web.controller",
        includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class),
        useDefaultFilters = false// 必须有！这里仅仅扫描 Controller
)
// extends WebMvcConfigurerAdapter 在 Spring 5.0 已经 Deprecated
public class WebConfig implements WebMvcConfigurer  {

    /**
     * 配置视图解析器
     */
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("WEB-INF/views/",".jsp");
    }

    /**
     * 静态资源处理。如 SpringMVC 无法处理的静态资源请求交由 Servlet 容器如 Tomcat
     */
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }


}
```



### DaoConfig

```java
/**
 * Dao 层主要配置：
 * 1. DataSource
 * 2. Mybatis's SqlSessionFactoryBean。其中有 DataSource 和 MapperLocations（扫描XML）
 * 3. MapperScan（扫描的是.class，不是XML）
 */
@Configuration
@PropertySource("classpath:db.properties")
@MapperScan("com._520it.crm.mapper")// 这个不能使用 @Bean 配置，否则不能注入 DataSource 属性
public class DaoConfig {

    // 自动检测
    @Value("${db.driverClass}")
    public String driverClass;

    @Value("${db.url}")
    public String url;

    @Value("${db.username}")
    public String username;

    @Value("${db.password}")
    public String password;


    /**
     * DruidDataSource
     */
    @Bean("druid")
    public DataSource druidDataSource(){
        DruidDataSource druidDataSource = new DruidDataSource();
        // druidDataSource.setDriverClassName(driverClass);// 自动检测
        druidDataSource.setUrl(url);
        druidDataSource.setUsername(username);
        druidDataSource.setPassword(password);
        return druidDataSource;
    }


    @Bean("hikari")
    @Primary
    public DataSource hikariDataSource(){
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setDriverClassName(driverClass);
        hikariConfig.setJdbcUrl(url);
        hikariConfig.setUsername(username);
        hikariConfig.setPassword(password);
        // hikariConfig.addDataSourceProperty("cachePrepStmts", "true");
        // hikariConfig.addDataSourceProperty("prepStmtCacheSize", "250");
        // hikariConfig.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");

        return new HikariDataSource(hikariConfig);
    }


    /**
     * Mybatis's SqlSessionFactoryBean
     * 若使用 Mybatis Plus 则需改为 MP 的 MybatisSqlSessionFactoryBean
     */
    @Bean
    public MybatisSqlSessionFactoryBean sessionFactory(@Qualifier("hikari") DataSource dataSource) throws IOException {
        MybatisSqlSessionFactoryBean sqlSessionFactoryBean = new MybatisSqlSessionFactoryBean();

        // DataSource
        sqlSessionFactoryBean.setDataSource(dataSource);

        // MapperLocations
        // 也可以写 classpath*:com._520it.crm.mapper.*Mapper.xml，但是推荐 Ant 风格

        Resource[] resources = new PathMatchingResourcePatternResolver()
                .getResources(ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX
                        + "com/_520it/crm/mapper/*Mapper.xml");
        sqlSessionFactoryBean.setMapperLocations(resources);

        // 别名
        sqlSessionFactoryBean.setTypeAliasesPackage("com._520it.crm.domain");

        return sqlSessionFactoryBean;

    }


}
```



### TransactionAspect

```java
/**
 * 全局事务切面
 */
@Configuration// Spring 的组件
@Aspect// 声明一个切面类
public class TransactionAspect {

    /**
     * 切点表达式
     */
    private static final String TRANSACTION_POINTCUT_EXPRESSION = "execution(* com._520it.crm.service.impl.*.*(..))";

    /**
     * TransactionManager
     */
    @Bean
    public TransactionManager transactionManager(@Qualifier("hikari") DataSource dataSource){
        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
        dataSourceTransactionManager.setDataSource(dataSource);

        return dataSourceTransactionManager;
    }

    /**
     * 全局事务配置。方法名称事务拦截器（底层是 Advice）
     */
    @Bean("txAdvice")
    public TransactionInterceptor transactionInterceptor(TransactionManager transactionManager){

        // 设置所有读操作的事务为 SUPPORTS：如果没有事务就不开启新事务
        RuleBasedTransactionAttribute supportsTx = new RuleBasedTransactionAttribute();
        supportsTx.setReadOnly(true);
        supportsTx.setPropagationBehavior(TransactionDefinition.PROPAGATION_SUPPORTS);

        // 设置所有写操作的事务传播行为为 REQUIRED：当前存在事务就使用当前事务，当前不存在事务就创建一个新的事务
        RuleBasedTransactionAttribute requiredTx = new RuleBasedTransactionAttribute();
        // 什么异常需要回滚
        requiredTx.setRollbackRules(Collections.singletonList(new RollbackRuleAttribute(Exception.class)));
        requiredTx.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        requiredTx.setTimeout(30000);

        // 方法名匹配
        NameMatchTransactionAttributeSource source = new NameMatchTransactionAttributeSource();
        // 读操作
        source.addTransactionalMethod("get*", supportsTx);
        source.addTransactionalMethod("select*", supportsTx);
        source.addTransactionalMethod("query*", supportsTx);
        source.addTransactionalMethod("list*", supportsTx);
        // 写操作
        source.addTransactionalMethod("*",requiredTx);

        return new TransactionInterceptor(transactionManager, source);
    }

    /**
     * Advisor 通知器
     */
    @Bean
    public Advisor txAdviceAdvisor(TransactionInterceptor txAdvice) {
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression(TRANSACTION_POINTCUT_EXPRESSION);

        // 切点 + 通知
        return new DefaultPointcutAdvisor(pointcut, txAdvice);
    }
}
```





## 参考

*   [SSM框架，基于JavaConfig配置方式，不用xml配置文件](https://blog.csdn.net/u012809062/article/details/73251036)

*   [Java Config方式搭建SSM](https://zhengtianle.github.io/2018/11/29/Java-Config%E6%96%B9%E5%BC%8F%E6%90%AD%E5%BB%BASSM/)

*   [各种版本的SSM整合](https://my.oschina.net/mondayer/blog/3032753)
*   [SpringMVC Junit4 测试 "No ServletContext set"](https://ask.csdn.net/questions/698500)
*   [Spring Boot で TransactionManager に tx:advice の設定を反映する ( Java Config 版 )](https://qiita.com/ksby/items/c063f6ba80a004d34171)

