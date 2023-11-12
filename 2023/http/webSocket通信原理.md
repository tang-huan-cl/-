# webSocket 通信原理

- 客户端会先发送⼀个 HTTP 请求，包含⼀个 Upgrade 请求头来告诉服务端要升级为 WebSocket 协议

- 服务器就会返回 101 状态码并切换为 WebSocket 协议建⽴全双⼯连接，后续信息将会 通过这个协议进⾏传输

有⼏个头信息需要注意⼀下：
Sec-WebSocket-Key：客户端随机⽣成的⼀个 base64 编码
Sec-WebSocket-Accept：服务端经过算法处理后回传给客户端
Connection 和 Upgrade 字段告诉服务器，客户端发起的是 WebSocket 协议请求
