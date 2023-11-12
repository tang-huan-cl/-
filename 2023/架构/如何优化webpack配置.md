# 如何优化 webpack 配置

## 缩⼩⽂件查找范围

- 优化 loader
- 优化 resolve.modules
- 优化 resolve.mainFields
- 优化 resolve.alias
- 优化 resolve.extensions
- 优化 module.noPaese

## 使⽤ DllPlugin

- 基础模块抽离，打包到动态链接库
- 需要使⽤模块，直接去动态链接库查找

## 使⽤ HappyPack

- 单线程变多进程

## 使⽤ ParallelUglifyPlugin

- 开启多进程压缩代码，并⾏执⾏

## 使⽤ CDN 加速

- 静态资源放到 CDN 服务器上⾯

## Tree Shaking

- 剔除⽆⽤的代码

## 提取公共代码

- 防⽌相同资源重复加载
- 减少⽹络流量及服务器成本

## 使⽤ prepack

- 编译代码时提前计算结果放到编译后的结果中，⽽不是在代码运⾏才求值
