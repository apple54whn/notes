# Optional

## 简介

到目前为止，臭名昭著的空指针异常是导致Java应用程序失败的最常见原因。 以前，为了解决空指针异常，Google公司著名的Guava项目引入了`Optional`类， Guava通过使用检查空值的方式来防止代码污染，它鼓励程序员写更干净的代 码。受到Google Guava的启发，`Optional`类已经成为Java 8类库的一部分。

`java.util.Optional<T>` 是一个**容器类**，它可以保存类型T的值，代表这个值存在；或者仅仅保存null，表示这个值不存在。原来用 null 表示一个值不存在，现在 `Optional` 可以更好的表达这个概念。并且可以避免空指针异常。

`Optional`类的Javadoc描述如下：这是一个可以为`null`的容器对象。如果值存在 则`isPresent()`方法会返回`true`，调用`get()`方法会返回该对象。



## 使用

### 创建

**创建`Optional`类对象的方法**

*   `Optional.of(T t)`

    创建一个 `Optional` 实例，`t`必须**非空**; 

*   `Optional.ofNullable(T t)`

    `t`可以为`null`

*   `Optional.empty()`

    创建一个空的 `Optional` 实例



### 判断

**判断`Optional`容器中是否包含对象**

*   `boolean isPresent()`

    判断是否包含对象

*   `void ifPresent(Consumer<? super T> consumer)`

    如果有值，就执行Consumer接口的实现代码，并且该值会作为参数传给它。



### 获取

**获取`Optional`容器的对象**

*   `T get()`

    如果调用对象包含值，返回该值，否则抛异常

*   `T orElse(T other)` 🔥

    如果有值则将其返回，否则返回指定的other对象。

*   `T orElseGet(Supplier<? extends T> other)` 🔥

    如果有值则将其返回，否则返回由`Supplier`接口实现提供的对象。

*   `T orElseThrow(Supplier<? extends X> exceptionSupplier)`

    如果有值则将其返回，否则抛出由`Supplier`接口实现提供的异常。



## 示例

### 示例1

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Girl {
    private String name;
}
```

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Boy {

    private Girl girl;
}
```

```java
@Test
void test1() {
    // 可能是其他地方传来的值，不确定其是否为null
    Girl girl = null;

    //of(T t):保证t是非空的，对于 null 执行会报 NPE
    // Optional<Girl> optionalGirl1 = Optional.of(girl);

    //ofNullable(T t)：t可以为null，执行输出为Optional.empty
    Optional<Girl> optionalGirl2 = Optional.ofNullable(girl);
    System.out.println(optionalGirl2);// Optional.empty


    //orElse(T t1):如果当前的Optional内部封装的t是非空的，则返回内部的t；如果内部的t是空的，则返回orElse()方法中的参数t1.
    Girl girl1 = optionalGirl2.orElse(new Girl("赵丽颖"));
    System.out.println(girl1);// Girl(name=赵丽颖)
}
```

```java
@Test
public void test2(){
    // 可能其他地方传入的值，无法确定其是否为 null
    Boy boy = new Boy();
    boy = null;

    String girlName = getGirlName(boy);
    System.out.println(girlName);

}

//优化之前的 getGirlName():
public String getGirlName(Boy boy){
    return boy.getGirl().getName();
}


//优化以后的 getGirlName():
public String getGirlName1(Boy boy){
    if(boy != null){
        Girl girl = boy.getGirl();
        if(girl != null){
            return girl.getName();
        }
    }
    return null;
}

@Test
public void test3(){
    // 分别注释如下可得结果
    Boy boy = null;// 迪丽热巴
    boy = new Boy();// 古力娜扎
    boy = new Boy(new Girl("桥本有菜"));// 桥本有菜
    String girlName = getGirlName2(boy);
    System.out.println(girlName);
}


//使用 Optional 容器后的 getGirlName():
public String getGirlName2(Boy boy){

    Optional<Boy> boyOptional = Optional.ofNullable(boy);
    // 此时的boy1一定非 null
    Boy boy1 = boyOptional.orElse(new Boy(new Girl("迪丽热巴")));
    // 但是 girl 可能为 null
    Girl girl = boy1.getGirl();

    Optional<Girl> girlOptional = Optional.ofNullable(girl);
    // girl1一定非空
    Girl girl1 = girlOptional.orElse(new Girl("古力娜扎"));
    return girl1.getName();
}
```

