# Vue 过滤器原理

过滤器实质不改变原始数据，只是对数据进⾏加⼯处理后返回过滤后的数据再进⾏调⽤处 理。我们看⼀下官⽅的定义：

> Vue.js 允许你⾃定义过滤器，可被⽤于⼀些常⻅的⽂本格式化。过滤 器可以⽤在两个地⽅：双花括号插值和 v-bind 表达式 (后者从 2.1.0+开始⽀持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管 道”符号指⽰:

```js
// <!-- 在双花括号中 -->
{
  {
    message | capitalize;
  }
}
// <!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>;
```

你可以在⼀个组件的选项中定义本地的过滤器：

```js
filters: {
    capitalize: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
```

或者在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
new Vue({
  // ...
});
```

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第⼀个参数。在上述例⼦中，
capitalize 过滤器函数将会收到 message 的值作为第⼀个参数。过滤器可以串联：

```js
{
  {
    message | filterA | filterB;
  }
}
```

在这个例⼦中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作 为参数传⼊到函数中。然后继续调⽤同样被定义为接收单个参数的过滤器函数 filterB，将
filterA 的结果传递到 filterB 中。 过滤器是 JavaScript 函数，因此可以接收参数：

```js
{
  {
    message | filterA("arg1", arg2);
  }
}
```

这⾥，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第⼀个参 数，普通字符串 'arg1' 作为第⼆个参数，表达式 arg2 的值作为第三个参数。

## 过滤器原理

```js
{
  {
    message | capitalize;
  }
}
```

上⾯的过滤器经过⼀顿操作之后就会变成： \_s(\_f("capitalize")(message)) 。

\_f：该函数其实就是 resolveFilter 的别名，作⽤是从 \_this.$options.filter 找到过滤器 并返回
\_s：该函数就是 toString 函数的别名，作⽤是拿到过滤之后的结果并传递给 toString()
函数，结果会保存到 VNode 中的 text 属性，返回结果直接渲染视图

## 串联过滤器

```js
{
  {
    message | filterA | filterB;
  }
}
```

上⾯的串联过滤器经过⼀顿操作之后就会变成： \_s(\_f("filterB")(\_f("filterA")(message)))

这⾥的意思就是 message 作为第⼀个参数传进 filterA 当中，然后经过 filterA 的处理结果就 传进 filterB 当中。 即 filterA 过滤器的结果就是 filterB 过滤器的输⼊ 。

## 过滤器参数接收

```js
{
  {
    message | filterA | filterB("param");
  }
}
```

以上的过滤器的编译结果就是： \_s(\_f("filterB")(\_f("filterA")(message),"param")) 这⾥有⼀点注意的是：这个 param 参数是 filterB 的第⼆个参数，它的第⼀个参数是经过
filterA 处理的结果。

## \_f 函数的原理

\_f 函数其实就是寻找过滤器的，如果找到过滤器就返回过滤器，找不到就返回与参数相同 的值。它的代码其实很简单：

```js
import {identity, resolveAssets} from 'core/util/index' export function resolveFilter(id){ return resolveAssets(this.$options, 'filters', id, true) || identity }
```

我们重点来看⼀下 resolveAssets 到底做了什么事情。

```js
export function resolveAsset (options, type, id, warnMissing){ if(typeof(id) !== 'string'){ return }const assets = options[type] if(hasOwn(assets, id)) return assets[id] const camelizedId = camelize(id) if(hasOwn(assets, camelizedId)) return assets[camelizedId] const PascalCaseId = capitlize(camelizedId) if(hasOwn(assets, PascalCaseId)) return assets[PascalCaseId] //检查原型链
const res assets[id] || assets[camelizedId] || PascalCaseId if(process.env.NODE_ENV!=='production'&& warnMissing&&!res){ warn('Fail to resolve' + type.slice(0,-1)+':'+id, options) }return res }
```

其实它的寻找过程也很简单，主要是做了以下的操作（id 是过滤器 id）：

- 判断过滤器 id 是否为字符串，不是则终⽌ ⽤ assets 存储过滤器
- hasOwn 函数检查 assets ⾃⾝是否存在 id 属性，存在则返回
- hasOwn 函数检查 assets ⾃⾝是否存在 驼峰化后的 id 属性，存在则返回
- hasOwn 函数检查 assets ⾃⾝是否存在将 ⾸字⺟⼤写后的 id 属性，存在则返回
- 如果还是没有，就是去原型链找，找不到就会打印警告

过滤器解析原理 我们想⼀下，解析器是怎么解析过滤器的语法？其实在 vue 内部专门有这么⼀个函数⽤来 解析过滤器语法： parseFilters 它的原理就是解析过滤器列表，然后 循环过滤器列表 并 拼接字符串 。
