# Collections（java.util）

-   针对**Collection/Map**进行操作的**工具类**

-   **常见静态方法**

    -   `static <T> boolean addAll(Collection<T> c, T... elements)  `**添加一些元素**

    -   `static void reverse(List<?> list)` ：**反转**

    -   `static void swap(List，int， int) `：将指定 list 集合中的 i 处元素和 j 处元素进行**交换**

    -   `static void shuffle(List<?> list)`  **打乱集合顺序，洗牌**

    -   `static <T> void sort(List<T> list)` **元素默认自然排序**，T 需实现 Comparable 接口

    -   `static <T> void sort(List<T> list，Comparator<? super T>)`**元素按照指定规则排序**

        ```java
        //可以根据多条规则排序
        public int compare(Student o1, Student o2) {
        int result = o1.getAge() - o2.getAge();
            result = result == 0 ? o1.getName().charAt(0) - o2.getName().charAt(0) : result;
            return result;
        }
        ```

        ```java
        //lambda改写
        Collections.sort(list, (o1, o2) -> {
        int result = o1.getAge() - o2.getAge();
            result = result == 0 ? o1.getName().compareTo(o2.getName()) : result;
            return result;
        });
        ```

    -   `static <T> int binarySearch(List<?> list,T key)` 

    -   `static <T> T max/min (Collection<?> coll [,Comparator c])` 

    -   `static int frequency(Collection<?> c, Object o)`：返回指定集合中指定元素的出现次数

    -   `static <T> boolean replaceAll(List<T> list, T oldVal, T newVal)`

    -   `static <T> void copy(List<? super T> dest, List<? extends T> src)`

        ```java
        ArrayList<Integer> list = new ArrayList<>();
        list.add(111);
        list.add(333);
        list.add(444);
        
        ArrayList<Integer> dest = new ArrayList<>(list.size());
        Collections.copy(dest,list);// IndexOutOfBoundsException: Source does not fit in dest
        
        // 改如下
        List<Object> dest = Arrays.asList(new Object[list.size()]);
        Collections.copy(dest,list);
        ```

    *   `unmodifiableCollection/List/[Navigable]Set/[Navigable]Map/SortedSet/SortedMap` 

        **返回不可修改的 Container 对象**，若修改则抛`UnsupportedOperationException`

-   同步控制方法，将指定集 合包装成线程同步的集合，从而可以解决多线程并发访问集合时的线程安全问题

    `Collection.synchronizedCollection/List/Set/Map/SortedSet/SortedMap`

    ```java
    List<String> list = Collections.synchronizedList(new ArrayList<>());
    ```



## 