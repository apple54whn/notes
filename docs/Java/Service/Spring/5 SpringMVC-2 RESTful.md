# RESTful

- RESTful是一个资源定位及资源操作的风格。使用POST、DELETE、PUT、GET，使用不同方法对资源进行操作，分别对应  添加、 删除、修改、查询

- 需求：RESTful方式实现商品信息查询，返回json数据

    - **从URL上获取参数**：根据id查询商品，使用RESTful风格开发的接口地址是：http://127.0.0.1/item/1

        - 注解`@RequestMapping("item/{id}")`声明请求的URL，`{xxx}`为占位符，请求的URL是“`item /1`”

        - 使用`@PathVariable() Integer id`获取URL上的数据

            ```java
            @RequestMapping("item/{id}")
            public @ResponseBody Item queryItemById(@PathVariable Integer id) {
                Item item = this.itemService.queryItemById(id);
                return item;
            }
            ```

            - 如果`@RequestMapping`中表示为"`item/{id}`"，id和形参名称一致，`@PathVariable`不用指定名称。如果不一致，例如"`item/{ItemId}`"则需要指定名称`@PathVariable("itemId")`

        - **注意**：

            - @PathVariable是获取url上数据的。@RequestParam获取请求参数的（包括post表单提交）
            - 如果加上@ResponseBody注解，就不会走视图解析器，不会返回页面，返回如json数据。如果不加，就走视图解析器，返回页面

* 注意：
    * 表单只支持GET、POST请求，若要发送其他请求，**表单**本身设置为POST请求，并需要input中属性`name="_method" value="PUT"`，Ajax中查看HTML章节
    * 后端中需要配置过滤器`org.springframework.web.filter.HiddenHttpMethodFilter`
    * 但是 Ajax 支持其他类型的请求

