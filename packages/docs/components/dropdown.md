# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

<div class="demo-block">
  <p>Hover 触发</p>
  <er-dropdown
    :items="[
      { label: '黄金糕', command: 'a' },
      { label: '双皮奶', command: 'b' },
      { label: '蚵仔煎', command: 'c', divided: true },
    ]"
    @command="handleCommand"
  >
    <er-button type="primary">下拉菜单</er-button>
  </er-dropdown>
</div>

```vue
<er-dropdown
  :items="[
    { label: '黄金糕', command: 'a' },
    { label: '双皮奶', command: 'b' },
  ]"
  @command="handleCommand"
>
  <er-button>下拉菜单</er-button>
</er-dropdown>
```

<script setup>
function handleCommand(cmd) {
  alert(`点击了: ${cmd}`);
}
</script>

## Dropdown API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 菜单项 | `DropdownItem[]` | `[]` |
| `hideOnClick` | 点击后是否隐藏 | `boolean` | `true` |
| `splitButton` | 是否分割按钮 | `boolean` | `false` |
| `type` | 按钮类型 | `string` | - |
| `size` | 按钮尺寸 | `string` | - |

## DropdownItem API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `command` | 指令标识 | `string \| number` | - |
| `label` | 显示文本 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `divided` | 是否显示分隔线 | `boolean` | `false` |
