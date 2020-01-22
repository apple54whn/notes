# 6 Jackson

> 参考这篇[博客](https://www.baeldung.com/jackson-annotations)

## 序列化注解

> 将 Java 对象转为与平台无关的二进制字节流

### @JsonAnyGetter

@JsonAnyGetter注释允许灵活地使用Map类型字段作为标准属性。 

```java
@Data
public class ExtendableBean {
    private String name;

    private Map<String, String> map = new HashMap<>(10);

    private Map<String, String> properties = new HashMap<>(10);

    @JsonAnyGetter
    public Map<String, String> getProperties() {
        return properties;
    }
}
```

 当我们序列化这个实体的一个实例时，我们将得到映射中的**所有键值作为标准的普通属性**： 

```json
{
  "name": "Tom",
  "map": {},
  "attr2": "val2",
  "attr1": "val1",
  "attr3": "val3"
}
```

示例

```java
@Test
public void whenSerializingUsingJsonAnyGetter_thenCorrect() throws JsonProcessingException {
    ExtendableBean bean = new ExtendableBean();
    bean.setName("Tom");
    bean.getProperties().put("attr1", "val1");
    bean.getProperties().put("attr3", "val3");
    bean.getProperties().put("attr2", "val2");

    String result = new ObjectMapper().writeValueAsString(bean);
    System.out.println(result);
}
```



### @JsonGetter

 @JsonGetter注释是@JsonProperty注释的替代方法，用于将方法标记为getter方法，替代原样getter。 

```java
public class MyBean {
    public int id;
    private String name;
 
    @JsonGetter("name")
    public String getTheName() {
        return name;
    }
}
```

```json
{"id":1,"name":"My bean"}
```

示例

```java
@Test
public void whenSerializingUsingJsonGetter_thenCorrect() throws JsonProcessingException {

    MyBean bean = new MyBean(1, "My bean");

    String result = new ObjectMapper().writeValueAsString(bean);
    System.out.println(result);

}
```



### @JsonPropertyOrder

 我们可以使用@JsonPropertyOrder注释来指定序列化中属性的顺序。 

 我们还可以使用`@JsonPropertyOrder(alphabetic=true)`按**字母顺序**排列属性。 

```java
@JsonPropertyOrder({ "name", "id" })
public class MyBean {
    public int id;
    public String name;
}
```

```json
{
    "name":"My bean",
    "id":1
}
```



### @JsonRawValue

 @JsonRawValue注释可以指示Jackson按原样序列化属性。 可以设置true或false来定义此注释是否处于活动状态（一般不用）

```java
public class RawBean {
    public String name;
 
    @JsonRawValue
    public String json;
}
```

```json
{
    "name":"My bean",
    "json":{
        "attr":false
    }
}
```

示例

```java
@Test
public void whenSerializingUsingJsonGetter_thenCorrect() throws JsonProcessingException {

    MyBean bean = new MyBean(1, "My bean");
    String result = new ObjectMapper().writeValueAsString(bean);
    System.out.println(result);
}
```



### @JsonValue🔥

 @JsonValue表示该库将用于序列化整个实例的单个方法。 

 例如，在enum中，我们使用@JsonValue注释getName，以便通过它的名称序列化任何这样的实体 

```java
public enum TypeEnumWithValue {
    TYPE1(1, "Type A"), TYPE2(2, "Type 2");
 
    private Integer id;
    private String name;
 
    // standard constructors
 
    @JsonValue
    public String getName() {
        return name;
    }
}
```

```json
"Type A"
```

示例

```java
@Test
public void whenSerializingUsingJsonValue_thenCorrect() throws IOException {

    String enumAsString = new ObjectMapper().writeValueAsString(TypeEnumWithValue.TYPE1);
    System.out.println(enumAsString);
}
```









## 属性包含注解