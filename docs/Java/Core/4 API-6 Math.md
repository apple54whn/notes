# Math（java.lang）

-   Math工具类是针对数学运算进行操作的类，提供了大量**静态方法**完成数学相关操作，其方法的参数和返回值类型一般为`double`型

-   成员变量

    -   `Math.PI`：近似圆周率

-   成员方法

    -   绝对值**abs**：`int abs(int/long/float/double a)`
    -   向上取整，**取大的ceil**：`double ceil(double a)` ，-2.4变为-2.0
    -   向下取整，**取小的floor**：`double floor(double a)`，-2.4变为-3.0
    -   四舍五入**round**：`long/int round(double a/float a)`-4.9四舍五入后为-5。算法`Math.floor(x+0.5)`
    -   a的b次幂**pow**：`double pow(double a,double b)`
    -   随机数`[0.0,1.0)`**random**：`double random()`
    -   平方根**sqrt**：`double sqrt(double a)`
    -   三角函数：`asin/acos/atan/sin/cos/tan`
    -   自然对数：`log`
    -   e为底指数：`exp`
    -   弧度转角度：`toDegrees(double angrad)`
    -   角度转弧度：`toRadians(double angdeg)`
    -   两数据中大者：`max(int/long/float/double a,int/long/float/double b)`
    -   两数据中小者：`min(int/long/float/double a,int/long/float/double b)`

-   任意**整数**范围的随机数 

    ```java
    (int)(Math.random()*(end-start+1))+start; //+1是为了包括右极限
    ```



## 