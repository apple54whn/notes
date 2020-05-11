# 属性赋值

## @Value

用于注入基本类型和String数据

- `value`指定数据的值。

    - 基本类型和String

    - 使用SpEL（写法：`#{表达式}`）

    - `${}`结合`@PropertySource`可取出配置文件如 properties 或 yml 中的值（**也存在于运行环境变量里面**）

        

## @PropertySource

重复注解，用于**指定properties文件的位置**

- `value`指定文件的**名称和路径**数组。关键字：**classpath**，表示类路径下





## @ConfigurationProperties—boot

Spring Boot 特有，用于批量注入配置文件中的属性，可配合 @PropertySource 使用。详细查看 Spring Boot Conf 章节



## 示例

### application.yml

```yml
person.nickName: wangcai
```



### Person.Class

```java
@Data
public class Person {

    @Value("张三")
    private String name;

    /**
     * SpEL
     */
    @Value("#{20-2}")
    private Long age;

    /**
     * 使用 @PropertySource 配合 ${} 获取配置文件中的值（也存在于运行环境变量 Environment 中）
     */
    @Value("${person.nickName}")
    private String nickName;
}
```



### AssignmentConfig1.Class

```java
@Configuration
@PropertySource({"classpath:/application.yml"})
public class AssignmentConfig1 {

    @Bean
    public Person person(){
        return new Person();
    }

}
```



### AssignmentConfig1Test.Class

```java
public class AssignmentConfig1Test {

    private ApplicationContext context;

    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(AssignmentConfig1.class);
        System.out.println("容器创建完成");
    }


    @Test
    public void test(){

        Person person = context.getBean(Person.class);
        System.out.println(person);

        Environment environment = context.getEnvironment();
        String nickName = environment.getProperty("person.nickName");
        System.out.println(nickName);

    }
}
```

