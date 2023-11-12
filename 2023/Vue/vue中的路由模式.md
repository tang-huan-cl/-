# vue 中的路由模式

## history 模式

- HTML5 中的两个 API：pushState 和 replaceState，改变 url 之后⻚⾯不会重新刷新，也 不会带有#号，⻚⾯地址美观;
- url 的改变会触发 popState 事件，监听该事件也可以实 现根据不同的 url 渲染对应的⻚⾯内容但是因为没有#会导致⽤户在刷新⻚⾯的时候， 还会发送请求到服务端，为避免这种情况，需要每次 url 改变的时候，都将所有的路由 重新定位到根路由下

## hash 模式

- url hash: http ://foo.com/#help#后⾯ hash 值的改变，并不会重新加载⻚⾯；
- 同时 hash 值的变化会触发 hashchange 事件，该事件可以监听，可根据不同的哈希值渲染不同
  的⻚⾯内容
