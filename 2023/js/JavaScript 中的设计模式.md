# JavaScript 中的设计模式

说说你了解并掌握的设计模式在 JavaScript 中的实现。

## 单例模式 Singleton Pattern

保证⼀个类只有⼀个实例，并提供⼀个访问它的全局访问点（调⽤⼀个类，任何时候返回 的都是同⼀个实例）

实现⽅法：使⽤⼀个变量来标志当前是否已经为某个类创建过对象，如果创建了，则在下 ⼀次获取该类的实例时，直接返回之前创建的对象，否则就创建⼀个对象。

```js
class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }
  getName() {
    alert(this.name);
  }
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }
}
```

## ⼯⼚模式 Factory Pattern

⼯⼚模式定义⼀个⽤于创建对象的接⼝，这个接⼝由⼦类决定实例化哪⼀个类。该模式使 ⼀个类的实例化延迟到了⼦类。⽽⼦类可以重写接⼝⽅法以便创建的时候指定⾃⼰的对象 类型。

简单说：假如我们想在⽹⻚⾯⾥插⼊⼀些元素，⽽这些元素类型不固定，可能是图⽚、链 接、⽂本，根据⼯⼚模式的定义，在⼯⼚模式下，⼯⼚函数只需接受我们要创建的元素的 类型，其他的⼯⼚函数帮我们处理。

```js
// ⽂本⼯⼚
class Text {
  constructor(text) {
    this.text = text;
  }
  insert(where) {
    const txt = document.createTextNode(this.text);
    where.appendChild(txt);
  }
}

// 链接⼯⼚
class Link {
  constructor(url) {
    this.url = url;
  }
  insert(where) {
    const link = document.createElement("a");
    link.href = this.url;
    link.appendChild(document.createTextNode(this.url));
    where.appendChild(link);
  }
}

// 图⽚⼯⼚
class Image {
  constructor(url) {
    this.url = url;
  }
  insert(where) {
    const img = document.createElement("img");
    img.src = this.url;
    where.appendChild(img);
  }
}

// DOM⼯⼚
class DomFactory {
  constructor(type) {
    return new (this[type]())();
  }
  // 各流⽔线
  link() {
    return Link;
  }
  text() {
    return Text;
  }
  image() {
    return Image;
  }
}

// 创建⼯⼚
const linkFactory = new DomFactory("link");
const textFactory = new DomFactory("text");
linkFactory.url = "https://surmon.me";
linkFactory.insert(document.body);
textFactory.text = "HI! I am surmon.";
textFactory.insert(document.body);
```
