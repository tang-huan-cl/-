# uglify、happypack

## 使用 webpack-parallel-uglify-plugin 替代 webpack.optimize.UglifyJsPlugin 并行混淆压缩 js 文件，打包时间从四分钟减到两分钟。用法和 UglifyJsPlugin 相同。

```js
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
new ParallelUglifyPlugin({
    uglifyJS: {
        output: {
            comments: false  //去掉注释
        },
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        }
    }
}),
```

## happypack 多进程执行 loader

原理
配置方式
引入 happypack
支持的 loader 列表

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "happypack/loader?id=happybabel",
        exclude: /node_modules/,
      },
      {
        test: /.json$/,
        exclude: /node_modules/,
        loader: "happypack/loader?id=happyjson",
        include: [
          path.join(rootPath, "src/components"),
          path.join(rootPath, "src/mockdata"),
          path.join(rootPath, "src/views"),
        ],
      },
      {
        test: /.less$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "happypack/loader?id=happyless"
        ),
        include: [
          path.join(rootPath, "src/components/"),
          path.join(rootPath, "src/assets"),
          path.join(rootPath, "node_modules/antd"),
        ],
      },
    ],
  },
  plugins: [
    createHappyPlugin("happybabel", [
      {
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          plugins: [
            ["import", { libraryName: "antd", style: true }], // `style: true` 会加载 less 文件
          ],
        },
      },
    ]),
    createHappyPlugin("happyjson", ["json-loader"]),
    createHappyPlugin("happyless", ["css-loader?sourceMap!less"]),
  ],
};
function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: true,
  });
}
```
