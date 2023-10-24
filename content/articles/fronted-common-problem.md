---
    title: '前端常见问题分析'
    description: '一些前端开发常见问题'
    img: 'img/trees.jpg'
    tags: [前端]
---

### 数据类型

#### 进制转化问题

```js
let num1 = 09; // 9
let num2 = 010; // 8
```

0 开始的数字，js 会尝试先把它转成八进制的数字，如果出现大于 8 的数字，则转化为十进制
正规的八进制用`0o`，二进制用`ob`，十六进制用`0x`

#### 精度丢失问题

```js
0.1+0.2 // 0.30000000000000004
// 银行家算法，四舍六入五看情况
// 5 后有值，舍去进 1
// 5 后没值，前一位是奇数，舍去进 1，前一位是偶数，直接舍去
// edge 控制台显示未遵循该算法
2.55.toFixed(1) // '2.5'
2.45.toFixed(1) // '2.5'
// 2. 被解析为浮点数的一部分，无法识别 toFixed()，因此报错
2.toFixed(1) // VM546:1 Uncaught SyntaxError: Invalid or unexpected token
2..toFixed(1) // '2.0'
```

#### 竞态问题

```js
let finalData;
watch(obj, async () => {
  // 发送网络请求
  const res = await fetch("/path/to/request");
  // 请求结果赋值给 data
  finalData = data;
});
```

每次 obj 对象发生变化，发送网络请求，数据请求成功后，结果赋值给 finalData 变量
假如两次修改 obj 的值，无法确定哪次请求先返回结果
vue 中 watch 的解决方案，在 watch 内部每次检测到变更后，在副作用函数重新执行之前，先调用 onInvalidate 函数注册的过期回调

```js
watch(obj, async (newValue, oldValue, onInvalidate) => {
  let expired = false;
  onInvalidate(() => {
    expired = true;
  });
  const res = await fetch("/path/to/request");
  if (!expired) {
    finalData = res;
  }
});
// 第一次修改
obj.foo++;
setTimeout(() => {
  // 200ms 后第二次修改
  obj.foo++;
}, 200);
```

第一次修改 obj.foo，执行 watch 的回调函数，回调函数内调用 onInvalidate，所以会注册一个过期回调，接着发送请求 A，假设请求 A 需要 1000ms 才能返回结果。在 200ms 时第二次修改 obj.foo，执行 watch 的回调函数，每次执行回调函数之前，检查过期回调是否存在，如果存在，优先执行过期回调

所以在 watch 执行第二次回调之前，会优先执行之前注册的过期回调，使得第一次执行的副作用函数的闭包变量 expired 的值未 true，即副作用函数的执行过期。于是请求 A 结果返回时，其结果会被抛弃

<!--  -->

::InfoBox{type="error"}
Here's a handy bit of information for you!

#details
This will be rendered inside the `description` slot. _It's important_ to see how this **works**.
::
