# Collapse 折叠面板

用来承载分组信息、常见问题和配置片段，支持多项展开与手风琴模式。

## 基础用法

<div class="demo-block demo-stack">
  <p>可同时展开多个面板</p>
  <er-collapse :model-value="['guide']">
    <er-collapse-item name="guide" title="快速开始">
      Toy Element 使用 Vue 3 + pnpm workspace 构建，适合做组件库练习和轻量业务封装。
    </er-collapse-item>
    <er-collapse-item name="install" title="安装方式">
      推荐通过 corepack + pnpm 管理依赖，再按需选择 core 或 components 包接入。
    </er-collapse-item>
    <er-collapse-item name="release" title="发布说明">
      完成测试、文档和构建校验后，再执行 publish，能明显降低发版后返工成本。
    </er-collapse-item>
  </er-collapse>
</div>

```vue
<er-collapse :model-value="['guide']">
  <er-collapse-item name="guide" title="快速开始">
    ...
  </er-collapse-item>
  <er-collapse-item name="install" title="安装方式">
    ...
  </er-collapse-item>
</er-collapse>
```

## 手风琴模式

<div class="demo-block demo-stack">
  <p>同一时间只展开一项</p>
  <er-collapse accordion :model-value="['faq']">
    <er-collapse-item name="faq" title="FAQ">
      当你希望用户一次只聚焦一个区块时，使用 accordion 会更清晰。
    </er-collapse-item>
    <er-collapse-item name="roadmap" title="Roadmap">
      当前版本已经支持 Button、Icon、Collapse 三组基础能力。
    </er-collapse-item>
    <er-collapse-item name="disabled" title="禁用项" disabled>
      禁用项不会响应点击。
    </er-collapse-item>
  </er-collapse>
</div>

```vue
<er-collapse accordion :model-value="['faq']">
  <er-collapse-item name="faq" title="FAQ">...</er-collapse-item>
  <er-collapse-item name="roadmap" title="Roadmap">...</er-collapse-item>
  <er-collapse-item name="disabled" title="禁用项" disabled>...</er-collapse-item>
</er-collapse>
```

## Collapse API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 当前展开项数组 | `(string \| number)[]` | `[]` |
| `accordion` | 是否开启手风琴模式 | `boolean` | `false` |

## Collapse Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 展开项变化时触发 | `(value: Array<string \| number>)` |
| `change` | 展开项变化时触发 | `(value: Array<string \| number>)` |

## CollapseItem API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 当前面板唯一标识 | `string \| number` | - |
| `title` | 面板标题 | `string` | `""` |
| `disabled` | 是否禁用 | `boolean` | `false` |
