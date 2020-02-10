# System（java.lang）

-   System类代表系统，系统级的很多**属性**和控制**方法**都放置在该类的内部，并且都是**静态**的，且该类的构造器是private的

-   成员变量

    -   `in`：标准输入流（键盘输入）
    -   `out`：标准输出流（显示器）
    -   `err`：标准错误输出流（显示器）

-   成员方法

    -   `long currentTimeMillis()`：返回当前计算机时间和GMT时间(格林威治时间)1970年1月1号0时0分0秒所差的毫秒数，即**获取当前时间戳的毫秒值**。测试程序效率

    -   `void exit(int status)`：退出当前运行的JVM，status表示状态码，0表示正常退出，非0表示异常终止。使用该方法可以在图形界面编程中实现程序的退出功能等

    -   `void gc()`：请求系统进行垃圾回收，至于系统是否立刻回收，则 取决于系统中垃圾回收算法的实现以及系统执行时的情况

        -   **垃圾回收**（当一个对象在内存中被释放时，它的**`finalize()`方法**会被自动调用）

    -   `void arraycopy(Object src,int srcPos,Object dest,int destPos,int length)`：**数组拷贝**

        `arraycopy(arr1, 1, arr2, 3, 2)`：从arr1的1开始长度为2的数据复制到arr2从3开始的地方

    -   `String getProperty(String key)`：获得系统中属性名为key的属性对应的值

        -   `getProperties().list(System.out)` 将**此属性列表输出到指定的输出流**。此方法对于调试很有用。

        |    属性名    |                           属性说明                           |
        | :----------: | :----------------------------------------------------------: |
        |   os.name    |                         操作系统名称                         |
        |  os.version  |                         操作系统版本                         |
        | java.version |                     Java 运行时环境版本                      |
        |  java.home   |                        Java 安装目录                         |
        |  user.name   |                        用户的账户名称                        |
        |  user.home   |                         用户的主目录                         |
        | **user.dir** | 用户的当前工作目录。在 main 中相对于 Project，若在 @Test 中，则相对于 Module。推荐 @Test 中执行 |

        ```java
        System.getProperties().list(System.out);
        System.out.println("=================");
        System.out.println(System.getProperty("os.name"));
        System.out.println(System.getProperty("os.version"));
        System.out.println(System.getProperty("java.home"));
        System.out.println(System.getProperty("java.library.path"));
        System.out.println(System.getProperty("java.version"));
        System.out.println(System.getProperty("user.name"));
        System.out.println(System.getProperty("user.home"));
        System.out.println(System.getProperty("user.dir"));
        
        // =========================输出如下========================
        /*
        -- listing properties --
        java.runtime.name=OpenJDK Runtime Environment
        sun.boot.library.path=/usr/local/sdkman/candidates/java/8.0...
        java.vm.version=25.232-b09
        gopherProxySet=false
        java.vm.vendor=AdoptOpenJDK
        java.vendor.url=http://java.oracle.com/
        path.separator=:
        java.vm.name=OpenJDK 64-Bit Server VM
        file.encoding.pkg=sun.io
        user.country=CN
        sun.java.launcher=SUN_STANDARD
        sun.os.patch.level=unknown
        java.vm.specification.name=Java Virtual Machine Specification
        user.dir=/Users/conanan/Code/IDEA/demo
        PID=2858
        ......
        
        Mac OS X
        10.15.2
        /usr/local/sdkman/candidates/java/8.0.232.hs-adpt/jre
        /Users/conanan/Library/Java/Extensions:/Library/Java/Extensions:/Network/Library/Java/Extensions:/System/Library/Java/Extensions:/usr/lib/java:.
        1.8.0_232
        conanan
        /Users/conanan
        /Users/conanan/Code/IDEA/demo
        */
        ```

        

        

