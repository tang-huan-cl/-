# 要求设计 LazyMan 类，实现以下功能

## 案例：

```js
LazyMan("Tony");
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了 10 秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了 10 秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(1 0).eat('junk food');
// Hi I am Tony
// 等待了 5 秒...
// I am eating lunch
// I am eating dinner
// 等待了 10 秒...
// I am eating junk food
```

## 答：

```js
const LazyMan = (name) => {
  console.log("Hi I am ", name);
  const queue = [];

  const next = () => {
    const f = queue.shift();
    f && f();
  };

  setTimeout(() => {
    next();
  }, 0);

  const obj = {
    eat: (v) => {
      const cb = () => {
        console.log("I am eating ", v);
        next();
      };
      queue.push(cb);
      return obj;
    },
    sleep: (t) => {
      const cb = () => {
        setTimeout(() => {
          console.log(`等待了 ${t} 秒...`);
          next();
        }, t);
      };
      queue.push(cb);
      return obj;
    },
    sleepFirst: (t) => {
      const cb = () => {
        setTimeout(() => {
          console.log(`等待了 ${t} 秒...`);
          next();
        }, t);
      };
      queue.unshift(cb);
      return obj;
    },
  };

  return obj;
};
```

```js
class LazyManClass {
  constructor() {
    this.name = name;
    this.queue = [];
    console.log("Hi I am ", this.name);
    setTimeout(() => {
      this.next();
    }, 0);
  }
  eat = (food) => {
    const fn = () => {
      console.log(`I am eating ${food}`);
      this.next();
    };
    this.queue.push(fn);
    return this;
  };
  sleep = (time) => {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time);
    };
    this.queue.push(fn);
    return this;
  };
  sleepFirst = (time) => {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time);
    };
    this.queue.unshift(fn);
    return this;
  };

  next = () => {
    const fn = this.queue.shift();
    fn && fn();
  };
}

const LazyMan = (name) => {
  return new LazyManClass(name);
};
```
