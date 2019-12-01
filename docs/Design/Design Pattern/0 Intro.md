# 0 Intro

## 为什么要学习设计模式

烂代码，比如命名不规范、类设计不合理、分层不清晰、没有模块化概念、代码结构混乱、高度耦合等等。这样的代码维护起来非常费劲，添加或者修改一个功能，常常会牵一发而动全身，让你无从下手，恨不得将全部的代码删掉重写！目前写的面向数据库的 CRUD 代码其实都没有涉及到除命名外其他方面，因为都是公司搭建好的项目结构，自己填空而已。不过后面的问题确实是现在能深刻体会到的。即使自己写一个通用模块，写完也会觉得不易扩展。所以这次希望我能跟着《设计模式之美》这个专栏学到这些知识，并合理运用到自己代码中，并在阅读开源项目的代码时能做到事半功倍。



高质量的代码都有什么特征：

*   可读性（**readability**）

    >   Martin Fowler: Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

*   可维护性（**maintainability**）

*   可扩展性（**extensibility**）

*   灵活性（**flexibility**）

*   简洁性（**simplicity**）

    >   KISS 原则：Keep It Simple，Stupid

*   可理解性（understandability）

*   易修改性（changeability）

*   可复用（**reusability**）

    >   DRY：Don’t Repeat Yourself

*   可测试性（testability）

*   模块化（modularity）

*   高内聚低耦合（high cohesion loose coupling）

*   高效（high effciency）

*   高性能（high performance）

*   安全性（security）

*   兼容性（compatibility）

*   易用性（usability）

*   整洁（clean）

*   清晰（clarity）

*   简单（simple）

*   直接（straightforward）

*   少即是多（less code is more）

*   文档详尽（well-documented）

*   分层清晰（well-layered）

*   正确性（correctness、bug free）

*   健壮性（robustness）

*   鲁棒性（robustness）

*   可用性（reliability）

*   可伸缩性（scalability）

*   稳定性（stability）

*   优雅（elegant）

*   ......



## 要学习的知识分类

![img](./images/f3262ef8152517d3b11bfc3f2d2b12d3.png)



### 面向对象

*   面向对象的四大特性：封装、抽象、继承、多态
*   面向对象编程与面向过程编程的区别和联系
*   面向对象分析、面向对象设计、面向对象编程
*   接口和抽象类的区别以及各自的应用场景
*   基于接口而非实现编程的设计思想
*   多用组合少用继承的设计思想
*   面向过程的贫血模型和面向对象的充血模型

最经典的设计模式书籍是 GoF 的《设计模式》，它的中文全称是《设计模式：可复用面向对象软件的基础》，英文全称是“Design Patterns: Elements of Reusable Object-Oriented Software”。



### 设计原则

对于这一部分内容，你需要透彻理解并且掌握，如何应用下面这样几个常用的设计原则：

*   SOLID 原则
    *   SRP(Single Responsibility Principle) 单一职责原则
    *   OCP(Open Closed Principle) 开闭原则
    *   LSP(Liskov Substitution Principle) 里式替换原则
    *   ISP(Interface Segregation Principle) 接口隔离原则
    *   DIP(Dependence Inversion Principle) 依赖倒置原则
*   DRY(Don't Repeat Yourself) 原则
*   KISS(Keep It Simple，Stupid) 原则
*   YAGNI(You Ain’t Gonna Need It) 原则
*   LoD(Law of Demeter) 法则



### 设计模式

经典的设计模式有 23 种。随着编程语言的演进，一些设计模式（比如 Singleton）也随之过时，甚至成了反模式，一些则被内置在编程语言中（比如 Iterator），另外还有一些新的模式诞生（比如 Monostate）。

#### 创建型

*   常用的有：单例模式、工厂模式（工厂方法和抽象工厂）、建造者模式。
*   不常用的有：原型模式。

#### 结构型

*   常用的有：代理模式、桥接模式、装饰者模式、适配器模式。
*   不常用的有：门面模式、组合模式、享元模式。

#### 行为型

*   常用的有：观察者模式、模板模式、策略模式、职责链模式、迭代器模式、状态模式。
*   不常用的有：访问者模式、备忘录模式、命令模式、解释器模式、中介模式。



### 编程规范

《重构》《代码大全》《代码整洁之道》等



### 代码重构

在软件开发中，只要软件在不停地迭代，就没有一劳永逸的设计。随着需求的变化，代码的不停堆砌，原有的设计必定会存在这样那样的问题。针对这些问题，我们就需要进行代码重构。重构是软件开发中非常重要的一个环节。持续重构是保持代码质量不下降的有效手段，能有效避免代码腐化到无可救药的地步。需要掌握以下几个知识点：

*   重构的目的（why）、对象（what）、时机（when）、方法（how）；
*   保证重构不出错的技术手段：单元测试和代码的可测试性；
*   两种不同规模的重构：大重构（大规模高层次）和小重构（小规模低层次）。



## 面向过程 & 面向对象

面向对象编程是一种编程范式或编程风格。它以类或对象作为组织代码的基本单元，并将封装、抽象、继承、多态四个特性，作为代码设计和实现的基石 。面向对象编程语言是支持类或对象的语法机制，并有现成的语法机制，能方便地实现面向对象编程四大特性（封装、抽象、继承、多态）的编程语言。

面向过程编程也是一种编程范式或编程风格。它以过程（可以为理解方法、函数、操作）作为组织代码的基本单元，以数据（可以理解为成员变量、属性）与方法相分离为最主要的特点。面向过程风格是一种流程化的编程风格，通过拼接一组顺序执行的方法来操作数据完成一项功能。面向过程编程语言首先是一种编程语言。它最大的特点是不支持类和对象两个语法概念，不支持丰富的面向对象编程特性（比如继承、多态、封装），仅支持面向过程编程。

面向过程和面向对象最基本的区别就是，**代码的组织方式不同**。面向过程风格的代码被组织成了一组方法集合及其数据结构（struct User），方法和数据结构的定义是分开的。面向对象风格的代码被组织成一组类，方法和数据结构被绑定一起，定义在类中。

```c
struct User {
  char name[64];
  int age;
  char gender[16];
};

struct User parse_to_user(char* text) {
  // 将text(“小王&28&男”)解析成结构体struct User
}

char* format_to_text(struct User user) {
  // 将结构体struct User格式化成文本（"小王\t28\t男"）
}

void sort_users_by_age(struct User users[]) {
  // 按照年龄从小到大排序users
}

void format_user_file(char* origin_file_path, char* new_file_path) {
  // open files...
  struct User users[1024]; // 假设最大1024个用户
  int count = 0;
  while(1) { // read until the file is empty
    struct User user = parse_to_user(line);
    users[count++] = user;
  }
  
  sort_users_by_age(users);
  
  for (int i = 0; i < count; ++i) {
    char* formatted_user_text = format_to_text(users[i]);
    // write to new file...
  }
  // close files...
}

int main(char** args, int argv) {
  format_user_file("/home/zheng/user.txt", "/home/zheng/formatted_users.txt");
}
```

```java
 public class User {
  private String name;
  private int age;
  private String gender;
  
  public User(String name, int age, String gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  
  public static User praseFrom(String userInfoText) {
    // 将text(“小王&28&男”)解析成类User
  }
  
  public String formatToText() {
    // 将类User格式化成文本（"小王\t28\t男"）
  }
}

public class UserFileFormatter {
  public void format(String userFile, String formattedUserFile) {
    // Open files...
    List users = new ArrayList<>();
    while (1) { // read until file is empty 
      // read from file into userText...
      User user = User.parseFrom(userText);
      users.add(user);
    }
    // sort users by age...
    for (int i = 0; i < users.size(); ++i) {
      String formattedUserText = user.formatToText();
      // write to new file...
    }
    // close files...
  }
}

public class MainApplication {
  public static void main(Sring[] args) {
    UserFileFormatter userFileFormatter = new UserFileFormatter();
    userFileFormatter.format("/home/zheng/users.txt", "/home/zheng/formatted_users.txt");
  }
}
```



面向对象编程跟面向过程编程比起来，到底有哪些优势？

*   对于大规模复杂程序的开发，程序的处理流程并非单一的一条主线，而是错综复杂的网状结构。面向对象编程比起面向过程编程，更能应对这种复杂类型的程序开发。

    像 C 语言这种面向过程的编程语言，我们也可以按照功能的不同，把函数和数据结构放到不同的文件里，以达到给函数和数据结构分类的目的，照样可以实现代码的模块化。只不过面向对象编程本身提供了类的概念，强制你做这件事情，而面向过程编程并不强求。

*   面向对象编程相比面向过程编程，具有更加丰富的特性（封装、抽象、继承、多态）。利用这些特性编写出来的代码，更加易扩展、易复用、易维护。

*   从编程语言跟机器打交道的方式的演进规律中，我们可以总结出：面向对象编程语言比起面向过程编程语言，更加人性化、更加高级、更加智能。

## 面向对象

### 什么是 OOA & OOD

面向对象分析英文缩写是 OOA，全称是 Object Oriented Analysis；面向对象设计的英文缩写是 OOD，全称是 Object Oriented Design。OOA、OOD、OOP 三个连在一起就是面向对象分析、设计、编程（实现），正好是面向对象软件开发要经历的三个阶段。



### 什么是 OOP & OOPL

面向对象编程的英文缩写是 OOP，全称是 Object Oriented Programming。OOP 是一种编程范式或编程风格。它以类或对象作为组织代码的基本单元，并将封装、抽象、继承、多态四个特性，作为代码设计和实现的基石 。

面向对象编程语言是支持类或对象的语法机制，并有现成的语法机制，能方便地实现面向对象编程四大特性（封装、抽象、继承、多态）的编程语言。

我们在面向对象编程的过程中，经常会遇到 `is-a` 这种类关系（比如狗是一种动物），而**继承**这个特性就能很好地支持这种 is-a 的代码设计思路，并且解决代码复用的问题，所以，继承就成了面向对象编程的四大特性之一。但是随着编程语言的不断迭代、演化，人们发现继承这种特性容易造成层次不清、代码混乱，所以，很多编程语言在设计的时候就开始摒弃继承特性，比如 Go 语言。但是，我们并不能因为它摒弃了继承特性，就一刀切地认为它不是面向对象编程语言了。



### UML

UML（Unified Model Language），统一建模语言。它不仅仅包含我们常提到类图，还有用例图、顺序图、活动图、状态图、组件图等。单说类之间的关系，UML 就定义了很多种，比如泛化、实现、关联、聚合、组合、依赖等。



### 封装（Encapsulation）

封装也叫作信息隐藏或者数据访问保护。**类通过暴露有限的访问接口，授权外部仅能通过类提供的方式（或者叫函数）来访问内部信息或者数据**。优点如下：

*   **加强可控性**。不可以随意访问、修改类中的属性
*   **提高类的易用性**。只需了解暴露的方法即可，不用对每个属性都了解

下面这段代码是金融系统中一个简化版的虚拟钱包的代码实现。在金融系统中，我们会给每个用户创建一个虚拟钱包，用来记录用户在我们的系统中的虚拟货币量。

```java

public class Wallet {
  private String id;
  private long createTime;
  private BigDecimal balance;
  private long balanceLastModifiedTime;
  // ...省略其他属性...

  public Wallet() {
     this.id = IdGenerator.getInstance().generate();
     this.createTime = System.currentTimeMillis();
     this.balance = BigDecimal.ZERO;
     this.balanceLastModifiedTime = System.currentTimeMillis();
  }

  // 注意：下面对get方法做了代码折叠，是为了减少代码所占文章的篇幅
  public String getId() { return this.id; }
  public long getCreateTime() { return this.createTime; }
  public BigDecimal getBalance() { return this.balance; }
  public long getBalanceLastModifiedTime() { return this.balanceLastModifiedTime;  }

  public void increaseBalance(BigDecimal increasedAmount) {
    if (increasedAmount.compareTo(BigDecimal.ZERO) < 0) {
      throw new InvalidAmountException("...");
    }
    this.balance.add(increasedAmount);
    this.balanceLastModifiedTime = System.currentTimeMillis();
  }

  public void decreaseBalance(BigDecimal decreasedAmount) {
    if (decreasedAmount.compareTo(BigDecimal.ZERO) < 0) {
      throw new InvalidAmountException("...");
    }
    if (decreasedAmount.compareTo(this.balance) > 0) {
      throw new InsufficientAmountException("...");
    }
    this.balance.subtract(decreasedAmount);
    this.balanceLastModifiedTime = System.currentTimeMillis();
  }
}
```

参照封装特性，对钱包的这四个属性的访问方式进行了限制。调用者只允许通过上述这六个方法来访问或者修改钱包里的数据。这样设计，是因为从业务的角度来说，id、createTime 在创建钱包的时候就确定好了，之后不应该再被改动，所以，我们并没有在 Wallet 类中，暴露 id、createTime 这两个属性的任何修改方法，比如 set 方法。而且，这两个属性的初始化设置，对于 Wallet 类的调用者来说，也应该是透明的，所以，我们在 Wallet 类的构造函数内部将其初始化设置好，而不是通过构造函数的参数来外部赋值。

对于钱包余额 balance 这个属性，从业务的角度来说，只能增或者减，不会被重新设置。所以，我们在 Wallet 类中，只暴露了 increaseBalance() 和 decreaseBalance() 方法，并没有暴露 set 方法。对于 balanceLastModifiedTime 这个属性，它完全是跟 balance 这个属性的修改操作绑定在一起的。只有在 balance 修改的时候，这个属性才会被修改。所以，我们把 balanceLastModifiedTime 这个属性的修改操作完全封装在了 increaseBalance() 和 decreaseBalance() 两个方法中，不对外暴露任何修改这个属性的方法和业务细节。这样也可以保证 balance 和 balanceLastModifiedTime 两个数据的一致性。

对于封装这个特性，需要编程语言本身提供访问权限控制来支持。例子中的 private、public 等关键字就是 Java 语言中的访问权限控制语法。private 关键字修饰的属性只能类本身访问，可以保护其不被类之外的代码直接访问。如果 Java 语言没有提供访问权限控制语法，所有的属性默认都是 public 的，那任意外部代码都可以通过类似 wallet.id=123; 这样的方式直接访问、修改属性，也就没办法达到隐藏信息和保护数据的目的了，也就无法支持封装特性了。



### 抽象（Abstraction）

>   抽象这个概念是一个非常**通用的设计思想**，并不单单用在面向对象编程中，也可以用来指导架构设计等。而且这个特性也并不需要编程语言提供特殊的语法机制来支持，只需要提供“函数”这一非常基础的语法机制，就可以实现抽象特性、所以，它没有很强的“特异性”，有时候并不被看作面向对象编程的特性之一。

**抽象讲的是如何隐藏方法的具体实现，让调用者只需要关心方法提供了哪些功能，并不需要知道这些功能是如何实现的**。在面向对象编程中，我们常借助编程语言提供的接口类（比如 Java 中的 interface 关键字语法）或者抽象类（比如 Java 中的 abstract 关键字语法）这两种语法机制，来实现抽象这一特性。优点如下：

*   抽象及封装都是**处理复杂性的有效手段**。忽略掉一些非关键性的实现细节，只关注功能点不关注实现的设计思路
*   抽象作为一个非常宽泛的设计思想，在**代码设计中，起到非常重要的指导作用**。很多设计原则都体现了抽象这种设计思想，比如基于接口而非实现编程、开闭原则（对扩展开放、对修改关闭）、代码解耦（降低代码的耦合性）等。

对于抽象这个特性，如下例子解释：

```java

public interface IPictureStorage {
  void savePicture(Picture picture);
  Image getPicture(String pictureId);
  void deletePicture(String pictureId);
  void modifyMetaInfo(String pictureId, PictureMetaInfo metaInfo);
}

public class PictureStorage implements IPictureStorage {
  // ...省略其他属性...
  @Override
  public void savePicture(Picture picture) { ... }
  @Override
  public Image getPicture(String pictureId) { ... }
  @Override
  public void deletePicture(String pictureId) { ... }
  @Override
  public void modifyMetaInfo(String pictureId, PictureMetaInfo metaInfo) { ... }
}
```

在上面的这段代码中，我们利用 Java 中的 interface 接口语法来实现抽象特性。调用者在使用图片存储功能的时候，只需要了解 IPictureStorage 这个接口类暴露了哪些方法就可以了，不需要去查看 PictureStorage 类里的具体实现逻辑。

实际上，抽象这个特性是非常容易实现的，并不需要非得依靠接口类或者抽象类这些特殊语法机制来支持。换句话说，并不是说一定要为实现类（PictureStorage）抽象出接口类（IPictureStorage），才叫作抽象。即便不编写 IPictureStorage 接口类，单纯的 PictureStorage 类本身就满足抽象特性。因为，类的方法是通过编程语言中的“函数”这一语法机制来实现的。通过函数包裹具体的实现逻辑，这本身就是一种抽象。调用者在使用函数的时候，并不需要去研究函数内部的实现逻辑，只需要通过函数的命名、注释或者文档，了解其提供了什么功能，就可以直接使用了。



### 继承（Inheritance）

继承是用来**表示类之间的 `is-a` 关系**，比如猫是一种哺乳动物。优点如下：

*   **代码复用**（也可以通过其他方式来解决这个代码复用的问题，比如利用组合关系而不是继承关系）

过度使用继承，继承层次过深过复杂，就会导致代码可读性、可维护性变差。为了了解一个类的功能，我们不仅需要查看这个类的代码，还需要按照继承关系一层一层地往上查看“父类、父类的父类……”的代码。还有，子类和父类高度耦合，修改父类的代码，会直接影响到子类。继承这个特性也是一个非常有争议的特性。很多人觉得继承是一种反模式。我们应该尽量少用，甚至不用。



### 多态（Polymorphism）

多态是指**父类引用指向子类对象**，在**实际**的代码运行过程中，**调用子类**的方法实现。优点如下：

*   **提高代码的可扩展性和复用性**

需要三个语法机制来实现多态：

*   支持父类对象可以引用子类对象；
*   支持继承 / 实现接口 / duck-typing 语法（动态语言支持得多）；
*   支持子类可以重写父类中的方法；

多态也是很多设计模式、设计原则、编程技巧的代码实现基础，比如策略模式、基于接口而非实现编程、依赖倒置原则、里式替换原则、利用多态去掉冗长的 if-else 语句等等。

继承和实现接口来实现多态就不多赘述，下面来看下，如何用 duck-typing 来实现多态特性：

```python

class Logger:
    def record(self):
        print(“I write a log into file.”)
        
class DB:
    def record(self):
        print(“I insert data into db. ”)
        
def test(recorder):
    recorder.record()

def demo():
    logger = Logger()
    db = DB()
    test(logger)
    test(db)
```

duck-typing 实现多态的方式非常灵活。Logger 和 DB 两个类没有任何关系，既不是继承关系，也不是接口和实现的关系，但是只要它们都有定义了 record() 方法，就可以被传递到 test() 方法中，在实际运行的时候，执行对应的 record() 方法。也就是说，只要两个类具有相同的方法，就可以实现多态，并不要求两个类之间有任何关系，这就是所谓的 duck-typing，是一些动态语言所特有的语法机制。



## 面向对象中的面向过程代码

### 滥用 getter、setter 方法

定义所有属性的 getter、setter 方法，甚至使用 Lombok 插件在类上标注`@Data`自动生成所有属性的 getter、setter 方法。导致的问题有：

*   对 private 属性也可以通过 setter 方法来修改其值（特别是自动生成的 setter 方法），没有体现封装性

    即使对 private 属性不定义 setter 方法，若通过 getter 方法获取的是引用对象，也可以修改其值，没有体现封装性

    此处对于 Container 可以使用`Collections.unmodifiableCollection`等方法来解决，不过还是可以修改 Container 中的引用对象的值，后续设计模式中会解决此问题

*   对于有些业务逻辑需要手动 setter 多个属性来赋值，且可能忘记赋值某些属性，没有体现封装性



### 滥用全局变量和全局方法

在面向对象编程中，常见的全局变量有单例类对象、静态成员变量、常量等，常见的全局方法有静态方法。单例类对象在全局代码中只有一份，所以，它相当于一个全局变量。静态成员变量归属于类上的数据，被所有的实例化对象所共享，也相当于一定程度上的全局变量。而常量是一种非常常见的全局变量，比如一些代码中的配置参数，一般都设置为常量，放到一个 Constants 类中。静态方法一般用来操作静态变量或者外部数据。

Constants 类、Utils 类的设计尽量能做到职责单一，定义一些细化的小类，比如 RedisConstants、FileUtils，而不是定义一个大而全的 Constants 类、Utils 类。除此之外，如果能将这些类中的属性和方法，划分归并到其他业务类中，那是最好不过的了，能极大地提高类的内聚性和代码的可复用性。



### 定义数据和方法分离的类

基于 MVC 三层结构做 Web 方面的后端开发，这样的代码天天都在写！！！贫血模型的开发模式！数据和操作是分开定义在 VO/BO/Entity 和 Controler/Service/Repository 中的。