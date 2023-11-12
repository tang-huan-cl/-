# new

1. 新建了一个空对象

2. 这个对象原型指向构造函数的 prototype

3. 绑定 this 并执行构造函数

4. 返回构造函数显示返回的值或新对象

```js
function myNew(...args) {
  // 1.获取构造函数
  const constructor = args.shift();
  // 2.创建空对象并设置原型
  const obj = Object.create(constructor.prototype);

  console.log("------------------>1", obj);
  // 3.绑定this并执行构造函数
  const result = constructor.apply(obj, args);
  // 4.返回构造函数显示返回的值或新对象
  return isObject(result) ? result : obj;
}
```
