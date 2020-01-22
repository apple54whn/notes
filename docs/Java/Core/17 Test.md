# 17 Test

[[toc]]



## 测试分类

- **黑盒测试**：不需要写代码，给输入值，看程序是否能够输出期望的值。
- **白盒测试**：**需要写代码**的，关注**程序具体的执行流程**。如 Junit。

## Junit4

1. 定义一个测试类(测试用例)

    * 测试类名：被测试的类名+Test

    * 包名：xxx.xxx.xx.test		

2. **定义测试方法：可以独立运行**

    **方法名**：**test+测试的方法名**	 

    * **返回值**：**void**
    * **参数列表**：**空参**

3. 给方法加**@Test**
4. 导入**junit依赖环境**，`org.junit`

* 判定结果：

    * **红色**：失败
    * **绿色**：成功
    * 一般我们会使用**断言**操作来处理结果
        * **`Assert.assertEquals(expected 期望的结果,actual 运算的结果);`**，支持各种类型数据

    * 补充：以下方法无论测试成功与否都会执行
        * **@Before**:
            * 修饰的方法会在**测试方法之前被自动执行**，用于资源申请`init`
        * **@After**:
            * 修饰的方法会在**测试方法执行之后自动被执行**，用于释放资源`close`





## Junit5

> org.junit.jupiter，SpringBoot 2.2后默认导入



### `@BeforeAll`

* @BeforeAll用于表示已注释的方法应在当前测试类中的所有测试之后执行。
* 与@BeforeEach方法相反，@BeforeAll方法对于给定的测试类仅执行一次。
* @BeforeAll方法必须具有void返回类型，不能为私有，并且默认情况下必须为静态。因此，除非使用@TestInstance（Lifecycle.PER_CLASS）注释测试类，否则@Nested测试类或接口默认方法不支持@BeforeAll方法。
* @BeforeAll方法可以选择声明要由ParameterResolvers解析的参数。



### `@AfterAll`

* @AfterAll用于表示已注释的方法应在当前测试类中的所有测试之后执行。
* 与@AfterEach方法相反，@AfterAll方法对于给定的测试类仅执行一次。
* @AfterAll方法必须具有void返回类型，不能为私有，并且默认情况下必须为**静态**。因此，除非使用@TestInstance（Lifecycle.PER_CLASS）注释测试类，否则@Nested测试类或接口默认方法不支持@AfterAll方法。
* @AfterAll方法可以选择声明要由ParameterResolvers解析的参数。



### `@BeforeEach`

* @BeforeEach用于表示应在当前测试类中的每个@ Test，@ RepeatedTest，@ ParameterizedTest，@ TestFactory和@TestTemplate方法之前执行带注释的方法。
* @BeforeEach方法必须具有void返回类型，不能为私有，并且不能为静态。
* 它们可以选择声明要由ParameterResolvers解析的参数。



### `@AfterEach`

* @AfterEach用于表示应在当前测试类中的每个@ Test，@ RepeatedTest，@ ParameterizedTest，@ TestFactory和@TestTemplate方法之前执行带注释的方法。
* @AfterEach方法必须具有void返回类型，不能为私有，并且不能为静态。
* 它们可以选择声明要由ParameterResolvers解析的参数。