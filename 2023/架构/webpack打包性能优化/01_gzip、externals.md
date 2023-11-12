# 使用 gzip 压缩打包后的 js 文件

> 这个方法优化浏览器下载时的文件大小（打包后的文件大小没有改变）

webpack.config.prod.js 中

```js
var CompressionWebpackPlugin = require("compression-webpack-plugin");
// 在 plugins 中添加
new CompressionWebpackPlugin({
  //gzip 压缩
  asset: "[path].gz[query]",
  algorithm: "gzip",
  test: new RegExp(
    ".(js|css)$" //压缩 js 与 css
  ),
  threshold: 10240,
  minRatio: 0.8,
});
```

这样打包出的 css js，会有 css.gz js.gz，即压缩过的 js 和 css。

之后在服务器端的 nginx 配置中开启 gzip：

查看配置文件：vim /usr/local/etc/nginx/nginx.conf

```js
// 写在 http 中就可以
gzip on;
gzip_types application/javascript text/css image/jpeg;
```

## echart 使用外链 js 文件，不引入 npm 包

在 html 中引入  echarts.min.js，china.js，echarts-gl.min.js，echarts-wordcloud.min.js，不引入 npm 包.

在 webpack 生产打包配置中增加：

```js
externals: {
    "react": "React",   // 左边引入时的自定义名字，右边全局变量名
    "react-dom": "ReactDOM",
    "jquery": "jQuery",
    "echarts": "echarts"
}
```

doc.webpack-china.org/configurati… 打包后文件大小减小 0.5M
