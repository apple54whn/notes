# MyBatis

> MyBatis 本是 apache 的一个开源项目 iBatis，2010年这个项目由 apache software foundation 迁移到了 google code，并且改名为 MyBatis ，2013年11月迁移到 Github。
>
> MyBatis 是一个优秀的基于 java 的**持久层框架**，采用 **ORM 思想（对象关系映射）**解决了**实体和数据库映射**的问题，对 **jdbc进行了封装**，使开发者只需要关注 sql语句本身， 而不需要花费精力去处理加载驱动、创建连接、创建 statement 、处理结果集、关闭资源等繁杂的过程。 
>
> MyBatis 通过xml 或注解的方式将要执行的各种statement配置起来，并通过**java对象**和**statement 中 sql 的动态参数**进行**映射生成最终执行的 sql 语句**，最后由 mybatis 框架执行 sql 并将结果映射为 java 对象并返回。

## 1 入门

### 1.1 Maven依赖

- 单mybatis的依赖参考[官方文档](http://www.mybatis.org/mybatis-3/zh/index.html)，还需要`mysql-connector-java`驱动的依赖

### 1.2 mybatis-config.xml

- resources目录中创建**`mybatis-config.xml`**、**`JdbcConfig.properties`**、`log4j.properties`(日志输出)

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

    ```properties
    #JdbcConfig.properties
    jdbc.driver=com.mysql.cj.jdbc.Driver 
    jdbc.url=jdbc:mysql://localhost:3306/bxgtest?serverTimezone=GMT%2B8&useSSL=false
    jdbc.username=root
    jdbc.password=w1111
    ```

    ```xml
    <!--mybatis-config.xml-->
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE configuration
            PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
            "http://mybatis.org/dtd/mybatis-3-config.dtd">
    <configuration>
        <!-- 用resource或url属性加载外部配置文件；也可以使用内部定义的属性（利用property属性，不常用）
             在properties元素体内自定义的属性首先被读取。 然后会读取resource或 url 加载的属性，它会覆盖已读取的同名属性-->
        <properties resource="jdbcConfig.properties"></properties> 
    
        <typeAliases>
            <package name="cn.itcast.mybatis.pojo" /><!-- 批量别名定义，扫描整个包下的类，别名为类名，大小写不敏感-->
            <!-- <typeAlias alias="user" type="cn.itcast.mybatis.pojo.User" /> 单个别名定义， 大小写不敏感，不推荐 -->
        </typeAliases>
        
        <!-- 配置MyBatis环境。和spring整合后 environments配置将废除 -->
        <environments default="development">
            <!--配置mysql环境-->
            <environment id="development">
                <!-- 配置事务类型，使用jdbc事务管理 -->
                <transactionManager type="JDBC" />
                <!-- 数据库连接池 -->
                <dataSource type="POOLED">
                    <property name="driver" value="${jdbc.driver}"/>
                    <property name="url" value="${jdbc.url}" />
                    <property name="username" value="${jdbc.username}" />
                    <property name="password" value="${jdbc.password}" />
                </dataSource>
            </environment>
        </environments>
    
        <!--告知MyBatis映射文件的位置-->
        <mappers>
            <package name = "cn.itcast.dao"/> <!-- 该包下所有的dao接口都可以使用 -->
            <!--  <mapper class="cn.itcast.dao.UserMapper"/>  -->
        </mappers>
    </configuration>
    ```

- 配置的内容和**顺序**如下

    - **==properties==**（属性）

        - `mybatis-config.xml`可以引用属性文件中的配置信息(如`Jdbc.properties`)，配置如上。

    - settings（全局配置参数）

    - **==typeAliases==**（**类型别名**）：**==package==**

    - typeHandlers（类型处理器）

    - objectFactory（对象工厂）

    - objectWrapperFactory

    - plugins（插件）

    - environments（环境集合属性对象）

        - environment（环境子属性对象）
            - transactionManager（事务管理）
            - dataSource（数据源）

    - databaseIdProvider

    - **==mappers==**（映射器）：告诉MyBatis去哪里找映射文件

        - 使用相对于类路径的**资源引用(xml)**；或完全限定**URL**；或**类名(可用于注解)**；或**==package==(可用于注解)**；

            - **resource**：指定的文件必须存在于**类路径下**，其封装了类加载器的方法
            - **URL**：统一资源定位符，可以唯一标示一个资源位置。写法：`协议 主机 端口 URI`。如HTTP协议，File协议
            - **URI**：统一资源标识符，可以在**应用中**唯一标示一个资源位置。

            ```xml
            <!-- 使用相对于类路径的资源引用 -->
            <mappers>
              <mapper resource="cn/itcast/dao/UserMapper.xml"/>
              <mapper resource="cn/itcast/dao/BookMapper.xml"/>
            </mappers>
            ```

            ```xml
            <!-- 使用完全限定资源定位符（URL） -->
            <mappers>
              <mapper url="file:///var/mappers/AuthorMapper.xml"/>
              <mapper url="file:///var/mappers/BlogMapper.xml"/>
            </mappers>
            ```

            ```xml
            <!-- 使用映射器接口实现类的完全限定类名 -->
            <mappers>
              <mapper class="cn.itcast.dao.UserMapper"/>
              <mapper class="cn.itcast.dao.BookMapper"/>
            </mappers>
            ```

            ```xml
            <!-- 将包内的映射器接口实现全部注册为映射器 -->
            <mappers>
              <package name="cn.itcast.dao"/>
            </mappers>
            ```


### 1.3 实体类、Mapper(Dao)接口

- domain中实体类通常与数据库表对应，作为mybatis进行sql映射使用
- `~Mapper`接口就是我们的持久层接口（也可以写成 `~Dao`接口），放在java中

### 1.4 Mapper.xml

Mapper接口开发方法只需要程序员编写**Mapper接口**和对应的**Mapper.xml文件**，由**Mybatis框架根据接口定义创建接口的==动态代理对象==(`sqlSession.getMapper(Class c)`)**

- Mapper接口开发需要遵循以下规范：
    - Mapper.xml和Mapper接口放置在**==同一包==**中，可分别在java、resources同名目录下（resources中目录创建用`/`分割）
    - Mapper.xml文件中的**namespace**与mapper接口的**全限定类名**相同
    - Mapper.xml中定义的每个statement的**id**与Mapper接口**方法名**相同
    - Mapper.xml中定义的每个sql 的**parameterType**的类型和Mapper接口方法的**输入参数类型**相同
    - Mapper.xml中定义的每个sql的**resultType**的类型和Mapper接口方法的**输出参数类型**相同

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namespace：命名空间，用于隔离sql，必须是Mapper接口的全限定类名 -->
<mapper namespace="cn.itcast.mybatis.dao.UserDao">
    <!--id：取值必须是Mapper接口的方法名-->
    <select id="findUserById" parameterType="int" resultType="cn.itcast.mybatis.pojo.User">
        select * from user where id = #{id}
    </select>
</mapper>
```

注意 

- **`#{}`**表示一个**占位符**号，通过`#{}`可以实现preparedStatement向占位符中设置值，自动进行java类型和jdbc类型转换。#{}可以有效**防止sql注入**。 #{}可以接收**简单类型**值或**POJO中属性值**。 如果parameterType传输单个简单类型值，#{}括号中可以是**value或其它名称**
- ~~`${}`表示**拼接sql串**，不能防止SQL注入。通过 `${}`可以将parameterType 传入的内容拼接在sql中且不进行jdbc类型转换，`${}`可以接收**简单类型**值或**POJO中属性值**，如果parameterType**传输单个简单类型值**，`${}`括号中**只能是value**~~



### 1.5 注解Mapper接口

不需要Mapper.xml，直接在Mapper接口的方法上使用注解即可完成。原理同Mapper.xml。

```java
@Select("select * from user")  
List<User> findAll(); 
```

### ~~1.6 Dao实现类开发~~

​	原始Dao开发方法需要程序员编写Dao接口和Dao实现类

- 问题：
    - Dao方法体存在重复代码：通过SqlSessionFactory创建SqlSession，调用SqlSession的数据库操作方法，如selectOne、selectList、insert、update、delete
    - 调用sqlSession的数据库操作方法需要指定statement的namespace.id和参数，这里存在硬编码，不得于开发维护



### 1.7 SqlSession

```java
//1.读取配置文件   
InputStream is = Resources.getResourceAsStream("mybatis-config.xml");     
//2.使用构建者创建工厂对象 SqlSessionFactory。      使用构建者模式 
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is); 
//3.使用 SqlSessionFactory 生产 SqlSession 对象。  使用工厂模式
SqlSession session = factory.openSession(); 
//4.使用 SqlSession 创建 dao 接口的动态代理对象。   使用动态代理
UserMapper userMapper = session.getMapper(UserMapper.class);   
//5.使用代理对象执行查询所有方法   
List<User> users = userMapper.findAll();   
for(User user : users) {
    System.out.println(user);   
} 
//6.释放资源   
session.close();   
in.close();
```

> 动态代理对象调用sqlSession.selectOne()和sqlSession.selectList()等方法是**根据mapper接口方法的返回值**决定，如果返回list则调用**selectList**方法，如果返回单个对象则调用**selectOne**方法……

1. **==构建者模式==**：**SqlSessionFactoryBuilder接收`mybatis-config.xml`文件流，构建出SqlSessionFactory对象**。最佳使用范围是**方法范围即方法体内局部变量**

2. **==工厂模式==**：**SqlSessionFactory读取`mybatis-config.xml`中连接数据库和mapper映射的信息，生产出真正操作数据库的SqlSession对象**。（SqlSessionFactory是一个接口，最佳使用范围是**整个应用运行期间**，创建后可以重复使用，通常以**单例模式**管理SqlSessionFactory）

3. **==动态代理==**：**SqlSession接口用于生成接口代理对象，定义通用增删查改方法**。每个线程都应有自己的SqlSession实例，不能共享使用，它也是**线程不安全**的。因此最佳的范围是**请求或方法范围**，绝对不能将SqlSession实例的引用放在一个类的静态字段或实例字段中。每次使用后关闭资源。


总结：使用mybatis创建的动态代理对象，还是直接使用其提供的CRUD方法。==本质都是**得到JDBC的Connection对象**，**执行对应的Sql语句**，最后**封装结果集**。==

注意：使用==**增删改**==方法后，要调用**SqlSession的`commit()`方法**==提交事务==才能成功



### 1.8 输入映射与输出映射

**OGNL**(Object-Graph Navigation Language)，它是一种功能强大的**表达式语言**，通过它简单一致的表达式语法（省略get、set），可以存取对象的**任意属性**，调用对象的**方法**，遍历整个对象的结构图，实现字段类型转化等功能。它使用相同的表达式去存取对象的属性

* **parameterType**：将要传入语句的参数的完全限定类名或别名。**可选**，MyBatis会推断出具体传入语句的参数

    * **传递简单类型**：Integer、int、String等等，写全限定类名或简单类型都可以。使用`#{}`占位符，任意取值
    * **传递POJO对象**：Mybatis使用ognl表达式解析对象字段的值，`#{}`括号中的值为提供的POJO属性名称
    * **传递POJO包装对象**
        * 需求：根据用户名模糊查询用户信息。查询条件放到QueryVo的user属性中(包装类)
        * 查询条件可能是**综合的查询条件**，不仅包括用户查询条件还包括其它的查询条件（比如查询用户信息的时候，将用户购买商品信息也作为查询条件），这时可以**使用包装对象传递输入参数**
        * 包装对象：**POJO类中的一个属性是另外一个POJO**

* **resultType**：从这条语句中返回的期望类型的类的完全限定名或别名，若是集合，那应该是集合包含的类型

    * **输出简单类型**：Integer、int、String等等，写全限定类名或简单类型都可以。需求：查询用户表数据条数
    * **输出POJO对象**：`resultType = "cn.itcast.mybatis.pojo.User"`
    * **输出POJO列表**：`resultType = "cn.itcast.mybatis.pojo.User"`，分别进行映射，并把对象放到容器List中

* **resultMap（常用于多表查询）**

    * **SQL查询字段名和POJO的属性名不一致**（**MySQL**在**Windows**中字段名**不区分大小写**；在**Linux**中**区分**大小写）

        * 可以在使用**SQL语句**查询时用AS（可省略）**起别名**，执行效率比下面的高

        * 可以通过resultMap将字段名和属性名作**对应关系**。resultMap实质上还需要将查询结果映射到POJO对象中

            ```xml
            <!-- resultMap最终还是要将结果映射到POJO上 -->
            <!-- id：设置ResultMap的id；type就是指定映射到哪一个POJO -->
            <resultMap id="UserMap" type="User">
                <!-- 定义主键 ,非常重要。如果是多个字段,则定义多个id -->
                <!-- property：主键在POJO中的属性名；column：主键在数据库中的列名 -->
                <id property="userId" column="id" />
            
                <!-- 定义非主键字段映射-->
                <result property="userName" column="username" />
                <result property="userAddress" column="address" />
                <result property="userSex" column="sex" />
            </resultMap>
            
            <!-- 查询所有的订单数据 -->
            <select id="findAll" resultMap="UserMap">
                select * from user;
            </select>
            ```

### 补充

* xml的CDATA区，可以不用写`&lt;`之类的
* 接口中有多个形参，需要添加@Param注解区分。用的少，一般都封装在一个对象中。

### 案例

```java
public interface UserMapper {
    List<User> findAll(); //查询所有
    User findById(Integer id); //根据id查询
    List<User> findByUsername(String username); //根据用户名模糊查询
    Integer findCount(); //查询总记录数
    void addUser(User user); //增
    void deleteUser(Integer id); //删
    void updateUser(User user); //改
    List<User> findByQueryVo(QueryVo queryVo); //QueryVo
}
```

```xml
<!--UserMapper.xml-->
<mapper namespace="cn.itcast.dao.UserMapper">
    <select id="findAll" resultType="cn.itcast.domain.User">
        select * from user;
    </select>
    
    <select id="findById" parameterType="java.lang.Integer" resultType="cn.itcast.domain.User">
        select * from user where id=#{id}; <!--占位符可以随便写uid等-->
    </select>

    <select id="findByUsername" parameterType="java.lang.String" resultType="cn.itcast.domain.User">
        select * from user where username like #{username}; <!--占位符可以随便写name等-->
        <!--select * from user where username like '%${value}%';了解，不防SQL注入。$拼接字符串，占位符只能写value-->
    </select>

    <select id="findCount" resultType="java.lang.Integer">
        select count(*) from user;
    </select>

    
    <insert id="addUser" parameterType="cn.itcast.domain.User"> <!--下面占位符必须对应User中属性-->
    	<!-- selectKey 插入或更新操作后获取插入或更新的数据的id。插入后调用被插入对象的getId()方法即可获取到 -->
    	<!-- keyProperty：主键对应的POJO中的哪一个属性 -->
    	<!-- keyColumn:主键对应的表中的哪一列 -->
    	<!-- order：设置在执行insert语句前执行查询id的sql，还是在执行insert语句之后执行查询id的sql-->
        <selectKey keyProperty="id" keyColumn="id" resultType="int" order="AFTER">
            <!--LAST_INSERT_ID():是mysql的函数，返回auto_increment自增列新记录id值-->
            select last_insert_id();
            <!-- 或   通过select uuid()得到uuid值 order="BEFORE"-->
        </selectKey>
        insert into user (username,birthday,sex,address) values (#{username},#{birthday},#{sex},#{address});
    </insert>

     <delete id="deleteUser" parameterType="java.lang.Integer">
        delete from user where id=#{id}; <!--占位符可以随便写uid等-->
    </delete>
    
    <update id="updateUser" parameterType="cn.itcast.domain.User"> <!--下面占位符必须对应User中属性-->
        update user set username = #{username},sex=#{sex},address=#{address},birthday=#{birthday} where id=#{id};
    </update>
    
    
    <select id="findByQueryVo" parameterType="cn.itcast.domain.QueryVo" resultType="cn.itcast.domain.User">
        select * from user where username like #{user.username};
    </select>
  
</mapper>
```

```java
public class TestUserMapper {
    InputStream is;
    SqlSession sqlSession;
    UserMapper userMapper;

    @Before
    public void init() throws IOException {
        is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = builder.build(is);
        sqlSession = sqlSessionFactory.openSession();
        userMapper = sqlSession.getMapper(UserMapper.class);
    }

    @After
    public void destroy() throws IOException {
        //提交事务
        sqlSession.commit();
        sqlSession.close();
        is.close();
    }
    
    @Test
    public void testFindAll() {
        List<User> users = userMapper.findAll();
    }    
    @Test
    public void testFindById() {
        User user = userMapper.findById(48);
    }
    @Test
    public void testFindByUsername() {
        List<User> users = userMapper.findByUsername("%王%"); //模糊查询在此时需要添加%
    }
    @Test
    public void testFindCount() {
        Integer count = userMapper.findCount()
    }

    
    @Test
    public void testAddUser() {
        User user = new User(null, "张三", "西安", "男", new Date());
        System.out.println(user);//User{id=null, username='张三', address='西安'......}
        userMapper.addUser(user);
        System.out.println(user);//User{id=53, username='张三', address='西安'.....}
    }
 	@Test
    public void testDeleteUser() {
        userMapper.deleteUser(49);
    }
    @Test
    public void testUpdateUser() {
        User user = new User(49, "王五", "北京", "女", new Date());
        userMapper.updateUser(user);
    }
    
    @Test
    public void testFindByQueryVo(){
        QueryVo queryVo = new QueryVo(new User( "%王%"));
        List<User> user = userMapper.findByQueryVo(queryVo);
    }
}
```



## 2 Mybatis中连接池和事务

### 2.1 连接池

我们在 WEB 课程中也学习过类似的连接池技术，而在 Mybatis 中也有连接池技术，但是它采用的是**自己的连接池技术**。在 Mybatis的`mybatis-config.xml`配置文件中，**通过`<dataSource type="pooled">`来实现** Mybatis 中连接池的配置。 

在 Mybatis 中我们将它的数据源 dataSource 分为以下几类： (运行测试用例后日志中即可看到区别)

* **==POOLED==**：实现了`java.sql.DataSource`接口规范的`PooledDataSource`类，**使用**连接池的数据源

    * > 当一个线程来获取连接池，先查找是否有空闲的连接池，有就返回，没有则查询活动的连接池数量是否等于允许的最大连接池数量，若不等于则创建并返回，否则获取使用时间最久的那个连接池（会判断是否失效）并返回

* UNPOOLED：同样实现了上述接口的`UnpooledDataSource`类，**不使用**连接池的数据源

* JNDI：采用**服务器提供的JNDI技术实现**，获取DadaSource对象，不同服务器获取的不一样。只能用于**web工程**或**Maven的war工程**。我们使用的**Tomcat**采用的连接池是**dbcp连接池**



### 2.2 事务

> 什么是事务？
>
> 事务的四大特性（ACID）
>
> 不考虑隔离级别会产生的3个问题
>
> 解决办法：四种隔离级别

MyBatis是对JDBC的封装，通过**==SqlSession对象==的`commit()`和`rollback()`**方法实现事务的提交和回滚。因为在连接池中取出的连接，都会将调用 `connection.setAutoCommit(false)`方法，所以需手动提交。

可以在获取SqlSession对象时设置`openSession(true)`（底层还是调用`connection.setAutoCommit(true)`方法），即可自动提交，但是不推荐。

和Spring整合后使用SpringMVC的事务管理



### 2.3 JNDI

**JNDI**(Java Naming and Directory Interface)：Java名称和目录接口，是SUN公司推出的一套规范，属于JavaEE技术之一。目的是模仿windows系统中的注册表（map结构，key为目录+名称）

只能用于**web工程**或**Maven的war工程**

1. 创建Maven的war工程并导入坐标。还需要servlet-api和jsp-api依赖

2. 在webapp文件下创建META-INF目录，建立一个名为context.xml的配置文件

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Context>
    <Resource 
    name="jdbc/mybatis"                       数据源的名称，JNDI中name，任意起名          
    type="javax.sql.DataSource"               数据源类型         
    auth="Container"                          数据源提供者  
    maxActive="20"                            最大活动数
    maxWait="10000"                           最大等待时间 
    maxIdle="5"                               最大空闲数
    username="root"                            
    password="1234"                            
    driverClassName="com.mysql.jdbc.Driver"          
    url="jdbc:mysql://localhost:3306/mybatis" 
    />
    </Context>
    ```

3. 修改mybatis-config.xml中配置

    ```xml
    <dataSource type="JNDI">
    	<property name = "data_source" value="java:comp/env/jdbc/mybatis"/>
    </dataSource>
    ```

4. 由于这个数据源是服务器提供的，所以需要经过服务器才能使用，不能用Test测试类来测试，需要在JSP或Servlet中测试





## 3 XML映射文件的动态SQL语句

- 通过mybatis提供的各种标签方法实现**动态拼接sql**

### 3.1 if、where、set

- where元素只会在**至少有一个子元素**的条件返回SQL子句的情况下才去**插入WHERE子句**。
- 而且，若语句的**开头**为“**AND**”或“**OR**”，where元素也会将它们**去除**。

```xml
<!--通过用户名和性别模糊条件查询-->
<select id="findUserByUsernameAndSex" parameterType="User" resultType="User" >
    select * from user
    <where>
        <if test="username!=null and username!=''">  <!--还可以使用_parameter代表这个入参User。不能使用&&-->
            username like ${username} <!--需调用时提供%-->
        </if>
        <if test="sex!=null and sex!=''">
            and sex=#{sex}
        </if>
    </where>
</select>
```

* set元素会动态**前置 SET 关键字**，同时也会**删掉无关的逗号**

```xml
<update id="updateUser" parameterType="User" resultType="User">
    update Author
    <set>
        <if test="username != null">username=#{username},</if>
        <if test="address != null">password=#{password},</if>
        <if test="sex != null">bio=#{bio}</if>
    </set>
    where id=#{id}
</update>
```



### 3.2 foreach

- 向sql传递迭代对象(如 **List**、**Set**等)、**Map**对象或者**数组**对象或包装有他们的**QueryVo包装对象**

    需求：**根据多个id查询用户信息**

    查询sql：SELECT * FROM user WHERE id IN (1,10,24)

- **QueryVo包装对象**

    ```java
    //QueryVo.java
    List<Integer> ids;
    //或 Integer[] ids;
    //getter,setter...
    ```

    ```java
    List<User> selectUserByIds(QueryVo vo);
    ```

    ```xml
    <!-- 根据ids查询用户 -->
    <select id="queryUserByIds" parameterType="queryVo" resultType="user">
    	SELECT * FROM `user`
    	<where>
    		<!-- foreach标签，进行遍历 -->
    		<!-- collection：遍历的集合，指的是传入参数的属性，这里是QueryVo的ids属性 -->
    		<!-- 当使用可迭代对象或者数组时，index 是当前迭代的次数，item 的值是本次迭代获取的元素 -->
             <!-- 当使用 Map 对象（或者 Map.Entry 对象的集合）时，index 是键，item 是值 -->
    		<!-- open：在前面添加的sql片段 -->
    		<!-- close：在结尾处添加的sql片段 -->
    		<!-- separator：指定遍历的元素之间使用的分隔符，不指定默认为逗号“，” -->
    	   <foreach collection="ids" item="item" open="id IN (" close=")" separator=",">
    			#{item}
    	   </foreach>
    	</where>
    </select>
    ```

- 当传递的参数是**Array对象**，collection应赋值**array**

    当传递的参数是**List对象**，collection应赋值**collection**或**list**

    当传递的参数是**Set对象**，collection应赋值**collection**

    当传递的参数是**Map对象**，collection应赋值为**map中的key值**（具体的key，value可以是数组，集合等）

    ```java
    public List<User> selectUserByIds(Integer[] ids);
    public List<User> selectUserByIds(List<Integer> ids); 
    ```

    ```xml
    <select id="findUserByIds"  resultType="User" >
        select * from user where
        <foreach collection="array" item="item" open="id in (" close=")" separator=",">
            #{item}
        </foreach>
    </select>
    ```

### 3.3 sql片段（了解）

- Sql中可将重复的sql提取出来，使用时用include引用即可，最终达到sql重用的目的。暂时没啥用

    ```xml
    <sql id="selector">
        select * from user
    </sql>
    <select id="findUserById" parameterType="int" resultType="User">
        <include refid="selector"/>
        where id = #{id}
    </select>
    ```



## 4 MyBatis中多表查询

* 4.1和4.2案例使用的是**用户**和**账户**：一个用户可以有多个账户；一个账户只能属于一个用户（多个账户也可以属于一个用户）
* 步骤
    1. 建立两张表：**用户表**、**账户表**。让用户表和账户表**具备一对多**关系，需使用**外键**在账户表中添加
    2. 建立两个实体类：**用户类**、**账户类**，让让用户类和账户类能**体现出一对多**关系
        - **从表类引用主表类**；**主表类包含从表类集合的引用**；
    3. 建立两个配置文件：用户和账户的配置文件
    4. 实现配置：查询用户时，同时得到用户下所包含的账户信息；查询账户时，可以得到账户所属用户的信息

- 需要使用**==resultMap==**，resultType也行但是得创建继承类麻烦

### 4.1 一对一（多对一）(association)

> 一对一中有时返回的pojo包含两张表信息，且不是包含另一个pojo对象，可以不用写resultMap

- 查询所有**账户**信息，关联查询**用户**信息。 **==从表类引用主表类==**`private User user;`

    因为一个账户信息只能供某个用户使用，所以从查询账户信息出发关联查询用户信息为一对一查询。

    如果从用户信息出发查询用户下的账户信息则为一对多查询，因为一个用户可以有多个账户。 

    ```java
    //AccountMapper.java
    List<Account> findAll();
    ```

    ```xml
    <!--AccountMapper.xml-->
    <!--以下主从表column不能相同；使用了别名，有关type的不用写全限定类名，大小写不敏感；id为主键列，result为其他列-->
    <resultMap id="AccountUserMap" type="Account">
        <id property="id" column="aid" />
        <result property="uid" column="uid"/>
        <result property="money" column="money"/>
        <!--一对一映射association，配置引用的User内容-->
        <association property="user" javaType="User">
            <id property="id" column="id"/>
            <result property="username" column="username"/>
            <result property="address" column="address"/>
            <result property="sex" column="sex"/>
            <result property="birthday" column="birthday"/>
        </association>
    </resultMap>
    
    <select id="findAll" resultMap="AccountUserMap">
        SELECT u.*,a.id aid,a.uid,a.money FROM account a JOIN user u ON a.uid=u.id;
    </select>
    ```

### 4.2 一对多(collection)

- 查询所有**用户**信息及用户关联的**账户**信息。 **==主表类包含从表类集合的引用==**`private List<Account> accounts`

    用户信息和他的账户信息为一对多关系，并且查询过程中如果用户没有账户信息，此时也要将用户信息查询出来，我们想到了**左外连接**查询比较合适。 

    ```java
    //UserMapper.java
    List<User> findAll();
    ```

    ```xml
    <!--UserMapper.xml-->
    <!--以下主从表column不能相同；使用了别名，有关type的不用写全限定类名，大小写不敏感；id为主键列，result为其他列-->
    <resultMap id="UserAccountMap" type="User">
        <id property="id" column="id"/>
        <result property="username" column="username"/>
        <result property="address" column="address"/>
        <result property="sex" column="sex"/>
        <result property="birthday" column="birthday"/>
        <!--一对多映射collection，配置引用的Account集合内容，由于泛型，使用其值类型-->
        <collection property="accounts" ofType="Account">
            <id property="id" column="aid"/>
            <result property="uid" column="uid"/>
            <result property="money" column="money"/>
        </collection>
    </resultMap>
    
    <select id="findAll" resultMap="UserAccountMap">
        SELECT u.*,a.id aid,a.uid,a.money FROM `user` u LEFT JOIN account a ON u.id = a.uid;
    </select>
    ```

### 4.3 多对多

* 多对多关系其实我们看成是**==双向的一对多关系==**。原理同4.2

* 案例使用**用户**和**角色**：一个用户可以有多个角色；一个角色可以赋予多个用户

* 步骤

    1. 建立两张表：**用户表**、**角色表**。让用户表和角色表**具备多对多**关系，需要中间表，**中间表外键引用**两张表各自的**主键**
    2. 建立两个实体类：**用户类**、**角色类**，让让用户类和角色类能**体现出多对多**关系
        - **==各自包含对方一个集合的引用==**；`private List<User> users;` 、`private List<Role> roles;`
    3. 建立两个配置文件：用户和角色的配置文件
    4. 实现配置：查询用户时，同时得到用户下所包含的角色信息；查询角色时，可以得到角色所赋予用户的信息

    ```java
    //RoleMapper.java
    List<Role> findAll();
    ```

    ```xml
    <mapper namespace="cn.itcast.dao.RoleMapper">
        <resultMap id="roleMap" type="Role">
            <id property="roleId" column="rid"/>
            <result property="roleName" column="role_name"/>
            <result property="roleDesc" column="role_desc"/>
            <collection property="users" ofType="User">
                <id property="id" column="id"/>
                <result property="username" column="username"/>
                <result property="address" column="address"/>
                <result property="sex" column="sex"/>
                <result property="birthday" column="birthday"/>
            </collection>
        </resultMap>
    
        <select id="findAll" resultMap="roleMap">
            SELECT u.*, r.id rid, r.role_name, r.role_desc
            FROM role r
            LEFT JOIN user_role ur ON r.id = ur.rid
            LEFT JOIN user u ON ur.uid = u.id
        </select>
    </mapper>
    ```

    ```java
    //UserMapper.java
    List<User> findAll();
    ```

    ```xml
    <mapper namespace="cn.itcast.dao.UserMapper">    
        <resultMap id="userRoleMap" type="User">
            <id property="id" column="id"/>
            <result property="username" column="username"/>
            <result property="address" column="address"/>
            <result property="sex" column="sex"/>
            <result property="birthday" column="birthday"/>
            <collection property="roles" ofType="Role">
                <id property="roleId" column="rid"/>
                <result property="roleName" column="role_name"/>
                <result property="roleDesc" column="role_desc"/>
            </collection>
        </resultMap>
    
        <select id="findAll" resultMap="userRoleMap">
            SELECT u.*, r.id rid, r.role_name, r.role_desc
            FROM user u
            LEFT JOIN user_role ur ON u.id = ur.uid
            LEFT JOIN role r ON ur.rid = r.id
        </select>
    </mapper>
    ```





## 5 MyBatis延迟加载策略

在查询用户时，用户下的账户信息应该是什么时候使用什么时候查询

在查询账户时，账户所属的用户信息应该随着账户查询一起查询出来

* **延迟加载**：就是在**需要==用到数据==时才进行加载**，不需要用到数据时就不加载数据。也称懒加载或按需加载
    * 弊端：在大批量数据查询时，因为查询工作也要消耗时间，所以可能造成用户等待时间变长，造成用户体验下降
* **立即加载**：无论用不用数据都进行加载

在对应的四种表关系中，**延迟加载**用于**一对多**、**多对多**；**立即加载**用于**一对一**、**多对一**

* **mybatis-config.xml中开启延迟加载**配置如下

```xml
<settings>
    <setting name="lazyLoadingEnabled" value="true"/> <!--延迟加载的全局开关。当开启时，所有关联对象都会延迟加载-->
    <!--<setting name="aggressiveLazyLoading" value="false"/>此属性在版本>3.4.1时值默认为false，可以不设置-->
</settings>
```

### 5.1 一对一、多对一

虽然理论上一对一、多对一可以使用立即加载，但是为方便学习

```java
//AccountMapper.java
List<Account> findAll();
```

```xml
<!--AccountMapper.xml-->
<mapper namespace="cn.itcast.dao.AccountMapper">
    <!--有关type的不用写全限定类名，大小写不敏感；id为主键列，result为其他列-->
    <resultMap id="AccountUserMap" type="Account">
        <id property="id" column="id" />
        <result property="uid" column="uid"/>
        <result property="money" column="money"/>
        <!--一select：查询用户的唯一标示；column：查询用户时需要传递的字段-->
        <association property="user" column="uid" javaType="User" select="cn.itcast.dao.UserMapper.findById" >
        </association>
    </resultMap>

    <select id="findAll" resultMap="AccountUserMap">
        SELECT * from account
    </select>
</mapper>
```

```java
//UserMapper.java
User findById(Integer id);
```

```xml
<!--UserMapper.xml-->
<mapper namespace="cn.itcast.dao.UserMapper">
    <select id="findById" resultType="cn.itcast.domain.User">
        select * from user where id=#{id}; <!--占位符可以随便写uid等-->
    </select>
</mapper>
```

测试类中若**仅调用`findAll`方法**，不对其返回值操作，则**只会查询Account数据**，没有其所属User的数据

### 5.2 一对多、多对多

```java
//UserMapper.java
List<User> findAll();
```

```xml
<!--UserMapper.xml-->
<mapper namespace="cn.itcast.dao.UserMapper">
    <!--使用了别名，有关type的不用写全限定类名，大小写不敏感；id为主键列，result为其他列-->
    <resultMap id="UserAccountMap" type="User">
        <id property="id" column="id"/>
        <result property="username" column="username"/>
        <result property="address" column="address"/>
        <result property="sex" column="sex"/>
        <result property="birthday" column="birthday"/>
        <!--一select：查询账户的唯一标示；column：查询账户时需要传递的字段-->
        <collection property="accounts" ofType="Account" select="cn.itcast.dao.AccountMapper.findById" column="id">
        </collection>
    </resultMap>

    <select id="findAll" resultMap="UserAccountMap">
        SELECT * from user
    </select>
</mapper>
```

```java
//AccountMapper.java
List<Account> findById(Integer id);
```

```xml
<!--AccountMapper.xml-->
<mapper namespace="cn.itcast.dao.AccountMapper">
    <select id="findById" resultType="Account">
        select * from account where uid = #{uid}
    </select>
</mapper>
```



## 6 MyBatis的缓存

* 缓存：存在于内存中的临时数据
* 为什么使用缓存：通过缓存策略来**减少数据库的查询次数**，从而**提高性能**
* 什么数据能使用缓存，什么数据不能使用缓存？
    * **适用**于缓存：**经常被查询**且**不经常改变的**；数据的正确性对**结果影响不大**的
    * **不适用**于缓存：**经常改变的数据**；数据的正确性对最终**结果影响很大**（商品库存、银行汇率、股市牌价）

Mybatis中缓存分为一级缓存，二级缓存

### 6.1 一级缓存

* 一级缓存是 **==SqlSession==** 对象的缓存，当调用SqlSession的**添加，删除，修改，`commit()`，`close()`，`clearCache()`等**方法时，就会**清空一级缓存**。 默认开启。

    > 执行查询后，结果会同时存入SqlSession为我们提供的一块区域中（结构为map），再次查询时先从SqlSession中找...

* 验证：两次查询同一User对象并打印，结果Hash值相同，并且SQL语句只执行了一次。若中间修改数据库数据，则执行两次

### 6.2 二级缓存

* 二级缓存是值**==SqlSessionFactory==**对象的缓存，由同一个SqlSessionFactory对象创建的SqlSession共享

* 二级缓存使用步骤

    1. 让MyBatis框架支持二级缓存，在mybatis-config.xml中配置。不配置也行，默认为true开启。

        ```xml
        <settings>
            <setting name="cacheEnabled" value="true"/>
        </settings>
        ```

    2. 让映射文件支持二级缓存，如在UserMapper.xml中配置，在mapper标签内

        ```xml
        <cache/>
        ```

    3. 让当前的操作支持二级缓存，如在select标签中配置

        ```xml
        <select id="findById" resultType="User" useCache="true">
            select * from user where id=#{id};
        </select>
        ```

* 验证：同一个SqlSessionFactory对象创建的SqlSession并获取代理接口实现类，查询同一User对象（期间清空一级缓存），发现日志中**SQL语句只执行了一次**，但是**Hash值却不同**。原因是**==二级缓存存储的只是数据==**，当被查询时**创建对象并返回**。



## 7 MyBatis的注解开发

> 注解不能和xml在同一目录同时存在，否则运行直接报错。一般也没人这么干

### 7.1 mybatis的常用注解说明

* @Select：实现查询

* @Insert：实现新增

* @Delete：实现删除

* @Update：实现更新   

* @**Result**：实现结果集封装。id、property、column

    * @**One**：实现一对一结果集封装。select、fetchType（枚举类，延迟加载选项）
    * @**Many**：实现一对多结果集封装 

* @**Results**：可以与@Result 一起使用（放在value中），**封装多个结果集**。id、value

* @**ResultMap**：实现**引用@Results** 定义的封装 

* @**CacheNamespace**：实现注解**二级缓存**的使用，blocking，布尔值



* @**Param**：方法中有**多参数**时（多表插入时），需指定！！！也可以封装到JavaBean对象中

* @SelectProvider：实现动态 SQL 映射，还有@InsertProvider、@DeleteProvider、@UpdateProvider

    需自定义类和方法，之后添加注解`@SelectProvider(type = UserDaoProvider.class, method = "findUserById")  `

    感觉比xml还麻烦啊



### 7.2 单表CRUD

```java
@Select("select * from user")
List<User> findAll();

@Select("select * from user where id = #{id}")
User findById(Integer id);

@Select("select * from user where username like #{username}")
List<User> findByUsername(String username);

@Select("select count(*) from user")
Integer findCount();

@Insert("insert into user (username,address,sex,birthday) values (#{username},#{address},#{sex},#{birthday})")
void addUser(User user);

@Update("update user set username=#{username} where id = #{id}")
void updateUser(User user);

@Delete("delete from user where id=#{id}")
void deleteUser(Integer id);

//多参数时需指定
@Insert("insert into USERS_ROLE values(#{userId},#{roleId})")
void addRoleToUser(@Param("userId") String userId, @Param("roleId") String roleId);
```

### 7.3 单表结果集封装

数据库字段名和JavaBean属性名称不一致

```java
@Select("select * from user")
@Results(id = "UserMap",value = {
    @Result(id = true,property = "userId",column = "id"), //主键要设置id为true，id的默认值为false
    @Result(property = "userName",column = "username"),
    @Result(property = "userBirthday",column = "birthday"),
    @Result(property = "userSex",column = "sex"),
    @Result(property = "userAddress",column = "address")
})
List<User> findAll();


@Select("select * from user where id = #{id}")
@ResultMap("UserMap")
User findById(Integer id);

@Select("select * from user where username like #{username}")
@ResultMap("UserMap")
List<User> findByUsername(String username);
```

### 7.4 一对一（多对一）

* 采用立即加载

```java
//AccountMapper.java
@Select("select * from account")
@Results(id = "AccountMap",value = {
    @Result(id = true,property = "id",column = "id"),
    @Result(property = "uid",column = "uid"),
    @Result(property = "money",column = "money"),
    //column为外键列，可以不出现在实体类中，只要数据库中有，可以通过后面的sql语句使用该外键查询即可
    @Result(property = "user",column = "uid",
            one = @One(select = "cn.itcast.dao.UserMapper.findById",fetchType = FetchType.EAGER ))

})
List<Account> findAll();

//应给7.5提供的
@Select("select * from account where uid = #{uid}")
List<Account> findById(Integer uid);
```

### 7.5 一对多

* 采用懒加载（延迟加载）

```java
//UserMapper.java
@Select("select * from user")
@Results(id = "UserMap",value = {
    @Result(id = true,property = "id",column = "id"),
    @Result(property = "username",column = "username"),
    @Result(property = "birthday",column = "birthday"),
    @Result(property = "sex",column = "sex"),
    @Result(property = "address",column = "address"),
    //column为外键列，可以不出现在实体类中，只要数据库中有，可以通过后面的sql语句使用该外键查询即可
    //此处为通过id查询关联的表中数据
    @Result(property = "accounts",column = "id",
            many = @Many(select = "cn.itcast.dao.AccountMapper.findById",fetchType = FetchType.LAZY))
})
List<User> findAll();

//应给7.4提供的
@Select("select * from user where id = #{id}")
User findById(Integer id);
```

> 注意：7.4和7.5的findById都使用ResultMap的话，互相无限调用导致栈溢出



### 7.6 缓存

* 一级缓存不需要开启，直接就可使用

* 二级缓存的配置文件默认支持（同XML），只需给Mapper接口添加注释

    ```java
    @CacheNamespace(blocking = true)
    public interface UserMapper {
    	...
    }
    ```



## 8 逆向工程

- 配置文件修改：
    - 修改要生成的数据库表
    - **domain**文件所在包路径，生成后实现Serializable接口，以便在网络中传输。带Example的就不用了
    - **dao**所在的包路径
- 注意：
    - 逆向工程生成的代码只能做**单表查询**
    - 不能在生成的代码上进行扩展，因为如果数据库变更，需要重新使用逆向工程生成代码，原来编写的代码就被覆盖了。
    - 一张表会生成**4个文件**
    - User.java(返回值对象); UserExample.java(条件查询时装数据的对象); UserDao.java; UserDao.xml

