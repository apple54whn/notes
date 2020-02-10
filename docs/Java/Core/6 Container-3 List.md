# List

* 元素**有序**（存储时按照底层数组索引添加，读取时和存储顺序一致）、**可重复**、稳定（相对 hash 重排）。可通过**索引**来访问指定元素。其实现类都重写了`toString()`方法。存储自定义对象时，需**重写**其`equals()`

- **特有方法**
    - **添加**
        - `void add([int index,]E e)`：当成单独元素
        - `void addAll([int index,] Collection c)`：当成整体，每个都是独立的
    - **删除**
        - `Object remove(int index)`：返回被删除元素
        - `boolean remove(Object o)`：删除对象
    - **修改替换**
        -   `Object set(int index,E e)`：返回被替换掉的元素
    - **获取**
        - `Object get(index)`
        - `int indexOf(Object o)`
        - `int lastIndexOf(Object o)`
        - `List subList(int fromIndex,int toIndex)`：返回新的 List，旧 List 不改变
    - 长度：同 Collection
        - `int size()`
    - 遍历：由于有索引，所以**List集合特有遍历功能**`get()`和`size()`结合的**普通for循环**。还有**迭代器**、**foreach**。



## ArrayList

- **底层是数组，查询快，增删慢**。**不同步，线程不安全，效率高**

- 常用方法：没有特殊方法

- 源码分析（JDK7）

    - `ArrayList list = new ArrayList()`，底层创建了长度是**10**的`Object[]`数组`elementData`

    - `list.add(123)` 即`elementData[0] = new Integer(123)`

    - `list.add(11)`，如果此次的添加导致底层`elementData`数组容量不够，则扩容。

    - 默认情况下扩容为**原来的容量的1.5倍**（原有容量+容量右移一位），同时需要将原有数组中的数据**复制到新数组**中。

        若扩容一次后还不够，则使用传入的容量（后续总结）

- 源码分析（JDK8）

    - `ArrayList list = new ArrayList()`，底层`Object[] elementData`初始化为`{}`，并没有创建长度为10的数组
    - `list.add(123)`，第一次调用`add()`时，底层才创建了长度10的数组，并将数据123添加到`elementData[0]`
    - 后续的添加和扩容操作与jdk 7 无异（但是注释没改！）

- 小结：jdk7中的`ArrayList`的对象的创建类似于**单例的饿汉式**，而jdk8中的`ArrayList`的对象的创建类似于**单例的懒汉式**，**延迟了数组的创建，节省内存**。

- **建议开发中使用带参的构造器**：`ArrayList list = new ArrayList(int capacity)`



## LinkedList

- **底层是双向链表，查询慢，增删快**。**线程不安全，效率高**。重写了`toString()`方法
- **特有方法（操作首尾元素）**
    - **添加**
        - `void addFirst(E e)`==`void linkFirst(E e)`==`void push(E e)`（底层 `addFirst(E e)`）
        - `void addLast(E e)`==`void linkLast(E e)`
        - `boolean offer(E e)`：Adds the specified element as the tail (last element) of this list.底层`add(E e)`
            - `boolean offerFirst(E e)`：Inserts the specified element at the front of this list.
            - `boolean offerLast(E e)`：Inserts the specified element at the end of this list.
    - **删除**
        - `Object removeFirst()`==`pop(E e)`（底层`removeFirst()`）：NoSuchElementException if this list is empty
        - `Object removeLast()`
    - **获取**
        - `E element()`：Retrieves, but does not remove, the head (first element) of this list.NoSuchElementException if this list is empty。底层`getFirst()`
        - `E peek()`：Retrieves, but does not remove, the head (first element) of this list.retrun null if this list is empty
            - `E peekFirst()`：etrieves, but does not remove, the first element of this list,or returns null if this list is empty.
            - `E peekLast()`：Retrieves, but does not remove, the last element of this list,or returns null if this list is empty.
        - `E poll()`：Retrieves and removes the head (first element) of this list.retrun null if this list is empty
            - `E pollFirst()`：Retrieves and removes the first element of this list, or returns null if this list is empty.
            - `E pollLast()`：Retrieves and removes the last element of this list, or returns null if this list is empty.
        - `E getFirst()`：NoSuchElementException if this list is empty
        - `E getLast()`

*   源码分析（JDK8，与7没区别）

    *   `LinkedList list = new LinkedList()`，内部声明了`Node`内部类的`first`和`last`属性，默认值为`null`

    *   `list.add(123)`，将123封装到Node中，创建了Node对象。

    *   其中，`Node`定义为：体现了`LinkedList`的双向链表的说法

        ```java
        private static class Node<E> {
            E item;
            Node<E> next;
            Node<E> prev;
        
            Node(Node<E> prev, E element, Node<E> next) {
                this.item = element;
                this.next = next;
                this.prev = prev;
            }
        }
        ```



## Vector

*   源码分析：
    *   jdk7和jdk8中通过Vector()构造器创建对象时，底层直接创建了长度为10的数组。
    *   扩容时与 ArrayLIst 相比，默认变为原来的2

