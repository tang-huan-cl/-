# ajax/axios/fetch 区别

## ajax

- 不符合现在前端 MVVM 的浪潮
- 基于原⽣的 XHR 开发，XHR 本⾝的架构不清晰
- jQuery 整个项⽬太⼤，单纯使⽤ ajax 却要引⼊整个 jQuery

## axios

- 从 node.js 创建 http 请求
- ⽀持 Promise API
- 客户端⽀持防⽌ CSRF
- 提供了⼀些并发请求的接⼝

## fetch

- 更加底层，提供的 API 丰富（request, response）
- 脱离了 XHR，是 ES 规范⾥新的实现⽅式
- fetch 只对⽹络请求报错，对 400，500 都当做成功的请求，需要封装去处理
- fetch 默认不会带 cookie，需要添加配置项
- fetch 没有办法原⽣监测请求的进度，⽽ XHR 可以
