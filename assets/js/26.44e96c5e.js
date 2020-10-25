(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{364:function(t,s,a){t.exports=a.p+"assets/img/Exception.a6023e62.png"},365:function(t,s,a){t.exports=a.p+"assets/img/Exception-2.5976c61f.png"},366:function(t,s,a){t.exports=a.p+"assets/img/image-20190916232901753.cc0ad52c.png"},538:function(t,s,a){"use strict";a.r(s);var n=a(2),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"error-exception"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#error-exception"}},[t._v("#")]),t._v(" Error & Exception")]),t._v(" "),n("p"),n("div",{staticClass:"table-of-contents"},[n("ul",[n("li",[n("a",{attrs:{href:"#error-exception"}},[t._v("Error & Exception")]),n("ul",[n("li",[n("a",{attrs:{href:"#异常的体系"}},[t._v("异常的体系")])]),n("li",[n("a",{attrs:{href:"#异常的分类"}},[t._v("异常的分类")])]),n("li",[n("a",{attrs:{href:"#异常的处理"}},[t._v("异常的处理")]),n("ul",[n("li",[n("a",{attrs:{href:"#抓—捕获异常-try-catch-finally"}},[t._v("抓—捕获异常 try-catch-finally")])]),n("li",[n("a",{attrs:{href:"#抓—声明异常-throws"}},[t._v("抓—声明异常 throws")])]),n("li",[n("a",{attrs:{href:"#抛—抛出异常-throw"}},[t._v("抛—抛出异常 throw")])]),n("li",[n("a",{attrs:{href:"#子父类异常注意事项"}},[t._v("子父类异常注意事项")])])])]),n("li",[n("a",{attrs:{href:"#自定义异常"}},[t._v("自定义异常")])]),n("li",[n("a",{attrs:{href:"#习题"}},[t._v("习题")]),n("ul",[n("li",[n("a",{attrs:{href:"#常见的异常，举例说明"}},[t._v("常见的异常，举例说明")])]),n("li",[n("a",{attrs:{href:"#throw-和-throws-区别"}},[t._v("throw和throws区别")])]),n("li",[n("a",{attrs:{href:"#final-finally-finallize-区别"}},[t._v("final,finally,finallize区别")])]),n("li",[n("a",{attrs:{href:"#throw-后代码"}},[t._v("throw 后代码")])]),n("li",[n("a",{attrs:{href:"#习题-1"}},[t._v("习题 1")])])])])])])])]),n("p"),t._v(" "),n("ul",[n("li",[t._v("程序执行中发生的不正常情况称为异常。")])]),t._v(" "),n("h2",{attrs:{id:"异常的体系"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#异常的体系"}},[t._v("#")]),t._v(" 异常的体系")]),t._v(" "),n("p",[t._v("异常的根类是"),n("code",[t._v("java.lang.Throwable")]),t._v("，其下有两个子类：")]),t._v(" "),n("ul",[n("li",[n("p",[n("code",[t._v("java.lang.Error")])]),t._v(" "),n("p",[n("strong",[t._v("JVM 无法解决的严重问题")]),t._v("。如：JVM 系统内部错误、资源耗尽等严重情况。如栈 stack、堆 heap 内存耗尽"),n("strong",[t._v("StackOverflowError（可能在递归时发生）"),n("strong",[t._v("和")]),t._v("OutOfMemoryError（new 了非常多对象）")]),t._v("。一般不编写针对性的代码进行处理。")])]),t._v(" "),n("li",[n("p",[n("code",[t._v("java.lang.Exception")])]),t._v(" "),n("p",[t._v("其它因编程错误或偶然的外在因素导致的一般性问题，可以使用针对性的代码进行处理。")])])]),t._v(" "),n("p",[n("strong",[t._v("Throwable 中的常用方法：")])]),t._v(" "),n("ul",[n("li",[n("p",[n("code",[t._v("public void printStackTrace()")]),t._v("打印异常的"),n("strong",[t._v("详细信息")]),t._v("。")]),t._v(" "),n("p",[t._v("包含了异常的类型，异常的原因 ，还包括异常出现的位置，在开发和调试阶段，都得使用 printStackTrace")])]),t._v(" "),n("li",[n("p",[n("code",[t._v("public String getMessage()")]),t._v("获取发生异常的"),n("strong",[t._v("原因")]),t._v("。提示"),n("strong",[t._v("给用户")]),t._v("的时候,就提示错误原因。")])])]),t._v(" "),n("h2",{attrs:{id:"异常的分类"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#异常的分类"}},[t._v("#")]),t._v(" 异常的分类")]),t._v(" "),n("p",[t._v("我们平常说的异常就是指 Exception，因为这类异常一旦出现，我们就要对代码进行更正，修复程序。对于这些错误，一般有两种解决方法：一是遇到错误就终止程序 的运行。另一种方法是由程序员在编写程序时，就考虑到错误的 检测、错误消息的提示，以及错误的处理。")]),t._v(" "),n("p",[n("strong",[t._v("捕获错误最理想的是在编译期间")]),t._v("，但"),n("strong",[t._v("有的错误只有在运行时才会发生")]),t._v("。 比如：除数为 0，数组下标越界等。")]),t._v(" "),n("p",[n("strong",[t._v("异常(Exception)的分类")]),t._v("：根据在编译时期还是运行时期去检查异常。Java 语言规范将派生于"),n("strong",[t._v("Error")]),t._v("类和"),n("strong",[t._v("RuntimeException")]),t._v("类的所有异常称为"),n("strong",[t._v("非受查异常（unchecked 异常）")]),t._v("，其他为"),n("strong",[t._v("受查异常（checked 异常）")])]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("编译时期异常")]),t._v("：在编译时期就会检查，如果没有处理异常则编译失败。(IO、日期格式化异常)")]),t._v(" "),n("li",[n("strong",[t._v("运行时期异常")]),t._v("：在编译时期运行异常不会被检测，即不报错，但在运行时期检查异常。如：数学异常。"),n("strong",[t._v("运行时发生时一定是程序的问题")]),t._v("，不完善，需要程序员做好"),n("strong",[t._v("校验等")]),t._v("工作！")])]),t._v(" "),n("p",[n("img",{attrs:{src:a(364),alt:""}})]),t._v(" "),n("p",[n("img",{attrs:{src:a(365),alt:""}})]),t._v(" "),n("p",[n("img",{attrs:{src:a(366),alt:"image-20190916232901753"}})]),t._v(" "),n("h2",{attrs:{id:"异常的处理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#异常的处理"}},[t._v("#")]),t._v(" 异常的处理")]),t._v(" "),n("p",[t._v("关于异常对象的产生：")]),t._v(" "),n("ul",[n("li",[t._v("系统自动生成的异常对象")]),t._v(" "),n("li",[t._v("手动的生成一个异常对象，并抛出（throw）")])]),t._v(" "),n("p",[t._v("Java 提供的是异常处理的"),n("strong",[t._v("抓抛模型")]),t._v("。")]),t._v(" "),n("ul",[n("li",[t._v("抓：可以理解为异常的处理方式：try-catch-finally 、 throws")]),t._v(" "),n("li",[t._v("抛：程序在正常执行的过程中，一旦出现异常，就会在异常代码处生成一个对应异常类的对象。该异常对象将被提交给 Java 运行时系统，这个过程称为抛出(throw)异常。一旦抛出对象以后，其后的代码就不再执行。")])]),t._v(" "),n("h3",{attrs:{id:"抓—捕获异常-try-catch-finally"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#抓—捕获异常-try-catch-finally"}},[t._v("#")]),t._v(" 抓—捕获异常 try-catch-finally")]),t._v(" "),n("p",[n("strong",[t._v("捕获异常")]),t._v("：Java 中对异常有针对性的语句进行捕获，可以对出现的异常进行指定方式的处理。")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//可能产生异常的代码")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("异常类名  变量名"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//异常的处理逻辑,异常异常对象之后,怎么处理异常对象")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//记录日志/打印异常信息/继续抛出异常")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("异常类名 变量名"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//一定会执行的代码")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ul",[n("li",[n("p",[t._v("使用 try 将可能出现异常代码包装起来，在执行过程中，一旦出现异常，就会生成一个对应异常类的对象，根据此对象的类型，去 catch 中进行匹配。一旦 try 中的异常对象匹配到某一个 catch 时，就进入 catch 中进行异常的处理。一旦处理完成，就跳出当前的 try-catch 结构（只匹配一个。在没有写 finally 的情况）。继续执行其后的代码。")])]),t._v(" "),n("li",[n("p",[t._v("catch 中的异常类型如果没有子父类关系，则谁声明在上，谁声明在下无所谓。也可以放入一个 catch 中。")]),t._v(" "),n("p",[t._v("catch 中的异常类型如果满足子父类关系，则要求子类一定声明在父类的上面。否则，报错。")])]),t._v(" "),n("li",[n("p",[t._v("常用的异常对象处理的方式：")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("String getMessage()")])]),t._v(" "),n("li",[n("code",[t._v("printStackTrace()")])])])])]),t._v(" "),n("ul",[n("li",[t._v("在 try 结构中声明的变量，再出了 try 结构以后，就不能再被调用")]),t._v(" "),n("li",[t._v("try-catch-finally 结构"),n("strong",[t._v("可以嵌套")])]),t._v(" "),n("li",[t._v("多个异常使用捕获该如何处理\n"),n("ul",[n("li",[t._v("多个异常分别处理")]),t._v(" "),n("li",[t._v("多个异常"),n("strong",[t._v("一次捕获，多次处理")]),t._v("（若捕获的异常"),n("strong",[t._v("有子父类关系")]),t._v("，"),n("strong",[t._v("父类放下面")]),t._v("；"),n("strong",[t._v("没有")]),t._v("可以放在"),n("strong",[t._v("一个 catch 中")]),t._v("）")]),t._v(" "),n("li",[t._v("多个异常一次捕获一次处理")])])]),t._v(" "),n("li",[n("strong",[t._v("运行时异常")]),t._v("被抛出"),n("strong",[t._v("可以不处理")]),t._v("。即不捕获也不声明抛出。")])]),t._v(" "),n("h4",{attrs:{id:"finally-代码块"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#finally-代码块"}},[t._v("#")]),t._v(" finally 代码块")]),t._v(" "),n("p",[n("strong",[t._v("finally")]),t._v("："),n("code",[t._v("try")]),t._v("中异常语句后的代码不被执行，"),n("strong",[t._v("必须要执行的")]),t._v("可以放在"),n("code",[t._v("finally")]),t._v("中，如"),n("strong",[t._v("释放系统资源")]),t._v("。但是当在"),n("code",[t._v("try...catch...")]),t._v("中"),n("strong",[t._v("执行"),n("code",[t._v("System.exit(0)")])]),t._v("(表示"),n("strong",[t._v("退出当前 Java 虚拟机")]),t._v(")，"),n("strong",[n("code",[t._v("finally")]),t._v("才不会执行")])]),t._v(" "),n("p",[t._v("语法："),n("code",[t._v("try...catch....finally")]),t._v("，不能单独使用")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("如果"),n("strong",[t._v("finally 有 return 语句")]),t._v("，将"),n("strong",[t._v("覆盖")]),t._v("原始的返回值，永远返回 finally 中的值。一般应避免该情况")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("fin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),t._v(" e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getMessage")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        a "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("40")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//最终返回40。这里若修改为return 4，最终就返回4")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 若没有return a; 这行代码，则无论a怎么变化，还是会返回10；")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])]),t._v(" "),n("h3",{attrs:{id:"抓—声明异常-throws"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#抓—声明异常-throws"}},[t._v("#")]),t._v(" 抓—声明异常 throws")]),t._v(" "),n("p",[t._v("关键字"),n("strong",[t._v("throws")]),t._v("运用于"),n("strong",[t._v("方法声明之上")]),t._v("，用于"),n("strong",[t._v("表示当前方法不处理异常")]),t._v("，而是"),n("strong",[t._v("提醒")]),t._v("该方法的"),n("strong",[t._v("调用者来处理异常")]),t._v("。")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[t._v("修饰符 返回值类型 方法名"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("参数"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throws")]),t._v(" 异常类名"),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("异常类名"),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("…"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("   "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ul",[n("li",[n("p",[t._v("注意：")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("throws 关键字必须写在"),n("strong",[t._v("方法声明处")]),t._v("，指明此方法执行时，可能会抛出的异常类型。")])]),t._v(" "),n("li",[n("p",[t._v("一旦当方法体执行时，出现异常，仍会在异常代码处生成一个异常类的对象，此对象满足 throws 后异常")]),t._v(" "),n("p",[t._v("类型时，就会被抛出。异常代码后续的代码，就不再执行！")])]),t._v(" "),n("li",[n("p",[t._v("throws 关键字后边声明的异常必须是"),n("strong",[t._v("Exception 或者是 Exception 的子类")])])]),t._v(" "),n("li",[n("p",[t._v("方法内部如果"),n("strong",[t._v("抛出了多个异常对象")]),t._v("，那么 throws 后边必须也"),n("strong",[t._v("声明多个异常")])]),t._v(" "),n("p",[t._v("如果抛出的多个异常对象有"),n("strong",[t._v("子父类关系")]),t._v(",那么"),n("strong",[t._v("直接声明父类异常即可")])])]),t._v(" "),n("li",[n("p",[n("strong",[t._v("调用")]),t._v("了一个声明"),n("strong",[t._v("抛出异常的方法")]),t._v(",我们就必须的"),n("strong",[t._v("处理")]),t._v("声明的异常")]),t._v(" "),n("ul",[n("li",[t._v("要么"),n("strong",[t._v("try-catch")]),t._v("自己处理异常")]),t._v(" "),n("li",[t._v("要么继续使用"),n("strong",[t._v("throws")]),t._v("声明抛出，交给方法的调用者处理，最终交给 JVM")])])])])])]),t._v(" "),n("blockquote",[n("p",[t._v("开发中如何选择使用 try-catch-finally 还是使用 throws？")]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("如果父类中被重写的方法没有 throws 方式处理异常，则子类重写的方法也不能使用 throws")]),t._v("，意味着如果子类重写的方法中有异常，必须"),n("strong",[t._v("使用 try-catch-finally 方式处理")]),t._v("。")]),t._v(" "),n("li",[n("strong",[t._v("执行的方法 a 中，先后又调用了另外的几个方法")]),t._v("，这几个方法是"),n("strong",[t._v("递进关系")]),t._v("执行的。我们建议这几个方法"),n("strong",[t._v("使用 throws")]),t._v("的方式进行处理。而执行的方法 a 可以考虑使用 try-catch-finally 方式进行处理。（可能 try-catch 已经捕获了异常，之后的需要的数据没获取到）")])])]),t._v(" "),n("h3",{attrs:{id:"抛—抛出异常-throw"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#抛—抛出异常-throw"}},[t._v("#")]),t._v(" 抛—抛出异常 throw")]),t._v(" "),n("p",[t._v("在编写程序时，我们必须要考虑程序出现问题的情况。比如，在"),n("strong",[t._v("定义方法")]),t._v("时，方法需要"),n("strong",[t._v("接受参数")]),t._v("。那么，当调用方法使用接受到的参数时，首先需要"),n("strong",[t._v("先对参数数据进行合法的判断")]),t._v("，数据若"),n("strong",[t._v("不合法")]),t._v("，就应该"),n("strong",[t._v("告诉调用者")]),t._v("，传递合法的数据进来。这时需要使用"),n("strong",[t._v("抛出异常")]),t._v("的方式来告诉调用者。")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("在 java 中，提供了一个 throw 关键字，"),n("strong",[t._v("throw 用在方法内，抛出一个指定的异常对象")])]),t._v(" "),n("ul",[n("li",[n("p",[n("strong",[t._v("创建一个异常对象")]),t._v("，封装一些提示信息(信息可以自己编写)。")])]),t._v(" "),n("li",[n("p",[t._v("通过关键字"),n("strong",[t._v("throw")]),t._v("将这个异常对象告知给调用者，并结束当前方法的执行")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" 异常类名"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("参数"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])]),t._v(" "),n("li",[n("p",[t._v("注意：")]),t._v(" "),n("ul",[n("li",[t._v("throw 关键字必须写在"),n("strong",[t._v("方法的内部")])]),t._v(" "),n("li",[t._v("throw 关键字后边 new 的对象必须是"),n("strong",[t._v("Exception 或者 Exception 的子类对象")])]),t._v(" "),n("li",[t._v("throw 关键字抛出指定的异常对象,我们就必须处理这个异常对象\n"),n("ul",[n("li",[t._v("throw 关键字后边创建的是"),n("strong",[t._v("RuntimeException")]),t._v("或是"),n("strong",[t._v("其子类对象")]),t._v(","),n("strong",[t._v("可以不处理")]),t._v(",默认交给 JVM 处理")]),t._v(" "),n("li",[t._v("throw 关键字后边创建的是"),n("strong",[t._v("编译异常")]),t._v("(写代码的时候报错),我们就"),n("strong",[t._v("必须处理")]),t._v(",要么 throws,要么 try...catch")])])])])])]),t._v(" "),n("h3",{attrs:{id:"子父类异常注意事项"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#子父类异常注意事项"}},[t._v("#")]),t._v(" 子父类异常注意事项")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("父类的方法"),n("strong",[t._v("抛出或不抛出")]),t._v("异常，子类重写的方法抛出的异常必须"),n("strong",[t._v("小于等于父类抛出的异常")]),t._v("（多态）")])]),t._v(" "),n("li",[n("p",[t._v("父类的方法"),n("strong",[t._v("抛出")]),t._v("一个或多个"),n("strong",[t._v("异常")]),t._v("，"),n("strong",[t._v("子类")]),t._v("重写的方法"),n("strong",[t._v("抛出的异常")]),t._v("必须"),n("strong",[t._v("与父类相同")]),t._v("或是"),n("strong",[t._v("其子类")]),t._v("或"),n("strong",[t._v("不抛")])])]),t._v(" "),n("li",[n("p",[t._v("父类的方法"),n("strong",[t._v("没有异常抛出")]),t._v("，子类重写的方法"),n("strong",[t._v("不能有异常抛出")]),t._v("。若"),n("strong",[t._v("产生异常则只能捕获处理")])])])]),t._v(" "),n("h2",{attrs:{id:"自定义异常"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#自定义异常"}},[t._v("#")]),t._v(" 自定义异常")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("自定义的异常类"),n("strong",[t._v("继承"),n("code",[t._v("Exception")]),t._v("或"),n("code",[t._v("RuntimeException")]),t._v("（尽量继承这个，对代码没有侵入性）")])])]),t._v(" "),n("li",[n("p",[t._v("定义"),n("strong",[t._v("空参构造")]),t._v("方法和"),n("strong",[t._v("带异常信息的构造")]),t._v("方法")])]),t._v(" "),n("li",[n("p",[t._v("提供全局常量：serialVersionUID")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyException")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*RuntimeException*/")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" serialVersionUID "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1L")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyException")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyException")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" message"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("super")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("message"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])]),t._v(" "),n("h2",{attrs:{id:"习题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#习题"}},[t._v("#")]),t._v(" 习题")]),t._v(" "),n("h3",{attrs:{id:"常见的异常，举例说明"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#常见的异常，举例说明"}},[t._v("#")]),t._v(" 常见的异常，举例说明")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("RuntimeException（unchecked）")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("NullPointerException")])]),t._v(" "),n("li",[n("p",[t._v("ArithmeticException")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" b "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" b"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[t._v("ArrayIndexOutOfBoundsException")])]),t._v(" "),n("li",[n("p",[t._v("NumberFormatException")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" str "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nstr "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"abc"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" num "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[t._v("InputMismatchException")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Scanner")]),t._v(" scanner "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Scanner")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("in"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" score "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" scanner"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("nextInt")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("score"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nscanner"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("close")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[t._v("ClassCastException")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),t._v(" obj "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" str "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("obj"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),n("li",[n("p",[t._v("……")])])])]),t._v(" "),n("li",[n("p",[t._v("java.io.IOException")]),t._v(" "),n("ul",[n("li",[t._v("java.io.FileNotFoundException")])])]),t._v(" "),n("li",[n("p",[t._v("java.lang.ClassNotFoundException")])]),t._v(" "),n("li",[n("p",[t._v("java.sql.SQLException")])]),t._v(" "),n("li",[n("p",[t._v("java.lang.InterruptedException")])])]),t._v(" "),n("h3",{attrs:{id:"throw和throws区别"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#throw和throws区别"}},[t._v("#")]),t._v(" "),n("code",[t._v("throw")]),t._v("和"),n("code",[t._v("throws")]),t._v("区别")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("throw：在方法体中，并且抛出一个异常对象。程序执行到 t 此时立即停止，它后面的语句都不执行。")]),t._v(" "),n("p",[t._v("抛出的是"),n("strong",[t._v("异常对象")]),t._v(" ，说明这里"),n("strong",[t._v("肯定有异常")]),t._v("产生。一般用于自定义异常，体现在选择语句中")])]),t._v(" "),n("li",[n("p",[t._v("throws：在方法声明上，后面跟异常的类名，可以是多个，调用者处理")]),t._v(" "),n("p",[n("strong",[t._v("声明方法有异常")]),t._v("，是一种"),n("strong",[t._v("可能性")]),t._v("，这个异常不一定会产生")])])]),t._v(" "),n("h3",{attrs:{id:"final-finally-finallize区别"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#final-finally-finallize区别"}},[t._v("#")]),t._v(" "),n("code",[t._v("final")]),t._v(","),n("code",[t._v("finally")]),t._v(","),n("code",[t._v("finallize")]),t._v("区别")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("final")]),t._v("：最终意思，可以修饰类、成员变量、成员方法。"),n("a",{attrs:{href:"#final"}},[t._v("详见此")])]),t._v(" "),n("li",[n("code",[t._v("finally")]),t._v("：异常处理，用于释放资源，finally 中的代码一定会被执行，除非执行之前 jvm 退出")]),t._v(" "),n("li",[n("code",[t._v("finalize")]),t._v("：Object 类的一个方法，用于垃圾回收")])]),t._v(" "),n("h3",{attrs:{id:"throw-后代码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#throw-后代码"}},[t._v("#")]),t._v(" "),n("code",[t._v("throw")]),t._v(" 后代码")]),t._v(" "),n("p",[t._v("throw 语句后不能跟其他代码，否则永远执行不到，编译错误")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"怎么也执行不到，编译失败"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),t._v(" e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("printStackTrace")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h3",{attrs:{id:"习题-1"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#习题-1"}},[t._v("#")]),t._v(" 习题 1")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ReturnExceptionDemo")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("methodA")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"进入方法A"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RuntimeException")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"制造异常"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"用A方法的finally"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("methodB")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"进入方法B"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"调用B方法的finally"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("methodA")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Exception")]),t._v(" e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getMessage")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("methodB")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进入方法A")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 用A方法的finally")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 制造异常")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进入方法B")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 调用B方法的finally")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);