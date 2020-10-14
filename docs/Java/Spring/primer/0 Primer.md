# Primer

## 什么是框架

**框架**（Framework）是整个或部分系统的**可重用设计**，表现为一组抽象构件及构件实例间交互的方法；另一种定义认为，框架是可被应用开发者定制的应用骨架。前者是从应用方面而后者是从目的方面给出的定义。

框架一般处在低层应用平台（如 J2EE）和高层业务逻辑之间的中间层。 





## Spring 简史

### Spring 1.x 时代

在 Spring1.x 时代，都是通过 xml 文件配置 bean，随着项目的不断扩大，需要将 xml 配置分放到不同的配置文件中，需要频繁的在 java 类和 xml 配置文件中切换。

>   POJO：比JavaBean更纯净的简单类或接口，主要用于数据的临时传递，它只能装载数据， 作为数据存储的载体，而不具有业务逻辑处理的能力。
>
>   JavaBean：虽然数据的获取与POJO一样，但是JavaBean当中可以有其它的方法。

### Spring 2.x 时代

随着 JDK 1.5 带来的注解支持，Spring2.x 可以使用注解对 Bean 进行申明和注入，大大的减少了 xml 配置文件，同时也大大简化了项目的开发。

那么，问题来了，究竟是应该使用 xml 还是注解呢？

最佳实践：

-   应用的基本配置用 xml，比如：数据源、资源文件等
-   业务开发用注解，比如：Service 中注入 bean 等

### Spring 3.x 时代

从 Spring 3.x 开始提供了 Java 配置方式，使用 Java 配置方式可以更好的理解你配置的 Bean，并且 Spring 4.x 和 Spring boot 都推荐使用 java 配置的方式。

### Spring 5.x 时代

Spring 5.x 是 Java 界首个支持响应式的 Web 框架，是 Spring 的一个重要版本，距离 Spring4.x 差不多四年。在此期间，大多数增强都是在 Spring Boot 项目中完成的，其最大的亮点就是提供了完整的端到端响应式编程的支持（新增 Spring WebFlux 模块）。

Spring WebFlux 同时支持使用旧的 Spring MVC 注解声明 `Reactive Controller`。和传统的 `MVC Controller` 不同，`Reactive Controller` 操作的是 **非阻塞** 的 `ServerHttpRequest` 和 `ServerHttpResponse`，而不再是 Spring MVC 里的 HttpServletRequest 和 HttpServletResponse。

至此也代表着 Java 正式迎来了响应式异步编程的时代。



















