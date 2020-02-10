# 习题

## 统计字符串中字符个数

```java
private static void getStringNum(String s) {
    TreeMap<Character, Integer> map = new TreeMap<>();
    char[] chars = s.toCharArray();
    for (char c : chars) {
        if (!map.containsKey(c)) {
            map.put(c, 1);
        } else {
            Integer integer = map.get(c);
            map.put(c, ++integer);
        }
    }
    System.out.println(map);
}
```

## 斗地主洗牌发牌看牌

-   HashMap按牌从大到小存储索引和牌面，并将索引存储到ArrayList中
-   洗牌洗的是ArrayList。发牌时将ArrayList的索引发给TreeSet，以便排序
-   遍历TreeSet并在HashMap中取牌

```java
public static void getPuke() {
    Map<Integer, String> map = new HashMap<>();
    List<Integer> list = new ArrayList<>();
    map.put(0, "大王");
    map.put(1, "小王");
    list.add(0);
    list.add(1);
    List<String> shuZi = List.of("2", "A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3");
    List<String> huaSe = List.of("♠", "♥", "♣", "♦");
    int index = 2;
    for (String s : shuZi) {
        for (String h : huaSe) {
            map.put(index, h + s);
            list.add(index);
            index++;
        }
    }
    Collections.shuffle(list);

    TreeSet<Integer> player1 = new TreeSet<>();
    TreeSet<Integer> player2 = new TreeSet<>();
    TreeSet<Integer> player3 = new TreeSet<>();
    TreeSet<Integer> diPai = new TreeSet<>();

    for (int i = 0; i < list.size(); i++) {
        if (i >= 51) {
            diPai.add(list.get(i));
        } else if (i % 3 == 0) {
            player1.add(list.get(i));
        } else if (i % 3 == 1) {
            player2.add(list.get(i));
        } else if (i % 3 == 2) {
            player3.add(list.get(i));
        }
    }

    lookPuke("player1", player1, map);
    lookPuke("player2", player2, map);
    lookPuke("player3", player3, map);
    lookPuke("dipai", diPai, map);
}

private static void lookPuke(String name, TreeSet<Integer> player, Map<Integer, String> map) {
    System.out.print(name + "的牌：");
    //遍历TreeSet的Lambda表达式
    player.forEach(i -> {
        System.out.print(map.get(i) + " ");
    });
    System.out.println();
}
```

## Foreach问题

```java
String[] arr = new String[] { "MM", "MM", "MM" };

// 方式一：普通for赋值
//for (int i = 0; i < arr.length; i++) {
//    arr[i] = "GG";
//}

// 方式二：增强for循环
for (String s : arr) {
    s = "GG";
}

for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);// 不变，还是 MM，因为局部变量
```

## List 面试题

```java
@Test
public void testListRemove() {
    List list = new ArrayList();
    list.add(1);
    list.add(2);
    list.add(3);
    updateList(list);
    System.out.println(list);//1，2
}

private static void updateList(List list) {
    list.remove(2);// 到底删除的是元素2还是 index 呢？是index！
    //list.remove(new Integer(2));// 此时就删除对象2
}
```

## 在 List 中去除重复值

使用 Set，略

## ArrayList、LinkedList、Vector 异同

-   相同：都实现了List接口；存储稳定、可重复的数据。
-   不同：
    -   `ArrayList`：底层是`Object[] elementData`，**支持快速随机访问，增删慢**（或涉及元素移动`Arrays.copyOf` `System.arraycopy`），**线程不安全，效率高**
    -   `LinkedList`：底层是**双向链表**，**查找慢，增删快**，**线程不安全**；长度没有限制，占用空间比`ArrayList`大（需要维护指针）
    -   `Vector`：底层是`Object[] elementData`，**线程安全，效率低**，即使为了线程安全也别用它

## 以自定义的Customer类为例，何时需要重写equals()?

-   当一个类有自己特有的“逻辑相等”概念,当改写`equals()`的时候，总是要改写`hashCode()`，根据一个类的`equals`方法(改写后)，两个截然不同的实例有可能在逻辑上是相等的，但是，根据`Object.hashCode()`方法，它们仅仅是两个对象。
-   因此，违反了“相等的对象必须具有相等的散列码”。
-   结论:复写`equals`方法的时候一般都需要同时复写`hashCode`方法。通常参与计算`hashCode`的对象的属性也应该参与到`equals()`中进行计算。

## 为什么用Eclipse/IDEA复写hashCode方法，有31这个数字?

-   选择系数的时候要选择尽量大的系数。因为如果计算出来的hash地址越大，所谓的 “冲突”就越少，查找起来效率也会提高。(减少冲突)
-   并且31只占用5bits,相乘造成数据溢出的概率较小。
-   31可以 由i*31== (i<<5)-1来表示,现在很多虚拟机里面都有做相关优化。(提高算法效率)
-   31是一个素数，素数作用就是如果我用一个数字来乘以这个素数，那么最终出来的结果只能被素数本身和被乘数还有1来整除!(减少冲突)

## Set 重要习题

`Person`已重写 `hashCode()` 和`equals()`。注意每次都先算当前 `hashCode`与`equals()`

```java
HashSet set = new HashSet();
Person p1 = new Person(1001,"AA");
Person p2 = new Person(1002,"BB");

set.add(p1);
set.add(p2);
System.out.println(set);// 2个对象

p1.name = "CC";
set.remove(p1);// 移除时由于p1的 hashCode 是根据 CC 重新计算的，与原先的 AA 的 hashCode 不同，所以删除失败
System.out.println(set);// 2个对象

set.add(new Person(1001,"CC"));// 此时添加的元素的 hashCode 与 AA 改 CC 的并不相同！
System.out.println(set);// 3个对象

set.add(new Person(1001,"AA")); // 当前位置元素为 CC，所以即使 hashCode 相同，equals 不同，可以添加
System.out.println(set);// 4个对象
```

## HashMap和Hashtable区别

-   HashMap：线程不安全，效率高，允许null键和null值
-   Hashtable：线程安全，效率低，不允许null键和null值

## HashMap 的底层实现原理

谈谈你对HashMap中put/get方法的认识?

谈谈 HashMap的扩容机制?默认大小是多少?

什么是负载因子( 或填充比)?

什么是吞吐临界值(或阈值、threshold)?

## 负载因子值的大小，对HashMap有什么影响

-   负载因子的大小决定了HashMap的数据密度。
-   负载因子越大密度越大，发生碰撞的几率越高，数组中的链表越容易长，造成查询或插入时的比较次数增多，性能会下降。
-   负载因子越小，就越容易触发扩容，数据密度也越小，意味着发生碰撞的几率越小，数组中的链表也就越短，查询和插入时比较的次数也越小，性 能会更高。但是会浪费一定的内容空间。而且经常扩容也会影响性能，建议初始化预设大一点的空间。
-   按照其他语言的参考及研究经验，会考虑将负载因子设置为0.7~0.75，此 时平均检索长度接近于常数。

## 关于Map的key是否可以修改?

不要修改

映射关系存储到HashMap中会存储key的hash值，这样就不用在每次查找时重新计算每一个Entry或Node(TreeNode)的hash值了，因此如果已经put到Map中的映射关 系，再修改key的属性，而这个属性又参与hashcode值的计算，那么会导致匹配不上。

## Hashtable 和 ConcurrentHashMap 的异同

## Collection和Collections的区别

-   Collection 是单列集合的顶层接口，有两个子接口List和Set
-   Collections 是针对集合包括Map进行操作的工具类，可以对集合进行排序和查找等

## 姓氏统计

一个文本文件中存储着北京所有高校在校生的姓名，格式如下，每行一个名字，姓与名以空格分隔：

```
张 三
李 四
王 小五
```

现在相统计所有姓氏在文件中出现的次数，如何解决？

## 对一个Java源文件中的关键字进行计数

提示:Java源文件中的每一个单词，需要确定该单词是否是一个关键字。为了高效处理这个问题，将所有的关键字保存在一个HashSet中。用contains() 来测试。