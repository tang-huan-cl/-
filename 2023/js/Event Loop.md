# Event Loop

先说说概念吧，JS 是⼀种单线程语⾔，所谓单线程，意思就是⼀次只能执⾏⼀个任务， 如果有多个任务，那么就排队，执⾏完⼀个再执⾏下⼀个 (还有其他⽅案，⽐如多线程或 多进程)。这样的模式势必会造成资源浪费，也就是说，下⼀个任务必须等待，造成⼀种 “假死” 的情况，从⽽⽆法响应⽤户的⾏为。那为什么 JS 从⼀开始不设计为⼀个多线程语 ⾔呢? 这是历史原因造成的，JS 本⾝被创造出来就是为了解决⼀些简单问题的，并且 JS 没有锁机制，如果存在多线程，DOM 操作将会变得复杂且不可控。当然，现在可以使⽤ Web Worker API 来实现多线程。
当这种等待机制运⾏时，会造成阻塞，这也就是同步机制，Event Loop 就是为了解决这 个问题⽽⽣的。

> Event Loop 是⼀个程序结构，⽤于等待和发送消息和事件

简单说，就是在程序中设置两个线程：

- ⼀个负责程序本⾝的运⾏，称为 “主线程”；
- 另⼀个负责主线程与其他进程（主要是各种 I/O 操作）的通信，被称为 “Event Loop 线程”（可 以译为 “消息线程”）。

每当遇到 I/O 的时候，主线程就让 Event Loop 线程去通知相应的 I/O 程序，然后接着往后 运⾏, 等到 I/O 程序完成操作， Event Loop 线程再把结果返回主线程。主线程就调⽤事先 设定的回调函数，完成整个任务。

上⾯介绍的这种运⾏模式，就被称为 “异步模式”，或者 “⾮阻塞模式”。 下⾯我们再⽤⼏个例⼦来说明

## Event Loop 中的⼏个概念。

JS 在执⾏的过程中会产⽣执⾏环境，这些执⾏环境会被顺序的加⼊到执⾏栈中。如果遇 到异步的代码，会被挂起并加⼊到 Task （有多种 task） 队列中。⼀旦执⾏栈为空， Event Loop 就会从 Task 队列中拿出需要执⾏的代码并放⼊执⾏栈中执⾏，所以本质上来 说 JS 中的异步还是同步⾏为。

```js
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
console.log("script end");
// script start -> script end -> setTimeout
```

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为微任务（ microtask ）和 宏任务（ macrotask ）。在 ES6 规范中， microtask 称为 jobs ， macrotask 称为 task 。

```js
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  console.log("Promise");
  resolve();
})
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

> 微任务包括 process.nextTick ， promise ， Object.observe ， MutationObserver

> 宏任务包括 script ， setTimeout ， setInterval ， setImmediate ， I/O ， UI rendering

所以正确的⼀次 Event loop 顺序是这样的

- 执⾏同步代码，这属于宏任务

- 执⾏栈为空，查询是否有微任务需要执⾏

- 执⾏所有微任务

- 必要的话渲染 UI

- 然后开始下⼀轮 Event loop，执⾏宏任务中的异步代码

除此之外，这⾥不得不提⼀下，Node 中也存在 Event Loop 机制，并且与浏览器中的不⼀ 样。

Node 的 Event loop 分为 6 个阶段，它们会按照顺序反复运⾏

┌───────────────────────┐
┌─>│ timers │
│ └──────────┬────────────┘
│ ┌──────────┴────────────┐
│ │ I/O callbacks │
│ └──────────┬────────────┘
│ ┌──────────┴────────────┐
│ │ idle, prepare │
│ └──────────┬────────────┘ ┌───────────────┐
│ ┌──────────┴────────────┐ │ incoming: │
│ │ poll │<──connections─── │
│ └──────────┬────────────┘ │ data, etc. │
│ ┌──────────┴────────────┐ └───────────────┘
│ │ check │
│ └──────────┬────────────┘
│ ┌──────────┴────────────┐
└──┤ close callbacks │
└───────────────────────┘

### timer

timers 阶段会执⾏ setTimeout 和 setInterval

⼀个 timer 指定的时间并不是准确时间，⽽是在达到这个时间后尽快执⾏回调，可能会 因为系统正在执⾏别的事务⽽延迟。 下限的时间有⼀个范围：[1, 2147483647] ，如果设定的时间不在这个范围，将被设置为 1。

### I/O

I/O 阶段会执⾏除了 close 事件，定时器和 setImmediate 的回调

### idle, prepare

idle , prepare 阶段内部实现

### poll

poll 阶段很重要，这⼀阶段中，系统会做两件事情

- 执⾏到点的定时器
- 执⾏ poll 队列中的事件

并且当 poll 中没有定时器的情况下，会发现以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执⾏，直到队列为空或者系统限制
- 如果 poll 队列为空，会有两件事发⽣

如果有 setImmediate 需要执⾏， poll 阶段会停⽌并且进⼊到 check 阶段执⾏ setImmediate
如果没有 setImmediate 需要执⾏，会等待回调被加⼊到队列中并⽴即执⾏回调
如果有别的定时器需要被执⾏，会回到 timer 阶段执⾏回调。

### check

check 阶段执⾏ setImmediate

### close callbacks

close callbacks 阶段执⾏ close 事件 并且在 Node 中，有些情况下的定时器执⾏顺序是随机的

```js
setTimeout(() => {
  console.log("setTimeout");
  6;
}, 0);
setImmediate(() => {
  console.log("setImmediate");
});
// 这⾥可能会输出 setTimeout，setImmediate
// 可能也会相反的输出，这取决于性能
// 因为可能进⼊ event loop ⽤了不到 1 毫秒，这时候会执⾏ setImmediate
// 否则会执⾏ setTimeout
```

当然在这种情况下，执⾏顺序是相同的

```js
var fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});
// 因为 readFile 的回调在 poll 中执⾏
// 发现有 setImmediate ，所以会⽴即跳到 check 阶段执⾏回调
// 再去 timer 阶段执⾏ setTimeout
// 所以以上输出⼀定是 setImmediate，setTimeout
```

上⾯介绍的都是 macrotask 的执⾏情况， microtask 会在以上每个阶段完成后⽴即执⾏。

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
// 以上代码在浏览器和 node 中打印情况是不同的
// 浏览器中打印 timer1, promise1, timer2, promise2
// node 中打印 timer1, timer2, promise1, promise2
```

Node 中的 process.nextTick 会先于其他 microtask 执⾏。

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
process.nextTick(() => {
  console.log("nextTick");
}); // nextTick, timer1, promise1
```
