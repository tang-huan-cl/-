# defer、async

## 正常情况下：

- 浏览器在解析 HTML 文档时，如果遇到 script ，便会停下对 HTML 文档的解析，转而去处理脚本；
- 如果脚本是内联的，浏览器会先去执行这段内联的脚本；
- 如果是外链的，那么先会去加载脚本，然后再执行；
- 等到脚本执行结束后，浏览器才会继续解析 HTML 文档。

## defer

该属性用来设置 script 引用的外部脚本在文档完成解析后，触发 DOMContentLoaded 事件之前执行。

- 不会阻碍文档的解析，只会在文档解析的同时去并行加载脚本信息；
- 当文档解析完成后，暂时阻止 DOMContentLoaded 事件的执行；
- 去执行已经加载好的脚本信息，如果此时脚本还未加载完成，则会等待脚本加载完成后，再执行该脚本；
- 执行完成后，再触发 DOMContentLoaded 事件。

注意：

- 内嵌脚本，则设置 defer 属性无效；
- 除此之外，defer 属性对模块脚本也不起作用，因为模块脚本默认 defer。

## async

- 设置 script 引用的外部脚本异步加载，不阻塞 HTML 文档的解析。
- 当加载完成后，如果此时文档还没解析完成，则会终止解析，先执行该脚本，执行结束后再继续解析；
- 如果此时文档已经解析完成了，那就是立即执行该脚本。所以设置该属性的外部脚本的执行时机并不确定，根据网络状况可能会在 DOMContentLoaded 事件之前，也有可能会在 DOMContentLoaded 事件之后。所以在脚本里面可能会获取不到在 HTML 中定义的元素，因为此时元素可能还没有被解析

注意：

- 我们在 js 中通过 document.createElement("script");创建的 script 标签，如果我们通过给其 src 属性设置引用脚本，则这个创建的脚本默认为 async 异步的。
- 如果我们通过其 textContent 设置内嵌脚本信息，则这个创建的脚本默认为 async 同步的。

```js
console.log("这是内嵌的JS脚本");
document.addEventListener("DOMContentLoaded", function () {
  console.log("这是页面的DOMContentLoaded事件");
});

// 创建异步脚本
const script = document.createElement("script");
script.src = "./js/test.js";
document.body.appendChild(script);

// 创建同步脚本
const script = document.createElement("script");
script.textContent = "console.log('这是创建出来的同步脚本')";
document.body.appendChild(script);
```
