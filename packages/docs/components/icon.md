# Icon 图标

基于 FontAwesome 的图标组件，支持所有 FA 图标和类型颜色。

## 基础用法

<div class="demo-block">
  <p>图标展示</p>
  <div class="demo-line">
    <er-icon icon="spinner" spin />
    <er-icon icon="search" />
    <er-icon icon="check" />
    <er-icon icon="trash" />
    <er-icon icon="angle-down" />
    <er-icon icon="angle-right" />
  </div>
</div>

```vue
<er-icon icon="spinner" spin />
<er-icon icon="search" />
<er-icon icon="check" />
```

## 类型颜色

<div class="demo-block">
  <p>Type 属性</p>
  <div class="demo-line">
    <er-icon icon="circle-info" type="info" />
    <er-icon icon="check-circle" type="success" />
    <er-icon icon="circle-exclamation" type="warning" />
    <er-icon icon="circle-xmark" type="danger" />
  </div>
</div>

```vue
<er-icon icon="circle-info" type="info" />
<er-icon icon="check-circle" type="success" />
<er-icon icon="circle-exclamation" type="warning" />
<er-icon icon="circle-xmark" type="danger" />
```

## 自定义颜色

<div class="demo-block">
  <p>Color 属性</p>
  <div class="demo-line">
    <er-icon icon="search" color="#409eff" />
    <er-icon icon="check" color="#67c23a" />
    <er-icon icon="star" color="#e6a23c" />
  </div>
</div>

```vue
<er-icon icon="search" color="#409eff" />
<er-icon icon="check" color="#67c23a" />
```
