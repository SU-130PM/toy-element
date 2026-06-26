# Tooltip 文字提示

常用于展示鼠标悬浮或点击时的提示信息。

## 基础用法

<div class="demo-block">
  <p>hover 触发</p>
  <div class="demo-line">
    <er-tooltip content="这是一段提示">
      <er-button>悬浮提示</er-button>
    </er-tooltip>
    <er-tooltip content="点击提示" trigger="click">
      <er-button>点击提示</er-button>
    </er-tooltip>
  </div>
</div>

```vue
<er-tooltip content="这是一段提示">
  <er-button>悬浮提示</er-button>
</er-tooltip>
<er-tooltip content="点击提示" trigger="click">
  <er-button>点击提示</er-button>
</er-tooltip>
```

## 不同位置

<div class="demo-block">
  <p>Placement</p>
  <div class="demo-line">
    <er-tooltip content="Top" placement="top">
      <er-button>上</er-button>
    </er-tooltip>
    <er-tooltip content="Bottom" placement="bottom">
      <er-button>下</er-button>
    </er-tooltip>
    <er-tooltip content="Left" placement="left">
      <er-button>左</er-button>
    </er-tooltip>
    <er-tooltip content="Right" placement="right">
      <er-button>右</er-button>
    </er-tooltip>
  </div>
</div>

## Tooltip API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `content` | 提示内容 | `string` | - |
| `placement` | 弹出位置 | `Placement` | `"bottom"` |
| `trigger` | 触发方式 | `"hover" \| "click" \| "contextmenu"` | `"hover"` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `showTimeout` | 显示延迟(ms) | `number` | `0` |
| `hideTimeout` | 隐藏延迟(ms) | `number` | `200` |
| `transition` | 过渡动画 | `string` | `"fade"` |
