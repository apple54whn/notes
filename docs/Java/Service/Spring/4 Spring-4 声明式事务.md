# 声明式事务—AOP的使用

## 明确要点

- JavaEE 体系进行分层开发，**事务处理位于业务层**，Spring 提供了分层设计业务层的事务处理解决方案。 
- Spring 框架为我们提供了一组事务控制的**接口**，在 `spring-tx-*.RELEASE.jar` 中。具体在后面的第二小节介绍。
- Spring的事务控制都是**基于 AOP 的**，它既可以使用编程的方式实现，也可以使用**配置的方式实现**（重点）。



## Spring 中事务控制的 API 介绍 

PlatformTransactionManager：此接口是 spring 的事务管理器，它里面提供了我们常用的操作事务的方法，如下：

- 获取事务状态信息：`TransactionStatus getTransaction(TransactionDefinition definition)`
- 提交事务：`void commit(TransactionStatus status)`
- 回滚事务：`void rollback(TransactionStatus status)`

我们在开发中都是使用它的实现类（**真正管理事务的对象** ）：

- **`org.springframework.jdbc.datasource.DataSourceTransactionManager`**：**Spring JDBC或iBatis持久化数据使用**
- `org.springframework.orm.hibernate5.HibernateTransactionManager`：用 Hibernate 版本进行持久化数据使用

------

TransactionDefinition：是事务的定义信息对象，里面有如下方法：

- 获取事务对象名称：`String getName()`
- 获取事务隔离级别：`int getIsolationLevel()`，采用数据库的默认级别
- 获取事务**传播行为**：`int getPropagationBehavior()`
    - **REQUIRED**：如果当前没有事务就新建一个事务，如果已经存在一个事务中，加入到这个事务中。一般的选择(默认值)
    - **SUPPORTS**：支持当前事务，如果当前没有事务，就以非事务方式执行(没有事务) 
    - MANDATORY：使用当前的事务，如果当前没有事务，就抛出异常
    - REQUERS_NEW:新建事务，如果当前在事务中，把当前事务挂起
    - NOT_SUPPORTED:以非事务方式执行操作，如果当前存在事务，就把当前事务挂起
    - NEVER:以非事务方式运行，如果当前存在事务，抛出异常
    - NESTED:如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行 REQUIRED 类似的操作
- 获取事务超时时间：`int getTimeout()`，默认值是-1，没有超时限制。如果有，以秒为单位进行设置
- 获取事务**是否只读**：`boolean isReadOnly()`，建议查询时设置为只读。 

------

TransactionStatus：此接口提供的是**事务具体的运行状态**，方法介绍如下：

- 刷新事务：`void flush()`
- 获取是否存在存储点：`boolean hasSavepoint()`
- 获取事务是否完成：`boolean isCompleted()`
- 获取事务是否为新的事务：`boolean isNewTransaction()`
- 获取事务是否回滚：`boolean isRollbackOnly()`
- 设置事务回滚：`void setRollbackOnly()`



## `Transactional`

注册事务管理器：MyBatis、JdbcTemplate使用`PlatformTransactionManager`接口下的`DataSourceTransactionManager`实现类，传入`DataSource`

`@EnableTransactionManagement`、`Transactional`

```java
@Configuration
@ComponentScan("com.itheima")
@Import({JdbcConfig.class,TransactionConfig.class})
@PropertySource("classpath:jdbcConfig.properties")
@EnableTransactionManagement
public class SpringConfiguration {

}
```

```java
//连接数据库相关的配置类
public class JdbcConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource(){
        DriverManagerDataSource dataSource = new DriverManagerDataSource();//使用spring提供的DataSource
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource){
        return new JdbcTemplate(dataSource);
    }
}
```

```java
//和事务相关的配置类
public class TransactionConfig {
    //创建事务管理器对象
    @Bean 
    public PlatformTransactionManager transactionManager (DataSource dataSource){
        return new DataSourceTransactionManager(dataSource);
    }
}
```

```properties
#jdbcConfig.properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql:///bxgaccount?serverTimezone=GMT%2B8
jdbc.username=root
jdbc.password=w111151
```

```java
/**
 * 账户的业务层实现类
 * 事务控制应该都是在业务层
 */
@Service("accountService")
@Transactional(propagation= Propagation.SUPPORTS,readOnly=true)//只读型事务的配置
public class AccountServiceImpl implements IAccountService{

    @Autowired
    private IAccountDao accountDao;

    @Override
    public Account findAccountById(Integer accountId) {
        return accountDao.findAccountById(accountId);

    }
    
    @Transactional(propagation= Propagation.REQUIRED,readOnly=false)//需要的是读写型事务配置，默认为那俩参数
    @Override
    public void transfer(String sourceName, String targetName, Float money) {
        System.out.println("transfer....");
        //2.1根据名称查询转出账户
        Account source = accountDao.findAccountByName(sourceName);
        //2.2根据名称查询转入账户
        Account target = accountDao.findAccountByName(targetName);
        //2.3转出账户减钱
        source.setMoney(source.getMoney()-money);
        //2.4转入账户加钱
        target.setMoney(target.getMoney()+money);
        //2.5更新转出账户
        accountDao.updateAccount(source);

        int i=1/0;
        //2.6更新转入账户
        accountDao.updateAccount(target);
    }
}
```





## xml 配置（旧）

1. spring中基于XML的声明式事务控制配置步骤

    1. 配置**事务管理器**
    2. 配置**事务的通知**引用事务管理器 
        此时我们需要导入事务的约束 tx名称空间和约束，同时也需要aop的
        使用`tx:advice`标签配置事务通知
        属性：
        ​        `id`：给事务通知起一个唯一标识
        ​        `transaction-manager`：给事务通知提供一个事务管理器引用
    3. 配置**事务的属性**（在上述`tx:advice`中）
    4. 配置AOP中的通用**切入点**表达式
    5. 建立事务**通知和切入点表达式的对应关系**

    ```xml
    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>
    
    <!-- 配置事务的通知-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <!-- 配置事务的属性
          isolation：用于指定事务的隔离级别。默认值是DEFAULT，表示使用数据库的默认隔离级别。
          propagation：用于指定事务的传播行为。默认值是REQUIRED，表示一定会有事务，增删改的选择。查询方法可以选择SUPPORTS。
          read-only：用于指定事务是否只读。只有查询方法才能设置为true。默认值是false，表示读写。
          timeout：用于指定事务的超时时间，默认值是-1，表示永不超时。如果指定了数值，以秒为单位。
      rollback-for：用于指定一个异常，当产生该异常时，事务回滚，产生其他异常时，事务不回滚。没有默认值。表示任何异常都回滚。
     no-rollback-for：用于指定一个异常，当产生该异常时，事务不回滚，产生其他异常时事务回滚。没有默认值。表示任何异常都回滚。
        -->
        <tx:attributes>
            <tx:method name="*" propagation="REQUIRED" read-only="false"/>
            <tx:method name="find*" propagation="SUPPORTS" read-only="true"></tx:method>
        </tx:attributes>
    </tx:advice>
    
    <!-- 配置aop-->
    <aop:config>
        <!-- 配置切入点表达式-->
        <aop:pointcut id="pt1" expression="execution(* com.itheima.service.impl.*.*(..))"></aop:pointcut>
        <!--建立切入点表达式和事务通知的对应关系 -->
        <aop:advisor advice-ref="txAdvice" pointcut-ref="pt1"></aop:advisor>
    </aop:config>
    ```





