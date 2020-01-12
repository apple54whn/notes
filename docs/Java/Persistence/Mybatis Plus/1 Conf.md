# 1 配置

>   本部分配置包含了大部分用户的常用配置，其中一部分为 MyBatis 原生所支持的配置。MP 版本为3.3.0

只记录 Spring Boot 的配置，其他查看官方文档。基本方式如下：

```yaml
mybatis-plus:
  ......
  config-location: 
  configuration:
    ......
  	global-config:
    ......
    db-config:
      ......  
```

如下配置按照层级来记录，具体配置名称会添加`-`

## configLocation✨

-   类型：`String`
-   默认值：`null`

MyBatis 配置文件位置，如果您有单独的 MyBatis 配置，请将其路径配置到 `configLocation` 中，具体参考[MyBatis 文档](http://www.mybatis.org/mybatis-3/zh/configuration.html)



## checkConfigLocation✨

>   Spring Boot Only

-   类型：`boolean`
-   默认值：`false`

启动时是否检查 MyBatis XML 文件的存在，默认不检查

## mapperLocations🔥

-   类型：`String[]`
-   默认值：`[]`

MyBatis Mapper 所对应的 XML 文件位置，如果您在 Mapper 中有自定义方法(XML 中有自定义实现)，需要进行该配置，告诉 Mapper 所对应的 XML 文件位置

>   Maven 多模块项目的扫描路径需以 `classpath*:` 开头 （即加载多个 jar 包下的 XML 文件）



## typeAliasesPackage🔥

-   类型：`String`
-   默认值：`null`

MyBaits 别名包扫描路径，通过该属性可以给包中的**domain类注册别名**，注册后在 Mapper 对应的 XML 文件中可以直接使用类名，而不用使用全限定的类名(即 XML 中调用的时候不用包含包名)



## typeAliasesSuperType

-   类型：`Class`
-   默认值：`null`

该配置请和 [typeAliasesPackage](#typealiasespackage🔥) 一起使用，如果配置了该属性，则仅仅会扫描路径下以该类作为父类的域对象



## typeHandlersPackage

-   类型：`String`
-   默认值：`null`

TypeHandler 扫描路径，如果配置了该属性，SqlSessionFactoryBean 会把该包下面的类注册为对应的 TypeHandler

>   TypeHandler 通常用于自定义类型转换。



## typeEnumsPackage✨

-   类型：`String`
-   默认值：`null`

枚举类扫描路径，如果配置了该属性，会将路径下的枚举类进行注入，让实体类字段能够简单快捷的使用枚举属性



## executorType✨

>   Spring Boot Only

-   类型：`ExecutorType`
-   默认值：`simple`

通过该属性可指定 MyBatis 的执行器，MyBatis 的执行器总共有三种：

-   ExecutorType.SIMPLE：该执行器类型不做特殊的事情，为每个语句的执行创建一个新的预处理语句（PreparedStatement）
-   ExecutorType.REUSE：该执行器类型会复用预处理语句（PreparedStatement）
-   ExecutorType.BATCH：该执行器类型会批量执行所有的更新语句



## configurationProperties✨

-   类型：`Properties`
-   默认值：`null`

指定外部化 MyBatis Properties 配置，通过该配置可以**抽离配置，实现不同环境的配置部署**



## configuration✨原生

-   类型：`Configuration`
-   默认值：`null`

本部分（Configuration）的配置大都为 MyBatis 原生支持的配置，这意味着您可以通过 MyBatis XML 配置文件的形式进行配置。

### mapUnderscoreToCamelCase🔥

-   类型：`boolean`
-   默认值：`true`

是否开启自动驼峰命名规则（camel case）映射，即从经典数据库列名 A_COLUMN（下划线命名） 到经典 Java 属性名 aColumn（驼峰命名） 的类似映射。

>   注意
>
>   此属性**在 MyBatis 中原默认值为 false**，**在 MyBatis-Plus 中为 true**，此属性也将用于生成最终的 SQL 的 select body
>
>   如果您的数据库命名符合规则无需使用 `@TableField` 注解指定数据库字段名



### cacheEnabled🔥

*   类型：`boolean`
*   默认值：`true`

是否开启二级缓存，Mybatis 和 MP 默认都为 true



### defaultEnumTypeHandler

-   类型：`Class`
-   默认值：`org.apache.ibatis.type.EnumTypeHandler`

默认枚举处理类,如果配置了该属性,枚举将统一使用指定处理器进行处理

>   -   org.apache.ibatis.type.EnumTypeHandler : 存储枚举的名称
>   -   org.apache.ibatis.type.EnumOrdinalTypeHandler : 存储枚举的索引
>   -   com.baomidou.mybatisplus.extension.handlers.MybatisEnumTypeHandler : 枚举类需要实现IEnum接口或字段标记@EnumValue注解.(3.1.2以下版本为EnumTypeHandler)
>   -   com.baomidou.mybatisplus.extension.handlers.EnumAnnotationTypeHandler: 枚举类字段需要标记@EnumValue注解



### aggressiveLazyLoading

-   类型：`boolean`
-   默认值：`true`

当设置为 true 的时候，懒加载的对象可能被任何懒属性全部加载，否则，每个属性都按需加载。需要和 [lazyLoadingEnabled](https://mybatis.plus/config/) 一起使用。



### autoMappingBehavior✨

-   类型：`AutoMappingBehavior`
-   默认值：`partial`

MyBatis 自动映射策略，通过该配置可指定 MyBatis 是否并且如何来自动映射数据表字段与对象的属性，总共有 3 种可选值：

-   AutoMappingBehavior.NONE：不启用自动映射
-   AutoMappingBehavior.PARTIAL：只对非嵌套的 resultMap 进行自动映射
-   AutoMappingBehavior.FULL：对所有的 resultMap 都进行自动映射



### autoMappingUnknownColumnBehavior

-   类型：`AutoMappingUnknownColumnBehavior`
-   默认值：`NONE`

MyBatis 自动映射时未知列或未知属性处理策略，通过该配置可指定 MyBatis 在自动映射过程中遇到未知列或者未知属性时如何处理，总共有 3 种可选值：

-   AutoMappingUnknownColumnBehavior.NONE：不做任何处理 (默认值)
-   AutoMappingUnknownColumnBehavior.WARNING：以日志的形式打印相关警告信息
-   AutoMappingUnknownColumnBehavior.FAILING：当作映射失败处理，并抛出异常和详细信息



### callSettersOnNulls

-   类型：`boolean`
-   默认值：`false`

指定当结果集中值为 null 的时候是否调用映射对象的 Setter（Map 对象时为 put）方法，通常运用于有 Map.keySet() 依赖或 null 值初始化的情况。

通俗的讲，即 MyBatis 在使用 resultMap 来映射查询结果中的列，如果查询结果中包含空值的列，则 MyBatis 在映射的时候，不会映射这个字段，这就导致在调用到该字段的时候由于没有映射，取不到而报空指针异常。

当您遇到类似的情况，请针对该属性进行相关配置以解决以上问题。

>   基本类型（int、boolean 等）是不能设置成 null 的。



### configurationFactory

-   类型：`Class`
-   默认值：`null`

指定一个提供 Configuration 实例的工厂类。该工厂生产的实例将用来加载已经被反序列化对象的懒加载属性值，其必须包含一个签名方法`static Configuration getConfiguration()`。（从 3.2.3 版本开始）



## globalConfig✨MP

-   类型：`GlobalConfig`
-   默认值：`null`

MyBatis-Plus 全局策略配置。

### banner✨

-   类型：`boolean`
-   默认值：`true`

是否控制台 print mybatis-plus 的 LOGO



### sqlParserCache(☠️3.1.1)

Deprecated 3.1.1,直接开启缓存

-   类型：`boolean`
-   默认值：`false`

是否缓存 Sql 解析，默认不缓存



### workerId✨

-   类型：`Long`
-   默认值：`null`

机器 ID 部分(影响雪花ID)



### datacenterId✨

-   类型：`Long`
-   默认值：`null`

数据标识 ID 部分(影响雪花ID)(workerId 和 datacenterId 一起配置才能重新初始化 Sequence)



### enableSqlRunner

-   类型：`boolean`
-   默认值：`false`

是否初始化 SqlRunner(com.baomidou.mybatisplus.extension.toolkit.SqlRunner)



### sqlInjector

-   类型：`com.baomidou.mybatisplus.core.injector.ISqlInjector`
-   默认值：`com.baomidou.mybatisplus.core.injector.DefaultSqlInjector`

SQL注入器(starter 下支持`@bean`注入)



### superMapperClass

-   类型：`Class`
-   默认值：`com.baomidou.mybatisplus.core.mapper.Mapper.class`

通用Mapper父类(影响sqlInjector,只有这个的子类的 mapper 才会注入 sqlInjector 内的 method)



### metaObjectHandler

-   类型：`com.baomidou.mybatisplus.core.handlers.MetaObjectHandler`
-   默认值：`null`

元对象字段填充控制器(starter 下支持`@bean`注入)



### idGenerator✨(since 3.2.1)

-   类型：`com.baomidou.mybatisplus.core.incrementer.IdGenerator`
-   默认值：`null`

Id生成器(starter 下支持`@bean`注入)



### dbConfig

-   类型：`com.baomidou.mybatisplus.annotation.DbConfig`
-   默认值：`null`

MyBatis-Plus 全局策略中的 DB 策略配置，见[dbConfig](#dbconfig)



## - dbConfig🔥MP-DB

###  idType🔥

-   类型：`com.baomidou.mybatisplus.annotation.IdType`
-   默认值：`ID_WORKER`

**全局默认主键类型**，不用在每个属性上添加注解



###  tablePrefix🔥

-   类型：`String`
-   默认值：`null`

**表名前缀**，省区每个实体类中添加注解，如`User`->`tb_user`



### schema🔥(since 3.1.1)

-   类型：`String`
-   默认值：`null`

schema



###  columnFormat🔥(since 3.1.1)

-   类型：`String`
-   默认值：`null`

字段 format(since 3.1.1),例: `%s`,(对主键无效)



###  tableUnderline🔥

-   类型：`boolean`
-   默认值：`true`

表名、是否使用下划线命名，默认数据库表使用下划线命名



### capitalMode

-   类型：`boolean`
-   默认值：`false`

是否开启大写命名，默认不开启



### keyGenerator🔥

-   类型：`com.baomidou.mybatisplus.core.incrementer.IKeyGenerator`
-   默认值：`null`

表主键生成器(starter 下支持`@bean`注入)



### logicDeleteValue🔥

-   类型：`String`
-   默认值：`1`

逻辑已删除值,([逻辑删除](https://mybatis.plus/guide/logic-delete.html)下有效)



### logicNotDeleteValue🔥

-   类型：`String`
-   默认值：`0`

逻辑未删除值,([逻辑删除](https://mybatis.plus/guide/logic-delete.html)下有效)



### insertStrategy🔥(since 3.1.2)

-   类型：`com.baomidou.mybatisplus.annotation.FieldStrategy`
-   默认值：`NOT_NULL`

字段验证策略之 insert

>   说明:
>
>   在 insert 的时候的字段验证策略 目前没有默认值,等 {@link #fieldStrategy} 完全去除掉,会给个默认值 NOT_NULL 没配则按 {@link #fieldStrategy} 为准



### updateStrategy🔥(since 3.1.2)

-   类型：`com.baomidou.mybatisplus.annotation.FieldStrategy`
-   默认值：`NOT_NULL`

字段验证策略之 update

>   说明:
>
>   在 update 的时候的字段验证策略 目前没有默认值,等 {@link #fieldStrategy} 完全去除掉,会给个默认值 NOT_NULL 没配则按 {@link #fieldStrategy} 为准



### selectStrategy🔥(since 3.1.2)

-   类型：`com.baomidou.mybatisplus.annotation.FieldStrategy`
-   默认值：`NOT_NULL`

字段验证策略之 select

>   说明:
>
>   在 select 的时候的字段验证策略: wrapper 根据内部 entity 生成的 where 条件 目前没有默认值,等 {@link #fieldStrategy} 完全去除掉,会给个默认值 NOT_NULL 没配则按 {@link #fieldStrategy} 为准

