# Shiro

## 功能

[官方文档](https://shiro.apache.org/index.html)

Apache Shiro是一个功能强大且灵活的开源安全框架，可以干净地处理身份认证，授权，企业会话管理和加密。Apache Shiro的首要目标是易于使用和理解。 安全有时可能非常复杂，甚至会很痛苦，但这不是必须的。 框架应尽可能掩盖复杂性，并公开简洁直观的API，以简化开发人员确保其应用程序安全的工作。Shiro功能如下：

![img](./images/ShiroFeatures.png)

Primary Concerns

*   **认证**：有时称为“登录”，这是证明用户就是他们所说的身份的行为。
*   **授权**：访问控制的过程，即确定“谁”有权访问“什么”。
*   会话管理：即使在非Web或EJB应用程序中，也可以管理用户特定的会话。
*   加密：使用密码算法保持数据安全，同时仍然易于使用。

Supporting Features

*   网络支持：Shiro的网络支持API可帮助轻松保护网络应用程序。
*   缓存：缓存是Apache Shiro API的一线公民，可确保安全操作保持快速有效。比如用户登录后，其用户信息、拥有的角色/权限不必每次去查，这样可以提高效率；
*   并发性：Apache Shiro的并发功能支持多线程应用程序。即如在一个线程中开启另一个线程，能把权限自动传播过去；
*   测试：测试支持可帮助您编写单元测试和集成测试，并确保您的代码将按预期进行保护。
*   “**Run As**”：允许用户采用其他用户的身份（如果允许）的功能，有时在管理方案中很有用。
*   “**Remember Me**”：记住用户在各个会话中的身份，因此他们只需要在必要时登录即可。



## 架构

Apache Shiro的设计目标是通过直观且易于使用来简化应用程序安全性。Shiro的核心设计模拟了大多数人如何在与某人（或某物）进行交互的情况下如何考虑应用程序安全性。

在最高概念层次，Shiro 的架构有3个主要的概念：`Subject`，`SecurityManager`和`Realms`。下图是这些组件如何交互的高级概述，我们将在下面介绍每个概念：

![img](./images/ShiroBasicArchitecture.png)







### Subject 🔥

**Subject 本质上是当前执行用户的特定于安全性的“视图”**。 “用户”一词通常表示一个人，而主题可以是一个人，但是它也可以表示第三方服务，守护程序帐户，定时任务或类似的东西，基本上是**当前与该软件交互的任何东西**。**Subject 实例都绑定到（并需要）SecurityManager**。与 Subject 进行交互时，这些交互会转换为与 SecurityManager 的特定 Subject 的交互。



### SecurityManager 🔥

**SecurityManager 是 Shiro 体系结构的核心**，充当一种伞形对象，协调其内部安全组件，这些组件一起形成一个对象图。但是，一旦为应用程序配置了SecurityManager及其内部对象图，它通常就会被搁置，应用程序开发人员几乎把所有时间都花在Subject API上。稍后我们将详细讨论SecurityManager，但重要的是要认识到，当您与主题交互时，实际上是SecurityManager在幕后执行**所有操作**。



### Realm 🔥

领域充当 Shiro 和应用程序安全数据之间的桥梁或连接器。当需要与安全相关的数据(如用户帐户)进行实际交互以执行身份验证(登录)和授权(访问控制)时，Shiro会从为应用程序配置的**一个或多个**领域中查找这些内容。

从这个意义上说，Realm 本质上是一个安全特定的 **DAO**：它封装了数据源的连接细节，并根据需要将相关数据提供给Shiro。在配置Shiro时，必须指定至少一个用于身份验证和/或授权的领域。SecurityManager **可以配置多个域，但至少需要一个域**。

Shiro 提供了开箱即用的 Realm 来连接许多安全数据源，如LDAP、关系数据库(JDBC)、文本配置源(如INI和属性文件)等等。如果缺省领域不能满足您的需要，您可以插入自己的域实现来表示自定义数据源。

::: tip

与其他内部组件一样，**SecurityManager 管理如何使用 Realm 来获取安全数据和身份数据，并将其表示为 Subject 实例**。

:::



### Authenticator

认证器

是负责执行和响应用户身份验证(登录)尝试的组件。当用户尝试登录时，验证程序将执行该逻辑。Authenticator知道如何与存储相关用户/帐户信息的一个或多个域进行协调。从这些领域获得的数据用于验证用户的身份，以确保用户确实是他们所说的那个人。

身份验证策略

如果配置了多个域，AuthenticationStrategy将协调域以确定身份验证尝试成功或失败的条件(例如，如果一个域成功但其他域失败，那么尝试成功吗?)所有领域必须成功吗?只有第一个?)



### Authrizer

授权器是负责确定应用程序中用户访问控制的组件。它是最终决定用户是否被允许做某事的机制。与Authenticator一样，授权器也知道如何与多个后端数据源协调，以访问角色和权限信息。授权方使用此信息准确地确定是否允许用户执行给定的操作。



### SessionManager

SessionManager知道如何创建和管理用户会话生命周期，为所有环境中的用户提供健壮的会话体验。这是安全框架世界中的一个独特特性—Shiro能够在任何环境中本地管理用户会话，即使没有Web/Servlet或EJB容器可用。默认情况下，Shiro将使用现有的会话机制(如Servlet容器)，但如果没有，例如在独立应用程序或非web环境中，它将使用内置的企业会话管理来提供相同的编程体验。SessionDAO的存在是为了允许使用任何数据源来持久化会话。



### SessionDAO

SessionDAO代表SessionManager执行会话持久性(CRUD)操作。这允许将任何数据存储插入到会话管理基础设施。



### CacheManager

CacheManager创建和管理其他Shiro组件使用的缓存实例的生命周期。由于Shiro可以访问许多后端数据源来进行身份验证、授权和会话管理，因此缓存一直是框架中的一个一流架构特性，可以在使用这些数据源时提高性能。任何现代的开源和/或企业缓存产品都可以插入到Shiro中，以提供快速和高效的用户体验。

缓存控制器，来管理如用户、角色、权限等的缓存的；因为这些数据基本上很少去改变，放到缓存中后可以提高访问的性能



### Cryptography

密码学是企业安全框架的自然补充。Shiro的加密包包含易于使用和理解的密码、散列(又名摘要)和不同的编解码器实现的表示形式。这个包中的所有类都经过精心设计，非常易于使用和理解。任何使用过Java的本地加密支持的人都知道，要驯服它是一种具有挑战性的动物。Shiro的crypto api简化了复杂的Java机制，使普通人可以轻松地使用密码术。





## 术语

### Authentication—认证

身份验证是验证主体身份的过程——本质上证明某人确实是他们所说的那个人。当身份验证尝试成功时，应用程序可以相信该主题一定是应用程序所期望的。



### Authorization—授权

授权，也称为访问控制，是决定 user / Subject 是否被允许做某事的过程。它通常是通过检查和解释 Subject 的角色和权限(见下面)，然后允许或拒绝访问请求的资源或函数来完成的。



### Cipher—加密算法

加密算法是执行加密或解密的算法。该算法通常依赖于一条名为密钥的信息。而加密是根据密钥而变化的，所以没有密钥的解密是非常困难的。
密码有不同的变体。块密码通常在固定大小的符号块上工作，而流密码则在连续的符号流上工作。对称密码使用相同的密钥进行加密和解密，而非对称密码使用不同的密钥。如果非对称密码中的密钥不能从另一个密钥派生出来，则可以公开共享一个密钥，从而创建公共/私有密钥对。



### Credential—凭据 🔥

**凭据**是验证 user / Subject 身份的一段信息。在验证过程中，一个(或多个) Credential 与 Subject 一起提交，以验证提交 Credential 的 user / Subject 实际上是关联的用户。凭证通常是只有特定 user / Subject 才知道的非常秘密的东西，比如密码、PGP密钥、生物统计属性或类似的机制。
其思想是，对于一个负责人，只有一个人知道正确的 Credential 来与该负责人“配对”。如果当前 user / Subject 提供了与系统中存储的 Credential 相匹配的正确 Credential ，那么系统可以假定并相信当前 user / Subject 就是他们所说的那个人。信任程度随着更安全的凭据类型(例如生物特征签名>密码)的增加而增加。



### Cryptography—加密

加密是一种实践，通过隐藏信息或将其转换成没有意义的信息，从而避免不希望的访问，这样其他人就无法读取信息。Shiro专注于密码学的两个核心元素：使用公钥或私钥加密数据(如电子邮件)的密码，以及不可逆加密数据(如密码)的散列(又名消息摘要)。



### Hash—哈希

哈希函数是输入源(有时称为消息)到经过编码的哈希值(有时称为消息摘要)的单向、不可逆转换。它通常用于密码、数字指纹或具有底层字节数组的数据。



### Permission—权限

权限(至少按照Shiro的解释)是描述应用程序原始功能的语句，仅此而已。权限是安全策略中最低级别的构造。它们只定义应用程序可以做什么。它们没有描述“谁”能够执行这些操作。许可只是一种行为的陈述，仅此而已。



### Principal—主体 🔥

**Principal 是应用程序 user ( Subject ) 的标识属性**。“标识属性”可以是对您的应用程序有意义的任何内容—用户名、姓氏、给定名称、社会安全号码、用户ID等等。
Shiro还引用了我们称为 Principal 的主要原则的东西。 Principal 是在整个应用程序中唯一标识 Subject 的任何 Principal。理想的Principal 是像 RDBMS 用户表主键那样的用户名或用户ID。在**应用程序中， user ( Subject ) 只有一个主 Principal**。



### Realm—领域

略



### Role—角色

略



### Session—会话

Session 是与在一段时间内与软件系统交互的单个 user ( Subject ) 相关联的有状态数据上下文。当主题使用应用程序时，可以从会话中添加/读取/删除数据，而应用程序稍后在需要时可以使用这些数据。会话在用户/主题注销应用程序或由于不活动而超时时终止。
对于那些熟悉HttpSession的人来说，Shiro会话具有相同的用途，只是Shiro会话可以在任何环境中使用，即使没有Servlet容器或EJB容器可用。



### Subject

Subject 只是一个花哨的安全术语，基本上是指应用程序用户的特定于安全的“视图”。但是，Subject并不总是需要反映人——它可以表示调用您的应用程序的外部进程，或者可能表示在一段时间内间歇执行某些操作的守护进程系统帐户(例如cron作业)。它基本上是任何对应用程序进行操作的实体的表示。





## Authentication—认证

![img](./images/ShiroAuthenticationSequence.png)

### 认证流程

1.  应用程序代码执行 `Subject.login` 方法，传递构造的 AuthenticationToken 实例，该实例表示最终用户的 principals 和 credentials。

2.  Subject 实例，通常是一个 DelegatingSubject（或子类）被应用委托来调用`SecurityManager.login(token)`，实际的身份验证工作从这里开始。

3.  SecurityManager 是一个基本的“伞形”组件，它接收令牌并通过调用`Authenticator.authenticate(token)`将其简单地委托给它的内部 Authenticator 实例。这几乎总是一个 ModularRealmAuthenticator 实例，它支持在身份验证期间协调一个或多个 Realm 实例。 ModularRealmAuthenticator 本质上为Apache Shiro提供了一个PAM样式的范型(在PAM术语中，每个 Realm 都是一个“模块”)。

4.  如果只配置了单个 Realm，则直接调用它——在单个域应用程序中不需要验证策略。

5.  如果为应用程序配置了多个 Realm，ModularRealmAuthenticator 实例将利用其配置的 AuthenticationStrategy 发起多域身份验证尝试。在为身份验证调用领域之前、期间和之后，将调用 AuthenticationStrategy 以允许它对每个领域的结果作出反应。我们将很快介绍身份验证策略。

6.  每个已配置的 Realm 都将被查询，以查看它是否支持提交的 AuthenticationToken。如果是，将使用提交的令牌调用支持域的`getAuthenticationInfo`方法。`getAuthenticationInfo`方法有效地表示该特定 Realm 的单个身份认证尝试。我们稍后将讨论领域身份认证行为。

    

### Authenticator

如前所述，Shiro SecurityManager实现默认使用 ModularRealmAuthenticator 实例。ModularRealmAuthenticator 同样支持具有单个 Realm 的应用程序和具有多个 Realm 的应用程序。

在单一 Realm 应用程序中，ModularRealmAuthenticator 将直接调用单一领域。如果配置了两个或多个域，它将使用AuthenticationStrategy实例来协调如何进行尝试。我们将在下面讨论身份验证策略。

可以自定义认证器，虽然 ModularRealmAuthenticator 可以适应大部分需求。略



### AuthenticationStrategy

多个 Realm 才会使用，见文档，略



## QuickStart

::: tip

详细代码查看仓库

:::

### 引入依赖

```xml
<dependency>
  <groupId>org.apache.shiro</groupId>
  <artifactId>shiro-spring-boot-starter</artifactId>
  <version>1.5.1</version><!--哔了狗，官网文档给的1.5.2-SNAPSHOT但是并没有存入Maven库里-->
</dependency>
```

### 配置

```ini
# -----------------------------------------------------------------------------
# Users and their assigned roles
#
# Each line conforms to the format defined in the
# org.apache.shiro.realm.text.TextConfigurationRealm#setUserDefinitions JavaDoc
# -----------------------------------------------------------------------------
[users]
# user 'root' with password 'secret' and the 'admin' role
root = secret, admin
# user 'guest' with the password 'guest' and the 'guest' role
guest = guest, guest
# user 'presidentskroob' with password '12345' ("That's the same combination on
# my luggage!!!" ;)), and role 'president'
presidentskroob = 12345, president
# user 'darkhelmet' with password 'ludicrousspeed' and roles 'darklord' and 'schwartz'
darkhelmet = ludicrousspeed, darklord, schwartz
# user 'lonestarr' with password 'vespa' and roles 'goodguy' and 'schwartz'
lonestarr = vespa, goodguy, schwartz

# -----------------------------------------------------------------------------
# Roles with assigned permissions
# 
# Each line conforms to the format defined in the
# org.apache.shiro.realm.text.TextConfigurationRealm#setRoleDefinitions JavaDoc
# -----------------------------------------------------------------------------
[roles]
# 'admin' role has all permissions, indicated by the wildcard '*'
admin = *
# The 'schwartz' role can do anything (*) with any lightsaber:
schwartz = lightsaber:*
# The 'goodguy' role is allowed to 'drive' (action) the winnebago (type) with
# license plate 'eagle5' (instance specific id)
goodguy = winnebago:drive:eagle5
```



### 示例

```java
public static void main(String[] args) {
  /*
   创建配置了Shiro SecurityManager的最简单方法, realms, users, roles 和 permissions 使用了简单的 INI 配置
   官方给的示例中使用 IniSecurityManagerFactory 构造来获取 SecurityManager 的方式已经过时，推荐使用 Shiro 的 Environment 替代
  */
  BasicIniEnvironment basicIniEnvironment = new BasicIniEnvironment("classpath:shiro.ini");
  SecurityManager securityManager = basicIniEnvironment.getSecurityManager();

  /*
   对于这个简单的快速入门示例，使用SecurityManager可作为JVM单例访问。大多数应用程序不会这样做而是依赖于它们的容器配置或 webapps 的web.xml。
   */
  SecurityUtils.setSecurityManager(securityManager);


  /*
   获取当前执行的用户（安全领域公认的命名 Subject）
   独立应用程序中的 getSubject() 调用可能基于特定于应用程序位置的用户数据返回 Subject，而在服务器环境(例如web应用程序)中，它基于与当前线程或传入请求相关的用户数据获取 Subject。
   */
  Subject currentUser = SecurityUtils.getSubject();

  /*
   使用 Session 做一些事情(不需要web或EJB容器!!)
   该 Session 是一个特定于 Shiro 的实例，它提供了常规 HttpSession 所提供的大部分内容，但也提供了一些额外的好处，还有一个很大的区别: 它不需要HTTP环境!
   如果在 web 应用程序中部署，默认情况下会话将基于 HttpSession。但是，在非 web 环境中，比如这个简单的快速入门，Shiro默认情况下会自动使用它的企业会话管理。
   这意味着您可以在任何层的应用程序中使用相同的API，而不管部署环境如何。这打开了一个全新的应用程序世界，因为任何需要会话的应用程序都不需要强制使用HttpSession或EJB有状态会话bean。
   而且，任何客户机技术现在都可以共享会话数据。
   */
  Session session = currentUser.getSession();
  session.setAttribute("hello", "conanan");
  String value = (String) session.getAttribute("hello");
  if (value.equals("conanan")) {
    log.info("获取到正确的值! [" + value + "]");
  }

  /*
   登录当前用户，可以检查角色和权限
   我们只能对已知用户进行这些检查。上面的 Subject 实例表示当前用户，但是谁是当前用户呢?嗯，他们是匿名的——也就是说，直到他们至少登录一次。让我们这样做:
   */
  if (!currentUser.isAuthenticated()) {
    UsernamePasswordToken token = new UsernamePasswordToken("lonestarr", "vespa",true);
    // token.setRememberMe(true); //也可以在构造中第三个参数添加
    try {
      // 登录失败需捕获异常
      currentUser.login(token);
    } catch (UnknownAccountException uae) {
      log.info("该用户不存在：" + token.getPrincipal());
    } catch (IncorrectCredentialsException ice) {
      log.info(token.getPrincipal() + "账号的密码错误!");
    } catch (LockedAccountException lae) {
      log.info("账号" + token.getPrincipal() + " 已被锁.  " +
               "请联系管理员解锁.");
    }
    // 在这里捕获更多的异常(可能是特定于您的应用程序的自定义异常?)
    // 可参考https://shiro.apache.org/static/1.5.1/apidocs/org/apache/shiro/authc/AuthenticationException.html
    catch (AuthenticationException ae) {
      //unexpected condition?  error?
    }
  }

  /*
   用户登陆后可以做如下事情：告诉我们当前用户是谁，输出他的 identifying principal（主要身份，在这个示例中是 username）
   */
  log.info("用户 [" + currentUser.getPrincipal() + "] 登陆成功.");

  /*
   测试是否有这个角色
   */
  if (currentUser.hasRole("schwartz")) {
    log.info("May the Schwartz be with you!");
  } else {
    log.info("Hello, mere mortal.");
  }

  /*
   我们还可以看到他们是否有权限对某种类型的实体采取行动:
   */
  if (currentUser.isPermitted("lightsaber:wield")) {
    log.info("You may use a lightsaber ring.  Use it wisely.");
  } else {
    log.info("Sorry, lightsaber rings are for schwartz masters only.");
  }

  /*
   此外，我们可以执行一个非常强大的实例级权限检查——查看用户是否有能力访问某个类型的特定实例:
   */
  if (currentUser.isPermitted("winnebago:drive:eagle5")) {
    log.info("You are permitted to 'drive' the winnebago with license plate (id) 'eagle5'.  " + "Here are the keys - have fun!");
  } else {
    log.info("Sorry, you aren't allowed to drive the 'eagle5' winnebago!");
  }

  /*
   退出。删除所有标识信息并使其会话无效。
   因为 remember 标示通常使用cookie表示，定向到登陆页面，设置同名cookie且maxAge为0
   */
  currentUser.logout();

  System.exit(0);
}
```

执行后的日志

```
a.s.s.m.AbstractValidatingSessionManager : Enabling session validation scheduler...
t.c.s.ShiroQuickstartApplication         : 获取到正确的值! [conanan]
t.c.s.ShiroQuickstartApplication         : 用户 [lonestarr] 登陆成功.
t.c.s.ShiroQuickstartApplication         : May the Schwartz be with you!
t.c.s.ShiroQuickstartApplication         : You may use a lightsaber ring.  Use it wisely.
t.c.s.ShiroQuickstartApplication         : You are permitted to 'drive' the winnebago with license plate (id) 'eagle5'.  Here are the keys - have fun!
```





## Web 应用程序

::: tip 文档&博客

集成 Shiro 到 SpringBoot 的[官方文档](https://shiro.apache.org/spring-boot.html)。还是用谷歌搜出来的，官方文档没找到入口，👴佛了。[GitHub](https://github.com/apache/shiro) 的 samples 也有详细代码。这篇[博客](https://developer.okta.com/blog/2017/07/13/apache-shiro-spring-boot)也不错。

:::

Shiro 对 Spring web应用程序提供了一流的支持。在 web 应用程序中，所有可访问 Shiro 的 web 请求都必须经过一个**主 Shiro 过滤器**。这个过滤器本身非常强大，允许基于任何 URL 路径表达式执行**自定义过滤器链**。

### 引入依赖

```xml
<dependency>
  <groupId>org.apache.shiro</groupId>
  <artifactId>shiro-spring-boot-web-starter</artifactId>
  <version>1.5.1</version><!--哔了狗，官网文档给的1.5.2-SNAPSHOT但是并没有存入Maven库里-->
</dependency>
```

-   Maven: org.apache.shiro:shiro-cache:1.5.1
-   Maven: org.apache.shiro:shiro-config-core:1.5.1
-   Maven: org.apache.shiro:shiro-config-ogdl:1.5.1
-   Maven: org.apache.shiro:shiro-core:1.5.1
-   Maven: org.apache.shiro:shiro-crypto-cipher:1.5.1
-   Maven: org.apache.shiro:shiro-crypto-core:1.5.1
-   Maven: org.apache.shiro:shiro-crypto-hash:1.5.1
-   Maven: org.apache.shiro:shiro-event:1.5.1
-   Maven: org.apache.shiro:shiro-lang:1.5.1
-   Maven: org.apache.shiro:shiro-spring:1.5.1
-   Maven: org.apache.shiro:shiro-web:1.5.1
-   Maven: org.apache.shiro:shiro-spring-boot-starter:1.5.1



### 提供 Realm 实现

**具体Realm实现需要重写一个类，且需将其Bean放入配置类中**

```java
/**
 * AuthorizingRealm 继承了顶级抽象类 AuthenticatingRealm（仅用于登陆认证）
 */
public class UserRealm extends AuthorizingRealm {

    /**
     * 认证
     *
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("认证，详细见认证步骤");

        return null;
    }

    /**
     * 授权
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("授权");
        return null;
    }


}
```

如果未定义`Realm` bean，则默认情况下，`ShiroAutoConfiguration`将提供`IniRealm`实现，该实现期望在`src/main/resources`或`src/main/resources/META-INF`中找到`shiro.ini`文件。



### ShiroFilterChainDefinition

**可写在一个配置类中**

它将把任何应用程序特定的路径**映射到给定的过滤器**，以允许**不同的路径不同级别的访问**。

```java
@Bean
public ShiroFilterChainDefinition shiroFilterChainDefinition() {
    DefaultShiroFilterChainDefinition chainDefinition = new DefaultShiroFilterChainDefinition();
    
    // logged in users with the 'admin' role
    chainDefinition.addPathDefinition("/admin/**", "authc, roles[admin]");
    
    // logged in users with the 'document:read' permission
    chainDefinition.addPathDefinition("/docs/**", "authc, perms[document:read]");
    
    // all other paths require a logged in user
    chainDefinition.addPathDefinition("/**", "authc");
    return chainDefinition;
}
```

如果我们不定义一个ShiroFilterChainDefinition bean，那么框架将保护所有路径并将登录URL设置为login.jsp。我们可以通过向application.yml 中添加以下条目来更改这个默认的登录URL和其他默认值

```yaml
shiro:
  loginUrl: /login.html
  successUrl: /index.html
  unauthorizedUrl: /login.html
```





### Shiro 注解

在独立应用程序和 web 应用程序中，可以 Shiro 的注释用于安全检查，替代`ShiroFilterChainDefinition`，例如，`@RequiresRoles`、`@requirespermission`等，这些注释在上述两个启动程序中都是自动启用的。只需注释您的方法以便使用它们。

```java
@RequiresPermissions("document:read")
public void readDocument() {
    // ...
}
```

Shiro 注解完全支持在`@Controller`类中使用

```java
@Controller
public class AccountInfoController {

    @RequiresRoles("admin")
    @RequestMapping("/admin/config")
    public String adminConfig(Model model) {
        return "view";
    }
}
```

`ShiroFilterChainDefinition` bean仍然需要至少一个定义才能工作，二选一：要么配置所有路径为可通过`anon`过滤器访问，要么配置一个过滤器为允许模式，例如`authcBasic[per]`。

```java
@Bean
public ShiroFilterChainDefinition shiroFilterChainDefinition() {
    DefaultShiroFilterChainDefinition chainDefinition = new DefaultShiroFilterChainDefinition();
    // logged in users with the 'admin' role
    chainDefinition.addPathDefinition("/admin/**", "authc, roles[admin]");
    
    // logged in users with the 'document:read' permission
    chainDefinition.addPathDefinition("/docs/**", "authc, perms[document:read]");
    
    // all other paths require a logged in user
    chainDefinition.addPathDefinition("/**", "authc");
    return chainDefinition;
}
```





## 独立应用程序—☠️

### 引入依赖

```xml
<dependency>
  <groupId>org.apache.shiro</groupId>
  <artifactId>shiro-spring-boot-starter</artifactId>
  <version>1.5.1</version><!--哔了狗，官网文档给的1.5.2-SNAPSHOT但是并没有存入Maven库里-->
</dependency>
```



### 自定义 Realm 类

使用`shiro-spring-boot-starter`剩下的惟一工作就是配置一个Realm

```java
@Bean
public Realm realm() {
  // ...
}
```

设置Shiro的最简单的方法，这样所有的`SecurityUtils.*`方法在所有情况下都能工作，就是使`SecurityManager` bean成为一个静态单例。不要在web应用程序中这样做——请参阅上面的web应用程序部分。

```java
@Autowired
private SecurityManager securityManager;
    
 @PostConstruct
 private void initStaticSecurityManager() {
     SecurityUtils.setSecurityManager(securityManager);
 }
```

其他自己看文档





## 过滤器

查看`org.apache.shiro.web.filter.mgt.DefaultFilter`该枚举

```java
public enum DefaultFilter {

  anon(AnonymousFilter.class),
  authc(FormAuthenticationFilter.class),
  authcBasic(BasicHttpAuthenticationFilter.class),
  authcBearer(BearerHttpAuthenticationFilter.class),
  logout(LogoutFilter.class),
  noSessionCreation(NoSessionCreationFilter.class),
  perms(PermissionsAuthorizationFilter.class),
  port(PortFilter.class),
  rest(HttpMethodPermissionFilter.class),
  roles(RolesAuthorizationFilter.class),
  ssl(SslFilter.class),
  user(UserFilter.class);
  // ...
}
```

### anon 🔥

**无需执行任何类型的安全性检查即可直接访问路径的筛选器。**

此过滤器主要在**排除策略**中有用，在该策略中，您已定义了url模式以要求一定的安全级别，但也许该模式中仅URL的子集应允许任何访问。例如，如果您有网站的仅用户部分，则可能需要要求该部分中的任何URL访问都必须来自经过身份验证的用户。

这是IniShiroFilter配置

```
[urls] 
/user/** = authc
```

但是，如果您希望`/user/signup/**`对任何人都可用，则必须排除该路径，因为它是上述IniShiroFilter配置的路径的子集。

```
/user/signup/** = anon
/user/** = authc
```





### authc 🔥

要求**对请求用户进行身份验证**以使请求继续，如果未通过，则通过将用户重定向到您配置的`loginUrl`来强制用户登录。

此过滤器构造一个UsernamePasswordToken，其中包含在username，password和RememberMe请求参数中找到的值。
然后，它调用Subject.login（usernamePasswordToken），有效地自动执行登录尝试。
请注意，仅当isLoginSubmission（request，response）为true时，才会尝试登录，默认情况下，当请求是针对loginUrl且为POST请求时，才会尝试登录。


如果登录失败，则将在AuthenticationKey属性项下将得到的AuthenticationException完全限定的类名设置为请求属性。
该FQCN可用作i18n键或查找机制，以向用户解释其登录尝试失败的原因（例如，无帐户，密码错误等）。

如果您希望处理身份验证验证并使用自己的代码登录，请考虑改用PassThruAuthenticationFilter，它允许对loginUrl的请求直接传递到应用程序的代码。



### perms 🔥

如果当前用户具有映射值指定的权限，则允许访问的过滤器；如果用户没有指定所有权限，则拒绝访问的过滤器。推荐！



### roles

如果当前用户具有映射值指定的角色，则允许访问的过滤器；如果用户没有指定所有角色，则拒绝访问的过滤器。但不推荐！



### logout 🔥

简单过滤器，接收到请求后，将立即注销当前正在执行的 `Subject`，然后将其重定向到已配置的 `redirectUrl`。



### rest 🔥

一个过滤器，它将HTTP请求的方法（例如GET，POST等）转换为相应的动作（动词），并使用该动词来构造将被检查以确定访问权限的权限。提供此过滤器主要是为了支持REST环境，在该环境中，请求的类型（方法）转换为对一个或多个资源执行的操作。此范例与Shiro的使用权限进行访问控制的概念很好地配合使用，可以轻松地执行权限检查。

该过滤器的功能如下：

1.  发现传入的HTTP请求的方法（GET，POST，PUT，DELETE等）。

2.  该方法被翻译成更“易于应用”的动词，例如“创建”，“编辑”，“删除”等。

3.  该动词将附加到当前匹配路径的任何已配置权限。

4.  如果当前的Subject被允许执行已解决的操作，则允许请求继续。

例如，如果定义了以下过滤器链，“rest”是赋予该类的过滤器实例的名称：

```
/user/** = rest[user]
```

然后，对`/user/1234`的 HTTP GET请求将转换为构造的权限`user:read`（GET 映射到 read 操作）并执行权限检查`Subject.isPermitted("user:read")`以便允许请求继续。

同样，到`/user`的HTTP POST会转换为构造的权限`user:create`（POST 映射到 create 操作）并执行权限检查`Subject.isPermitted("user:create")`以便允许请求继续。

以下为映射方法：

| HTTP Method | Mapped Action | Example Permission | Runtime Check |
| ----------- | ------------- | ------------------ | ------------- |
| head        | read          | perm1              | perm1:read    |
| get         | read          | perm2              | perm2:read    |
| put         | update        | perm3              | perm3:update  |
| post        | create        | perm4              | perm4:create  |
| delete      | delete        | perm5              | perm5:delete  |
| mkcol       | create        | perm6              | perm6:create  |
| options     | read          | perm7              | perm7:read    |
| trace       | read          | perm8              | perm8:read    |



### user

如果访问者是已知用户（定义为具有已知 principal），则允许访问资源的过滤器。这意味着将允许通过“**记住我**”功能通过身份验证或记住的任何用户访问此过滤器。如果访问者不是已知用户，那么他们将被重定向到 `loginUrl`



### authcBasic 🔥

要求对请求用户进行身份验证以使请求继续，否则，要求用户通过特定于HTTP Basic协议的质询登录。成功登录后，允许他们继续访问请求的资源/ URL。


此实现是RFC 2617中基本HTTP身份验证规范的“clean room” Java实现。


基本身份验证功能如下：

1.  要求提供需要身份验证的资源。

2.  服务器以401响应状态答复，设置WWW-Authenticate标头，并通知用户输入资源需要认证的页面内容。

3.  从服务器收到此WWW-Authenticate质询后，客户端将采用用户名和密码，并将其设置为以下格式：`username:password`

4.  然后，此令牌以base 64编码。

5.  然后，客户端使用以下 header 发送对同一资源的另一个请求：

    ```
    Authorization: Basic
    Base64_encoded_username_and_password
    ```

仅当发出请求的主题未通过身份验证时，才会调用onAccessDenied（ServletRequest，ServletResponse）方法



### authcBearer

要求对请求用户进行身份验证以使请求继续，否则，要求用户通过特定于HTTP Bearer协议的质询登录。
成功登录后，允许他们继续访问请求的资源/ URL。



### noSessionCreation

一个PathMatchingFilter，它将在请求期间禁止创建新的会话。这是一个有用的过滤器，可以放置在任何过滤器链的前面，这些过滤器链可能会导致REST，SOAP或其他不打算参与会话的服务调用。


此筛选器启用以下行为：

1.  如果在调用此过滤器时某个Subject还没有Session，则此过滤器将有效地禁用对subject.getSession（）和subject.getSession（true）的所有调用。如果在请求期间调用了任何一个，则将引发异常。

2.  但是，如果 Subject 在调用此过滤器之前已经具有关联的会话，要么是因为它是在应用程序的另一部分中创建的，要么是在创建的链中更高的过滤器，则此过滤器无效。

最后，对subject.getSession（false）的调用将不受影响，并且在所有情况下都可以在不受到影响的情况下进行调用。



### port

要求请求位于特定端口上的过滤器，如果没有，则重定向到该端口上的相同URL。

示例配置

```
[filters]
port.port = 80
```

```
[urls]
/some/path/** = port
# override for just this path:
/another/path/** = port[8080]
```



### ssl

要求通过SSL进行请求的过滤器。如果在已配置的服务器端口和`request.isSecure()`上收到请求，则允许访问。
如果任一条件为假，则过滤器链将不会继续。端口属性默认为443，并且还保证请求方案始终为“ https”（端口80除外，端口80保留了“ http”方案）。

示例配置

```
[urls]
/secure/path/** = ssl
```





## Tag

参考[文档](https://shiro.apache.org/web.html#Web-JSP%2FGSPTagLibrary)，介绍的很详细







## Caching

启用缓存只需提供 `CacheManager` bean

```java
@Bean
protected CacheManager cacheManager() {
    return new MemoryConstrainedCacheManager();
}
```





## Configuration Properties

| Key                                               | Default Value | Description                                                  |
| :------------------------------------------------ | :------------ | :----------------------------------------------------------- |
| shiro.enabled                                     | `true`        | Enables Shiro’s Spring module                                |
| shiro.web.enabled                                 | `true`        | Enables Shiro’s Spring web module                            |
| shiro.annotations.enabled                         | `true`        | Enables Spring support for Shiro’s annotations               |
| shiro.sessionManager.deleteInvalidSessions        | `true`        | Remove invalid session from session storage                  |
| shiro.sessionManager.sessionIdCookieEnabled       | `true`        | Enable session ID to cookie, for session tracking            |
| shiro.sessionManager.sessionIdUrlRewritingEnabled | `true`        | Enable session URL rewriting support                         |
| shiro.userNativeSessionManager                    | `false`       | If enabled Shiro will manage the HTTP sessions instead of the container |
| shiro.sessionManager.cookie.name                  | `JSESSIONID`  | Session cookie name                                          |
| **shiro.sessionManager.cookie.maxAge**            | `-1`          | Session cookie max age                                       |
| **shiro.sessionManager.cookie.domain**            | null          | Session cookie domain                                        |
| **shiro.sessionManager.cookie.path**              | null          | Session cookie path                                          |
| shiro.sessionManager.cookie.secure                | `false`       | Session cookie secure flag                                   |
| **shiro.rememberMeManager.cookie.name**           | `rememberMe`  | RememberMe cookie name                                       |
| **shiro.rememberMeManager.cookie.maxAge**         | one year      | RememberMe cookie max age                                    |
| **shiro.rememberMeManager.cookie.domain**         | null          | RememberMe cookie domain                                     |
| **shiro.rememberMeManager.cookie.path**           | null          | RememberMe cookie path                                       |
| **shiro.rememberMeManager.cookie.secure**         | `false`       | RememberMe cookie secure flag                                |
| **shiro.loginUrl**                                | `/login.jsp`  | Login URL used when unauthenticated users are redirected to login page |
| **shiro.successUrl**                              | `/`           | Default landing page after a user logs in (if alternative cannot be found in the current session) |
| **shiro.unauthorizedUrl**                         | null          | Page to redirect user to if they are unauthorized (403 page) |