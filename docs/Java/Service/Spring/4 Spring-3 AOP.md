# AOP

## 引入——重复编码

之前使用`DBUtils`做的增删改查例子中，客户的业务层实现类存在的问题：**事务被自动控制了**。换言之，我们使用了 connection 对象的 `setAutoCommit(true)`  此方式控制事务，如果我们每次都执行一条 sql 语句，没有问题，但是如果业务方法一次要执行多条 sql 语句，这种方式就无法实现功能了。 

日志记录需要给每个方法都添加记录的方法。。。

权限控制需要给每个方法都添加权限校验。。。

……



## AOP 介绍及相关术语

### AOP 面向切面编程

AOP(Aspect Oriented Programming)：**面向切面编程**

* 作用：**在程序运行期间，不修改源码对已有方法进行增强**。 
* 优势：
    * 减少重复代码     
    * 提高开发效率     
    * 维护方便
* 实现方式：**动态代理**



### AOP 相关术语

* Joinpoint(连接点)：所谓连接点是指那些被拦截到的点。在 spring 中这些点指的是方法，因为 spring 只支持方法类型的连接点。 
* Pointcut(**切入点**)：所谓切入点是指我们要对哪些 Joinpoint 进行拦截的定义。即**被增强的连接点**
* Advice(**通知**/增强):   所谓通知是指拦截到 Joinpoint 之后所**要做的事情**就是通知。   
    * 通知的类型：前置通知、后置通知、异常通知、最终通知、环绕通知。 根据`method.invoke`之前、之后、catch中、finally中，以及实现类重写的`invoke`方法在执行（环绕通知中有明确的切入点方法调用）
* Introduction(引介):   引介是一种特殊的通知在不修改类代码的前提下, Introduction 可以在运行期为类动态地添加一些方法或 Field
* Target(目标对象):   代理的目标对象
* Weaving(织入):   是指把增强应用到目标对象来创建新的代理对象的**过程**。spring 采用动态代理织入，而 AspectJ 采用编译期织入和类装载期织入。 
* Proxy（代理）：一个类被 AOP 织入增强后，就产生一个结果代理类
* Aspect(**切面**):   是**切入点和通知（引介）的结合**。 



### 学习 AOP 要明确的事

* 开发阶段（我们做的）
    * 编写核心业务代码（开发主线）：大部分程序员来做，要求熟悉业务需求。  
    * 把公用代码抽取出来，制作成通知。（开发阶段最后再做）：AOP 编程人员来做。  
    * 在配置文件中，声明切入点与通知间的关系，即切面。：AOP 编程人员来做
* 运行阶段（Spring框架完成的）
    * Spring 框架监控切入点方法的执行。一旦监控到切入点方法被运行，使用代理机制，动态创建目标对象的代理对象，根据通知类别，在代理对象的对应位置，将通知对应的功能织入，完成完整的代码逻辑运行。 



## `@EnableAspectJAutoProxy`

```java
@Configuration 
@ComponentScan(basePackages="com.itheima") 
@EnableAspectJAutoProxy 
public class SpringConfiguration {
}
```



## `@Aspect`

添加**`@Component`、`@Aspect`**注解，配置切面（切点、通知）

```java
/**
 * 用于记录日志的工具类，它里面提供了公共的代码
 */
@Component("logger")
@Aspect//表示当前类是一个切面类
public class Logger {

    @Pointcut("execution(* com.itheima.service.impl.*.*(..))")
    private void pt1(){}

    //如下注解中，value和pointCut含义一样
    //以下通知的方法的参数列表中，JoinPoint必须出现在参数列表的第一位
    
    //前置通知
    @Before("pt1()")
    public  void beforePrintLog(JoinPoint joinPoint){
        Object[] args = joinPoint.getArgs();
        System.out.println(""+joinPoint.getSignature().getName()+"@Before:参数列表是：{"+Arrays.asList(args)+"}");
    }
    //后置通知
    @AfterReturning(value="pt1()",,returning="result")
    public  void afterReturningPrintLog(JoinPoint joinPoint,Object result){
       System.out.println(joinPoint.getSignature().getName()+"==@AfterReturning:运行结果：{"+result+"}");
    }
    //异常通知
    @AfterThrowing(value="pt1()",throwing="throwing")
    public  void afterThrowingPrintLog(JoinPoint joinPoint,Throwable t){
        System.out.println(joinPoint.getSignature().getName()+"异常。。。异常信息：{"+t+"});
    }
    //最终通知
    @After("pt1()")
    public  void afterPrintLog(JoinPoint joinPoint){
        System.out.println("joinPoint.getSignature().getName()+"结束。。。@After");
    }
 
}
```

```java
/** 省略上面代码 **/
/**
     * 环绕通知
     * 问题：
     *      当我们配置了环绕通知之后，切入点方法没有执行，而通知方法执行了。
     * 分析：
     *      通过对比动态代理中的环绕通知代码，发现动态代理的环绕通知有明确的切入点方法调用，而我们的代码中没有。
     * 解决：
     *  Spring框架为我们提供了一个接口：ProceedingJoinPoint。该接口有一个方法proceed()，此方法就相当于明确调用切入点方法。
     *  该接口可以作为环绕通知的方法参数，在程序执行时，spring框架会为我们提供该接口的实现类供我们使用。
     *
     * spring中的环绕通知：
     *      它是spring框架为我们提供的一种可以在代码中手动控制增强方法何时执行的方式。
     */
//若是外部类引用切点，则需要全类名+方法（但好像没意义，就两行代码）
@Around(value="pt1()") 
public Object aroundPringLog(ProceedingJoinPoint pjp){
    Object rtValue = null;
    try{
        Object[] args = pjp.getArgs();//得到方法执行所需的参数

        System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。前置");

        rtValue = pjp.proceed(args);//明确调用业务层方法（切入点方法）

        System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。后置");

        return rtValue;
    }catch (Throwable t){ //只能catch Throwable 
        System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。异常");
        throw new RuntimeException(t);
    }finally {
        System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。最终");
    }
}
```

注意：基于配置的AOP，**最终通知会在后置通知或异常通知之前执行**。环绕通知没有此问题，推荐使用

`ProceedingJoinPoint`接口继承了`JoinPoint`接口。比它多了`proceed`的无参和有参方法，用于执行JointPoint（连接点）

* `Signature getSignature()`：获取签名，即方法的签名
    * `String getName()`：获取方法的名称
* `Object[] getArgs()`：获取实际参数列表
* `Object getTarget()`：获取目标对象（被代理对象？）
* `Object getThis()`：获取代理对象



## 一般配置步骤

1. **抽取公共代码制作成通知** 

2. JavaConfig 配置如上

3. **切入点表达式**的写法：关键字：`execution(表达式)`

    * 表达式`访问修饰符  返回值  包名.包名.包名...类名.方法名(参数列表)`

    * 标准写法`public void com.itheima.service.impl.AccountServiceImpl.saveAccount()`

    * 访问修饰符可以省略`void com.itheima.service.impl.AccountServiceImpl.saveAccount()`

    * 返回值可以使用通配符，表示任意返回值

        `* com.itheima.service.impl.AccountServiceImpl.saveAccount()`

    * 包名可以使用通配符，表示任意包。但是有几级包，就需要写几个`*.`

        `* *.*.*.*.AccountServiceImpl.saveAccount()`

    * 包名可以使用`*..`表示当前包及其子包
        `* *..AccountServiceImpl.saveAccount()`

    * 类名和方法名都可以使用`*`来实现通配

        `* *..*.*()`

    * 参数列表：

        * 可以直接写数据类型：
            * 基本类型直接写名称           int
            * 引用类型写包名.类名的方式   java.lang.String
        * 可以使用通配符表示任意类型，但是必须有参数
        * 可以使用..表示有无参数均可，有参数可以是任意类型

    * 全通配写法：`* *..*.*(..)`

    * **实际开发中切入点表达式的通常写法**：**切到业务层实现类下的所有方法**

        `* com.itheima.service.impl.*.*(..)`



## xml 配置（旧）

1. 在spirng-config.xml中添加AOP约束。在指南中搜索`xmlns:aop`即可

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/aop
            http://www.springframework.org/schema/aop/spring-aop.xsd">
    </beans>
    ```

2. 配置 spring 的 ioc 

3. **抽取公共代码制作成通知** 

4. spring中基于XML的**AOP配置**步骤

    1. 把**通知Bean也交给spring来管理**

    2. 使用`aop:config`标签表明开始**AOP的配置**

    3. 使用`aop:aspect`标签表明配置**切面**

        - `id`属性：是给切面提供一个唯一标识
        - `ref`属性：是指定通知类bean的Id

    4. 在`aop:aspect`标签的内部使用对应标签来配置**通知的类型**。示例是让printLog方法在切入点方法执行之前之前

        - `aop:before`：表示配置前置通知。其他通知类似
            - `method`属性：用于指定Logger类中**哪个方法是前置通知**
            - `pointcut`属性：用于指定切入点表达式，该表达式的含义指的是对业务层中**哪些方法增强**
            - `ponitcut-ref`属性：用于指定切入点的表达式的引用 

    5. **切入点表达式**的写法：关键字：`execution(表达式)`

        * 表达式`访问修饰符  返回值  包名.包名.包名...类名.方法名(参数列表)`

        * 标准写法`public void com.itheima.service.impl.AccountServiceImpl.saveAccount()`

        * 访问修饰符可以省略`void com.itheima.service.impl.AccountServiceImpl.saveAccount()`

        * 返回值可以使用通配符，表示任意返回值

            `* com.itheima.service.impl.AccountServiceImpl.saveAccount()`

        * 包名可以使用通配符，表示任意包。但是有几级包，就需要写几个`*.`

            `* *.*.*.*.AccountServiceImpl.saveAccount()`

        * 包名可以使用`*..`表示当前包及其子包
            `* *..AccountServiceImpl.saveAccount()`

        * 类名和方法名都可以使用`*`来实现通配

            `* *..*.*()`

        * 参数列表：

            * 可以直接写数据类型：
                * 基本类型直接写名称           int
                * 引用类型写包名.类名的方式   java.lang.String
            * 可以使用通配符表示任意类型，但是必须有参数
            * 可以使用..表示有无参数均可，有参数可以是任意类型

        * 全通配写法：`* *..*.*(..)`

        * **实际开发中切入点表达式的通常写法**：**切到业务层实现类下的所有方法**

            `* com.itheima.service.impl.*.*(..)`

        ```xml
        <!-- 配置Logger类 -->
        <bean id="logger" class="com.itheima.utils.Logger"></bean>
        
        <!--配置AOP-->
        <aop:config>
            <!-- 配置切入点表达式 id属性用于指定表达式的唯一标识。expression属性用于指定表达式内容
                      此标签写在aop:aspect标签内部只能当前切面使用。
                      它还可以写在aop:aspect外面，此时就变成了所有切面的通知可可使用此切点  -->
            <aop:pointcut id="pt1" expression="execution(* com.itheima.service.impl.*.*(..))"></aop:pointcut>
            
            <!--配置切面 -->
            <aop:aspect id="logAdvice" ref="logger">  <!--引入通知-->
                <!-- 配置前置通知：在切入点方法执行之前执行
                <aop:before method="beforePrintLog" pointcut-ref="pt1" ></aop:before>-->
        
                <!-- 配置后置通知：在切入点方法正常执行之后值。它和异常通知永远只能执行一个
                <aop:after-returning method="afterReturningPrintLog" pointcut-ref="pt1"></aop:after-returning>-->
        
                <!-- 配置异常通知：在切入点方法执行产生异常之后执行。它和后置通知永远只能执行一个
                <aop:after-throwing method="afterThrowingPrintLog" pointcut-ref="pt1"></aop:after-throwing>-->
        
                <!-- 配置最终通知：无论切入点方法是否正常执行它都会在其后面执行
                <aop:after method="afterPrintLog" pointcut-ref="pt1"></aop:after>-->
        
                <!-- 配置环绕通知 详细的注释请看Logger类中。通常情况下，环绕通知都是独立使用的 -->
                <aop:around method="aroundPringLog" pointcut-ref="pt1"></aop:around>
            </aop:aspect>
        </aop:config>
        ```

        ```java
        /**
         * 用于记录日志的工具类，它里面提供了公共的代码
         */
        public class Logger {
        
        	//前置通知
            public  void beforePrintLog(){
                System.out.println("前置通知Logger类中的beforePrintLog方法开始记录日志了。。。");
            }
        	//后置通知
            public  void afterReturningPrintLog(){
                System.out.println("后置通知Logger类中的afterReturningPrintLog方法开始记录日志了。。。");
            }
            //异常通知
            public  void afterThrowingPrintLog(){
                System.out.println("异常通知Logger类中的afterThrowingPrintLog方法开始记录日志了。。。");
            }
            //最终通知
            public  void afterPrintLog(){
                System.out.println("最终通知Logger类中的afterPrintLog方法开始记录日志了。。。");
            }
        
            /**
             * 环绕通知
             * 问题：
             *      当我们配置了环绕通知之后，切入点方法没有执行，而通知方法执行了。
             * 分析：
             *      通过对比动态代理中的环绕通知代码，发现动态代理的环绕通知有明确的切入点方法调用，而我们的代码中没有。
             * 解决：
             *      Spring框架为我们提供了一个接口：ProceedingJoinPoint。该接口有一个方法proceed()，此方法就相当于明确调用切入点方法。
             *      该接口可以作为环绕通知的方法参数，在程序执行时，spring框架会为我们提供该接口的实现类供我们使用。
             *
             * spring中的环绕通知：
             *      它是spring框架为我们提供的一种可以在代码中手动控制增强方法何时执行的方式。
             */
            public Object aroundPringLog(ProceedingJoinPoint pjp){
                Object rtValue = null;
                try{
                    Object[] args = pjp.getArgs();//得到方法执行所需的参数
        
                    System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。前置");
        
                    rtValue = pjp.proceed(args);//明确调用业务层方法（切入点方法）
        
                    System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。后置");
        
                    return rtValue;
                }catch (Throwable t){
                    System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。异常");
                    throw new RuntimeException(t);
                }finally {
                    System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。最终");
                }
            }
        }
        ```

要想使用**注解的方式**使用Spring AOP就**必须要有源码**(因为我们要在切面类上添加注解)。如果没有源码的话，我们就得使用XML来声明切面了

| AOP配置元素                | 用途                                            |
| -------------------------- | ----------------------------------------------- |
| **< aop:config>**          | 顶层的AOP配置元素                               |
| **< aop:aspect>**          | 定义一个切面                                    |
| **< aop:pointcut>**        | 定义一个切点                                    |
| < aop:advesor>             | 定义AOP通知器                                   |
| < aop:before>              | 定义AOP前置通知                                 |
| < aop:after>               | 定义AOP后置通知（无论被通知的方法是否执行成功） |
| < aop:after-returning>     | 定义AOP返回通知                                 |
| < aop:after-throwing>      | 定义AOP异常通知                                 |
| < aop:around>              | 定义AOP环绕通知                                 |
| < aop:aspect-autoproxy>    | 启用@AspectJ注解驱动的切面                      |
| **< aop:declare-parents>** | 以透明的方式为被通知的对象引入额外的接口        |

