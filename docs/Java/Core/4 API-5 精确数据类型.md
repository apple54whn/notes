# 精确数据类型

## BigInteger

- `Integer`类作为int的包装类，能存储的最大整型值为`2^31-1`，`Long`类也是有限的， 最大为`2^63-1`。如果要表示再大的整数，不管是基本数据类型还是他们的包装类都无能为力，更不用说进行运算了。
- `java.math`包的`BigInteger`可以表示不可变的**任意精度**的整数。`BigInteger` 提供所有 Java 的基本整数操作符的对应物，并提供 `java.lang.Math` 的所有相关方法。 另外，`BigInteger` 还提供以下运算：模算术、GCD 计算、质数测试、素数生成、位操作以及一些其他操作。
- 静态常量
    - `BigInteger ZERO` The BigInteger constant zero.
    - `BigInteger ONE` The BigInteger constant one.
    - `	BigInteger TWO`  `SINCE 9`,The BigInteger constant two.
    - `BigInteger TEN` The BigInteger constant ten.
- 构造方法
    - `BigInteger(String val)`：根据字符串构建BigInteger对象
- 常用方法
    - `public BigInteger abs()` 返回此 BigInteger 的绝对值的 BigInteger
    - `BigInteger add(BigInteger val)` 返回其值为 (this + val) 的 BigInteger
    - `BigInteger subtract(BigInteger val)` 返回其值为 (this - val) 的 BigInteger
    - `BigInteger multiply(BigInteger val)` 返回其值为 (this * val) 的 BigInteger
    - `BigInteger divide(BigInteger val)` 返回其值为 (this / val) 的 BigInteger。整数相除只保留整数部分。
    - `BigInteger remainder(BigInteger val)` 返回其值为 (this % val) 的 BigInteger
    - `BigInteger[] divideAndRemainder(BigInteger val)`返回包含 (this / val) 后跟(this % val) 的两个 BigInteger 的数组
    - `BigInteger pow(int exponent)` :返回其值为 `this^exponent` 的 BigInteger。
    - `int compareTo(BigInteger val)` **Compares** this BigInteger with the specified BigInteger.



## BigDecimal

一般的Float类和Double类可以用来做科学计算或工程计算，但在商业计算中，要求数字精度比较高，故用到`java.math.BigDecimal`类。浮点数据做运算，会丢失精度。所以，针对浮点数据的操作建议采用`BigDecimal`

- 静态常量

    - `BigDecimal ONE` The value 1, with a scale of 0.
    - `BigDecimal TEN` The value 10, with a scale of 0.
    - `BigDecimal ZERO` The value 0, with a scale of 0.
    - `Enum RoundingMode`**有需要舍入的方法时，采用该枚举类**，替换之前的BigDecimal下的静态常量

- 构造方法（尽量使用参数类型为**String**的构造方法）

    - `BigDecimal(double val)`
    - `BigDecimal(String val)`

- 常用方法

    - `BigDecimal add(BigDecimal augend)`

    - `BigDecimal subtract(BigDecimal subtrahend)`

    - `BigDecimal multiply(BigDecimal multiplicand)`

    - `BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)`

    - `int compareTo(BigDecimal val)` Compares this `BigDecimal` with the specified `BigDecimal`.

          

- BigDecimal都是不可变的（immutable）的，在进行每一步运算时，都会产生一个新的对象，所以在做加减乘除运算时千万要**保存操作后的值**。

    ```java
    BigInteger bi = new BigInteger("12433241123");
    BigDecimal bd = new BigDecimal("12435.351");
    BigDecimal bd2 = new BigDecimal("11");
    System.out.println(bi);
    // java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.
    // System.out.println(bd.divide(bd2)); // 不能除尽，需指定精度
    System.out.println(bd.divide(bd2, BigDecimal.ROUND_HALF_UP));
    // 除数;精度;四舍五入
    System.out.println(bd.divide(bd2, 15, BigDecimal.ROUND_HALF_UP));
    ```

    

