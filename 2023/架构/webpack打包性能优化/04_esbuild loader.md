# esbuild loader

检查 loader 中的 include 和 exclude 使其更加精确
jeffjade.com/2017/08/12/…

```js
{
    test: /.json$/,
    exclude: /node_modules/,
    loader: 'happypack/loader?id=happyjson',
    include: [
        path.join(rootPath, "src/components"),
        path.join(rootPath, "src/mockdata"),
        path.join(rootPath, "src/views"),
    ]
},
{
    test: /.less$/,
    loader: ExtractTextPlugin.extract("style", "happypack/loader?id=happyless"),
    include: [
        path.join(rootPath, "src/components/"),
        path.join(rootPath, "src/assets"),
        path.join(rootPath, "node_modules/antd"),
    ]
},
```

搜索文件范围变窄，可以减小一点打包时间。

## esbuild

关于 esbuild 的介绍，我之前有写过两篇文章，介绍了 esbuild 的原理
esbuild 使用 Go 语言编写，直接编译为 native code，减少了 JavaScript 的编译时间。同时插件等都是从头编写的，打包速度很快
这里不是说要把打包工具完全换成 esbuild，对于老项目来说还是有难度的，老项目可以使用 webpack 的 esbuild loader，也可以一定程度上提高老项目的打包速度
github.com/privatenumb…

具体原理可以看我之前写的这两篇文章：
esbuild(1) - esbuild 基本介绍和原理
esbuild(2) - esbuild 原理浅析
