# Button 按钮

常用的操作按钮，支持类型、尺寸、朴素、圆角、圆形、禁用、加载和按钮组。

## 基础用法

<div class="demo-block">
  <p>基础按钮</p>
  <div class="demo-line">
    <er-button>Default</er-button>
    <er-button type="primary">Primary</er-button>
    <er-button type="success">Success</er-button>
    <er-button type="warning">Warning</er-button>
    <er-button type="danger">Danger</er-button>
    <er-button type="info">Info</er-button>
  </div>
</div>

```vue
<er-button>Default</er-button>
<er-button type="primary">Primary</er-button>
<er-button type="success">Success</er-button>
<er-button type="warning">Warning</er-button>
<er-button type="danger">Danger</er-button>
<er-button type="info">Info</er-button>
```

## 朴素按钮

<div class="demo-block">
  <p>Plain</p>
  <div class="demo-line">
    <er-button plain>Plain</er-button>
    <er-button type="primary" plain>Primary</er-button>
    <er-button type="success" plain>Success</er-button>
    <er-button type="warning" plain>Warning</er-button>
    <er-button type="danger" plain>Danger</er-button>
    <er-button type="info" plain>Info</er-button>
  </div>
</div>

## 圆角 / 圆形

<div class="demo-block">
  <p>Round & Circle</p>
  <div class="demo-line">
    <er-button round>Round</er-button>
    <er-button type="primary" round>Primary</er-button>
    <er-button icon="search" circle />
    <er-button type="success" icon="check" circle />
    <er-button type="danger" icon="trash" circle />
  </div>
</div>

## 尺寸

<div class="demo-block">
  <p>Size</p>
  <div class="demo-line">
    <er-button size="large">Large</er-button>
    <er-button>Default</er-button>
    <er-button size="small">Small</er-button>
  </div>
</div>

## 禁用与加载

<div class="demo-block">
  <p>Disabled & Loading</p>
  <div class="demo-line">
    <er-button disabled>Disabled</er-button>
    <er-button type="primary" loading>Loading</er-button>
    <er-button type="success" loading loading-icon="spinner">Loading</er-button>
  </div>
</div>

## 按钮组

<div class="demo-block">
  <p>Button Group</p>
  <div class="demo-line">
    <er-button-group type="primary">
      <er-button>Left</er-button>
      <er-button>Middle</er-button>
      <er-button>Right</er-button>
    </er-button-group>
  </div>
</div>

## Button API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tag` | 根标签 | `string \| Component` | `"button"` |
| `type` | 按钮类型 | `"primary" \| "success" \| "warning" \| "danger" \| "info"` | - |
| `size` | 按钮尺寸 | `"large" \| "default" \| "small"` | - |
| `plain` | 是否朴素按钮 | `boolean` | `false` |
| `round` | 是否圆角 | `boolean` | `false` |
| `circle` | 是否圆形 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `autofocus` | 自动聚焦 | `boolean` | `false` |
| `nativeType` | 原生 type | `"button" \| "submit" \| "reset"` | `"button"` |
| `icon` | 图标名 | `string` | - |
| `loading` | 是否加载中 | `boolean` | `false` |
| `loadingIcon` | 加载图标 | `string` | `"spinner"` |
| `useThrottle` | 是否节流点击 | `boolean` | `true` |
| `throttleDuration` | 节流时间（ms） | `number` | `500` |

## Button Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `(event: MouseEvent)` |
