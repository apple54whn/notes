# this—函数上下文 🔥

**函数的调用方式**对函数内代码的执行有很大的影响，主要体现在 this 参数以及函数上下文是如何建立的。

## 调用位置 🔥

理解 this 的绑定过程之前，首先要理解**调用位置**，它就是**函数在代码中被调用的位置**(而**不是声明的位置**)

分析**调用栈**(就是为了到达当前执行位置所调用的所有函数)。我们关心的**调用位置就在当前正在执行的函数的前一个调用中**

不同类型函数调用之间的主要区别在于：最终作为函数上下文（可以通过 this 参数隐式引用到）传递给执行函数的对象不同。

- 对于顶级函数而言是 window 或者 undefined（取决于是否处于严格模式下）；
- 对于方法而言，即为方法所在的对象；
- 对于构造函数而言是一个新创建的对象实例。

## 绑定规则 🔥

### 默认绑定—独立函数调用

**该函数是独立函数**，即**不是作为一个对象的属性存在时**，就属于这种调用类型

当以这种方式调用时，函数上下文（this 关键字的值）有两种可能性：

- 在非严格模式下，**调用位置为全局上下文（window 对象）**，即 this

  ```js
  function whatsMyContext() {
    console.log(this); // Window...
  }
  whatsMyContext()(function() {
    console.log(this); // Window...
  })();
  ```

- 而在严格模式下，它将是**undefined**

  ```js
  // 'use strict'

  function whatsMyContext() {
    "use strict";
    console.log(this); // undefined
  }
  skulk("conanan");

  (function() {
    "use strict";
    console.log(this); // undefined
  })();
  ```

### 隐式绑定—作为对象的方法被调用

考虑**调用位置是否有上下文对象**，或者说**是否被某个对象拥有或者包含（严格说并不属于，可以称为地址引用），该对象将会成为函数的上下文**。

注意该函数是如何被当作引用属性添加到上下文对象，虽然**无论是直接在上下文对象中定义**还是**先定义再添加为引用属性**，这个函数严格来说都**不属于**上下文对象对象。然而，调用位置会使用该上下文对象来引用函数。

这是**JavaScript 实现面向对象编程的主要方式之一，构造函数**是另外一种方式

```js
// 函数直接调用
function whatsMyContext() {
  return this;
}
console.log(whatsMyContext() === window); // true

// 这里主要指对象字面量
const ninja1 = {
  getMyThis: whatsMyContext,
  getMyThis2: function() {
    return this;
  },
  getMyThis3: () => {
    return this;
  },
};
console.log(ninja1.getMyThis() === ninja1); // true
console.log(ninja1.getMyThis2() === ninja1); // true
// 对象字面量 & 箭头函数副作用
console.log(ninja1.getMyThis3() === ninja1); // false，这里是window

// 这里属于new的对象
// function Ninja() {
//   this.getMyThis = whatsMyContext
// }
class Ninja {
  constructor() {
    this.getMyThis = whatsMyContext;
  }
}
const ninja2 = new Ninja();
console.log(ninja2.getMyThis() === ninja2); // true
```

对象属性**引用链**中只有**最后一层会影响调用位置**

```js
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 42,
  foo: foo,
};
var obj1 = {
  a: 2,
  obj2: obj2,
};
obj1.obj2.foo(); // 42
```

#### 隐式丢失—间接引用

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var bar = obj.foo; // 函数别名!
var a = "oops, global"; // a 是全局对象的属性
obj.foo(); // 2
// 不同于使用 obj.foo()
bar(); // "oops, global"
```

虽然 bar 是 obj.foo 的一个引用，但是**实际上，它引用的是 foo 函数本身（印证了不属于的说法，其实是地址引用）**，因此此时的 bar() 其实是一个**不带任何修饰**的函数调用，因此应用了默认绑定。**最重要的是查看`method()`前是否有对象**。

**使用 bind 硬绑定解决如下**：

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};

var bar = foo.bind(obj);
bar(); // 2
setTimeout(bar, 100); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call(window); // 2
```

#### 隐式丢失—间接引用回调函数

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时（**无论是直接定义还是定义后再引用**）

```js
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  // fn 其实引用的是 foo
  fn(); // <-- 调用位置!
}
var obj = {
  a: 2,
  foo: foo,
};
var a = "oops, global"; // a 是全局对象的属性
obj.foo(); // 2

// 相当于传递 foo 的引用
doFoo(obj.foo); // "oops, global"

const tmp = obj.foo;
tmp(); // "oops, global"
doFoo(tmp); // "oops, global"
```

**参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值**，所以结果和上面的一样

函数传入 JS 内置的回调，结果也是一样的

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout(obj.foo, 100); // "oops, global"
```

**使用 bind 硬绑定解决如下**：

```js
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  // fn 其实引用的是 foo
  fn(); // <-- 调用位置!
}
var obj = {
  a: 2,
};

var bar = foo.bind(obj);

var a = "oops, global"; // a 是全局对象的属性

doFoo(bar); // 2
bar(); // 2
```

#### 隐式丢失（修改）—事件回调

在一些流行的 JavaScript 库中事件处理器常会把回调函数的 this 强制绑定到触发事件的 DOM 元素上

```html
<body>
  <button id="btn">点这里</button>

  <script>
    function Button() {
      this.clicked = false;
      this.click = function() {
        this.clicked = true;
        // this 指向 button 元素！非对象
        console.log(this === button); // false
        console.log(this);
      };
    }

    const button = new Button();
    const $btn = document.getElementById("btn");
    // 这里会发生隐式丢失
    $btn.addEventListener("click", button.click);
  </script>
</body>
```

这里我们发现 this 和 button 竟然是不同的！本来按照构造函数，this 应该指向 new 出来的对象 button，但是这里由于**浏览器的事件（回调函数）**系统把调用的上下文定义为**事件触发的目标元素**，因此上下文将是`<button>`**元素**，而非 button 对象

推荐使用箭头函数解决，一定要**注意箭头函数&对象字面量时的副作用**：暂时不表！

```html
<body>
  <button id="btn">点这里</button>

  <script>
    class Button {
      constructor() {
        this.clicked = false;
        this.click = () => {
          this.clicked = true;
          // this 指向 button 对象
          console.log(this === button); // true
          console.log(this);
        };
      }
    }

    const button = new Button();
    const $btn = document.getElementById("btn");
    $btn.addEventListener("click", button.click);
  </script>
</body>
```

也可以 bind 硬绑定实现（当然 apply、call 也可以）

### 显式绑定

#### apply & call

使用 call、apply 显式地**指定任何对象**作为函数的上下文，第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个 this。

如果你传入了一个**原始值**（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对象，这个**原始值会被自动「装箱」转换成它的对象形式**（也就是`new String(..)`、`new Boolean(..)`或者 `new Number(..)`）

```js
function sum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  // 最终和存储在该函数上下文对象中
  this.result = sum;
}

const ninja1 = {};
const ninja2 = {};
const ninja3 = {};

sum.call(ninja1, 1, 2, 3, 4, 5);
sum.apply(ninja2, [6, 7, 8, 9, 10]);
// 所有函数均可访问bind方法，可以创建并返回一个新函数，并绑定在传入的对象上，直接调用。也可以使用函数表达式指定名称后调用
sum.bind(ninja3, 2, 4, 6, 8, 10)();
console.log(ninja1.result); // 15
console.log(ninja2.result); // 40
console.log(ninja3.result); // 30
```

#### 硬绑定 bind —包裹函数

**底层是 apply、call，省去写包裹函数，返回值为函数**！类似代理模式

显式绑定仍然无法解决我们之前提出的丢失绑定问题，但是显式绑定的一个变种可以解决这个问题。

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};

// 包装模式，包裹函数
var bar = function() {
  foo.call(obj);
};
bar(); // 2
setTimeout(bar, 100); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call(window); // 2
```

创建了函数 bar，并在它的内部手动调用 了 `foo.call(obj)`，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它总会手动在 obj 上调用 foo。**这种绑定是一种显式的强制绑定，因此我们称之为硬绑定**

硬绑定的典型应用场景就是**创建一个包裹函数，传入所有的参数并返回接收到的所有值**

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
var obj = {
  a: 2,
};
// 这里函数不写参数，通过 arguments 接收并返回！！！
var bar = function() {
  return foo.apply(obj, arguments);
};
var b = bar(3); // 2 3
console.log(b); // 5
```

可能要**经常使用**，所以**创建一个可以重复使用的辅助函数**

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
// 简单的辅助绑定函数
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}

var obj = {
  a: 2,
};

var bar = bind(foo, obj);
var b = bar(3); // 2 3
console.log(b); // 5
```

由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法 Function.prototype.bind

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
};

var bar = foo.bind(obj);
var b = bar(3); // 2 3
console.log(b); // 5
```

#### forEach 函数的显示绑定

暂时不讨论箭头函数的 this 词法作用域

```js
const arr = [1, 3, 2, 6, 4];
arr.forEach(function(value, index) {
  console.log(value);
  console.log(this === window); // true
});
arr.forEach(function(value, index) {
  console.log(value);
  console.log(this === arr); // true
}, arr);
```

可以通过第二个参数来指定 this 的指向。其底层也是通过 apply & call 来实现的

#### 手动实现简易版 forEach

第一版

```js
function forEach(array, callback = function(item, index) {}) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    callback(element, index);
  }
}

const arr = [{ type: "dog" }, { type: "cat" }, { type: "bird" }];

forEach(arr, function(item, index) {
  console.log(index + "===" + item.type);
  // 此时的 this 为直接函数调用的全局 window
  console.log(this === arr[index]);
});

forEach(arr, (item) => {
  console.log(item.type);
});
```

第二版

```js
function forEach(array, callback = function(item, index) {}) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // 这里注意第一个参数为指定的函数上下文，后俩才是callback参数
    callback.call(element, element, index);
  }
}

const arr = [{ type: "dog" }, { type: "cat" }, { type: "bird" }];

forEach(arr, function(item, index) {
  console.log(index + "===" + item.type);
  // 此时的 this 为 call 显示指定的当前遍历的元素
  console.log(this === arr[index]);
});

forEach(arr, (item) => {
  console.log(item.type);
});
```

在生产环境实现这类函数还需要做一些处理。例如，若传入的第一个参数不是数组该如何处理？若第二个参数不是函数该如何处理？如何允许调用者随时中断循环？作为练习，可以增加函数来处理这些情况。另一个练习任务是，允许调用者向回调函数传入除索引外的任意数量的参数。

apply 与 call 的功能类似，但问题是在二者中如何选择？答案与许多其他问题的答案是相似的：选择任意可以精简代码的方法。更实际的答案是选择与现有参数相匹配的方法。如果有一组无关的值，则直接使用 call 方法。若已有参数是数组类型，apply 方法是更佳选择。

### new 绑定—函数的构造调用

在 JavaScript 中，构造函数只是一些 使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上， 它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。**构造函数的声明和其他函数类似**，通过使用**函数声明**和**函数表达式**很容易地构造新的对象，**唯一的例外是箭头函数**，后续介绍。若要通过构造函数的方式调用，需要在函数调用之前使用关键字 new

结论：**当通过 new 关键字调用时会创建一个空的对象实例，并将其作为函数上下文（this 参数）传递给函数**

```js
// function 方式
/*
function Ninja() {
  this.skulk = function () {
    return this
  }
}
*/

// ES6 Class 方式
class Ninja {
  constructor() {
    this.skulk = function() {
      return this;
    };
  }
}

const ninja1 = new Ninja();
const ninja2 = new Ninja();

console.log(ninja1.skulk() === ninja1); // true
console.log(ninja2.skulk() === ninja2); // true
```

#### 构造函数的返回值

构造函数的目的是初始化新创建的对象，并且新构造的对象会作为构造函数的调用结果（通过 new 运算符）返回。但当构造函数自身有返回值时会是什么结果？

```js
// function 方式
function Ninja() {
  this.skulk = function() {
    return this;
  };
  return 1;
}

// ES6 Class 方式略

const ninja1 = Ninja();
const ninja2 = new Ninja();

console.log(ninja1); // 1，正如预期

// 测试后发现，返回值1被忽略了，一个新的被初始化的对象通过 new 关键字返回
console.log(typeof ninja2 === "object"); // true
console.log(typeof ninja2.skulk === "function"); // true
```

如果尝试做一些改变，一个构造函数返回另一个对象

```js
const puppet = {
  rules: false,
};

// function 方式
/*
function Emperor() {
  this.rules = true
  return puppet
}
*/

// ES6 Class 方式略
class Emperor {
  constructor() {
    this.rules = true;
    return puppet;
  }
}

const emperor = new Emperor();

console.log(emperor === puppet); // true
console.log(emperor.rules === false); // true
```

总结：

- **如果构造函数返回一个对象**，则**该对象将作为整个表达式的值返回**，而**传入构造函数的 this 将被丢弃**。
- 但是，如果构造函数返回的是**非对象类型**，则忽略返回值，**返回新创建的对象**

#### 编写构造函数的注意事项

构造函数的**目的是根据初始条件对函数调用创建的新对象进行初始化**。虽然这些函数也可以被“正常”调用，或者被赋值为对象属性从而作为方法调用，但这样并没有太大的意义。例如：

```js
// function 方式
/*
function Ninja() {
  this.skulk = function () {
    return this
  }
}
*/

// ES6 Class 方式
class Ninja {
  constructor() {
    this.skulk = function() {
      return this;
    };
  }
}

const ninja = new Ninja();
```

**如果在非严格模式下调用的话，skulk 属性将创建在 window 对象上**——这将引起全局污染。**严格模式下情况会更糟，因为在严格模式下 this 为 undefined，因此 JavaScript 应用将会崩溃**。推荐使用严格模式。

命名：

- 函数和方法的命名通常以描述其行为的**动词开头，且第一个字母小写**
- 构造函数则通常以描述所构造对象的**名词命名，并以大写字母开头**

## 绑定优先级

1.  函数是否在 new 中调用(new 绑定)?如果是的话 this 绑定的是新创建的对象。

    ```js
    var bar = new foo();
    ```

2.  函数是否通过 call、apply(显式绑定)或者 bind 硬绑定调用?如果是的话，this 绑定的是 指定的对象。

    ```js
    var bar = foo.call(obj2);
    ```

3.  函数是否在某个上下文对象中调用(隐式绑定)?如果是的话，this 绑定的是那个上 下文对象。

    ```js
    var bar = obj1.foo();
    ```

4.  如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到 全局对象。

    ```js
    var bar = foo();
    ```

## 绑定例外 🔥

### 被忽略的 this 🔥

如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是**默认绑定**规则

```js
function foo() {
  console.log(this.a);
}
var a = 2;
foo.call(null); // 2
```

什么情况下你会传入 null 呢？使用 `apply(..)` 来“展开”一个数组，并当作参数传入一个函数。类似地，`bind(..)`可以对参数进行**柯里化**(**预先设置一些参数**)，这种方法有时非常有用，使用 null 当作占位符

```js
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}
// 把数组“展开”成参数
foo.apply(null, [2, 3]); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind(null, 2);
bar(3); // a:2, b:3
```

在 ES6 中，可以用 ... 操作符代替 apply(..) 来“展开”数组，foo(...[1,2]) 和 foo(1,2) 是一样的，这样可以避免不必要的 this 绑定

然而，总是使用 null 来忽略 this 绑定可能产生一些副作用。如果某个函数确实使用了 this(比如第三方库中的一个函数)，那默认绑定规则会把 this 绑定到全局对象(在浏览器中这个对象是 window)，这将导致不可预计的后果(比如修改全局对象)。

显而易见，这种方式可能会导致许多难以分析和追踪的 bug。

一种“更安全”的做法是传入一个特殊的对象，把 this 绑定到这个对象不会对你的程序产生任何副作用。就像网络(以及军队)一样，我们可以创建一个“**DMZ**”(demilitarized zone，非军事区)对象——它就是一个空的非委托的对象。

由于这个对象完全是一个空对象，我自己喜欢用变量名 ø(这是数学中表示空集合符号的小写形式)来表示它。在大多数键盘(比如说 Mac 的 US 布局键盘)上都可以使用 ⌥ +o (Option-o)来打出这个符号。

无论你叫它什么，在 JavaScript 中**创建一个空对象最简单的方法**都是 Object.create(null)。`Object.create(null)` 和 `{}` 很像，但是**并不会创建 `Object.prototype` 这个委托**，所以它比 {}“更空”:

```js
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}
// 我们的 DMZ 空对象
var ø = Object.create(null); // 把数组展开成参数
foo.apply(ø, [2, 3]); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind(ø, 2);
bar(3); // a:2, b:3
```

### 间接引用 🔥

你有可能(有意或者无意地)创建一个函数的“间接引用”，在这 种情况下，调用这个函数会应用默认绑定规则。间接引用最容易在**赋值时**发生:

```js
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
```

赋值表达式 p.foo = o.foo 的返回值是**目标函数的引用**，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。

### 软绑定

硬绑定这种方式可以把 this 强制绑定到指定的对象(除了使用 new 时)，防止函数调用应用默认绑定规则。问题在于，硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 this。

如果可以**给默认绑定指定一个全局对象和 undefined 以外的值**，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 this 的能力。

可以通过一种被称为软绑定的方法来实现我们想要的效果:

```js
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
    // 捕获所有 curried 参数
    var curried = [].slice.call(arguments, 1);
    var bound = function() {
      return fn.apply(
        !this || this === (window || global) ? obj : this,
        curried.concat.apply(curried, arguments)
      );
    };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  };
}
```

除了软绑定之外，softBind(..) 的其他原理和 ES5 内置的 bind(..) 类似。它会对指定的函 数进行封装，首先检查调用时的 this，如果 this 绑定到全局对象或者 undefined，那就把 指定的默认对象 obj 绑定到 this，否则不会修改 this。此外，这段代码还支持可选的柯里化。下面我们看看 softBind 是否实现了软绑定功能:

```js
function foo() {
  console.log("name: " + this.name);
}
var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };
var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看!!!
fooOBJ.call(obj3); // name: obj3 <---- 看!
setTimeout(obj2.foo, 10); // name: obj <---- 应用了软绑定
```

可以看到，软绑定版本的 foo() 可以手动将 this 绑定到 obj2 或者 obj3 上，但如果应用默认绑定，则会将 this 绑定到 obj。

## this 词法—箭头函数

绑定的四条规则已经可以包含所有正常的函数。但是 ES6 中介绍了一种无法使用 这些规则的特殊函数类型:箭头函数。

箭头函数会**继承外层函数（或全局）**调用的 this 绑定(无论 this 绑定到什么)。这和 ES6 之前代码中的 self = this 机制一样。

箭头函数没有单独的 this 值（不会隐式传入 this 参数），**this 在箭头函数创建时（就是`=>`出现的地方）确定**

```js
function foo() {
  // 返回一个箭头函数
  return (a) => {
    //this 继承自 foo()
    console.log(this.a);
  };
}
var obj1 = {
  a: 2,
};
var obj2 = {
  a: 3,
};
var bar = foo.call(obj1);
bar.call(obj2); // 2, 不是 3 !
```

**foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1， bar(引用箭头函数)的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。(new 也不行!)**

箭头函数最常用于**回调函数**中，例如**事件处理器或者定时器**:

```js
function foo() {
  setTimeout(() => {
    // 这里的 this 在词法上继承自 foo()
    console.log(this.a);
  }, 100);
}
var obj = {
  a: 2,
};
foo.call(obj); // 2
```

箭头函数可以像 bind(..) 一样确保函数的 this 被绑定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的 this 机制。实际上，在 ES6 之前我们就已经 在使用一种几乎和箭头函数完全一样的模式。

```js
function foo() {
  var self = this; // lexical capture of this
  setTimeout(function() {
    console.log(self.a);
  }, 100);
}
var obj = {
  a: 2,
};
foo.call(obj); // 2
```

虽然 self = this 和箭头函数看起来都可以取代 bind(..)，但是从本质上来说，它们想替代的是 this 机制。

如果你经常编写 this 风格的代码，但是绝大部分时候都会使用 self = this 或者箭头函数来否定 this 机制，那你或许应当:

- 只使用词法作用域并完全抛弃错误 this 风格的代码;
- 完全采用 this 风格，在必要时使用 bind(..)，尽量避免使用 self = this 和箭头函数。

### 引用函数

```js
const whatsMyContext = () => {
  return this;
};
// 函数直接调用
console.log(whatsMyContext() === window); // true

// 对象字面量的方法
const ninja1 = {
  getMyThis: whatsMyContext,
};
console.log(ninja1.getMyThis() === window); // true

// 构造函数
// function Ninja() {
//   this.getMyThis = whatsMyContext
// }
class Ninja {
  constructor() {
    this.getMyThis = whatsMyContext;
  }
}
const ninja2 = new Ninja();
console.log(ninja2.getMyThis() === window); // true
```

可以看出 this 都是在函数创建时已经确定了

### 对象字面量 & 箭头函数副作用 🔥

由于 this 值是在箭头函数创建时确定的，所以会导致一些看似奇怪的行为。回到按钮单击示例中，因为只有一个按钮，因此可以假设不需要构造函数。直接使用对象字面量

```js
<body>
  <button id="btn">点这里</button>

  <script>
    var button = {
      clicked: false,
      click: () => {
        this.clicked = true;
        // this 指向 window
        console.log(this === button); // false
        console.log(this);

      }
    }

    const $btn = document.getElementById('btn')
    $btn.addEventListener('click', button.click)
  </script>
</body>
```

```js
// 对象字面量的方法
const ninja3 = {
  getMyThis: () => {
    return this;
  },
};
console.log(ninja3.getMyThis() === window); // true
```

### 构造函数

```js
// 构造函数
// function Ninja2() {
//   this.getMyThis = () => {
//     return this
//   }
// }
class Ninja2 {
  constructor() {
    this.getMyThis = () => {
      return this;
    };
  }
}
const ninja4 = new Ninja2();
console.log(ninja4.getMyThis() === ninja4); // true
```
