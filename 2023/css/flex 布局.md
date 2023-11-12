# flex 布局

> 弹性布局 display: flex

## 父容器属性

- flex-direction： 性决定主轴的方向；

- flex-wrap：是否换行；

- flex-flow：flex-direction 属性和 flex-wrap 属性的简写形式

- justify-content：主轴的方向对齐方式

- align-items：交叉轴上如何对齐方式

## 子容器属性

- order 排列顺序，数值越小，排列越靠前，默认为 0

- flex-grow 放大比例，默认为 0，即如果存在剩余空间，也不放大。

- flex-shrink 缩小比例，默认为 1，即如果空间不足，该项目将缩小。

- flex-basis 在分配多余空间之前，项目占据的主轴空间（main size）。

- flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性 可选。

- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。
