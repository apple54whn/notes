# 工具类

## StopWatch

Spring 提供的计时工具类，线程不安全，仅用作开发阶段测试。使用如下

```java
StopWatch stopWatch = new StopWatch("计时1");

stopWatch.start("任务1");
StringJoiner sj = new StringJoiner(":", "[", "]");
sj.add("George").add("Sally").add("Fred");
String desiredString = sj.toString();
System.out.println(desiredString);
stopWatch.stop();

stopWatch.start("任务2");
List<Integer> numbers = Arrays.asList(1, 2, 3, 4);
String commaSeparatedNumbers = numbers.stream()
    .map(i -> i.toString())
    .collect(Collectors.joining(", "));
System.out.println(commaSeparatedNumbers);
stopWatch.stop();

System.out.println(stopWatch.prettyPrint());// 美化后输出
```

输出如下

```
StopWatch '计时1': running time = 627100 ns
---------------------------------------------
ns         %     Task name
---------------------------------------------
000140900  022%  任务1
000486200  078%  任务2
```

