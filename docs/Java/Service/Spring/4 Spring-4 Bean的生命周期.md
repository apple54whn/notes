# Bean的生命周期

> 作用和xml配置文件中的`<bean>`标签编写`<init-method>`和`<destroy-method>`标签实现功能一致
>
> 一个是Bean创建并赋值完成后调用，一个是容器关闭（单例）或GC（多例）

------

1、`@Bean`指定类中的`init-method`和`destroy-method`方法。注意scope不同时区别。。

```java
@Bean(initMethod="init",destroyMethod="detory")
public Car car(){
    return new Car();
}
```

------

2、通过让Bean实现`InitializingBean`（重写初始化方法afterPropertiesSet），`DisposableBean`（重写销毁方法destroy）

------

3、JSR250定义的注解，只能定义在**方法上**

- `@PostConstruct`：在bean创建完成并且赋值完成；来执行初始化方法
- `@PreDestroy`：在销毁bean之前通知我们进行清理工作。单例中需要关闭容器（使用实现类的方法，如close）

```java
@Component
public class Dog {
	public Dog(){
		System.out.println("dog constructor...");
	}

	@PostConstruct
	public void init(){
		System.out.println("Dog....@PostConstruct...");
	}

	@PreDestroy
	public void detory(){
		System.out.println("Dog....@PreDestroy...");
	}
}
```

------

4、Spring提供的`BeanPostProcessor`接口：bean的后置处理器，在**所有bean初始化前后**进行一些处理工作

* `postProcessBeforeInitialization`：在自定义初始化之前工作
* `postProcessAfterInitialization`：在自定义初始化之后工作

```java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {

	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		System.out.println("postProcessBeforeInitialization..."+beanName+"=>"+bean);
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		System.out.println("postProcessAfterInitialization..."+beanName+"=>"+bean);
		return bean;
	}
}
```

> 源码：
>
> 遍历得到容器中所有的BeanPostProcessor；挨个执行beforeInitialization，一但返回null，跳出for循环，不会执行后面的BeanPostProcessor.postProcessorsBeforeInitialization
>
> BeanPostProcessor原理：
>
> populateBean(beanName, mbd, instanceWrapper); //给bean进行属性赋值
>
> initializeBean：
>
> ​	applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
>
> ​	invokeInitMethods(beanName, wrappedBean, mbd); //执行自定义初始化
>
> ​	applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
>
> Spring底层对 BeanPostProcessor 的使用：bean赋值，注入其他组件，@Autowired，生命周期注解功能，@Async等等

