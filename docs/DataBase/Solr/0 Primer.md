# Primer

大多数搜索引擎应用都必须具有某种搜索功能，问题是搜索功能往往是巨大的资源消耗，并且它们由于沉重的数据库加载而拖垮你的应用的性能。这就是为什么转移负载到一个**外部的搜索服务器**是一个不错的主意，**Apache Solr**是一个流行的开源搜索服务器，它通过使用类似**REST的HTTP API**，这就确保你能从几乎==**任何编程语言来使用solr**==。

​	Solr是一个**开源**搜索平台，用于**构建搜索应用程序**。 它建立在[Lucene](http://www.yiibai.com/lucene/)(全文搜索引擎)之上。 Solr是企业级的、快速的和高度可扩展的。 使用Solr构建的应用程序非常复杂，可提供高性能。

​	为了在CNET网络的公司网站上添加搜索功能，Yonik Seely于2004年创建了Solr。并在2006年1月，它成为Apache软件基金会下的一个开源项目。并于2016年发布最新版本Solr 6.0，支持并行SQL查询的执行。

​	**Solr可以和[Hadoop](http://www.yiibai.com/hadoop/)一起使用**。由于Hadoop处理大量数据，Solr帮助我们从这么大的源中找到所需的信息。不仅限于搜索，**Solr也可以用于存储**目的。像其他**NoSQL**数据库一样，它是一种非关系数据存储和处理技术。

​	总之，Solr是一个**可扩展**的，**可部署**，**搜索/存储引擎**，优化搜索**大量以文本为中心的数据**。



## 环境搭建

### 安装

1. 安装 Tomcat（解压即可）

2. 解压 solr

3. 把 solr 下的dist目录`solr-4.10.3.war`部署到 `Tomcat\webapps`下(去掉版本号)

4. 启动 Tomcat，自动解压缩 war 包

5. 把solr下example/lib/ext 目录下的所有的 jar 包，添加到 solr 的工程中(\WEB-INF\lib目录下)

6. solrhome，solr 下的/example/solr 目录就是一个 solrhome。复制此目录到如D盘并改名为solrhome（存储数据）

7. 关联 solr 及 solrhome。需要修改 solr 工程的 web.xml 文件

    ```xml
    <env-entry>
        <env-entry-name>solr/home</env-entry-name>
        <env-entry-value>d:\solrhome</env-entry-value>
        <env-entry-type>java.lang.String</env-entry-type>
    </env-entry>
    ```

8. 重新启动该Tomcat，访问`http://localhost:8080/solr/`即可看到界面，可以查询、分析



### 中文分析器 IK Analyzer

> IK Analyzer 是一个开源的，基亍 java 语言开发的轻量级的中文分词工具包。从 2006年 12 月推出 1.0 版开始，IKAnalyzer 已经推出了 4 个大版本。最初，它是以开源项目Luence 为应用主体的，结合词典分词和文法分析算法的中文分词组件。3.0 版本开始，IK 发展为面向 Java 的公用分词组件，独立于 Lucene 项目，同时提供了对 Lucene 的默认优化实现。在 2012 版本中，IK 实现了简单的分词歧义排除算法，标志着 IK 分词器从单纯的词典分词向模拟语义分词衍化

IK Analyzer配置：

1. 把IKAnalyzer2012FF_u1.jar 添加到 solr 工程的 lib 目录下

2. 创建WEB-INF/classes文件夹，把扩展词典、停用词词典（辅助词或敏感词）、配置文件放到 solr 工程的 WEB-INF/classes 目录下

3. 修改 Solrhome 的 schema.xml 文件，配置一个 FieldType，使用 IKAnalyzer来做中文分析器

    ```xml
    <fieldType name="text_ik" class="solr.TextField">
        <analyzer class="org.wltea.analyzer.lucene.IKAnalyzer"/>
    </fieldType>
    ```



### 配置域

域相当于数据库的表字段，用户存放数据，因此用户根据业务需要去定义相关的Field（域），一般来说，每一种对应着一种数据，用户对同一种数据进行相同的操作。域的常用属性：

- name：指定域的名称
- type：指定域的类型
- indexed：是否索引（要搜索的域）
- stored：是否存储
- required：是否必须
- multiValued：是否多值

#### 基本域

修改solrhome的`schema.xml`文件，设置业务系统 Field。根据搜索的、被搜索出的、要用到的Field来配置

```xml
<field name="item_goodsid" type="long" indexed="true" stored="true"/> <!--goodsId,商品SKU。这些都是item表数据-->
<field name="item_title" type="text_ik" indexed="true" stored="true"/><!--title,商品标题-->
<field name="item_price" type="double" indexed="true" stored="true"/><!--price,商品价格-->
<field name="item_image" type="string" indexed="false" stored="true" /><!--image,商品图片地址-->
<field name="item_category" type="string" indexed="true" stored="true" /><!--category,商品分类-->
<field name="item_seller" type="text_ik" indexed="true" stored="true" /><!--seller,商家-->
<field name="item_brand" type="string" indexed="true" stored="true" /><!--brand,品牌-->
<!--后添加的-->
<field name="item_updatetime" type="date" indexed="true" stored="true" /><!--updatetime,上架时间-->
```

#### 复制域

多条件查询时（同时输入标题、分类、商家、品牌），复制域的作用在于将某一个Field中的数据复制到另一个域中，不需要存储

```xml
<field name="item_keywords" type="text_ik" indexed="true" stored="false" multiValued="true"/>
<copyField source="item_title" dest="item_keywords"/>
<copyField source="item_category" dest="item_keywords"/>
<copyField source="item_seller" dest="item_keywords"/>
<copyField source="item_brand" dest="item_keywords"/>
```

#### 动态域

当我们需要动态扩充字段时，我们需要使用动态域。对于品优购，规格的值是不确定的，所以我们需要使用动态域来实现。需要实现的效果如下：

![1548005515777](./images/1548005515777.png)

```xml
<dynamicField name="item_spec_*" type="string" indexed="true" stored="true" />	
```





## Spring Data Solr 入门

Spring Data Solr就是为了方便Solr的开发所研制的一个框架，其底层是对SolrJ（官方API）的封装。

> 官方类库 SolrJ：原理是**RESTful的HTTP请求和响应**
>
> Spring Data Solr：是对SolrJ的封装
>
> 也可不使用上述工具，手动请求Solr，手动处理响应，httpClient

### 环境搭建

- Maven依赖

    ```xml
    <dependency>
        <groupId>org.springframework.data</groupId>
        <artifactId>spring-data-solr</artifactId>
        <version>1.5.5.RELEASE</version>
    </dependency>
    <!--Demo中还会用到JUnit和Spring与JUnit整合-->
    ```

- resources下创建`applicationContext-solr.xml`

    ```xml
    <!-- solr服务器地址，其实就是配置了一个bean -->
    <solr:solr-server id="solrServer" url="http://127.0.0.1:8080/solr" />
    
    <!-- solr模板，使用solr模板可对索引库进行CRUD的操作 -->
    <bean id="solrTemplate" class="org.springframework.data.solr.core.SolrTemplate">
        <constructor-arg ref="solrServer" />
    </bean>
    
    ```



###  `@Field` 、`@Dynamic`注解

> `@Field`是Solr官方的SolrJ提供的注解，`@Dynamic`是SpringDataSolr的注解

创建 cn.itcast.pojo 包，将品优购的TbItem实体类拷入本工程，属性（即Field域）使用`@Field`注解标识。如果属性与配置文件定义的域名称不一致，需要在注解中指定域名称。（上面Solr中基本域配置和这个对应，复制域不需要，动态域后面讲）

```java
public class TbItem implements Serializable{
    
    @Dynamic
    @Field("item_spec_*")
    private Map<String,String> specMap;//动态域，在数据导入时需利用fastJSON转换JSON为map

    @Field
    private Long id;

    @Field("item_title")
    private String title;

    @Field("item_price")
    private BigDecimal price;

    @Field("item_image")
    private String image;

    @Field("item_goodsid")//注意大小写对应solr中配置的基本域
    private Long goodsId;

    @Field("item_category")
    private String category;

    @Field("item_brand")
    private String brand;

    @Field("item_seller")
    private String seller;
    
    @Field("item_updatetime")
    private Date updateTime;//后添加的，排序需要
    .......
}

```



### 增加（修改）

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-solr.xml")//可以省略locations
public class TestTemplate {
    @Autowired
    private SolrTemplate solrTemplate;

    @Test
    public void testAdd(){

        TbItem tbItem = new TbItem();
        tbItem.setId(1L);
        tbItem.setTitle("华为Mate10");
        tbItem.setCategory("手机");
        tbItem.setBrand("华为");
        tbItem.setSeller("华为旗舰店");
        tbItem.setGoodsId(10L);
        tbItem.setPrice(new BigDecimal(4500.00));
        solrTemplate.saveBean(tbItem);//增加；修改时只需对象的id（主键，非空）不变，其他修改后save即可
        //solrTemplate.saveBeans(collection);（可以传递集合）
        solrTemplate.commit();//必须commit
    }
}

```



### 按主键删除

```java
@Test
public void deleteById(){
    solrTemplate.deleteById("1");//自动转换
    solrTemplate.commit();
}

```



### 删除所有（条件）

```java
@Test
public void deleteAll(){
    Query query = new SimpleQuery("*:*");
    solrTemplate.delete(query);
    solrTemplate.commit();
}

```



### 按主键查询

```java
@Test
public void getById(){
    TbItem item = solrTemplate.getById(1L, TbItem.class);
    System.out.println(item.getTitle());
}

```



### 条件查询（含分页查询）

```java
//条件查询
@Test
public void testQuery(){
    Query query = new SimpleQuery("*:*");//查询所有字段所有信息（利用封装好的方法，不用写表达式）
    Criteria criteria = new Criteria("item_category").contains("手机")
        .and("item_title").contains("2");
    query.addCriteria(criteria);

    ScoredPage<TbItem> items = solrTemplate.queryForPage(query, TbItem.class);

    List<TbItem> content = items.getContent();//当前页所有数据
    content.forEach(o-> System.out.println(o.getTitle()+"--"+o.getBrand()+"--"+o.getPrice()));

    System.out.println("总记录数："+items.getTotalElements());
    System.out.println("总页数："+items.getTotalPages());
}


//分页
@Test
public void testQueryPage(){
    Query query = new SimpleQuery("*:*");//查询所有字段所有信息
    query.setOffset(20);//开始索引
    query.setRows(5);//每页记录数
    ScoredPage<TbItem> items = solrTemplate.queryForPage(query, TbItem.class);

    List<TbItem> content = items.getContent();//当前页所有数据
    content.forEach(o-> System.out.println(o.getTitle()+"--"+o.getBrand()+"--"+o.getPrice()));

    System.out.println("总记录数："+items.getTotalElements());
    System.out.println("总页数："+items.getTotalPages());
}


//首先利用saveBeans()方法批量添加数据
@Test
public void testAddList(){
    List<TbItem> list=new ArrayList();

    for(int i=0;i<100;i++){
        TbItem item=new TbItem();
        item.setId(i+1L);
        item.setBrand("华为");
        item.setCategory("手机");
        item.setGoodsId(1L);
        item.setSeller("华为2号专卖店");
        item.setTitle("华为Mate"+i);
        item.setPrice(new BigDecimal(2000+i));
        list.add(item);
    }
    solrTemplate.saveBeans(list);
    solrTemplate.commit();
}
```





## 批量数据导入

> 可以使用Solr自带插件来导入，但不灵活，推荐查询增加的方式，根据条件筛选数据并导入Solr中

```java
//审核通过才导入
TbItemExample example = new TbItemExample();
TbItemExample.Criteria criteria = example.createCriteria();
criteria.andStatusEqualTo("1");

List<TbItem> items = itemMapper.selectByExample(example);
for (TbItem item : items) {
    Map specMap = JSON.parseObject(item.getSpec(), Map.class);//fastJSON将数据库中json数据转为Map
    item.setSpecMap(specMap);
}
solrTemplate.saveBeans(items);//saveBeans()
solrTemplate.commit();
```



## 关键字搜索（复制域）

`ItemSearchServiceImpl`

```java
@Service(timeout = 5000)//推荐写在服务提供方。当两方同时写，以消费方为准
public class ItemSearchServiceImpl implements ItemSearchService {
    @Autowired
    private SolrTemplate solrTemplate;
    
    //前端传入的数据有多好多类型，如关键字、类型多选框之类的，前端封装为map类似对象
    //后端不仅仅返回列表数据，还要返回根据关键字搜索后的分类信息，选择框等等，所以封装为map
    @Override
    public Map search(Map searchMap) {
        Map map = new HashMap();
        //Query query = new SimpleQuery("*:*");//好像不设置"*:*"也可以
        //Criteria criteria = new Criteria("item_keywords").is(searchMap.get("keywords"));//is匹配（利用分词实现）
        //query.addCriteria(criteria);
        Criteria criteria = new Criteria("item_keywords").is(searchMap.get("keywords"));//is匹配（利用分词实现）
        Query query = new SimpleQuery(criteria);
        ScoredPage<TbItem> tbItems = solrTemplate.queryForPage(query, TbItem.class);

        map.put("list",tbItems.getContent());
        return map;
    }
}

```

`ItemSearchController`

```java
@RestController
@RequestMapping("/itemSearch")
public class ItemSearchController {
    @Reference(timeout = 5000)//默认为1秒
    private ItemSearchService itemSearchService;

    @RequestMapping("/search")
    public Map search(@RequestBody Map searchMap){ //@RequestBody接收前端json数据
        return itemSearchService.search(searchMap);
    }
}

```

`ItemSearchService.js`

```js
app.service("itemSearchService",function ($http) {
    this.search = function (searchMap) {
        return $http.post("/itemsearch/search.do",searchMap);
    }
})

```

`ItemSearchController.js`

```js
app.controller("itemSearchController",function ($scope,itemSearchService) {
    $scope.search = function () {
        itemSearchService.search($scope.searchMap).success(function (data) {
            $scope.resultMap = data;
        })
    }
})

```

HTML遍历展示即可





## 高亮显示关键字搜索（复制域）

> 高亮显示标题title中的字符

需要修改关键字搜索中的service方法，其他不变

```java
@Override
public Map search(Map searchMap) {
    Map<String,Map> map = new HashMap<>();
    map.putAll(searchList(searchMap));//1.查询列表数据
    map.put("categoryList",searchCategoryList(searchMap));//2.分组查询商品分类列表


    return map;
}

/**
 * 列表查询
 */
private Map searchList(Map searchMap) {
    Map map = new HashMap();
    //关键字的条件查询（利用复制域），相当于where
    Criteria criteria = new Criteria("item_keywords").is(searchMap.get("keywords"));
    HighlightQuery query = new SimpleHighlightQuery(criteria);
	//高亮选项
    HighlightOptions highlightOptions = new HighlightOptions()
        .addField("item_title")//高亮Filed域
        .setSimplePrefix("<span style='color: red;'>")//HTML前缀
        .setSimplePostfix("</span>");//HTML后缀
    query.setHighlightOptions(highlightOptions);//设置高亮设置
    HighlightPage<TbItem> items = solrTemplate.queryForHighlightPage(query, TbItem.class);

    //设置高亮
    List<HighlightEntry<TbItem>> highlighted = items.getHighlighted();//高亮entry集合（每条记录）
    for (HighlightEntry<TbItem> entry : highlighted) {
        //高亮列表（高亮Filed域个数可能多个）。并且每个Filed域可能存储多值（此处没有）
        TbItem item = entry.getEntity();//获取源实体类
        List<HighlightEntry.Highlight> highlights = entry.getHighlights();
        if (highlights.size() >= 0 && highlights.get(0).getSnipplets().size() >= 0) {
            item.setTitle(highlights.get(0).getSnipplets().get(0));
        }
    }
    map.put("list", items.getContent());
    return map;
}

```

但是此时HTML中显示的是HTML代码，不是解析后的页面。这是AngularJS为了防止html攻击采取的安全机制。此时需要用到AngularJS的`$sce`服务中的`trustAsHtml`方法。由于该方法具有通用性，定义在`filter`过滤器中（放入base.js）

```js
app.filter("trustHtml",['$sce',function ($sce) {
    return function (data) {
        return $sce.trustAsHtml(data);
    }
}])
```

HTML中就不能使用`{{}}`来绑定了，需要使用`ng-bing-html`

```html
<div class="attr" ng-bind-html="item.title | trustHtml"></div>
```



## 分组查询

service中添加私有方法并调用

```java
/**
 * 分组查询商品分类列表
 */
private List searchCategoryList(Map searchMap){
    List<String> list = new ArrayList<>();
    //关键字的条件查询（利用复制域），相当于where
    Criteria criteria = new Criteria("item_keywords").is(searchMap.get("keywords"));
    Query query = new SimpleQuery(criteria);
    //设置分组选项，相当于group by。可能有多个分组（继续addGroupByField即可）
    GroupOptions groupOptions = new GroupOptions().addGroupByField("item_category");
    query.setGroupOptions(groupOptions);
    //分组页
    GroupPage<TbItem> items = solrTemplate.queryForGroupPage(query, TbItem.class);
    //分组结果
    GroupResult<TbItem> item_category = items.getGroupResult("item_category");
    //分组entry页
    Page<GroupEntry<TbItem>> groupEntries = item_category.getGroupEntries();
    //分组entryj集合，便利获取值
    List<GroupEntry<TbItem>> content = groupEntries.getContent();
    for (GroupEntry<TbItem> tbItemGroupEntry : content) {
        list.add(tbItemGroupEntry.getGroupValue());
    }
    return list;
}
```

HTML中遍历

```html
<div ng-if="resultMap.categoryList!=null" >
    <a ng-repeat="category in resultMap.categoryList" href="#{{$index}}">{{category}} </a>
</div>
```



## 过滤查询（以上所有代码）

```java
@Service(timeout = 5000)//推荐写在服务提供方。所两方同时写，以消费方为准
public class ItemSearchServiceImpl implements ItemSearchService {

    @Autowired
    private SolrTemplate solrTemplate;

    /**
     * 搜索
     */
    @Override
    public Map search(Map searchMap) {
        //去掉搜索关键字中的空格
        String  keywords = (String) searchMap.get("keywords");
        searchMap.put("keywords",keywords.replace(" ",""));
        
        Map map = new HashMap<>();
        //1.查询列表数据
        map.putAll(searchList(searchMap));
        //2.分组查询商品分类列表
        List<String> categoryList = searchCategoryList(searchMap);
        map.put("categoryList", categoryList);
        //3.根据分类名称查询品牌和规格列表
        String category = (String) searchMap.get("category");
        if ("".equals(category)) { //若没选择分类，按第一个分类查询
            if (categoryList.size() > 0) {
                map.putAll(searchBrandAndSpecList(categoryList.get(0)));
            }
        } else { //若选择了分类，按选择的分类名称查询
            map.putAll(searchBrandAndSpecList(category));
        }
        return map;
    }

    /**
     * 列表查询（过滤查询等等）
     */
    private Map searchList(Map searchMap) {
        Map map = new HashMap();

        //1.1关键字查询（利用复制域）
        Criteria criteria = new Criteria("item_keywords").is(searchMap.get("keywords"));
        HighlightQuery query = new SimpleHighlightQuery(criteria);
        //高亮选项设置
        HighlightOptions highlightOptions = new HighlightOptions()
            .addField("item_title")//高亮Filed域
            .setSimplePrefix("<span style='color: red;'>")//HTML前缀
            .setSimplePostfix("</span>");//HTML后缀
        query.setHighlightOptions(highlightOptions);//设置高亮设置

        //1.2按照商品分类过滤
        if (!"".equals(searchMap.get("category"))) { //若用户选择了分类
            Criteria filterCriteria = new Criteria("item_category").is(searchMap.get("category"));
            FilterQuery filterQuery = new SimpleFilterQuery(filterCriteria);
            query.addFilterQuery(filterQuery);
        }

        //1.3按照品牌过滤
        if (!"".equals(searchMap.get("brand"))) { //若用户选择了品牌
            Criteria filterCriteria = new Criteria("item_brand").is(searchMap.get("brand"));
            FilterQuery filterQuery = new SimpleFilterQuery(filterCriteria);
            query.addFilterQuery(filterQuery);
        }

        //1.4按照规格过滤
        if (searchMap.get("spec") != null) { //若用户选择了规格

            Map<String, String> specMap = (Map<String, String>) searchMap.get("spec");
            Set<Map.Entry<String, String>> entries = specMap.entrySet();
            for (Map.Entry<String, String> entry : entries) {
                System.out.println(entry.getKey() + "====" + entry.getValue());
                Criteria filterCriteria = new Criteria("item_spec_" + entry.getKey()).is(entry.getValue());
                FilterQuery filterQuery = new SimpleFilterQuery(filterCriteria);
                query.addFilterQuery(filterQuery);
            }
        }
        
        //1.5按照价格过滤
        if (!"".equals(searchMap.get("price"))){
            String price = (String) searchMap.get("price");
            String[] split = price.split("-");

            Criteria filterCriteria = new Criteria("item_price");
            if (!split[0].equals("0")){ //起始条件
                filterCriteria.greaterThanEqual(split[0]);//大于等于
            }
            if (!split[1].equals("*")){ //终止条件
                filterCriteria.lessThanEqual(split[1]); //小于等于
            }
            FilterQuery filterQuery = new SimpleFilterQuery(filterCriteria);
            query.addFilterQuery(filterQuery);
        }
        
        //1.6分页
        Integer pageNum = (Integer) searchMap.get("pageNum");//当前页
        if (pageNum==null){
            pageNum = 1;
        }
        Integer pageSize = (Integer) searchMap.get("pageSize");//每页记录数
        if (pageSize==null){
            pageSize = 20;
        }
        query.setOffset((pageNum-1)*pageSize);//起始索引（不是页码）
        query.setRows(pageSize);//每页记录数
        //在最后返回getContent()后还需传递pages、total；

        //1.7排序（根据传入的Field字段）
        String  sortValue = (String) searchMap.get("sort");//升序或降序
        String sortField = (String) searchMap.get("sortField");//排序的Field字段
        if (sortValue!=null && !sortValue.equals("")){
            if (sortValue.equals("ASC")){
                Sort sort = new Sort(Sort.Direction.ASC,"item_"+sortField);
                query.addSort(sort);
            } else if (sortValue.equals("DESC")){
                Sort sort = new Sort(Sort.Direction.DESC,"item_"+sortField);
                query.addSort(sort);
            }
        }
        
        //高亮页对象
        HighlightPage<TbItem> items = solrTemplate.queryForHighlightPage(query, TbItem.class);

        //遍历并设置高亮
        List<HighlightEntry<TbItem>> highlighted = items.getHighlighted();//高亮entry集合（每条记录）
        for (HighlightEntry<TbItem> entry : highlighted) {
            //高亮列表（高亮Filed域个数可能多个）。并且每个Filed域可能存储多值（此处没有）
            TbItem item = entry.getEntity();//获取源实体类
            List<HighlightEntry.Highlight> highlights = entry.getHighlights();
            if (highlights.size() > 0 && highlights.get(0).getSnipplets().size() > 0) {
                item.setTitle(highlights.get(0).getSnipplets().get(0));
            }
        }

        map.put("list", items.getContent());//当前页所有数据
        map.put("pages",items.getTotalPages());//总页数
        map.put("total",items.getTotalElements());//总记录数
        return map;
    }

    /**
     * 分组查询商品分类列表
     */
    private List searchCategoryList(Map searchMap) {
        List<String> list = new ArrayList<>();
        //关键字的条件查询（利用复制域），相当于where
        Criteria criteria = new Criteria("item_keywords").is(searchMap.get("keywords"));
        Query query = new SimpleQuery(criteria);
        //设置分组选项，相当于group by。可能有多个分组（继续addGroupByField即可）
        GroupOptions groupOptions = new GroupOptions().addGroupByField("item_category");
        query.setGroupOptions(groupOptions);
        //分组页
        GroupPage<TbItem> items = solrTemplate.queryForGroupPage(query, TbItem.class);
        //分组结果
        GroupResult<TbItem> item_category = items.getGroupResult("item_category");
        //分组entry页
        Page<GroupEntry<TbItem>> groupEntries = item_category.getGroupEntries();
        //分组entryj集合，便利获取值
        List<GroupEntry<TbItem>> content = groupEntries.getContent();
        for (GroupEntry<TbItem> tbItemGroupEntry : content) {
            list.add(tbItemGroupEntry.getGroupValue());
        }
        return list;
    }

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * Redis查询品牌和规格列表
     */
    private Map searchBrandAndSpecList(String categoryName) {
        Map map = new HashMap();
        //1.根据商品分类名称得到模板id
        Long categoryId = (Long) redisTemplate.boundHashOps("itemCat").get(categoryName);
        if (categoryId != null) {
            //2.根据模板id获取品牌列表
            List brandList = (List) redisTemplate.boundHashOps("brandList").get(categoryId);
            map.put("brandList", brandList);
            //3.根据模板id获取规格列表
            List specdList = (List) redisTemplate.boundHashOps("specList").get(categoryId);
            map.put("specList", specdList);
        }
        return map;
    }
    
    //审核通过时导入SKU数据
    @Override
    public void importList(List list){
        solrTemplate.saveBeans(list);
        solrTemplate.commit();
    }

    //删除商品时同时删除solr中数据
    @Override
    public void deleteByGoodsIds(List goodsIds) {
        Criteria criteria = new Criteria("item_goodsid").in(goodsIds);
        Query query = new SimpleQuery(criteria);
        solrTemplate.delete(query);
        solrTemplate.commit();
    }
}
```



## 更新索引库

> 实时更新solr库，而不总是批量导入。还需实现删除方法。查看7中代码。理解即可



