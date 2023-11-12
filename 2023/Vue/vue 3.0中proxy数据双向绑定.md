# vue 3.0 中 proxy 数据双向绑定

- Proxy 可以直接监听对象⽽⾮属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截⽅法,不限于 apply、ownKeys、deleteProperty、has 等等是
- Object.defineProperty 不具备的；
- Proxy 返回的是⼀个新对象,我们可以只操作新的对象达到⽬的,⽽
- Object.defineProperty 只能遍历对象属性直接修改；
- Proxy 作为新标准将受到浏览器⼚商重点持续的性能优化，也就是传说中的新标准的 性能红利；
