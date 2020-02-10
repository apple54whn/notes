# Set

* 元素**无序**（存储时不是按照类似数组索引顺序添加）、**唯一**。底层都是对应的`*Map`。由于没有索引，只可以通过`Iterator`或`foreach`。与`Collection`接口的方法一致，`Set` 的实现类都重写了`toString()`方法。

* 使用Set集合保存**自定义对象（可为 null）**。带有`Hash*`的**必须重写**`hashCode()`和`equal()`方法，且重写的俩方法尽可能保持**一致性**（即相等的对象必须有相同的 hashCode ，不相等亦如此）

    ​    

## HashSet

- 底层数据结构是**哈希表（元素为链表或红黑树的数组）**，实际上是一个`HashMap`实例（value 存储静态的 Object），查询快。**根据`hashCode`决定元素的存放位置**，但**迭代出的元素顺序和存入顺序不一定一致**，即**不稳定**（hash重排）。

- 初始容量为16，当如果使用率超过0.75，(16*0.75=12) 就会扩大容量为原来的2倍（16扩容为32，依次为64,128....等）

- **添加元素过程**（以 HashSet 为例）

    * 向`HashSet`中添加元素`a`，首先调用元素`a`所在类的`hashCode()`方法，计算元素`a`的`hashCode`。

    * 此`hashCode`值接着通过某种散列函数（如：取模。这个散列函数会与底层数组的长度相计算得到在数组中的下标，并且这种散列函数计算还尽可能保证能均匀存储元素，越是散列分布， 该散列函数设计的越好 ）计算出在`HashSet`底层数组中的存放位置（即为：索引位置），判断数组此位置上是否已经有元素：

        * 如果此位置上没有其他元素，则元素`a`添加成功。 ——>情况1
        * 如果此位置上有其他元素`b`（或以链表或红黑树形式存在的多个元素），则比较元素`a`与元素`b`的`hashCode`值：
            * 如果`hashCode`值不相同，则元素`a`添加成功。——>情况2
            * 如果`hashCode`值相同，进而需要调用元素`a`所在类的`equals()`方法：
                * `equals()`返回`true`,元素`a`添加失败
                * `equals()`返回`false`,则元素`a`添加成功。——>情况3

    * 对于添加成功的情况2和情况3而言：元素`a`与已经存在指定索引位置上数据以**链表或红黑树**的方式存储。

        * JDK7：元素`a`放到数组中，指向原来的元素。

        * JDK8：原来的元素在数组中，指向元素`a`

            总结：七上八下



## LinkedHashSet

- 继承`HashSet`，底层数据结构是**双向链表和哈希表（元素为链表或红黑树的数组），元素迭代顺序和存入顺序一致**
- `LinkedHashSet`**插入性能略低**于 `HashSet`，但在**迭代访问** `Set` 里的**全部元素**时**有很好的性能**。



## TreeSet

- 底层数据结构是**红黑树（自平衡二叉树），有序，查询速度比`List`快 **，实际上是一个 `TreeMap`实例。使用`TreeSet`保存自定义元素，这个元素**必须实现`Comparable`接口**或构造时**必须提供`Comparator`实现类**

    - 元素唯一性通过红黑树存储时确定，相同元素丢弃， **根据`compareTo`返回值是否是0来决定**
    - 元素的顺序通过红黑树存储，并通过**中（根）序遍历展示**

- 新增的方法如下：

    - `Comparator comparator()`
    - `Object first()`
    - `Object last()`
    - `Object lower(Object e)`
    - `Object higher(Object e)`
    - `SortedSet subSet(fromElement, toElement)`
    - `SortedSet headSet(toElement)`
    - `SortedSet tailSet(fromElement)`

- **保证元素的排列方式：**

    1. **自然排序（元素具备比较性）**：让元素所属的类实现`Comparable`接口，重写`compareTo`

        向 TreeSet 中添加元素时，只有第一个元素无须比较`compareTo()`方法，后面添加的所有元素都会调用`compareTo()`方法进行比较。且重写该对象对应的 `equals()` 方法时，应保证该方法与 `compareTo(Object obj)` 方法有一致的结果

    2. **比较器排序（集合具备比较性）**：让集合构造方法接收`Comparator`接口的实现类对象，重写`compare`

        向 TreeSet 中添加元素时，只有第一个元素无须比较`compare()`方法，后面添加的所有元素都会调用`compare()`方法进行比较。且重写该对象对应的 `equals()` 方法时，应保证该方法与 `compare()` 方法有一致的结果

        **s1-s2升序，s2-s1降序**

        ```java
        // Lambda
        TreeSet<Person> people = new TreeSet(
            Comparator.comparingInt(Person::getAge).thenComparing(Person::getName).reversed()
        ); 
        ```





## List 与 Set 之间转换

*   都可以在构造时传递对方
*   都继承了 Collection 的 addAll（以整体添加，但每个都是独立的）、add（当成单独元素）

