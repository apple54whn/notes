

# Enum 枚举

类的对象只有有限个，确定的。举例如下：

*   星期：Monday(星期一)、......、Sunday(星期天)
*   性别：Man(男)、Woman(女)
*   季节：Spring(春节)......Winter(冬天)
*   支付方式：Cash(现金)、WeChatPay(微信)、Alipay(支付宝)、BankCard(银行卡)、CreditCard(信用卡)
*   就职状态：Busy、Free、Vocation、Dimission
*   订单状态：Nonpayment(未付款)、Paid(已付款)、Delivered(已发货)、Return(退货)、Checked(已确认)、Fulfilled(已配货)
*   线程状态：Thread中 State 内部枚举类

**当需要定义一组常量时，强烈建议使用枚举类**



## 枚举类的实现

JDK 1.5 新增的 `enum` 关键字用于定义枚举类

*   使用 enum 定义的枚举类**默认继承**了 `java.lang.Enum`类，因此**不能再继承其他类**
*   必须在**枚举类的第一行声明枚举类实例对象**，以`,`分隔`;` 结尾。列出的实例对象系统会**自动添加**`public static final`修饰
*   枚举类的**属性建议使用**`private final`修饰，加上`final`后在生成`set`方法时会编译报错，以示提醒
*   枚举类的**构造器默认使用** `private` 权限修饰符
*   枚举类继承了`Enum`，重写了`toString()`，返回某个 `enum` 实例的名称（如SPRING），可重写
*   JDK 1.5 中可以在 switch 表达式中使用 Enum定义的枚举类的对象作为表达式, case 子句可以直接使用枚举实例的名称，无需添加枚举类作为限定
*   **若枚举只有一个对象，则可以作为一种单例模式的实现方式，查看单例模式中例子**

```java
public enum Season {
    SPRING("春天","春风又绿江南岸"),
    SUMMER("夏天","映日荷花别样红"),
    AUTUMN("秋天","秋水共长天一色"),
    WINNER("冬天","窗含西岭千秋雪");

    // 若没有属性，可以不定义它和构造器
    private final String name;

    private final String des;

    Season(String name, String des) {
        this.name = name;
        this.des = des;
    }
    
    // 可添加 get 方法、重写 Enum 类的toString()
    public String getName() {
        return name;
    }

    public String getDes() {
        return des;
    }
    
    @Override
    public String toString() {
        return "Season{" +
                "name='" + name + '\'' +
                ", des='" + des + '\'' +
                '}';
    }
}
```



## 常用方法

`java.lang.Enum`

*   `values()`：返回**枚举类型的对象数组**，该方法可以很方便地遍历所有的枚举值

*   `valueOf(String str)`：可以把一个字符串转为对应的枚举类对象。要求字符串必须是枚举类实例的名称。如不是，会有运行时异常:`IllegalArgumentException`

*   `toString()`：不重写则返回当前枚举类对象常量的名称

    ```java
    // 以下代码演示不重写toString()方法
    Season[] values = Season.values();
    System.out.println(Arrays.toString(values));// [SPRING, SUMMER, AUTUMN, WINNER]
    
    Season summer = Season.valueOf("SUMMER");
    System.out.println(summer);// SUMMER
    
    System.out.println(Season.SUMMER);// SUMMER，默认调用 toString()
    ```

*    `ordinal()` ：表示某个特定 `enum` 常量的声明顺序，从0开始。一般不需要使用该方法，它设计用于供基于枚举的复杂数据结构使用，例如`java.util.EnumSet`和`java.util.EnumMap`。

## 可以实现接口

*   枚举类可以**实现一个或多个接口**

*   若每个枚举值在调用实现的接口方法呈现相同的行为方式，则只要统一实现该方法即可

    若需要每个枚举值在调用实现的接口方法呈现出不同的行为方式，则可以让**每个枚举值分别来实现该方法**

    ```java
    // 简单示例如下
    SPRING("春天","春风又绿江南岸"){
        @Override
        public String show() {
            // TODO
        }
    }
    ```

    





## JDK1.5之前自定义枚举

```java
//自定义枚举类
public class Season{
    //1.声明Season对象的属性:private final修饰，final 可不加，但加上后在生成 set 方法时会编译报错，以示提醒
    private final String seasonName;
    private final String seasonDesc;

    //2.私有化类的构造器，保证不能在类的外部创建其对象，并给对象属性赋值
    private Season(String seasonName,String seasonDesc){
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }

    //3.提供当前枚举类的多个对象：public static final修饰
    public static final Season SPRING = new Season("春天","春暖花开");
    public static final Season SUMMER = new Season("夏天","夏日炎炎");
    public static final Season AUTUMN = new Season("秋天","秋高气爽");
    public static final Season WINTER = new Season("冬天","冰天雪地");

    //4.其他诉求1：获取枚举类对象的属性
    public String getSeasonName() {
        return seasonName;
    }

    public String getSeasonDesc() {
        return seasonDesc;
    }
    //4.其他诉求2：提供toString()
    @Override
    public String toString() {
        return "Season{" +
            "seasonName='" + seasonName + '\'' +
            ", seasonDesc='" + seasonDesc + '\'' +
            '}';
    }
}
```





