# 标准内置对象—Set

内置方法基本和 Java 一致

```js
var set = new Set();

set.add(1);
set.add(2);
set.add(3);
console.log(set); // Set(3) {1, 2, 3}
console.log(set.size); // 3

set.add(3);
console.log(set); // Set(3) {1, 2, 3}

console.log(set.has(3)); // true

set.forEach((item, index, set) => {
  console.log(item); // 1 2 3
});

set.delete(3); // 值不是索引
console.log(set); // Set(2) {1, 2}

console.log(set.keys()); // SetIterator {1, 2}
console.log(set.values()); // SetIterator {1, 2}
console.log(set.entries()); // SetIterator {1 => 1, 2 => 2}

set.clear();
console.log(set); // Set(0) {}
```

