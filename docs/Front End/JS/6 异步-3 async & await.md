# async & await

是也不完全是 Promise 的语法糖，以同步的写法来执行异步代码，直观。使用 async 即也是创建了 Promise 对象。

```js
async function async1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("执行成功，返回结果");
    }, 1000);
  });
}

async function async2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("执行失败，返回错误信息");
    }, 500);
  });
}

// await is only valid（有效）in async function
async function asyncMain() {
  let result1 = await async1();
  console.log(result1);

  try {
    let result2 = await async2();
  } catch (error) {
    console.log(error);
  }
}

asyncMain();
// 执行成功，返回结果
// 执行失败，返回错误信息
```

