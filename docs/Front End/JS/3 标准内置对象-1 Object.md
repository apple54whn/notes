# 标准内置对象—Object

## 创建

```js
// 创建对象 1
var employee1 = {
  name: "conanan",
  age: 18,
  position: "程序员",
  signIn: function() {
    console.log("conanan 打卡上班");
  }
};
console.log(employee1.name); // conanan
employee1.signIn(); // conanan 打卡上班

// 创建对象 2
var employee2 = new Object();
employee2["name"] = "apple54whn";
employee2["signIn"] = function() {
  console.log("apple54whn 打卡上班");
};
console.log(employee2["name"]); // apple54whn
employee2.signIn(); // apple54whn 打卡上班
console.log(employee2.age); // undefined
```



## 构造函数创建

```js
// 方式1
function Employee1(name, age) {
  this.name = name;
  this.age = age;
  this.signIn = () => {
    console.log(this.name + "去签到");
  };
}

// 方式2，使用ES2015方式，推荐
class Employee2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.signIn = () => {
      console.log(this.name + "去签到");
    }
  }
}

var employee1 = new Employee1("conanan", 18);
console.log(employee1.name); // conanan

var employee2 = new Employee2("apple54whn", 20);
console.log(employee2.age); // 20
```





## ES6 对象字面量增强写法

```js
// new 方式，非字面量
const obj1 = new Object();

let name = "conanan";
let age = 18;

// ES5
const obj2 = {
    name: name,
    age: age,
    eat: function () {
        console.log("eat");
    },
};
console.log(obj2);

// ES6
const obj3 = {
    name,
    age,
    eat() {
        console.log("eat");
    },
};
console.log(obj3);
```





## 属性

### 属性的定义和访问

*   直接使用`.`或`['key']`定义即可

*   属性值可以使用`.`或`['key']`访问

*   属性定义时，若key为一个连接单词，则只能通过`'birty-day'`引号括起来，且访问时也只能用`['key']`访问。不推荐这样命令，一般采用驼峰命名即可！

*   若**属性名和值相同，则可以省略**；函数也可以省略成如下：

    ```js
    var name = "conanan";
    var employee3 = {
      name,
      signIn() {
        console.log("conanan 打卡");
      }
    };
    console.log(employee3.name); // conanan
    employee3.signIn(); // conanan 打卡
    ```

    

### 遍历对象属性

```js
var name = "conanan";
var employee3 = {
  name,
  signIn() {
    console.log("conanan 打卡");
  }
};

// 遍历 1
console.log(Object.keys(employee3)); // ["name","signIn"]
// 遍历 2
for (const key in employee3) {
  console.log(key); // 上面的分开输出
}
```



### 删除对象属性

```js
delete employee3.name;
console.log(employee3.name); // undefined
```



## this

```js
var employee = {
  fullName: "apple54whn",
  age: 18,
  signIn: function() {
    console.log(this.fullName + "上班打卡");
  }
};
employee.signIn(); // conanan上班打卡

employee.goToWork = function() {
  console.log(this.fullName + "去上班");
};
employee.goToWork(); // conanan去上班

// 发现问题，且不推荐使用箭头函数定义对象的方法
employee.goHome = () => {
  console.log(this.fullName + "回家"); 
  console.log(this); // 此时this指向的是包裹this对象的作用域对象，此时包裹它的作用域为全局对象，浏览器中为Window
};
employee.goHome(); // undefined回家
```

注意使用箭头函数时 this 指向问题。但是**定义对象字面量时不推荐使用箭头函数定义方法，应采用普通方法来定义**！

```js
// 若定义在构造函数中，则指向包裹this对象的作用域即构造函数
class Employee2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.goHome = function() {
      console.log(this.name + "回家");
    };
    // 能解决问题但不推荐使用箭头函数定义对象的方法
    this.signIn = () => {
      console.log(this.name + "去签到");
    };
  }
}
var emp = new Employee2("app", 8);
emp.signIn(); // app去签到
emp.goHome();// app回家
```



## getter & setter

**直接使用字面值创建 Object 的 getter & setter 定义**

```js
var person = {
  firstNmae: "三",
  lastName: "张",
  get fullName() {
    return this.lastName + this.firstNmae;
  },
  set fullName(fullName) {
    let [lastName, firstNmae] = fullName.split(",");
    this.lastName = lastName;
    this.firstNmae = firstNmae;
  }
};

console.log(person.fullName); // 张三
person.fullName = "李,四";
console.log(person.fullName); // 李四
console.log(person.lastName, person.firstNmae); // 李 四
```

**使用构造函数创建的 Object 对象的 getter & setter 定义需要使用**`Object.defineProperty()`来实现

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
var p = new Person("app", 8);
Object.defineProperty(p, "info", {
  get: function() {
    return this.name + " " + this.age;
  },
  set: function(info) {
    let [name, age] = info.split(" ");
    this.name = name;
    this.age = age;
  }
});

console.log(p.info); // app 8
p.info = "haha 18";
console.log(p.info); // haha 18
```



## `__proto__` 原型

类似于Java中继承得来的的**静态域或静态方法**

```js
class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.goHome = function() {
      console.log(this.name + "回家");
    };
  }
}

var emp1 = new Employee("conan", 22);
var emp2 = new Employee("lan", 21);
console.log(emp1);
console.log(emp2);
// 上述打印的对象都有个“__proto__”属性

Employee.prototype.schoolName = "米花小学";
Employee.prototype.printInfo = function() {
  console.log(this.name + " " + this.age + " " + this.schoolName);
};
emp1.printInfo(); // conan 22 米花小学
emp2.printInfo(); // lan 21 米花小学

// 获取对象和类的原型，他们都是一样的
console.log(emp1.__proto__);
console.log(Employee.prototype);
console.log(emp1.__proto__ === Employee.prototype); // true
console.log(Object.getPrototypeOf(emp2) === Employee.prototype); // true
```





## `Object.create`

**类似继承**

```js
class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.goHome = function() {
      console.log(this.name + "回家");
    };
  }
}
Employee.prototype.schoolName = "米花小学";
Employee.prototype.printInfo = function() {
  console.log(this.name + " " + this.age + " " + this.schoolName);
};

var emp1 = new Employee("conan", 22);
console.log(emp1); // 原型中的需在__proto__中查看
for (const key in emp1) {
  console.log(key); // 将所有属性方法，包括原型中的都打印出了
}

// Object.create
var emp2 = Object.create(emp1);
console.log(emp2); // 因为时继承的，所以从emp1继承的都在__protp__中，且__proto__中还有一个__proto__，是对象的原型
for (const key in emp2) {
  console.log(key); // 将所有属性方法，包括所有原型中的都打印出了
}
// 此时要使用需给其赋自己的值，因为name等都是继承的
console.log(emp2.name); // conan
emp2.goHome(); // conan回家
emp2.name = "lan";
console.log(emp2.name); // lan
emp2.goHome(); // lan回家
// 获取属于自己的属性和方法
console.log(Object.getOwnPropertyNames(emp2)); // ["name"]
```



## 原型链

```js
class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.goHome = function() {
      console.log(this.name + "回家");
    };
  }
}
Employee.prototype.schoolName = "米花小学";
Employee.prototype.printInfo = function() {
  console.log(this.name + " " + this.age + " " + this.schoolName);
};

var emp1 = new Employee("conan", 22);
// Object.create
var emp2 = Object.create(emp1);

// 原型链开始
console.log(emp2);
var proto1 = Object.getPrototypeOf(emp2);
console.log(proto1); // 原型指向 emp1
var proto2 = Object.getPrototypeOf(proto1);
console.log(proto2); // 原型指向 Employee 构造函数
var proto3 = Object.getPrototypeOf(proto2);
console.log(proto3); // 原型指向 Object 的原型即 Object.prototype，而不是 Object。我也懵了
var proto4 = Object.getPrototypeOf(proto3);
console.log(proto4); // null，即原型链的顶端
// 也可以通过这个方式获取
// console.log(Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype)); // null
```





## 修改原型链指向

```js
class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.goHome = function() {
      console.log(this.name + "回家");
    };
  }
}
Employee.prototype.schoolName = "米花小学";
Employee.prototype.printInfo = function() {
  console.log(this.name + " " + this.age + " " + this.schoolName);
};

var emp1 = new Employee("conan", 22);
// Object.create
var emp2 = Object.create(emp1);

// 修改原型指向
class Manager {}
Manager.prototype.department = "技术部";
Object.setPrototypeOf(emp2, Manager.prototype);
console.log(emp2.department);
console.log(Object.getPrototypeOf(emp2)); // 此时发现其原型已经改变，不再继承emp1
for (const key in emp2) {
  console.log(key); // 只有继承 Manager的属性和自己本身的属性
}
```



## Spread 操作符

将对象或数组的属性分离，扩展为单个项目，**克隆**

```js
var post = {
  id: 1,
  title: "标题1",
  content: "内容"
};
console.log(post); // {id: 1, title: "标题1", content: "内容"}

var postClone = { ...post };
console.log(postClone); // {id: 1, title: "标题1", content: "内容"}
console.log(post === postClone); // false

var post2 = {
  ...post,
  author: "conanan"
};
console.log(post2); // {id: 1, title: "标题1", content: "内容", author: "conanan"}
```

```js
var arr = [1, 2, 3];
var arrClone = [...arr];
console.log(arrClone); // [1, 2, 3]

var arr2 = [...arr, 4, 5, 6];
console.log(arr2);// [1, 2, 3, 4, 5, 6]
```

```js
function savePost(id, title, content) {
  console.log("保存了文章：", id, title, content);
}
savePost(...[2, "标题", "内容"]); // 保存了文章： 2 标题 内容
```



## destructuring & rest 解构

```js
var post = {
  id: 1,
  title: "标题1",
  content: "内容"
  // comments: null
};
var { id, title, content } = post; // 变量名必须和属性名一致。但可以使用别名
console.log(id, title, content); // 1 "标题1" "内容"

var { id, title: tit, content: con } = post; // 变量名必须和属性名一致。但可以使用别名
console.log(id, tit, con); // 1 "标题1" "内容"

var { id, title: tit, comments = "没有评论" } = post; // 使用默认值。需注意null没有默认值，若post对象的注释打开，则下面的打印输出null
console.log(comments); // 没有评论

var [a, b = 2] = [1];
console.log(a, b); // 1 2
```

可用于解构复杂内容

```js
var post = {
  id: 1,
  title: "标题1",
  content: "内容",
  comments: [
    {
      userId: 1,
      comment: "评论1"
    },
    {
      userId: 2,
      comment: "评论2"
    },
    {
      userId: 3,
      comment: "评论3"
    }
  ]
};

var {
  comments: [, { comment }]
} = post;
console.log(comment); // 评论2
```

获取动态的值

```js
function getId(idKey, obj) {
  let { [idKey]: id } = obj;
  return id; // id是个别名
}
console.log(getId("userId", { userId: 3 })); // 3
```

rest 解构

```js
var post = {
  id: 1,
  title: "标题1",
  content: "内容",
  comments: [
    {
      userId: 1,
      comment: "评论1"
    },
    {
      userId: 2,
      comment: "评论2"
    },
    {
      userId: 3,
      comment: "评论3"
    }
  ]
};
var { comments, ...rest } = post;
console.log(rest); // {id: 1, title: "标题1", content: "内容"}
```

```js
function savePostObj({ id, title, content, ...rest }) {
  console.log("保存了文章：", id, title, content);
  console.log(rest);
}
savePostObj({ id: 1, title: "标题1", content: "内容", author: "conanan" });
// 保存了文章： 1 标题1 内容
// {author: "conanan"}
```



## 值传递与引用传递

**基本类型**如 Number 和 Boolean 等按值传递。

**Array 和 Object 在函数中按引用**（内存地址）传递

**String 虽然按引用传递**，但是被**赋值时重新构造**了一个对象，没有修改原来的

以上基本和 Java 一致



## call & apply & bind

都可以修改 this 指向

正常情况如下，谁调用则 this 指向谁

```js
var emp = {
  id: 1,
  name: "conan",
  printInfo: function() {
    console.log("员工姓名: " + this.name);
  },
  department: {
    name: "技术部",
    printInfo: function() {
      console.log("部门名称: " + this.name);
    }
  }
};
emp.printInfo(); // 员工姓名: conan
emp.department.printInfo(); // 部门名称: 技术部
```

修改代码后

```js
var emp = {
  id: 1,
  fullName: "conan"
};

function printInfo(dep1, dep2, dep3) {
  console.log("员工姓名: " + this.fullName, dep1, dep2, dep3);
}
// printInfo(); // 员工姓名: undefined undefined undefined undefined
printInfo.call(emp, "技术部", "IT事业部", "总裁办公室"); // 员工姓名: conan 技术部 IT事业部 总裁办公室
// 使用apply可以传递数组
printInfo.apply(emp, ["技术部", "IT事业部", "总裁办公室"]); // 员工姓名: conan 技术部 IT事业部 总裁办公室
// bind和call使用一样，但是返回的是函数，供之后调用
var empprintInfo = printInfo.bind(emp, "技术部", "IT事业部", "总裁办公室");
empprintInfo(); // 员工姓名: conan 技术部 IT事业部 总裁办公室
```

