# 习题

## 包装类型转换

```java
Object o1 = true ? new Integer(1) : new Double(2.0);
System.out.println(o1);// 1.0
// 编译时类型提升为Double，所以是1.0

Object o2; 
if (true)
  o2 = new Integer(1); 
else
  o2 = new Double(2.0); 
System.out.println(o2);// 1

public void method1() {
  Integer i = new Integer(1); 
  Integer j = new Integer(1); 
  System.out.println(i == j);// false
  Integer m = 1;
  Integer n = 1; 
  System.out.println(m == n);// true
  Integer x = 128;
  Integer y = 128; 
  System.out.println(x == y);// false
}
```



## String、StringBuffer、StringBuilder区别及底层

见笔记

## String 练习1—值传递

```java
String str = new String("good");
char[] ch = {'t', 'e', 's', 't'};

public void change(String str, char ch[]) {
    str = "test ok";
    ch[0] = 'b';
}

public static void main(String[] args) {
    StringTest ex = new StringTest();
    ex.change(ex.str, ex.ch);
    
    System.out.print(ex.str);//good
    System.out.println(ex.ch);//best
}
```



## String 练习2

`String s = new String("hello")`和`String s = "hello"`前者最多创建两对象，后者最多创建一个对象



## String 练习3

-   当对字符串重新赋值时，需要**重写指定内存区域赋值**，不能使用原有的value进行赋值

-   当执行`concat`，`substring`，`replace`等操作都**需要重新指定内存区域赋值**（与常量池无关）

-   字符串的`+`运算，若是**存在变量相加，先开空间再拼接，结果在堆中**；**只有常量则先拼接（类似字面量赋值），然后在常量池中找**，有就返回，没有就创建并放入常量池。如果拼接的结果调用`intern()`方法，**返回值就在常量池中**。字符串常量池中不会存储相同内容的字符串。

    ```java
    String str1 = "hello";
    String str2 = "hello";
    char[] charArray = {'h', 'e', 'l', 'l', 'o'};
    String str3 = new String(charArray);
    String str4 = "world";
    String str5 = "helloworld";
    
    System.out.println(str1 == str2);//true
    System.out.println(str1 == str3);//false，同理str2!=str3
    System.out.println(str5 == str1 + str4);//false
    System.out.println(str5 == "hello" + "world");//true
    System.out.println(str5 == str1 + "world");//false
    System.out.println(str5 == (str1 + "world").intern());//true
    System.out.println(str3.equals(str1));//true
    ```

-   通过**字面量直接赋值**的定义字符串的会**放入堆内存的字符串常量池**中；但是**`new String`方式定义的不会放入**。

-   特别的，注意**对象中的属性**

    ```java
    Person t1 = new Person("tom", 1);
    t1.setName("hh");
    t1.name = "xx";
    Person t2 = new Person("tom", 1);
    t2.setName("hh");
    t2.name = "xx";
    System.out.println(t1.name == t2.name);// true，值在常量池中！
    ```



## String 常见算法题

答案见doc

### 模拟一个trim方法，去除字符串两端的空格

```java
public String myTrim(String str) {
    if (str != null) {
        int start = 0;// 用于记录从前往后首次索引位置不是空格的位置的索引
        int end = str.length() - 1;// 用于记录从后往前首次索引位置不是空格的位置的索引

        while (start < end && str.charAt(start) == ' ') {
            start++;
        }

        while (start < end && str.charAt(end) == ' ') {
            end--;
        }
        if (str.charAt(start) == ' ') {
            return "";
        }

        return str.substring(start, end + 1);
    }
    return null;
}
```



### 将一个字符串进行反转，将字符串中指定部分进行反转

比如“abcdefg”反转为”abfedcg”

```java
// 方式一：
public String reverse1(String str, int start, int end) {// start:2,end:5
    if (str != null) {
        // 1.
        char[] charArray = str.toCharArray();
        // 2.
        for (int i = start, j = end; i < j; i++, j--) {
            char temp = charArray[i];
            charArray[i] = charArray[j];
            charArray[j] = temp;
        }
        // 3.
        return new String(charArray);

    }
    return null;

}


//方式二：使用String的拼接
public String reverse1(String str,int startIndex,int endIndex){
    if(str != null){
        //第1部分
        String reverseStr = str.substring(0,startIndex);
        //第2部分
        for(int i = endIndex;i >= startIndex;i--){
            reverseStr += str.charAt(i);
        }
        //第3部分
        reverseStr += str.substring(endIndex + 1);

        return reverseStr;

    }
    return null;
}

//方式三：使用StringBuffer/StringBuilder替换String
public static String reverse2(String str, int startIndex, int endIndex) {
    if (str != null) {
        StringBuilder builder = new StringBuilder(str.length());

        //第1部分
        builder.append(str.substring(0, startIndex));
        //第2部分
        //builder.append(new StringBuilder(str.substring(startIndex, endIndex + 1)).reverse());
        for (int i = endIndex; i >= startIndex; i--) {

            builder.append(str.charAt(i));
        }
        //第3部分
        builder.append(str.substring(endIndex + 1));

        return builder.toString();
    }
    return null;

}
```



### 获取一个字符串在另一个字符串中出现的次数

比如:获取“ ab”在 “abkkcadkabkebfkabkskab” 中出现的次数

```java
public int getCount(String mainStr, String subStr) {
    if (mainStr.length() >= subStr.length()) {
        int count = 0;
        int index = 0;
        // while((index = mainStr.indexOf(subStr)) != -1){
        // count++;
        // mainStr = mainStr.substring(index + subStr.length());
        // }
        // 改进：
        while ((index = mainStr.indexOf(subStr, index)) != -1) {
            index += subStr.length();
            count++;
        }

        return count;
    } else {
        return 0;
    }
}
```



### 获取两个字符串中最大相同子串

比如：str1 = "abcwerthelloyuiodef“;str2 = "cvhellobnm"。

提示：将短的那个串进行长度依次递减的子串与较长的串比较。

```java
// 如果只存在一个最大长度的相同子串
public String getMaxSameSubString(String str1, String str2) {
    if (str1 != null && str2 != null) {
        String maxStr = (str1.length() > str2.length()) ? str1 : str2;
        String minStr = (str1.length() > str2.length()) ? str2 : str1;

        int len = minStr.length();

        for (int i = 0; i < len; i++) {// 0 1 2 3 4 此层循环决定要去几个字符

            for (int x = 0, y = len - i; y <= len; x++, y++) {

                if (maxStr.contains(minStr.substring(x, y))) {

                    return minStr.substring(x, y);
                }
            }
        }
    }
    return null;
}

// 如果存在多个长度相同的最大相同子串
// 此时先返回String[]，后面可以用集合中的ArrayList替换，较方便
public String[] getMaxSameSubString1(String str1, String str2) {
    if (str1 != null && str2 != null) {
        StringBuffer sBuffer = new StringBuffer();
        String maxString = (str1.length() > str2.length()) ? str1 : str2;
        String minString = (str1.length() > str2.length()) ? str2 : str1;

        int len = minString.length();
        for (int i = 0; i < len; i++) {
            for (int x = 0, y = len - i; y <= len; x++, y++) {
                String subString = minString.substring(x, y);
                if (maxString.contains(subString)) {
                    sBuffer.append(subString + ",");
                }
            }
            System.out.println(sBuffer);
            if (sBuffer.length() != 0) {
                break;
            }
        }
        String[] split = sBuffer.toString().replaceAll(",$", "").split("\\,");
        return split;
    }
    return null;
}

// 如果存在多个长度相同的最大相同子串：使用ArrayList
public List<String> getMaxSameSubString1(String str1, String str2) {
    if (str1 != null && str2 != null) {
        List<String> list = new ArrayList<String>();
        String maxString = (str1.length() > str2.length()) ? str1 : str2;
        String minString = (str1.length() > str2.length()) ? str2 : str1;

        int len = minString.length();
        for (int i = 0; i < len; i++) {
            for (int x = 0, y = len - i; y <= len; x++, y++) {
                String subString = minString.substring(x, y);
                if (maxString.contains(subString)) {
                    list.add(subString);
                }
            }
            if (list.size() != 0) {
                break;
            }
        }
        return list;
    }

    return null;
}
```



### 对字符串中字符进行自然顺序排序

提示:

*   字符串变成字符数组。 
*   对数组排序，选择，冒泡，Arrays.sort(); 
*   将排序后的数组变成字符串。

```java
public void testSort() {
    String str = "abcwerthelloyuiodef";
    char[] arr = str.toCharArray();
    Arrays.sort(arr);

    String newStr = new String(arr);
    System.out.println(newStr);
}
```



## StringBuilder常见面试题

### 程序输出1

```java
String str = null;
StringBuffer sb = new StringBuffer();
sb.append(str);// 若String为null，则append后当做字符串"null"添加了
System.out.println(sb.length());// 4，因为把null当字符串添加了
System.out.println(sb);//null
StringBuffer sb1 = new StringBuffer(str);//NullPointerException，底层会获取str的长度进行容量初始化
System.out.println(sb1);
```

### 程序输出2

```java
String a = "123";
String b = "123";
String c = new String("123");
String d = new String("123");

System.out.println(a.equals(b));// true
System.out.println(a == b);// true
System.out.println(c.equals(d));//true
System.out.println(c == d);//false
System.out.println(a.equals(c));//true
System.out.println(a == c);//false
```

