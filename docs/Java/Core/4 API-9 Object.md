# Object

## Object（java.lang）

-   Object是Java语言中的根类，所有类的父类（直接或间接继承），所有对象（包括数组）都实现这个类的方法。有且只有一个无参构造方法，在对象实例化的时候，最终找的父类就是Object。

-   **方法：**

    -   **`toString()`**其返回值是String类型，返回类名和它的引用地址。直接输出一个对象引用时，默认调用该方法

        **默认打印的值**是由类的全名+'@'+哈希值的十六进制表示`getClass().getName() + "@" + Integer.toHexString(hashCode());`，没意义所以一般由**子类重写**。String、Date、File、包装类等都重写了该方法

    -   **`equals()`**比较两个对象是否相同，底层用的是**`==`**。`String`重写了该方法
        **默认**情况下**比较的是对象地址值**是否相同，没意义所以一般由**子类重写**，注意多态向下转型问题。重写原则如下：

        -   对称性:如果x.equals(y)返回是“true”，那么y.equals(x)也应该返回是 “true”

        -   自反性:x.equals(x)必须返回是“true”

        -   传递性:如果x.equals(y)返回是“true”，而且y.equals(z)返回是“true”，那么z.equals(x)也应该返回是“true”

        -   一致性:如果x.equals(y)返回是“true”，只要x和y内容一直不变，不管你重复x.equals(y)多少次，返回都是“true”

            任何情况下，x.equals(null)，永远返回是“false”；x.equals(和x不同类型的对象)永远返回是“false”

    -   **`hashCode()`**返回**对象的哈希值**，十进制整数，不是实际地址值，是**逻辑地址值**
        使用带Hash的	**Set、Map中键**时需要**给添加的自定义类重写**`hashCode()`和`equals()`

    -   `getClass()`返回对象的字节码文件对象，反射中讲解

    -   `finalize()`未被引用的对象（为null）将被垃圾回收。也可以调用`System.gc()`或`Runtime.getRuntime().gc()`来通知系统进行垃圾回收，但是系统是否进行垃圾回收依然不确定。在垃圾回收机制回收任何对象之前，总会调用该对象的`finalize()`方法。但若重写该方法，则又激活该对象（明白？）。总之不要主动调用该方法，应该交给垃圾回收机制来调用。

    -   `clone()`实现对象**克隆**，包括成员变量的数据复制，但是它和两个引用指向同一个对象是有区别的 

    -   wait / notify / notifyAll

-   只声明了一个空参构造器

-   **【面试】**==和equals()区别：

    1.  `==`：**基本类型**：比较值是否相等；**引用类型**：比较地址值是否相等；左右两边类型必须一致！
    2.  `equals()`：只能比较**引用类型**，比较地址值是否相等，底层是`==`，可以根据需要重写。String、Date、File、包装类等都重写了该方法，比较两对象的“内容”是否相同。



String重写equals()方法

```java
// JDK8
public boolean equals(Object anObject) {
  if (this == anObject) {
    return true;
  }
  if (anObject instanceof String) {
    String anotherString = (String)anObject;
    int n = value.length;
    if (n == anotherString.value.length) {
      char v1[] = value;
      char v2[] = anotherString.value;
      int i = 0;
      while (n-- != 0) {
        if (v1[i] != v2[i])
          return false;
        i++;
      }
      return true;
    }
  }
  return false;
}

// JDK11
public boolean equals(Object anObject) {
  if (this == anObject) {
    return true;
  }
  if (anObject instanceof String) {
    String aString = (String)anObject;
    if (coder() == aString.coder()) {
      return isLatin1() ? StringLatin1.equals(value, aString.value)
        								: StringUTF16.equals(value, aString.value);
    }
  }
  return false;
}
```



## Objects（java.util）

在**JDK7**添加的，它提供了一些静态方法来**操作对象**，这些方法是null-save（空指针安全的）或null-tolerant（容忍空指针的），计算对象的`toString`、`hashCode`、`equals`、`requireNonNull`等等。

```java
public static String toString(Object o) {  //Objects.toString()源码
    return String.valueOf(o);
}
public static int hashCode(Object o) {    //Objects.hashCode()源码
    return o != null ? o.hashCode() : 0;
}
public static boolean equals(Object a, Object b) {  //Objects.equals()源码
    return (a == b) || (a != null && a.equals(b));  
}
public static <T> T requireNonNull(T obj[, String message]) {   //Objects.requireNonNull()源码
    if (obj == null)
        throw new NullPointerException([message]);
    return obj;
}
```



