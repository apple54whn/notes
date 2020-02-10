# Annotation 注解

## 注解和注释区别

*   **注释**：在阅读程序时更清楚，给**程序员看的**

*   **注解**：**给jvm看的**，给机器看的



## 注解的理解

*   从 JDK 5.0 开始，Java 增加了对**元数据（MetaData）**的支持, 也就是Annotation。Annotation 其实就是代码里的**特殊标记**, 这些标记可以在**编译、类加载、运行时**被读取, 并执行相应的处理。通过使用 Annotation, 程序员可以在不改变原有逻辑的情况下, 在源文件中嵌入一些补充信息。代码分析工具、开发工具和部署工具可以通过这些补充信息进行验证或者进行部署。
*   Annotation 可以像修饰符一样被使用，可用于修饰**包、类、构造器、方法、成员变量、参数、局部变量的声明**，这些信息被保存在 Annotation 的 key,value 对中。
*   在JavaSE中，注解的使用目的比较简单，例如标记过时的功能，忽略警告等。在JavaEE/Android中注解占据了更重要的角色，例如用来配置应用程序的任何切面，代替JavaEE旧版中所遗留的繁冗代码和XML配置等。未来的开发模式都是基于注解的，JPA是基于注解的，Spring2.5以上都是基于注解的，Hibernate3.x以后也是基于注解的，现在的Struts2有一部分也是基于注解的了，注解是一种趋势，一定程度上可以说：`框架 = 注解 + 反射 + 设计模式`。



## 注解的作用

### 编译检查

通过代码里标识的注解让编译器能够实现基本的编译检查

-   `@Override`：检测被该注解标注的方法是否是继承/实现自父类/接口的
-   `@Deprecated`：该注解标注的内容，表示已过时，通常是因为 所修饰的结构危险或存在更好的选择
-   `@SuppressWarnings({数组})`：压制警告。不让显示黄线或灰色，变量、方法、类上都可以使用
    *   一般传递参数all  `@SuppressWarnings("all")`



### 代码分析

通过代码里标识的注解对代码进行分析（替代配置文件，如 Servlet3.0和 Spring 中注解）



### 编写文档

通过代码里标识的注解生成doc文档

-   @author 标明开发该类模块的作者，多个作者之间使用,分割
-   @version 标明该类模块的版本
-   @see 参考转向，也就是相关主题
-   @since 从哪个版本开始增加的
-   @param 对方法中某参数的说明，如果没有参数就不能写
-   @return 对方法返回值的说明，如果方法的返回值类型是void就不能写
-   @exception 对方法可能抛出的异常进行说明 ，如果方法没有用throws显式抛出的异常就不能写

其中

-   @param @return 和 @exception 这三个标记都是只用于方法的
-   @param的格式要求:@param 形参名 形参类型 形参说明
-   @return 的格式要求:@return 返回值类型 返回值说明
-   @exception的格式要求:@exception 异常类型 异常说明
-   @param和@exception可以并列多个



## 自定义注解

### 格式

*   本质：注解本质上就是一个**接口**，该接口**默认实现**`java.lang.annotation.Annotation`接口

*   格式，可参照`@SuppressWarnings`

    ```java
    @元注解
    public @interface 注解名称{
    	属性列表;
    }
    ```

*   自定义注解必须配上注解的信息处理流程（使用反射）才有意义

    ```java
    @Target({ElementType.METHOD,ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface MyAnno {
    	//注解的属性
    	String name();
    	int age() default 28;	
    }
    ```



### 成员变量

*   **成员变量（不是方法）**：以**无参数无方法体的方法**来声明，其**方法名**和**返回值**定义了该成员的名字和类型，称为配置参数
    -   **返回值类型**的取值：`八种基本数据类型`、`String`、`Class`、`Enum`、`Annotation`、`以上类型的数组`

    -   定义了属性，在**使用时**需要给属性**赋值**

        *   如果定义属性时使用`default`关键字给属性默认初始化值，则使用注解时，可不进行属性的赋值。

        *   如果**只有一个属性需要赋值**，并且属性的名称是`value`，则`value`可以省略，直接定义值即可。

        *   **数组**赋值时，值使用`{}`包裹。如果数组中只有一个值，则`{}`可以省略

    -   没有成员定义的 Annotation 称为**标记**，如`@Override`；包含成员变量的 Annotation 称为**元数据 Annotation**



### 元注解

*   **元注解**：用于**描述注解的注解**，即修饰其他 Annotation的Annotation

    -   `@Target`：描述注解能够**作用的位置**，**属性`ElementType`枚举类**。不指定则都可以使用

        -   `TYPE`：可以作用于类上。Class, interface (including annotation type), or enum declaration

        -   `FIELD`：可以作用于域（成员变量）上。Field declaration (includes enum constants)

        -   `CONSTRUCTOR`：可以作用于构造器上。Constructor declaration

        -   `METHOD`：可以作用于方法上。Method declaration

        -   `PARAMETER`：Formal parameter declaration

        -   `LOCAL_VARIABLE`：Local variable declaration

        -   `ANNOTATION_TYPE`：Annotation type declaration

        -   `PACKAGE`：Package declaration

        -   `TYPE_PARAMETER`：since 1.8，Type parameter declaration，能写在类型变量的声明语句中(如:泛型声明)

            ```java
            public class TestTypeDefine<@TypeDefine() U> {}
            ```

        -   `TYPE_USE`：since 1.8，Use of a type，能写在使用类型的任何语句中

            ```java
            AnnotationTest<@MyAnnotation String> t = null;
            int a = (@MyAnnotation int) 2L;
            public static void test(@MyAnnotation String arg) throws @MyAnnotation Exception {}
            // ...
            ```

    -   `@Retention`：只能用于修饰一个 `Annotation` 定义，用于指定该 `Annotation` 被**保留**到的阶段，`@Rentention` 包含一个 `RetentionPolicy`**枚举类型**的成员变量：

        -   `SOURCE`：注解只在`.java`源文件级别有效。编译器直接丢弃这种策略的注释
        -   `CLASS`：默认值，注解在`.java`源文件级别和`.class`字节码文件级别都有效。运行Java 程序时，JVM 丢弃
        -   `RUNTIME`：在运行时有效，会保留到`.class`字节码文件中，并被JVM读取到，可**通过反射获取该注释**

    -   `@Repeatable`：since 1.8，**可重复注解**。`Target` 和 `Retenton` 等元注解需相同，否则编译或运行报错

        -   1.8之前

            ```java
            @Target({ElementType.TYPE,ElementType.FIELD})
            @Retention(RetentionPolicy.RUNTIME)
            public @interface MyAnnotations {
            
                MyAnnotation[] value();
            }
            ```

            ```java
            @Target({ElementType.TYPE,ElementType.FIELD})
            @Retention(RetentionPolicy.RUNTIME)
            public @interface MyAnnotation {
            
                String value() default "hello annotation";
            }
            ```

            ```java
            @MyAnnotations({@MyAnnotation, @MyAnnotation})
            public class AnnotationTest{ }
            ```

        -   1.8及之后

            ```java
            @Target({ElementType.TYPE,ElementType.FIELD})
            @Retention(RetentionPolicy.RUNTIME)
            public @interface MyAnnotations {
            
                MyAnnotation[] value();
            }
            ```

            ```java
            @Repeatable(MyAnnotations.class)
            @Target({ElementType.TYPE,ElementType.FIELD})
            @Retention(RetentionPolicy.RUNTIME)
            public @interface MyAnnotation {
            
                String value() default "hello annotation";
            }
            ```

            ```java
            @MyAnnotation
            @MyAnnotation
            public class AnnotationTest { } 
            ```

    -   `@Documented`：描述注解是否被javadoc抽取到api文档中，如`Date`类中有些`@Deprecated`方法 

    -   `@Inherited`：描述注解是否被子类继承







## 注解的应用

目前而言最主流的应用：**代替配置文件**，例如改写反射中加载配置文件的例子

-   配置文件与注解开发的优缺点：
    -   注解优点：**开发效率高、成本低**
    -   注解缺点：耦合性大、并且不利于后期维护，过虑了！

```java
@Target({ElementType.TYPE,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Prop {
    String className();
    String methodName();
}
```

```java
@Prop(className = "test.Person",methodName = "show")
public class UserTest1 {

    @Prop(className = "test.Person",methodName = "show")
    public static void main(String[] args) throws NoSuchMethodException, ClassNotFoundException, IllegalAccessException, InvocationTargetException, InstantiationException {
        //获取类上注解对象，并调用方法获取值
        Class c = UserTest1.class;
        //Prop prop = (Prop) c.getAnnotation(Prop.class);
        //String className = prop.className();
        //String methodName = prop.methodName();
        
        //获取方法上注解对象，并调用方法获取值
        Method main = c.getMethod("main", String[].class);
        Prop prop = main.getAnnotation(Prop.class);
        String className = prop.className();
        String methodName = prop.methodName();
	    
        //同反射一致
        Class clazz = Class.forName(className);
        Constructor con = clazz.getConstructor();
        Object o = con.newInstance();
        Method show = clazz.getMethod(methodName, String.class);
        show.invoke(o,"牛逼");
    }
}
```

-   案例：简单的测试框架

    -   通过反射获取加了注解要被测试类的方法，`method.isAnnotationPresent(Prop.class)`
    -   通过返回值是否来执行该方法，若抛异常则通过IO流记录在文件中

-   小结：

    1.  以后大多数时候，我们会使用注解，而不是自定义注解
    2.  注解给谁用？
    3.  编译器
    4.  给解析程序用，如上面的测试框架程序
    5.  注解不是程序的一部分，可以理解为注解就是一个标签



