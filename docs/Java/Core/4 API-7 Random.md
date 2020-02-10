# Random（java.util）

-   生成随机数的两个构造方法

    -   `Random()`                          创建一个伪随机数生成器，因为种子随机（当前时间）所以每次运行产生**随机数不同**
    -   `Random(long seed)`         创建一个伪随机数生成器，因为种子一定，每次运行产生**随机数序列相同**

-   Random类的方法

    -   `int nextInt()/nextLong()/nextFloat()/nextDouble()/nextBoolean()`  随机生成~类型所有范围内的随机数
    -   `int nextInt(int n)`   **随机生成[0,n)之间的随机数**

-   生成**任意范围内的随机数**[]

    ```java
    Random r = new Random();
    r.nextInt(end-start+1)+start;//+1是为了保留右极限
    ```

-   每次生成10组6位随机验证码

    ```java
    char[] chs = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'A', 'B', 'C', 'D' };
    int len = chs.length;
    Random r = new Random();
    for (int i = 0; i < 10; i++) { //10组
        System.out.print("随机验证码：");
        for (int j = 0; j < 6; j++) { //6位
            int index = r.nextInt(len);
            System.out.print(chs[index]);
        }
        System.out.println();
    }
    ```



