# Alert 警告

用于页面中展示重要的提示信息。

## 基础用法

<div class="demo-block">
  <p>基础提示</p>
  <er-alert title="Info 提示" type="info" show-icon />
  <er-alert title="Success 提示" type="success" show-icon />
  <er-alert title="Warning 提示" type="warning" show-icon />
  <er-alert title="Danger 提示" type="danger" show-icon />
</div>

```vue
<er-alert title="Info 提示" type="info" show-icon />
<er-alert title="Success 提示" type="success" show-icon />
<er-alert title="Warning 提示" type="warning" show-icon />
<er-alert title="Danger 提示" type="danger" show-icon />
```

## 带描述

<div class="demo-block">
  <er-alert
    title="带描述的 Alert"
    type="success"
    description="这是一条带有详细描述信息的成功提示。"
    show-icon
  />
</div>

```vue
<er-alert
  title="带描述的 Alert"
  type="success"
  description="这是一条带有详细描述信息的成功提示。"
  show-icon
/>
```

## 可关闭

<div class="demo-block">
  <er-alert title="可关闭的 Alert" type="info" closable show-icon />
  <er-alert title="不可关闭的 Alert" type="warning" :closable="false" show-icon />
</div>

```vue
<er-alert title="可关闭的 Alert" type="info" closable />
<er-alert title="不可关闭的 Alert" type="warning" :closable="false" />
```

## Alert API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | - |
| `type` | 类型 | `"success" \| "info" \| "warning" \| "danger"` | `"info"` |
| `description` | 描述文字 | `string` | - |
| `effect` | 效果 | `"light" \| "dark"` | `"light"` |
| `closable` | 是否可关闭 | `boolean` | `true` |
| `center` | 是否居中 | `boolean` | `false` |
| `showIcon` | 是否显示图标 | `boolean` | `false` |
