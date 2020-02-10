# 日期时间类（Java8）

## 简介

计算世界时间的主要标准有：

*   UTC(Coordinated Universal Time)
*   GMT(Greenwich Mean Time)
*   CST(Central Standard Time)

时间戳：是指格林威治时间1970年01月01日00时00分00秒(北京时间1970年01月01日08时00分00秒)起至现在的**总秒数**。

::: tip 注意

JDK 1.0中包含了 一个java.util.Date类，但是它的大多数方法已经在JDK 1.1引入Calendar类之后被弃用 了。而Calendar并不比Date好多少。它们面临的问题是:

*   可变性：像日期和时间这样的类应该是不可变的。 

*   偏移性：Date中的年份是从1900开始的，而月份都从0开始。 （`new Date(...)`时体现，已被Deprecated）

*   格式化：格式化只对Date有用，Calendar则不行。 

*   线程不安全：不是线程安全的；不能处理闰秒等。

    闰秒，是指为保持协调世界时接近于世界时时刻，由国际计量局统一规定在年底或年中（也可能在季末）对协调世界时增加或减少1秒的调整。由于地球自转的不均匀性和长期变慢性（主要由潮汐摩擦引起的），会使世界时（民用时）和原子时之间相差超过到±0.9秒时，就把协调世界时向前拨1秒（负闰秒，最后一分钟为59秒）或向后拨1秒（正闰秒，最后一分钟为61秒）； 闰秒一般加在公历年末或公历六月末。目前，全球已经进行了27次闰秒，均为正闰秒。最近一次闰秒在北京时间2017年1月1日7时59分59秒（时钟显示07:59:60）出现。这也是本世纪的第五次闰秒。

:::

Java 8 吸收了 Joda-Time 的精华，以一个新的开始为 Java 创建优秀的 API。 新的 java.time 中包含了所有关于本地日期(LocalDate)、本地时间 (LocalTime)、本地日期时间(LocalDateTime)、时区(ZonedDateTime) 和持续时间(Duration)的类。历史悠久的 Date 类新增了 toInstant() 方法， 用于把 Date 转换成新的表示形式。这些新增的本地化时间日期 API 大大简 化了日期时间和本地化的管理。

时间API有如下（大多数开发者只会用到基础包和format包，也可能会用到temporal包。因此，尽管有68个新的公开类型，大多数开发者，大概将只会用到其中的三分之一）：

*   `java.time` – 包含值对象的**基础包** 
*   `java.time.chrono` – 提供对不同的日历系统的访问 
*   `java.time.format` – **格式化和解析时间和日期**
*   `java.time.temporal` – **包括底层框架和扩展特性** 
*   `java.time.zone` – 包含时区支持的类



## Instant

`java.time.Instant`：时间线上的一个**瞬时点**。 这可能被用来记录应用程序中的事件**时间戳的毫秒值**。类似Date。

在处理时间和日期的时候，我们通常会想到年,月,日,时,分,秒。然而，这只是时间的一个模型，是面向人类的。第二种通用模型是面向机器的，或者说是连续的。在此模型中，时间线中的一个点表示为一个很大的数，这有利于计算机处理。在UNIX中，这个数从1970年开始，以秒为的单位；同样在Java中，也是从1970年开始，但以毫秒为单位。

`java.time`包通过值类型`Instant`提供机器视图，不提供处理人类意义上的时间单位。`Instant`表示时间线上的一点，而不需要任何上下文信息，例如，时区。 概念上讲，它只是简单的表示自1970年1月1日0时0分0秒(UTC)开始的秒数。因为`java.time`包是基于纳秒计算的，所以`Instant`的精度可以达到**纳秒**级。`1s = 10^3ms = 10^6us = 10^9ns`

**常用方法**

-   `now()` ：静态方法，返回默认**UTC**时区（本初子午线时区）的`Instant`类的对象
-   `ofEpochMilli(long epochMilli)`：静态方法，返回在1970-01-01 00:00:00基础上加上指定毫秒数之后的`Instant`类的对象

-   `toEpochMilli()`：返回1970-01-01 00:00:00（UTC）到当前时间的毫秒数，即为时间戳的毫秒值
-   `atOffset(ZoneOffset offset)`：`Instant`对象调用，结合即时的偏移来创建一个 `OffsetDateTime`

```java
Instant instant = Instant.now();
System.out.println(instant);// 2019-10-05T10:28:53.822283Z，是本初子午线时区时间

Instant instant1 = Instant.ofEpochMilli(1570271687516L);
System.out.println(instant1);// 2019-10-05T10:34:47.516Z

long l = instant.toEpochMilli();
System.out.println(l);// 1570271540852

OffsetDateTime offsetDateTime = instant.atOffset(ZoneOffset.ofHours(8));
System.out.println(offsetDateTime);// 2019-10-05T18:35:07.753807+08:00
```







## LocalDateTime-

`java.time`包下的`LocalDate`、`LocalTime`、`LocalDateTime` 类是其中较重要的几个类，它们的实例是**不可变的对象**，分别表示使用 ISO-8601日历系统的日期、时间、日期和时间。 它们提供了简单的本地日期或时间，并不包含当前的时间信息，也不包含与时区相关的信息。（ISO-8601日历系统是国际标准化组织制定的现代公民的日期和时间的表示法，也就是公历）类似Calendar。

`LocalDate`：代表IOS格式(yyyy-MM-dd)的日期，可以存储 生日、纪念日等日期。 

`LocalTime`：表示一个时间，而不是日期。 

`LocalDateTime`：用来表示日期和时间的，这是一个最常用的类之一。

构造方法：

*   `now([ZoneId zone])`：静态方法，根据**当前时间**创建对象/指定时区的对象
*   `of(...)`：静态方法，根据**指定**日期/时间创建对象，没有偏移量

获取方法：

*   `getYear()`：获得年份
*   `getMonth()`：获得月份, 返回一个 `Month` 枚举值，可通过`getValue()`获取其值（1-12）
*   `getMonthValue()`：获得月份（1-12） 
*   `getDayOfMonth()/getDayOfYear()`：获得月份天数(1-31) /获得年份天数(1-366)
*   `getDayOfWeek()`：获得星期几，返回一个 `DayOfWeek` 枚举值，可通过`getValue()`获取其值（1-7）
*   `getHour()/getMinute()/getSecond()/getNano()`：获得当前对象对应的小时、分钟、秒、纳秒

设置方法（**返回新的对象**）：

*   `withYear() / withMonth() / withDayOfMonth() / withDayOfYear() / withHour() / withMinute() / withSecond() / withNano()`：将 年份 / 月份 / 月份天数 / 年份天数 / 时 / 分 / 秒 修改为指定的值并**返回新的对象**

计算方法（**返回新的对象**）：

*   `plusYears() / plusMonths() / plusDays() / plusWeeks() / plusHours() / plusMinutes() / plusSeconds() / plusNanos() `：向当前对象添加 几年 / 几月 / 几天 / 几周 / 几小时 / 几分 / 几秒 / 几纳秒，并**返回新的对象**
*   `minusYears() / minusMonths() / minusDays() / minusWeeks() / minusHours() / minusMinutes() / minusSeconds() / minusNanos() `：向当前对象减去 几年 / 几月 / 几天 / 几周 / 几小时 / 几分 / 几秒 / 几纳秒，并**返回新的对象**

```java
// 当前时区年月日时分秒纳秒
LocalDateTime now = LocalDateTime.now();
System.out.println(now);// 2019-10-05T15:34:50.420465
LocalDate localDate = LocalDate.now();
System.out.println(localDate);// 2019-10-05
LocalTime localTime = LocalTime.now();
System.out.println(localTime);// 16:01:27.076062

// 指定年月日时分秒纳秒
LocalDateTime of = LocalDateTime.of(2019, 10, 5, 14, 11, 11, 111111111);
System.out.println(of);// 2019-10-05T11:11:11.111111111

// 获取API
System.out.println(now.getYear());// 2019
System.out.println(now.getMonth());// OCTOBER
System.out.println(now.getMonthValue());// 10
System.out.println(now.getDayOfMonth());// 5
System.out.println(now.getDayOfYear());// 278
System.out.println(now.getDayOfWeek());// SATURDAY
System.out.println(now.getHour());// 15
System.out.println(now.getMinute());// 45
System.out.println(now.getSecond());// 28
System.out.println(now.getNano());// 576880000
System.out.println(now.getChronology());// ISO

// 设置API，会返回新的对象！
System.out.println(now.withYear(2222));// 2222-10-05T15:56:28.583009
System.out.println(now.withMonth(11));// 2019-11-05T15:56:28.583009
System.out.println(now.withDayOfMonth(11));// 2019-10-11T15:56:28.583009
System.out.println(now.withDayOfYear(222));// 2019-08-10T15:56:28.583009
System.out.println(now.withHour(11));// 2019-10-05T11:56:28.583009
System.out.println(now.withMinute(11));// 2019-10-05T15:11:28.583009
System.out.println(now.withSecond(11));// 2019-10-05T15:56:11.583009
System.out.println(now.withNano(111111111));// 2019-10-05T15:56:28.111111111

// 计算API，会返回新的对象！minus就不演示了
System.out.println(now.plusYears(1));// 2020-10-05T16:07:11.942319
System.out.println(now.plusMonths(1));// 2019-11-05T16:07:11.942319
System.out.println(now.plusDays(1));// 2019-10-06T16:07:11.942319
System.out.println(now.plusWeeks(1));// 2019-10-12T16:07:11.942319
System.out.println(now.plusHours(1));// 2019-10-05T17:07:11.942319
System.out.println(now.plusMinutes(1));// 2019-10-05T16:08:11.942319
System.out.println(now.plusSeconds(1));// 2019-10-05T16:07:12.942319
System.out.println(now.plusNanos(1));// 2019-10-05T16:07:11.942319001
```





## DateTimeFormatter

`java.time.format.DateTimeFormatter`类，类似`DateFormat`，提供格式化和解析方法：

构造方法：

*   `ISO_LOCAL_DATE_TIME`;`ISO_LOCAL_DATE`;`ISO_LOCAL_TIME`等：静态方法，预定义的标准格式

*   `ofLocalizedDateTime/Date/Time(FormatStyle style)`：静态方法，本地化相关的格式

    *   `FormatStyle.FULL`

        *   Java8：`2019年10月5日 星期六 下午07时32分13秒 +08:00`
        *   Java11：`2019年10月5日星期六 +08:00 下午7:32:13`

    *   `FormatStyle.LONG`：`2019年10月5日 +08:00 下午7:30:58`

        *   Java8：`2019年10月5日 下午07时33分32秒`
        *   Java11：`2019年10月5日 +08:00 下午7:33:58`

    *   `FormatStyle.MEDIUM`：`2019年10月5日 下午7:31:31`

        *   Java8：`2019-10-5 19:34:52`
        *   Java11：`2019年10月5日 下午7:34:26`

    *   `FormatStyle.SHORT`：`2019/10/5 下午7:31`

        *   Java8：`19-10-5 下午7:36`
        *   Java11：`2019/10/5 下午7:36`

        >    ⚠️注意
        >
        >   使用`FULL`和`LONG`参数时，在`format()`一个`LocalDateTime`，Java8中OK，Java11中报错，提示`Unable to extract ZoneId from temporal`。可以给LocalDateTime设置时区即可解决：`localDateTime.atZone(ZoneId.of("Asia/Shanghai"))`

*   `ofPattern(String pattern)`：静态方法，**指定字符串格式**。常用，如`yyyy-MM-dd HH:mm:ss`

常用方法：

* `format(TemporalAccessor t)`：格式化一个日期、时间、日期时间（`Local***`），返回字符串
* `parse(CharSequence text)`：将指定格式的字符序列解析为一个日期、时间、日期时间（`Local***`）

```java
LocalDateTime localDateTime = LocalDateTime.now();
System.out.println(localDateTime);// 2019-10-05T18:56:54.511646

// 1 预定义的标准格式
DateTimeFormatter formatter1 = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
// format
String format1 = formatter1.format(localDateTime);
System.out.println(format1);// 2019-10-05T18:56:54.511646，此时使用默认的，若是ISO_LOCAL_DATE则只有年月日，其他同理
// parse
TemporalAccessor parse1 = formatter1.parse("2019-10-05T18:55:25.737715");
System.out.println(parse1);// {},ISO resolved to 2019-10-05T18:55:25.737715，接口中内容多，可以指定Field


// 2 预定义的标准格式
DateTimeFormatter formatter2 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);// 只列举一个
// format
String format2 = formatter2.format(localDateTime.atZone(ZoneId.of("+8")));
System.out.println(format2);// 2019-10-5 19:38:48
//parse
TemporalAccessor parse2 = formatter2.parse("2019-10-5 19:38:48");
System.out.println(parse2);// {},ISO resolved to 2019-10-05T19:38:48


// 3 指定字符串格式，常用
DateTimeFormatter formatter3 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
// format
String format3 = formatter3.format(localDateTime.atZone(ZoneId.of("+8")));
System.out.println(format3);// 2019-10-05 19:43:34
//parse
TemporalAccessor parse3 = formatter3.parse("2019-10-05 19:43:04");
System.out.println(parse3);// {},ISO resolved to 2019-10-05T19:43:04
```



## 其它 API

### ZoneId

*   `ZoneId`：该类中包含了所有的时区信息，一个时区的ID，可以用三种格式定义：
*   在区域偏移中，可以是“Z”，“+ hh:mm:ss”或“-hh:mm:ss”，例如“+01:00”。
    *   前缀为“UTC”，“GMT”或“UT”，后跟区域偏移量，例如“UTC + 01:00”。
    *   在区域名称中，例如，“Europe/Paris”。
    



### ZonedDateTime

*   `ZonedDateTime`：一个在ISO-8601日历系统时区的日期时间

    如`2019-10-05T22:29:08.174+08:00[Asia/Shanghai]`，其中每个时区都对应着ID，地区ID都为`{区域}/{城市}`的格式，例如：`Asia/Shanghai`等

    ```java
    // ZoneId的getAvailableZoneIds():获取所有可用的ZoneId
    Set<String> zoneIds = ZoneId.getAvailableZoneIds();
    for (String s : zoneIds) {
        System.out.println(s);
    }
    System.out.println(zoneIds.size());// 600
    
    // ZoneId的of():获取指定时区的时间
    LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Shanghai"));
    System.out.println(localDateTime);// 2019-10-05T22:29:08.169
    
    
    // ZonedDateTime:带时区的日期时间
    // ZonedDateTime的now():获取本时区的ZonedDateTime对象
    ZonedDateTime zonedDateTime = ZonedDateTime.now();
    System.out.println(zonedDateTime);// 2019-10-05T22:29:08.174+08:00[Asia/Shanghai]
    
    // ZonedDateTime的now(ZoneId id):获取指定时区的ZonedDateTime对象
    ZonedDateTime zonedDateTime1 = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));
    System.out.println(zonedDateTime1);// 2019-10-05T22:29:08.174+08:00[Asia/Shanghai]
    ```



### Clock

*   `Clock`：使用时区提供对当前即时、日期和时间的访问的时钟。



### Duration

*   `Duration`：持续时间，用于计算两个“时间”间隔

    ```java
    //Duration:用于计算两个“时间”间隔，以秒和纳秒为基准
    LocalTime localTime = LocalTime.now();
    LocalTime localTime1 = LocalTime.of(15, 23, 32);
    
    //between():静态方法，返回Duration对象，表示两个时间的间隔
    Duration duration = Duration.between(localTime1, localTime);
    System.out.println(duration);// PT7H16M18.397S
    System.out.println(duration.getSeconds());// 26178
    System.out.println(duration.getNano());// 397000000
    
    LocalDateTime localDateTime = LocalDateTime.of(2016, 6, 12, 15, 23, 32);
    LocalDateTime localDateTime1 = LocalDateTime.of(2017, 6, 12, 15, 23, 32);
    Duration duration1 = Duration.between(localDateTime, localDateTime1);
    System.out.println(duration1.toDays());// 365
    System.out.println(duration1.toHours());// 8760
    System.out.println(duration1.toMinutes());// 525600
    System.out.println(duration1.toMillis());// 31536000000毫秒
    System.out.println(duration1.toNanos());// 31536000000000000
    ```



### Period

*   `Period`：日期间隔，用于计算两个“日期”间隔

    ```java
    //Period:用于计算两个“日期”间隔，以年、月、日衡量
    LocalDate localDate = LocalDate.now();
    LocalDate localDate1 = LocalDate.of(2028, 3, 18);
    Period period = Period.between(localDate, localDate1);
    
    System.out.println(period);// P8Y5M13D
    System.out.println(period.getYears());// 8
    System.out.println(period.getMonths());// 5
    System.out.println(period.getDays());// 13
    System.out.println(period.getChronology());// ISO
    
    Period period1 = period.withYears(2);// 类似于set
    System.out.println(period1);// P2Y5M13D
    ```



### TemporalAdjuster

*   `TemporalAdjuster`：时间校正器。有时我们可能需要获取例如，将日期调整到“下一个工作日”等操作。

*   `TemporalAdjusters`：该类通过静态方法`firstDayOfXxx()/lastDayOfXxx()/nextXxx()`提供了大量的常用`TemporalAdjuster`的实现

    ```java
    // TemporalAdjuster:时间校正器
    // 获取当前日期的下一个周日是哪天?
    TemporalAdjuster temporalAdjuster = TemporalAdjusters.next(DayOfWeek.SUNDAY);
    LocalDateTime localDateTime = LocalDateTime.now().with(temporalAdjuster);
    System.out.println(localDateTime);// 2019-10-06T22:47:44.501
    
    // 获取下一个工作日是哪天? @FunctionalInterface->TemporalAdjuster::adjustInto()
    LocalDate localDate = LocalDate.now().with(temporal -> {
        LocalDate date = (LocalDate) temporal;
        if (date.getDayOfWeek().equals(DayOfWeek.FRIDAY)) {
            return date.plusDays(3);
        } else if (date.getDayOfWeek().equals(DayOfWeek.SATURDAY)) {
            return date.plusDays(2);
        } else {
            return date.plusDays(1);
        }
    });
    System.out.println("下一个工作日是:" + localDate);
    ```

    



## 新旧API转换

| 类                                                       | To 遗留类                             | From 遗留类                 |
| -------------------------------------------------------- | ------------------------------------- | --------------------------- |
| java.time.Instant与java.util.Date                        | Date.from(instant)                    | date.toInstant()            |
| java.time.Instant与java.sql.Timestamp                    | Timestamp.from(instant)               | timestamp.toInstant()       |
| java.time.ZonedDateTime与java.util.GregorianCalendar     | GregorianCalendar.from(zonedDateTime) | cal.toZonedDateTime()       |
| java.time.LocalDate与java.sql.Time                       | Date.valueOf(localDate)               | date.toLocalDate()          |
| java.time.LocalTime与java.sql.Time                       | Date.valueOf(localDate)               | date.toLocalTime()          |
| java.time.LocalDateTime与java.sql.Timestamp              | Timestamp.valueOf(localDateTime)      | timestamp.toLocalDateTime() |
| java.time.ZoneId与java.util.TimeZone                     | Timezone.getTimeZone(id)              | timeZone.toZoneId()         |
| java.time.format.DateTimeFormatter与java.text.DateFormat | formatter.toFormat()                  | 无                          |









