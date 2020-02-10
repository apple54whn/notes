# 跨源问题

参考该[博客](https://segmentfault.com/a/1190000015597029)，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

::: tip

**同源策略**限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于**隔离潜在恶意文件**的重要**安全机制**。

:::

## 同源

### 简介

如果两个页面的**协议**，**端口**（如果有指定）和**主机**都相同，则两个页面具有相同的**源**。我们也可以把它称为“协议/主机/端口 tuple”，或简单地叫做“**tuple**"。（"tuple" ，“元”，是指一些事物组合在一起形成一个整体，比如 (1,2) 叫二元，(1,2,3) 叫三元）。

下表给出了相对`http://store.company.com/dir/page.html`同源检测的示例:

| URL                                               | 结果 | 原因                           |
| :------------------------------------------------ | :--- | :----------------------------- |
| `http://store.company.com/dir2/other.html`        | 成功 | 只有路径不同                   |
| `http://store.company.com/dir/inner/another.html` | 成功 | 只有路径不同                   |
| `https://store.company.com/secure.html`           | 失败 | 不同协议 ( https和http )       |
| `http://store.company.com:81/dir/etc.html`        | 失败 | 不同端口 ( http:// 80是默认的) |
| `http://news.company.com/dir/other.html`          | 失败 | 不同域名 ( news和store )       |

另请参见[文件的源定义: URLs](https://developer.mozilla.org/en-US/docs/Same-origin_policy_for_file:_URIs).



### 源的继承

在页面中用 `about:blank` 或 `javascript:` URL 执行的脚本会**继承打开该 URL 的文档的源**，因为这些类型的 URLs 没有明确包含有关原始服务器的信息。

例如，`about:blank` 通常作为父脚本写入内容的新的空白弹出窗口的 URL（例如，通过 [Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 机制）。 如果此弹出窗口也包含代码，则该代码将继承与创建它的脚本相同的源。





## **源**的更改

页面可能会因某些限制而改变他的源。脚本可以将 `document.domain` 的值设置为其当前域或其当前域的父域。如果将其设置为其当前域的父域，则这个较短的父域将用于后续源检查。假设 `http://store.company.com/dir/other.html` 文档中的一个脚本执行以下语句：

```js
document.domain = "company.com";
```

这条语句执行之后，页面将会成功地通过对 `http://company.com/dir/page.html` 的同源检测（假设`http://company.com/dir/page.html` 将其 `document.domain` 设置为“`company.com`”，以表明它希望允许这样做 ）。但是`company.com` 不能设置 `document.domain` 为 `othercompany.com`，因为它不是 `company.com` 的父域。

::: warning 

使用 `document.domain` 来允许子域安全访问其父域时，您需要在父域和子域中设置 document.domain 为相同的值。这是必要的，即使这样做只是将父域设置回其原始值。不这样做可能会导致权限错误。

:::



## 跨源网络访问

同源策略控制了不同源之间的交互，例如在使用`XMLHttpRequest` 或 `<img>` 标签时则会受到同源策略的约束。这些交互通常分为三类：

*   通常允许跨域**写**操作（Cross-origin writes）。例如链接（links），重定向以及表单提交。特定少数的HTTP请求需要添加 preflight。
*   通常允许跨域资源**嵌入**（Cross-origin embedding）。之后下面会举例说明。
*   通常不允许跨域**读**操作（Cross-origin reads）。但常可以通过内嵌资源来巧妙的进行读取访问。例如可以读取嵌入图片的高度和宽度，调用内嵌脚本的方法，或availability of an embedded resource.

以下是可能嵌入跨源的资源的一些示例：

-   `<script src="..."></script>` 标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。
-   `<link rel="stylesheet" href="...">`标签嵌入CSS。由于CSS的[松散的语法规则](http://scarybeastsecurity.blogspot.dk/2009/12/generic-cross-browser-cross-domain.html)，CSS的跨域需要一个设置正确的`Content-Type` 消息头。不同浏览器有不同的限制： [IE](http://msdn.microsoft.com/zh-CN/library/ie/gg622939(v=vs.85).aspx), [Firefox](http://www.mozilla.org/security/announce/2010/mfsa2010-46.html), [Chrome](http://code.google.com/p/chromium/issues/detail?id=9877), [Safari](http://support.apple.com/kb/HT4070) (跳至CVE-2010-0051)部分 和 [Opera](http://www.opera.com/support/kb/view/943/)。
-   `<img>`嵌入图片。支持的图片格式包括PNG,JPEG,GIF,BMP,SVG,...
-   



## 浏览器的同源策略





## 全局配置

```java
@SpringBootApplication
@MapperScan("com.tensquare.article.mapper")
public class ArticleApplication {

  public static void main(String[] args) {
    SpringApplication.run(ArticleApplication.class, args);
  }

  /**
     * 对指定的 path 模式启用跨域请求处理。
     * 支持精确的 path 映射URIs（例如"/admin"）以及 Ant-style 的路径模式（例如"/admin /**"）。
     * 以下默认值应用于 CorsRegistration:
     * Allow all origins.
     * Allow "simple" methods GET, HEAD and POST.
     * Allow all headers.
     * Allow all credentials（证书）.
     * Set max age to 1800 seconds (30 minutes).
     */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
          .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS");// 可直接设置为"*"
        // .allowedOrigins("*")// 默认所有 origins 都被允许
        // .allowCredentials(true)
        // .allowedHeaders("*")
        // .exposedHeaders()// 默认不设置，且不能使用"*"
        // .maxAge(1800);
      }
    };
  }
}
```



## @CrossOrigin

使用@CrossOrigin注解即可，其余参数配置和全局配置一致