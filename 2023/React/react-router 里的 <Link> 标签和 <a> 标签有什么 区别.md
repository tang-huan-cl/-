# react-router 里的 <Link> 标签和 <a> 标签有什么 区别

## 区别

如何禁掉 标签默认事件，禁掉之后如何实现跳转。

Link 点击事件 handleClick 部分源码：

```js
if (_this.props.onClick) _this.props.onClick(event);
if (
  !event.defaultPrevented && // onClick阻止默认
  event.button === 0 && // 忽略一切，除了左键
  !_this.props.target && // 让浏览器处理 "target=_blank" etc.
  !isModifiedEvent(event) // 忽略带有修饰符键的单击
) {
  event.preventDefault();
  var history = _this.context.router.history;
  var _this$props = _this.props,
    replace = _this$props.replace,
    to = _this$props.to;
  if (replace) {
    history.replace(to);
  } else {
    history.push(to);
  }
}
```

Link 做了 3 件事情：

- 有 onclick 那就执行 onclick

- click 的时候阻止 a 标签默认事件（这样子点击<a href="/abc">123</a>就 不会跳转和刷新页面）

- 再取得跳转 href（即是 to），用 history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面
