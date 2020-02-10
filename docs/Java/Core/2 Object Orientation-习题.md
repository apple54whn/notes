# 习题

## 值传递习题1

```java
public class TransferTest {
  public static void main(String args[]) {
    TransferTest test = new TransferTest();
    test.first();
  }
  public void first() { 
    int i = 5;
    Value v = new Value(); 
    v.i = 25;
    second(v, i); 
    System.out.println(v.i);// 20
  }
  public void second(Value v, int i) { 
    i = 0;
    v.i = 20;
    Value val = new Value();
    v = val;
    System.out.println(v.i + " " + i);// 15,0
  } 
}

class Value {
  int i = 15;
}
```

## 非值传递习题

```java
public class Test {
  public static void main(String[] args){
    int a = 10;
    int b = 10;
    method(a,b);// 需要在method方法被调用后，仅打印出a=100，b=200，完成method的编码
    System.out.println("a=" + a);
    System.out.println("b=" + b);
  }

  // 方法编写处
  // 方法1。直接输出并exit
  public static void method(int a,int b){
    System.out.println("a=" + a*10);
    System.out.println("b=" + b*20);
    System.exit(0);
  }

  // 方法2，重写打印流
  private static void method(int a, int b) {
    PrintStream printStream = new PrintStream(System.out){
      @Override
      public void println(String s) {
        if ("a=10".equals(s)){
          s = "a=100";
        } else if ("b=10".equals(s)){
          s = "b=200";
        }
        super.println(s);
      }
    };
    System.setOut(printStream);
  }
}
```



## 递归简单练习

```java
public int sum(int num){
  if(num == 1){ 
    return 1;
  }
  else{
    return num + sum(num - 1);
  } 
}

// 计算1-n之间所有自然数的乘积:n!
public int getSum1(int n) {

		if (n == 1) {
			return 1;
		} else {
			return n * getSum1(n - 1);
		}

	}
```

```java
// 已知有一个数列:f(0) = 1,f(1) = 4, f(n+2)=2*f(n+1) + f(n),其中n是大于0的整数，求f(10)的值。
public int f(int n){
  if(n == 0){
    return 1;
  }else if(n == 1){
    return 4;
  }else{
    return 2*f(n - 1) + f(n - 2);
  }
}
```

```java
// 已知一个数列:f(20) = 1,f(21) = 4,f(n+2) = 2*f(n+1)+f(n),其中n是大于0的整数，求f(10)的值。
public static int m1(int num){
  if (num==21){
    return 4;
  } else if (num == 20){
    return 1;
  } else {
    return m1(num+2)-2*m1(num+1);
  }
}
```



## 递归练习

```java
// 递归调用的次数？若k为10，则？
private static int count = 0;

public static int recursion(int k) {
  count++;
  System.out.println("count:"+count+" k:"+k);
  if (k<=0){
    return 0;
  }
  return recursion(k-1) + recursion(k-2);
}
```



## 斐波那契数列

```java
// 输入一个数据n，计算斐波那契数列(Fibonacci)的第n个值 1 1 2 3 5 8 13 21 34 55

```

## 汉诺塔

递归

## 快排

递归



## 多态练习1

```java
public class FieldMethodTest {
  public static void main(String[] args) {
    Sub s = new Sub();
    System.out.println(s.count);//20
    s.display();//20

    Base b = s;//多态性
    System.out.println(b == s);//true
    System.out.println(b.count);//10
    b.display();//20
  }
}

class Base {
  int count = 10;

  public void display() {
    System.out.println(this.count);
  }
}

class Sub extends Base {
  int count = 20;

  public void display() {
    System.out.println(this.count);
  }
}
```

## 多态练习—可变参数重写

```java
public class InterviewTest1 {

  public static void main(String[] args) {
    Base1 base = new Sub1();
    base.add(1, 2, 3);// 此处父类引用调用方法，此方法被重写了，所以结果为sub_1

    Sub1 s = (Sub1) base;
    s.add(1, 2, 3);// 此处子类引用调用方法，直接调用确定的方法，所以结果为sub_2
  }
}

class Base1 {
  public void add(int a, int... arr) {
    System.out.println("base1");
  }
}

class Sub1 extends Base1 {

  // @Override //就是重写了
  public void add(int a, int[] arr) {
    System.out.println("sub_1");
  }

  // 不是这个方法重写父类！！！
  public void add(int a, int b, int c) {
    System.out.println("sub_2");
  }

}
```







## 如何证明多态是运行时绑定的？

```java
class Animal  {
  protected void eat() {
    System.out.println("animal eat food");
  }
}

class Cat  extends Animal  {
  protected void eat() {
    System.out.println("cat eat fish");
  }
}

class Dog  extends Animal  {
  public void eat() {
    System.out.println("Dog eat bone");
  }
}

class Sheep  extends Animal  {
  public void eat() {
    System.out.println("Sheep eat grass");
  }
}

public class InterviewTest {

  public static Animal  getInstance(int key) {
    switch (key) {
      case 0:
        return new Cat ();
      case 1:
        return new Dog ();
      default:
        return new Sheep ();
    }
  }

  public static void main(String[] args) {
    int key = new Random().nextInt(3);
    System.out.println(key);
    Animal  animal = getInstance(key);
    animal.eat();
  }
}
```



## 接口、抽象类问题1

```java
interface A { 
    int x = 0;
}
class B {
    int x = 1;
}
class C extends B implements A {
    public void pX() {
        // 编译不通过，因为x不明确。可以写super.x 和 A.x来调用类中和接口中的x
        System.out.println(x); 
        // 
    }
    public static void main(String[] args) {
        new C().pX();
    } 
}
```



## 接口、抽象类问题2

```java
interface Playable {
    void play();
}
interface Bounceable {
    void play();
}
interface Rollable extends Playable,Bounceable {
    Ball ball = new Ball("PingPang");
}

class Ball implements Rollable {
    private String name;
    public String getName() {
        return name;
    }
    public Ball(String name) {
        this.name = name;
    }
    public void play() {
        // 接口中已定义了该常量，且默认为public static final，此处重新赋值则编译报错
        ball = new Ball("Football"); 
        System.out.println(ball.getName());
    } 
}
```



## 接口和抽象类的对比

| No.  | 区别点       | 抽象类                                                       | 接口                                        |
| ---- | ------------ | ------------------------------------------------------------ | ------------------------------------------- |
| 1    | 定义         | 包含抽象方法的类                                             | 主要是抽象方法和全局常量的集合 `            |
| 2    | 组成         | 构造方法、抽象方法、普通方法、 常量、变量                    | 常量、抽象方法、(jdk8.0:默认方法、静态方法) |
| 3    | 使用         | 子类继承抽象类(extends)                                      | 子类实现接口(implements)                    |
| 4    | 关系         | 抽象类可以实现多个接口                                       | 接口不能继承抽象类，但允许继承多个接口      |
| 5    | 常见设计模式 | 模板方法                                                     | 简单工厂、工厂方法、代理模式                |
| 6    | 对象         | 都通过对象的多态性产生实例化对象                             |                                             |
| 7    | 局限         | 抽象类有单继承的局限                                         | 接口没有此局限                              |
| 8    | 实际         | 作为一个模板                                                 | 是作为一个标准或是表示一种能力              |
| 9    | 选择         | 如果抽象类和接口都可以使用的话，优先使用接口，因为避免单继承的局限 |                                             |



## 定义一个类的时候，权限修饰符规则

- 外部类：public / (default)

- 成员内部类：public / protected / (default) / private

- **局部内部类**：什么都不能写

    ```java
    public class Demo {
        public static void main(String[] args) {
            new Demo(){ //匿名对象，匿名内部类
                void show(){
                    System.out.println("hello");
                }
            }.show();//hello
            //若是给对象起名，并用该名调用show方法，则编译不通过，因为父类中没有此方法，当前所属方法才能使用它
        }
    }
    ```

