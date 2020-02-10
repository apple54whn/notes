# 新 API

## Java 9 对集合添加的优化

Java 9，添加了几种集合工厂方法，更方便创建少量元素的Collection、Map实例。新的**List**、**Set**、**Map**的静态工厂方法可以更方便地创建集合的**不可变实例（存储个数确定时使用）**。

```java
Set<String> str1=Set.of("a","b","c");  
//str1.add("c");  这里编译的时候不会错，但是执行的时候会报错，因为是不可变的集合  
System.out.println(str1);  
Map<String,Integer> str2=Map.of("a",1,"b",2);  
System.out.println(str2);  
List<String> str3=List.of("a","b");  
System.out.println(str3);  
```

> 注意：
>
> 1、of()方法只是Map，List，Set这三个接口的静态方法，其父类接口和子类实现并没有这类方法，比如    HashSet，ArrayList等等；
>
> 2、返回的集合是不可变的；List不能使用Collections遍历
>
> 3、Set和Map接口在调用of方法时，不能有重复的元素，否则会抛出异常

