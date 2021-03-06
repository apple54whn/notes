# 标准内置对象—String

## 定义

```js
var str1 = "hello";
console.log(str1); // hello

var str2 = new String("world");
console.log(str2); // String {"world"}

// 转义字符 \
var str3 = "hello\\\nworld";
console.log(str3);
// hello\
// world
```



## 遍历

````js
var str1 = "hello";
for (let index = 0; index < str1.length; index++) {
  console.log(str1[index]);
}

for (const iterator of str1) {
  console.log(iterator);
}

for (const key in str1) {
  console.log(str1[key]);
}
````



## 切片

和数组一样，推荐使用`splice`。不改变原有字符串

```js
var str1 = "hello world";
console.log(str1.slice(1, 4)); // ell，第二个值是索引值，左闭右开
console.log(str1.slice(4)); // o world
console.log(str1.slice(6, -2)); // wor
console.log(str1.slice(-7, -2)); // o wor
console.log(str1.slice(7, 1)); // 空字符串

//------------------------------
// 1 表示子字符串开头的从零开始的索引号。
// 2 表示子字符串结束的从零开始的索引号。子字符串包括字符到end所表示的字符，但不包括end所表示的字符。如果省略end，则返回原始字符串从开始到结束的所有字符。
console.log(str1.substring(1, 4)); // ell，第二个值是索引值，左闭右开
console.log(str1.substring(4)); // o world
console.log(str1.substring(6, -2)); // hello[ ]，不接收负数，负数转为0，左边大于右边则替换，即 0,6
console.log(str1.substring(-7, -2)); // 空字符串，不接收负数，都转为 0
console.log(str1.substring(7, 1)); // ello w，左边大于右边则替换，即 1,7
```



## 拼接

MDN 推荐使用`+`性能好。不改变原有字符串

```js
var str1 = "hello";
var str2 = "world";
console.log(str1 + str2);
console.log(str1.concat(str2).concat("hh"));
```



## 大小写转换

不改变原有字符串

```js
var str1 = "hello";
console.log(str1.toUpperCase());
console.log(str1.toLowerCase());
```



## 去首尾空格

```js
console.log(" hello world  ".trim());
```



## 模版字符串

按原样输出

```js
var longStr = `sfsfafasfsfsf  sfsf ssfsfas safa as as
asfsfsafasfsa fsf 
asfsa fsa 
safsf `;
console.log(longStr);
```

支持变量占位符

```js
var str = `hello,${name}`;
var name = "conan";
console.log(str); // hello,conan
```

类似React中用法

```js
function greeting(strings, gender) {
  let genderStr = "";
  if (gender === "M") {
    genderStr = "先生";
  } else if (gender === "F") {
    genderStr = "女士";
  }
  return `${strings[0]}${genderStr}`;
}
var gender = "M";
var result = greeting`hello,conan${gender}`;
console.log(result); // hello,conan先生
```



## 匹配

*   `match(reg)`：根据正则匹配，返回匹配的内容（数组表示多条）







## 未完

