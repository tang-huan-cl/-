# GET 和 POST 的区别

- get 参数通过 url 传递，post 放在 request body 中。

- get 请求在 url 中传递的参数是有长度限制的，而 post 没有。

- get 比 post 更不安全，因为参数直接暴露在 url 中，所以不能用来传递敏感信息。

- get 请求只能进行 url 编码，而 post 支持多种编码方式

- get 请求会浏览器主动 cache，而 post 支持多种编码方式。

- get 请求参数会被完整保留在浏览历史记录里，而 post 中的参数不会被保留。

- GET 和 POST 本质上就是 TCP 链接，并无差别。但是由于 HTTP 的规定和浏览器/服务器 的限制，导致他们在应用过程中体现出一些不同。

- GET 产生一个 TCP 数据包；POST 产生两个 TCP 数据包。
