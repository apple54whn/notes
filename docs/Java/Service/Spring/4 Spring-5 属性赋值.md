# 属性赋值

## 属性赋值

### `@Value`

用于注入基本类型和String数据

- 属性：`value`指定数据的值。

    - 基本类型和String

    - 使用SpEL（写法：`#{表达式}`）

    - 可以取出配置文件如properties中的值（也存在于运行环境变量里面）：`${}`，结合`@PropertySource注解`

        ```java
        public class Person {
            @Value("张三")
            private String name;
            @Value("#{20-2}")
            private Integer age;
            @Value("${person.nickName}")
            private String nickName;
            ......
        }
        ```

        ```java
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        String property = environment.getProperty("person.nickName");
        ```



### `@PropertySource`

用于**指定properties文件的位置**，是重复注解

- `value`指定文件的**名称和路径**数组。关键字：**classpath**，表示类路径下

