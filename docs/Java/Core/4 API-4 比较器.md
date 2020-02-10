# 比较器

在Java中经常会涉及到对象数组的排序问题，那么就涉及到**对象之间的比较**问题，Java实现对象排序的方式有两种：

*   自然排序：`java.lang.Comparable`
*   比较器排序：`java.util.Comparator`



## Comparable—compareTo

*   `Comparable`接口**强行对实现它的每个类的对象进行整体排序**。这种排序被称为类的**自然排序**。
*   实现`Comparable` 的类必须重写` compareTo(Object obj)` 方法，两个对象通过该方法的返回值来比较大小。
    *   如果当前对象this大于形参对象obj，则返回正整数
    *   如果当前对象this小于形参对象obj，则返回负整数
    *   如果当前对象this等于形参对象obj，则返回零。
*   实现`Comparable`接口的对象列表(和数组)可以通过 `Collections.sort` 或 `Arrays.sort`进行自动排序。实现此接口的对象可以用作有序映射中的键或有序集合中的元素，无需指定比较器。
*   对于类 C 的每一个 e1 和 e2 来说，当且仅当 `e1.compareTo(e2) == 0` 与 `e1.equals(e2)` 具有相同的 boolean 值时，类 C 的自然排序才叫做与 equals 一致。建议（虽然不是必需的）**最好使自然排序与 equals 一致**。

*   `Comparable` 的典型实现（**默认都是从小到大排列**的）：
    *   `8种包装类`：按照对应的数值大小进行比较。都实现了`compareTo()`（底层调用后者），提供了`compare()`。其中：
        *   `Character`按照字符的`Unicode`值来进行比较。
        *   `Boolean`中`true`对应的包装类实例大于`false`对应的包装类实例。
    *   `String`：按照字符串中字符的Unicode值进行比较。实现了`compareTo()`
    *   `Date`、`*Date/Time`等：后面的日期时间比前面的日期时间大。实现了`compareTo()`
    *   `BigInteger`、`BigDecimal`，实现了`compareTo()`





## Comparator—compare

*   当元素的类型没有实现`java.lang.Comparable`接口而又**不方便修改代码**， 或者实现了`java.lang.Comparable`接口的**排序规则不适合当前的操作**，那 么可以使用 `Comparator` 的对象来排序，强行对多个对象进行整体排序的比较。

*   重写`compare(Object o1,Object o2)`方法，比较o1和o2的大小

    *   如果方法返回正整数，则表示o1大于o2
    *   如果返回0，表示相等
    *   返回负整数，表示 o1小于o2。

*   可以将 `Comparator` **传递给 `sort` 方法**（如`Collections.sort` 或 `Arrays.sort`）， 实现精确控制排序。

*   还可以使用 `Comparator` 来控制某些数据结构（如有序set或有序map）的顺序，或者为那些没有自然顺序的对象 `container` 提供排序。

*   **方法（结合 Lambda 使用）**

    ```java
    TreeSet<Person> people = new TreeSet(
        Comparator.comparingInt(Person::getAge).thenComparing(Person::getName).reversed()
    );
    ```

    

