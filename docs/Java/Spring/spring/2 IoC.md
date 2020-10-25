# IoC

## 问题—程序间耦合

- 在软件工程中，耦合指的就是就是**对象之间的依赖性**。对象之间的耦合越高，维护成本越高。因此对象的设计应使类和构件之间的耦合最小。软件设计中通常用耦合度和内聚度作为衡量模块独立程度的标准。**划分模块的一个准则**就是**高内聚低耦合**。

- **Bean**：计算机英语中，有**可重用组件**的含义

    JavaBean：用**Java语言编写的可重用组件**。JavaBean>实体类

- 实际开发中，应做到：**编译期不依赖，运行时才依赖（想到多态了吧，只是类似）**

- **解耦的思路（工厂模式）**：

    1. **读取配置文件的key**获取要创建对象的**全限定类名value**；
    2. 使用**反射创建对象**，避免使用new关键字；
    3. 定义一个map**容器**，在静态代码块中创建所有对象并存放。获取对象时直接返回对应key的value，是单例的



## OCP—开闭原则

### awkward 版

```java
/**
 * 青冈影
 */
public class Camille {

    public void q(){
        System.out.println("Camille Q");
    }

    public void w(){
        System.out.println("Camille W");
    }

    public void e(){
        System.out.println("Camille E");
    }

    public void r(){
        System.out.println("Camille R");
    }
}
```

```java
/**
 * 黛安娜
 */
public class Diana {

    public void q(){
        System.out.println("Diana Q");
    }

    public void w(){
        System.out.println("Diana W");
    }

    public void e(){
        System.out.println("Diana E");
    }

    public void r(){
        System.out.println("Diana R");
    }
}
```

```java
public class Main {

    public static void main(String[] args) {
        String heroName = getPlayerInput();
        switch (heroName){
            case "Diana":
                Diana diana = new Diana();
                diana.r();
                break;
            case "Irilia":
                Irilia irilia = new Irilia();
                irilia.r();
                break;
            case "Camille":
                Camille camille = new Camille();
                camille.r();
                break;
            default:
                break;
        }
      	// 每次根据用户输入 new 新对象，并用该对象调用技能方法
    }

    private static String getPlayerInput(){
        System.out.print("Enter a hero's name: ");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
}
```



### abstraction 版

```java
public interface ISkill {

    void q();

    void w();

    void e();

    void r();
}
```

```java
/**
 * 青冈影
 */
public class Camille implements ISkill {

    public void q(){
        System.out.println("Camille Q");
    }

    public void w(){
        System.out.println("Camille W");
    }

    public void e(){
        System.out.println("Camille E");
    }

    public void r(){
        System.out.println("Camille R");
    }
}
```

```java
/**
 * 黛安娜
 */
public class Diana implements ISkill {

    public void q(){
        System.out.println("Diana Q");
    }

    public void w(){
        System.out.println("Diana W");
    }

    public void e(){
        System.out.println("Diana E");
    }

    public void r(){
        System.out.println("Diana R");
    }
}
```

```java
public class Main {

    public static void main(String[] args) {
        String heroName = getPlayerInput();
        ISkill iSkill;
        // 对象实例化
        switch (heroName){
            case "Diana":
                iSkill = new Diana();
                break;
            case "Irilia":
                iSkill = new Irilia();
                break;
            case "Camille":
                iSkill = new Camille();
                break;
            default:
                throw new RuntimeException();
        }
        // 面向对象：实例化对象，调用方法（完成业务逻辑）
        // 单纯的 Interface 只能统一方法的调用，不能统一对象的实例化。即多态好处：运行时确定要调用的方法
        iSkill.r();

    }

    private static String getPlayerInput(){
        System.out.print("Enter a hero's name: ");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
}
```



### factory 版

```java
public interface ISkill {

    void q();

    void w();

    void e();

    void r();
}
```

```java
/**
 * 青冈影
 */
public class Camille implements ISkill {

    public void q(){
        System.out.println("Camille Q");
    }

    public void w(){
        System.out.println("Camille W");
    }

    public void e(){
        System.out.println("Camille E");
    }

    public void r(){
        System.out.println("Camille R");
    }
}
```

```java
/**
 * 黛安娜
 */
public class Diana implements ISkill {

    public void q(){
        System.out.println("Diana Q");
    }

    public void w(){
        System.out.println("Diana W");
    }

    public void e(){
        System.out.println("Diana E");
    }

    public void r(){
        System.out.println("Diana R");
    }
}
```

```java
public class HeroFactory {

    public static ISkill getHero(String heroName){

        ISkill iSkill;
        // 对象实例化
        switch (heroName){
            case "Diana":
                iSkill = new Diana();
                break;
            case "Irilia":
                iSkill = new Irilia();
                break;
            case "Camille":
                iSkill = new Camille();
                break;
            default:
                throw new RuntimeException();
        }
        return iSkill;
    }
}
```

```java
public class Main {

    public static void main(String[] args) {
        String heroName = getPlayerInput();
        // HeroFactory 如何消除？
        // 此时是静态调用，在工厂类中实例化时还是 new 操作，并且强耦合了，新增时还需修改工厂类
        ISkill iSkill = HeroFactory.getHero(heroName);
        iSkill.r();

    }

    private static String getPlayerInput(){
        System.out.print("Enter a hero's name: ");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
}
```



### reflect 版

```java
public interface ISkill {

    void q();

    void w();

    void e();

    void r();
}
```

```java
/**
 * 青冈影
 */
public class Camille implements ISkill {

    public void q(){
        System.out.println("Camille Q");
    }

    public void w(){
        System.out.println("Camille W");
    }

    public void e(){
        System.out.println("Camille E");
    }

    public void r(){
        System.out.println("Camille R");
    }
}
```

```java
/**
 * 黛安娜
 */
public class Diana implements ISkill {

    public void q(){
        System.out.println("Diana Q");
    }

    public void w(){
        System.out.println("Diana W");
    }

    public void e(){
        System.out.println("Diana E");
    }

    public void r(){
        System.out.println("Diana R");
    }
}
```

```java
public class HeroFactory {

    public static ISkill getHero(Class<? extends ISkill> clazz) throws IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {

        // 对象实例化
        Constructor<? extends ISkill> constructor = clazz.getDeclaredConstructor();
        return constructor.newInstance();
    }
}
```

```java
public class Main {

    public static void main(String[] args) throws 
      InstantiationException, 
  IllegalAccessException, 
  NoSuchMethodException, 
  InvocationTargetException {
        ISkill hero = HeroFactory.getHero(Irilia.class);
        hero.r();
    }
}
```







## 接口 + 工厂实现 OCP 🔥

面向对象：实例化对象，调用方法（完成业务逻辑）

* 单纯的 Interface 只能**统一方法的调用**，**不能统一对象的实例化**。即多态好处：运行时确定要调用的方法

* 只有一段代码中没有 new 出现，才能保持代码的相对稳定，才能逐步实现 OCP。但是代码中总会存在不稳定，需要**隔离这些不稳定因素**，**保证其他的代码是稳定的**。即对象的实例化应该和其他分开！

    不稳定表面看是由于 new 实例化对象，其实是**用户的输入（变化）**导致需要频繁修改 new 实例化

* 使用**简单工厂模式**后，该工厂获取 Bean 的方法是静态的，虽然看起来没有 new 对象，但是其实是依赖了具体实现。且需要不同类型的 Bean 时总是需要新建一个工厂类，同一类型的不同 Bean 也需要修改工厂类

* 此时可以使用**抽象工厂模式**，当然它也有类似的问题

* 只有这个工厂特别大，可以获得所有 Bean 时，才认为它相对稳定。如 IoC 容器，特别是 Spring 的 ApplicationContext 等接口容器

*   但是！工厂模式 + 反射并不是 IoC 和 DI



## 如何理解 IoC、DI 、DIP 🔥

### IoC

该概念的由来是 Java 社区的轻量级容器能够帮助开发者**将来自不同项目的组件（或服务，理解即可）装配（组合）成一个内聚的项目（应用）**，而这种操作就是 IoC，它决定了这些容器进行组件装配的方式

IoC 的主要实现的作用就是**将组件（Bean）注册到到容器**中，并能给使用者**提供自动注入**功能

控制反转，**把创建对象的权利交给容器（或工厂）**。**但其实需要配合接口（抽象）才能算将其使用更好**。

解决了程序和对象之间的耦合，其具体实现就是 DI





### DI（Dependency Injection）

::: tip

[martinfowler 博客](https://martinfowler.com/articles/injection.html)及 [ThoughtWork 的翻译](https://insights.thoughtworks.cn/injection/)

:::

DI（依赖注入） 的目的在于**将组件的配置与使用分离开**。如何在**运行时（不是编译时）**将**组件（抽象的具体实现可能有多个，所以编译时无法确定哪个）动态连入程序**中（这里是不是想起接口的概念了）

这里的组件可以指代服务（Service也行）

即调用类对某一接口实现类的依赖关系由第三方容器或协作类注入，移除调用类对某一接口实现类的依赖。

一般完成特定的业务逻辑可能会需要多个类之间进行协作。按传统的做法，每个对象负责管理与自己互相协作的对象(它所依赖的对象)的引用，这会导致高度耦合并难以测试的代码。利用依赖注入，每个对象可以直接获取所依赖的对象

最开始的 new 对象，强依赖；后来使用工厂，要对象，弱依赖；最后使用 IoC 和 DI，IoC 容器注入对象（被动）。⚙️

*   属性注入（set）
*   构造注入
*   接口注入





### DIP（Dependency Inversion Principle）

依赖倒置原则

*   高层模块（抽象）不该依赖低层模块（实现），两者都应该**依赖抽象**
*   抽象不应该依赖细节
*   细节应该依赖抽象

总之就是说要**依赖抽象**。比如**依赖的 Service 不应该是具体类，而应该是接口（注入的只能是具体类，理解即可）** 

```java
@Autowired
private UserService userService;
```

此时使用的是类型注入，依赖的是 UserService 接口，IoC 容器会在运行时将该类型的具体对象注入！







