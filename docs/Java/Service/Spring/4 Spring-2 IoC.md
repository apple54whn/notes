# IoC

## OCP—LOL😁

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
        // HeroFactory 如何消除？此时时静态调用，若需要实例化时也是强耦合了、
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

    public static <T> ISkill getHero(Class<T> clazz) throws 
      IllegalAccessException, 
  	InstantiationException, 
  	NoSuchMethodException, 
  	InvocationTargetException {
        // 对象实例化
        Constructor<T> constructor = clazz.getDeclaredConstructor();
        return (ISkill) constructor.newInstance();
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

    private static String getPlayerInput(){
        System.out.print("Enter a hero's name: ");
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
}
```





## 问题—程序间耦合

- 在软件工程中，耦合指的就是就是**对象之间的依赖性**。对象之间的耦合越高，维护成本越高。因此对象的设计应使类和构件之间的耦合最小。软件设计中通常用耦合度和内聚度作为衡量模块独立程度的标准。**划分模块的一个准则**就是**高内聚低耦合**。

- **Bean**：计算机英语中，有**可重用组件**的含义

    JavaBean：用**Java语言编写的可重用组件**。JavaBean>实体类

- 实际开发中，应做到：**编译期不依赖**，**运行时才依赖**

- **解耦的思路（工厂模式）**：

    1. **读取配置文件的key**获取要创建对象的**全限定类名value**；
    2. 使用**反射创建对象**，避免使用new关键字；
    3. 定义一个map**容器**，在静态代码块中创建所有对象并存放。获取对象时直接返回对应key的value，是单例的





## 接口 + 工厂实现 OCP

面向对象：实例化对象，调用方法（完成业务逻辑）

* 单纯的 Interface 只能**统一方法的调用**，**不能统一对象的实例化**。即多态好处：运行时确定要调用的方法

* 只有一段代码中没有 new 出现，才能保持代码的相对稳定，才能逐步实现 OCP。但是代码中总会存在不稳定，需要**隔离这些不稳定因素**，**保证其他的代码是稳定的**。即对象的实例化应该和其他分开！

    不稳定表面看是由于 new 实例化对象，其实是**用户的输入（变化）**导致需要频繁修改 new 实例化

* 使用**简单工厂模式**后，该工厂获取 Bean 的方法是静态的，虽然看起来没有 new 对象，但是其实是依赖了具体实现。且需要不同类型的 Bean 时总是需要新建一个工厂类，同一类型的不同 Bean 也需要修改工厂类

* 此时可以使用**抽象工厂模式**，当然它也有类似的问题

* 只有这个工厂特别大，可以获得所有 Bean 时，才认为它相对稳定。如 IoC 容器，特别是 Spring 的 ApplicationContext 接口容器

*   但是！工厂模式 + 反射并不是 IoC 和 DI



## 如何理解 IoC 和 DI (DIP)

### IoC

非常抽象的概念，其具体实现就是 DI

控制反转，**把创建对象的权利交给容器（或工厂）**。可以**解决程序之间的耦合**，解除代码中的依赖关系





### DI（Dependency Injection）

依赖注入。即调用类对某一接口实现类的依赖关系由第三方容器或协作类注入，移除调用类对某一接口实现类的依赖。

一般完成特定的业务逻辑可能会需要多个类之间进行协作。按传统的做法，每个对象负责管理与自己互相协作的对象(它所依赖的对象)的引用，这会导致高度耦合并难以测试的代码。利用依赖注入，每个对象可以直接获取所依赖的对象

最开始的 new 对象，强依赖；后来使用工厂，要对象，若依赖；最后使用 IoC 和 DI，IoC 容器注入对象（被动）。⚙️

*   属性注入（set）
*   构造注入
*   接口注入





### DIP（Dependency Inversion Principle）

依赖倒置原则

*   高层模块（抽象）不该依赖低层模块（实现），两者都应该依赖抽象
*   抽象不应该依赖细节
*   细节应该依赖抽象

总之就是说要**依赖抽象**







## XML 配置（旧）

### 步骤

1. 在resources中创建`spring-config.xml`或`applicationContext.xml`文件。（约束在参考中搜索`xmlns`即可找到）

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd">
    </beans>
    ```

2. 在配置文件中**配置让 spring 创建的对象**（原理和引入中工厂模式一致）

    ```xml
    <bean id="accountDao" class="com.itheima.dao.impl.AccountDaoImpl"></bean>
    <bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"></bean>
    ```

3. 获取Spring IoC核心容器，并根据id获取对象

    ```java
    ApplicationContext ac = new ClassPathXmlApplicationContext("spring-config.xml");
    AccountDao accountDao = (AccountDao) ac.getBean("accountDao"); //需要强转
    AccountService accountService = ac.getBean("accountService", AccountService.class); //传字节码文件对象，不用强转
    ```





### Spirng对Bean的管理细节

**bean标签**

* 作用：**配置对象让spring来创建的**。默认情况下它调用的是类中的**无参构造函数**。如果没有无参构造函数则不能创建成功。 
* 属性：
    * **`id`**：给对象在容器中提供一个**唯一标识**，用于获取对象
    * **`class`**：指定**类的全限定类名**，用于**反射创建对象**，默认情况下调用无参构造函数
    * **`scope`**：**指定对象的作用范围**
        * **`singleton`**：**单例**的（默认），一个应用只有一个对象的实例，它的作用范围就是**整个应用** 
        * **`prototype`**：**多例**的，每次访问对象时，都会重新创建对象实例。
        * `request`：WEB 项目中，Spring 为**每个请求**创建一个bean实例
        * `session`：WEB 项目中，Spring 为**每个会话**创建一个bean实例
        * `global-session`：作用于**集群(Portlet)环境的全局会话范围**，当不是集群(Portlet)环境时，它就是session
    * `init-method`：指定类中的初始化方法名称
    * `destroy-method`：指定类中销毁方法名称。单例中需要关闭容器（使用实现类的方法）

**Bean对象的生命周期**

- **单例对象：生命周期和容器相同**，一个应用只有一个对象的实例，它的作用范围就是整个应用
    - 出生：当容器创建时出生（读取完配置文件）
    - 存活：只要容器存在，对象一直存活
    - 死亡：容器销毁，对象消亡
- **多例对象**：每次访问对象时，都会重新创建对象实例。
    - **出生**：当我们**使用对象**时，**Spring框架为我们创建**
    - **存活**：对象只要在**使用过程中，就一直存活**
    - **死亡**：当对象**长时间不使用，且没有别的对象引用**时，由Java的**GC**机制回收

**创建Bean的三种方式**

1. **使用默认构造方法创建**

    配置文件中使用`bean`标签以及`id`和`class`属性，且没有其他属性和标签时~。若类中没有默认构造方法，则对象无法创建

    ```xml
    <bean id="accountDao" class="com.itheima.dao.impl.AccountDaoImpl"></bean>
    ```

2. 使用**普通工厂中的方法**创建对象（也称使用某个类中的方法创建对象），并存入Spirng容器

    ```xml
    <bean id="accountDaoFactory" class="com.itheima.factory.AccountDaoFactory"></bean>
    <bean id="accountDao" factory-bean="accountDaoFactory" factory-method="getAccountDao"></bean>
    ```

3. 使用**静态工厂中的静态方法**创建对象（也称使用某个类中的静态方法创建对象），并存入Spirng容器

    ```xml
    <bean id="accountDao" class="com.itheima.factory.AccountDaoFactory" factory-method="getAccountDao"></bean>
    ```



### 依赖注入

> 我们的业务层仍会调用持久层的方法，在使用 spring 之后，就让 **spring 来维护**了他们的**依赖关系**。就是让框架把持久层对象传入业务层，不用自己去获取。

DI（Dependency Injection）：**依赖注入**，即是**依赖关系的维护**交由Spirng管理。

能注入的数据有三类：（不适用于经常变换的数据）

* **基本类型和String**
* **其他bean类型**（在配置文件或注解中配置过的bean）
* **复杂类型/集合类型**：如Array、List、Set、Map、Properties



**构造方法注入**

使用类中的构造方法给成员变量赋值。注意：赋值的操作不是我们自己做的，而是通过配置的方式，让spring框架来为我们注入

* 要求：类中需要提供一个**对应参数列表的构造方法**
* 标签：`bean`标签中**`constructor-arg`**
    * 属性：
        * ~~`index`：指定参数在构造函数参数列表的索引位置，从0开始。不常用。~~
        * ~~`type`：指定参数在构造函数中的数据类型。不常用。~~
        * **`name`**：指定**参数在构造函数中的名称**
        * **`value`**：它能赋的值是**基本数据类型**和 **String 类型** 
        * **`ref`**：它能赋的值是**其他 bean 类型**，也就是说，必须得是**配置过的 bean** 

```xml
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"> 
    <constructor-arg name="name" value=" 张三 "></constructor-arg>  <!--String类型-->
    <constructor-arg name="age" value="18"></constructor-arg>       <!--基本类型-->
    <constructor-arg name="birthday" ref="now"></constructor-arg>   <!--其他bean类型-->
</bean> 
<bean id="now" class="java.util.Date"></bean> 
```

* 优势：在获取bean对象时，注入数据是必须的操作，否则对象无法创建成功。
* 弊端：优势也是其弊端，改变了bean对象的实例化方式。创建对象时，即使用不到这些数据，也必须提供。

> c-命名空间注入（本质是构造方法注入）：无法实现装配集合



**set方法注入(使用最多)**

* 要求：就是在类中**提供需要注入成**员的 **set 方法**
* 标签：`bean`标签中**`property`**
    * 属性：
        * **`name`**：找的是类中 **set 方法后面的部分** 
        * **`value`**：它能赋的值是**基本数据类型**和 **String 类型**
        * **`ref`**：它能赋的值是**其他 bean 类型**，也就是说，必须得是**配置过的 bean** 

```xml
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl">   
    <property name="name" value="test"></property> <!--String类型-->
    <property name="age" value="21"></property>    <!--基本类型-->
    <property name="birthday" ref="now"></property> <!--其他bean类型-->
</bean> 
<bean id="now" class="java.util.Date"></bean>
```

* 优势：创建对象时，注入的参数没有明确限制，可以直接使用默认构造方法
* 弊端：优势也是其弊端，若某个成员必须有值，则获取对象时有可能set方法没有执行

> p-命名空间注入（本质还是调用 set 方法）：无法实现装配集合



**注入集合属性**

就是给类中的**集合成员传值**，可以采用set方法注入的方式，只不过变量的数据类型都是集合

* 注入集合数据：只要**结构相同，标签可以互换**
    * List结构可以用：array、list、set
    * Map结构可以用：map、entry；props、prop。但是properties只能存储键值都是字符串的数据。

```xml
<bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"> 
 <!-- 在注入集合数据时，只要结构相同，标签可以互换 -->  
    <!-- 给数组注入数据 -->  
    <property name="myStrs"> 
        <set>    
            <value>AAA</value>    
            <ref bean="car"></ref><!--也可以引用类型。只是列出来参考，实际不会这样存储不同类型数据-->
        </set> 
    </property> 
    <!-- 注入 list 集合数据 -->  
    <property name="myList">   
        <array>    
            <value>AAA</value>    
            <ref bean="car"></ref><!--也可以引用类型。只是列出来参考，实际不会这样存储不同类型数据-->
        </array>  
    </property>  
    <!-- 注入 set 集合数据 -->  
    <property name="mySet"> 
        <list>    
            <value>AAA</value>    
            <ref bean="car"></ref><!--也可以引用类型。只是列出来参考，实际不会这样存储不同类型数据-->
        </list>  
    </property> 
    <!--=============================================-->
    <!-- 注入 Map 数据 -->  
    <property name="myMap">   
        <map>    
            <entry key="testA" value="aaa"></entry> 
            <entry key-ref="car" value-ref="car"></entry> <!--key,value,key-ref,value-ref  共4种组合 -->
            
            <!--value-type="cn.itcast.pojo.Car"   可以不设置，设置后值类型唯一-->
      <!--  <entry key="testB">   也可以这样写，但是麻烦  
                <value>bbb</value> 
            </entry>  --> 
        </map>
    </property> 
    <!-- 注入 properties 数据--> 
    <property name="myProps"> 
          <props> 
            <prop key="testA">aaa</prop>    
            <prop key="testB">bbb</prop>   
        </props> 
    </property> 
</bean>
<!--========================被引用的测试bean =====================================-->
<bean name="car" class="cn.itcast.pojo.Car">
    <property name="name" value="BMW"></property>
    <property name="color" value="red"></property>
</bean>
```







