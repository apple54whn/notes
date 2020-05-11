# Bean's Lifecycle

## 简介

*   Bean 的生命周期即是容器管理 **Bean 的创建（赋值）、初始化、销毁的过程**

*   可以**自定义初始化、销毁方法**。容器在 Bean 进行到当前生命周期时调用定义的方法





## initMethod & destroyMethod 🔥

注意 scope 不同时区别

*   构造方法
    *   单实例：容器启动时创建对象触发
    *   多实例：每次获取时创建对象触发
*   initMethod
    *   单实例：容器启动，创建对象并赋值后触发
    *   多实例：每次获取对象，创建对象并赋值后触发
*   destroyMethod
    *   单实例：关闭容器时
    *   多实例：容器不会管理，需销毁则等到GC即可（没找到。。。）

```java
public class Car {

    /**
     * 单实例：容器启动时创建对象触发
     * 多实例：每次获取时创建对象触发
     */
    public Car(){
        System.out.println("Car Constructor...");
    }

    /**
     * 单实例：容器启动，创建对象并赋值后触发
     * 多实例：每次获取对象，创建对象并赋值后触发
     */
    public void init(){
        System.out.println("Car init...");
    }

    /**
     * 单实例：关闭容器时
     * 多实例：容器不会管理，需销毁则等到GC即可
     */
    public void destroy(){
        System.out.println("Car destroy...");
    }
}
```

```java
public class Train {

    public Train(){
        System.out.println("Train Constructor...");
    }

    public void init(){
        System.out.println("Train init...");
    }

    public void destroy(){
        System.out.println("Train destroy...");
    }
}
```

```java
@Configuration
public class LifeCycleConfig1 {

    @Bean(initMethod = "init",destroyMethod = "destroy")
    public Car car(){
        return new Car();
    }

    @Bean(initMethod = "init",destroyMethod = "destroy")
    @Scope("prototype")
    public Train train(){
        return new Train();
    }
}
```

```java
public class LifeCycleConfig1Test {

    private AnnotationConfigApplicationContext context;


    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(LifeCycleConfig1.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test(){

        Train train = context.getBean(Train.class);

    }

    @AfterEach
    public void destroy(){
        context.close();
    }
}
```

> 作用和xml配置文件中的`<bean>`标签编写`<init-method>`和`<destroy-method>`标签实现功能一致
>
> 一个是Bean创建并赋值完成后调用，一个是容器关闭（单例）或GC（多例）





## InitializingBean & DisposableBean 🔥

*   通过让Bean实现`InitializingBean`接口，重写初始化方法`afterPropertiesSet`。该方法在容器`BeanFactory`初始化完 Bean 所有属性，并满足`BeanFactoryAware`和`ApplicationContextAware`后调用
*   实现`DisposableBean`接口，重写销毁方法`destroy`。该方法在容器`BeanFactory`销毁一个 Bean 时调用

```java
public class Cat implements InitializingBean, DisposableBean {

    public Cat(){
        System.out.println("Cat Constructor...");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("Cat afterPropertiesSet...");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("Cat destroy...");
    }
}
```

```java
/**
 * InitializingBean & DisposableBean
 */
@Configuration
public class LifeCycleConfig2 {

    @Bean// 为了控制 bean 的数量，不使用包扫描机制
    public Cat cat(){
        return new Cat();
    }
}
```

```java
/**
 * InitializingBean & DisposableBean
 */
public class LifeCycleConfig2Test {

    private AnnotationConfigApplicationContext context;


    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(LifeCycleConfig2.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test(){

    }

    @AfterEach
    public void destroy(){
        context.close();
    }
}
```





## @PostConstruct & @PreDestroy 🔥

**JSR250**定义的注解，**只能定义在方法上**

- `@PostConstruct`：在 **bean 创建完成并且赋值完后**执行初始化方法
- `@PreDestroy`：在**销毁bean前**通知我们进行清理工作。单例中需要关闭容器（使用实现类的方法，如close）

```java
public class Dog {

    public Dog(){
        System.out.println("Dog Constructor...");
    }

    @PostConstruct
    public void init(){
        System.out.println("Dog init...");
    }

    @PreDestroy
    public void destroy(){
        System.out.println("Dog destroy...");
    }

}
```

```java
/**
 * @PostConstruct & @PreDestroy
 */
@Configuration
public class LifeCycleConfig3 {

    @Bean// 为了控制 bean 的数量，不使用包扫描机制
    public Dog dog(){
        return new Dog();
    }
}
```

```java
/**
 * @PostConstruct & @PreDestroy
 */
public class LifeCycleConfig3Test {

    private AnnotationConfigApplicationContext context;


    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(LifeCycleConfig3.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test(){


    }

    @AfterEach
    public void destroy(){
        context.close();
    }
}
```









## BeanPostProcessor 后置处理器 🔥

### 简介

Spring 提供的`BeanPostProcessor`接口：Bean 的后置处理器，在**所有 Bean 的初始化前后**进行一些处理工作，如`init-method`、`afterPropertiesSet`、`@PostConstruct`前后

* `postProcessBeforeInitialization`：在**初始化之前**工作
* `postProcessAfterInitialization`：在**初始化之后**工作

```java
@Component// 必须使用@Component，不能使用@Bean，否则爆红（不是自动代理的）
public class MyBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessBeforeInitialization => beanName: " 
                           + beanName + ", beanType: " 
                           + bean.getClass());
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessAfterInitialization => beanName: " 
                           + beanName + ", beanType: " 
                           + bean.getClass());
        return bean;
    }
}
```

```java
/**
 * BeanPostProcessor
 * 三种不同类型的 Bean，使用了不同的初始化方法
 */
@Configuration
@ComponentScan(basePackageClasses = {top.conanan.processor.MyBeanPostProcessor.class})
// @ComponentScan({"top.conanan.processor"}) // 可以使用 basePackage 或 basePackageClasses（类型安全）
@Import({Cat.class, Dog.class})
public class LifeCycleConfig4 {
    
    @Bean(initMethod = "init",destroyMethod = "destroy")
    public Car car(){
        return new Car();
    }

}
```

```java
/**
 * BeanPostProcessor
 */
public class LifeCycleConfig4Test {

    private AnnotationConfigApplicationContext context;


    @BeforeEach
    public void init(){
        context = new AnnotationConfigApplicationContext(LifeCycleConfig4.class);
        System.out.println("容器创建完成");
    }

    @Test
    public void test(){


    }

    @AfterEach
    public void destroy(){
        context.close();
    }
}
```





### 工作原理

**DEBUG 查看调用栈**即可查看流程

*   populateBean(beanName, mbd, instanceWrapper)：给 bean 进行**属性赋值**，调用 getter、setter 等

*   initializeBean：

    *   applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName)：**初始化前**

        **遍历得到容器中所有的 BeanPostProcessor**；挨个执行 postProcessBeforeInitialization，一但返回 null 则 return 跳出 for 循环，不会执行后面 BeanPostProcessor 的 postProcessorsBeforeInitialization

    *   invokeInitMethods(beanName, wrappedBean, mbd)：**执行自定义初始化**，对象创建好，并赋值好后，调用初始化方法

    *   applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName)：**初始化后**



### 应用

Spring 底层对 BeanPostProcessor 的使用

*   bean 赋值

*   bean 校验：BeanValidationPostProcessor

*   注入其他组件

*   @Autowired：AutowiredAnnotationBeanPostProcessor

*   生命周期注解功能（JSR250 那个）：InitDestroyAnnotationBeanPostProcessor

*   @Async

*   注入 IoC 容器：ApplicationContextAwareProcessor

    ```java
    public class Car implements ApplicationContextAware {
    
        private ApplicationContext context;
    
        /**
         * 单实例：容器启动时创建对象触发
         * 多实例：每次获取时创建对象触发
         */
        public Car(){
            System.out.println("Car Constructor...");
        }
    
        /**
         * 单实例：容器启动，创建对象并赋值后触发
         * 多实例：每次获取对象，创建对象并赋值后触发
         */
        public void init(){
            System.out.println("Car init...");
        }
    
        /**
         * 单实例：关闭容器时
         * 多实例：容器不会管理，需销毁则等到GC即可
         */
        public void destroy(){
            System.out.println("Car destroy...");
        }
    
        @Override
        public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
            this.context = applicationContext;
        }
    }
    ```

    



## Bean 的生命周期控制 🔥

Bean 的生命周期顺序如下，覆盖了所有前前后后

*   构造器（对象创建）：自定义无参构造器
    *   单实例：容器启动时创建对象
    *   多实例：每次获取时创建对象
*   BeanPostProcessor.postProcessBeforeInitialization：初始化前
*   invokeInitMethods(beanName, wrappedBean, mbd)：执行初始化，对象创建好，并赋值好后，调用初始化方法
*   BeanPostProcessor.postProcessAfterInitialization：初始化后
*   销毁
    *   单实例：容器关闭（实现类方法中有）
    *   多实例：容器不会管理这个 Bean，容器不会主动调用销毁方法，需GC