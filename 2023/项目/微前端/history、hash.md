

## history

html为history对象添加了两个新方法，用来在浏览历史中添加和修改记录。

1. history.pushState()
2. history.replaceState()

### history.pushState(state,title,url)

- state: 一个与指定网址相关的状态对象，popState事件触发时，该对象会传入回调函数。如果不需要这个对象，可填null
- stitle: 新页面的标题，但是所有浏览器都忽略这个值，可填null
- surl: 新的网址,必须与当前页面处在同一个域

定当前网址 example.com/1.html 我们使用pushState方法在浏览器记录中添加一个新纪录。

```js
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
```

添加上面这个新记录后，浏览器的地址栏立刻显示example.com/2.html。它只是成为浏览器历史中的最新记录。嘉定这是你访问了google.com，然后点击了倒退按钮，页面的url将显示2.html 但是内容仍是原来的1.html。再点击一次到倒退，url将显示1.html.内容不变

总之pushState方法不会触发页面刷新，只是导致hisotry对象发生变化，地址栏会有反应*

### history.replaceState()

history.replaceState方法的参数同上，区别说它修改浏览器历史中当前历史记录。





