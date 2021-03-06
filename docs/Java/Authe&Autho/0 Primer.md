# 入门

## 什么是认证—身份合法

下边拿微信来举例子说明认证相关的基本概念，在初次使用微信前需要注册成为微信用户，然后输入账号和密码即可登录微信，输入账号和密码登录微信的过程就是认证。

系统为什么要认证？ 认证是为了保护系统的隐私数据与资源，用户的身份合法方可访问该系统的资源。

认证 ：**判断一个用户的身份是否合法的过程**，用户去访问系统资源时系统要求验证用户的身份信息，身份合法方可继续访问，不合法则拒绝访问。**常见的用户身份认证方式有：用户名密码登录，二维码登录，手机短信登录，指纹认证等方式**。





## 什么是会话

用户认证通过后，为了**避免用户的每次操作都进行认证**可将用户的信息保证在会话中。会话就是系统为了**保持当前用户的登录状态所提供的机制**，常见的有基于 **Session** 方式、基于 **Token** 方式等。 

### 基于 Session 的认证方式

它的交互流程是，用户认证成功后，在服务端生成用户相关的数据保存在 session（当前会话）中，发给客户端的 sesssion_id 存放到 cookie 中，这样用户客户端请求时带上 session_id 就可以验证服务器端是否存在 session 数据，以此完成用户的合法校验，当用户退出系统或 session 过期销毁时，客户端的 session_id 也就无效了。

![image-20200823115632108](./images/image-20200823115632108.png)





### 基于 Token 的认证方式

用户认证成功后，服务端生成一个 Token 发给客户端，客户端可以放到 Cookie 或 localStorage 等存储中，每次请求时带上 Token（如放入 Header 中），服务端收到 Token 通过验证后即可确认用户身份。

![image-20200823120259085](./images/image-20200823120259085.png)





### Session 和 Token 的对比

*   基于 Session 的认证方式由 Java EE 的 Servlet 规范定制，**服务端**要存储 Session 信息需要**占用内存资源**，**客户端**需要**支持 Cookie**；

*   基于 Token 的方式则**一般不需要服务端存储 Token**，并且**不限制客户端的存储方式**。如今移动互联网时代更多类型的客户端需要接入系统，系统多是采用前后端分离的架构进行实现，所以基于 Token 的方式更适合。 



## 什么是授权

还拿微信来举例子，微信登录成功后用户即可使用微信的功能，比如，发红包、发朋友圈、添加好友等，**没有绑定银行卡的用户是无法发送红包的，绑定银行卡的用户才可以发红包**，**发红包功能、发朋友圈功能都是微信的资源即功能资源**，用户拥有发红包功能的权限才可以正常使用发送红包功能，拥有发朋友圈功能的权限才可以使用发朋友圈功能，这个根据用户的权限来控制用户使用资源的过程就是授权。

为什么要授权？认证是为了保证用户身份的合法性，授权则是为了更细粒度的对隐私数据进行划分，**授权是在认证通过后发生的**。

**授权**：**用户认证通过后根据用户的权限来控制用户访问资源的过程**，拥有资源的访问权限则正常访问，没有权限则拒绝访问。 



## 授权的数据模型

授权可简单理解为 Who 对 What(which) 进行 How 操作

Who，即**主体（Subject）**，主体一般是指**用户**，也可以是**程序**，**需要访问系统中的资源**。 

What，即**资源 （Resource）**，如系统菜单、页面、按钮、代码方法、系统商品信息、系统订单信息等。

*   系统菜单、页面、按 钮、代码方法都属于**系统功能资源**，对于 Web 系统每个功能资源通常对应一个URL；
*   系统商品信息、系统订单信息都属于**实体资源（数据资源）**，实体资源由**资源类型**和**资源实例**组成，比如商品信息为资源类型，商品编号为001 的商品为资源实例。

How，**权限/许可（Permission）**，规定了用户对资源的操作许可，权限离开资源没有意义， 如用户查询权限、用户添加权限、某个代码方法的调用权限、编号为001的用户的修改权限等，通过权限可知用户对哪些资源都有哪些操作许可。

主体、资源、权限关系如下图：

![image-20200823232241095](./images/image-20200823232241095.png)

主体、资源、权限相关的数据模型如下： 

*   主体（用户id、账号、密码、...） 
*   权限（权限id、权限标识、权限名称、资源id、...） 

*   资源（资源id、资源名称、访问地址、...） 

*   角色（角色id、角色名称、...）



*   主体（用户）和角色关系（用户id、角色id、...）

*   角色和权限关系（角色id、权限id、...） 

**主体（用户）、资源、权限关系**如下图：

![image-20200823233651376](./images/image-20200823233651376.png)

通常企业开发中将资源和权限表合并为一张权限表：

资源（资源id、资源名称、访问地址、...） 

权限（权限id、权限标识、权限名称、资源id、...） 

合并为： 

权限（权限id、权限标识、权限名称、资源名称、资源访问地址、...） 



## RBAC

### 基于角色的访问控制

RBAC基于角色的访问控制（Role-Based Access Control）是按角色进行授权，比如：主体的角色为总经理可以查询企业运营报表，查询员工工资信息等，访问控制流程如下：

<img src="./images/image-20200823233758311.png" alt="image-20200823233758311" style="zoom:50%;" />

根据上图中的判断逻辑，授权代码可表示如下：

```java
if(subject.hasRole("总经理角色id")){ 
    // 查询工资 
}
```

如果查询工资所需要的角色变化为总经理和部门经理，此时就需要修改判断逻辑为“判断用户的角色是否是总经理或部门经理”

```java
if(subject.hasRole("总经理角色id") || subject.hasRole("部门经理角色id")){ 
    // 查询工资 
}
```

根据上边的例子发现，当需要修改角色的权限时就需要修改授权的相关代码，系统可扩展性差。



### 基于资源的访问控制 🔥

RBAC基于资源的访问控制（Resource-Based Access Control）是按资源（或权限）进行授权，比如：用户必须具有查询工资权限才可以查询员工工资信息等，访问控制流程如下：

<img src="./images/image-20200823234211122.png" alt="image-20200823234211122" style="zoom:50%;" />

根据上图中的判断，授权代码可以表示为：

```java
if(subject.hasPermission("查询工资权限标识")){ 
    // 查询工资 
}
```

优点：系统设计时定义好查询工资的权限标识，即使查询工资所需要的角色变化为总经理和部门经理也不需要修改授权代码，系统可扩展性强。 





