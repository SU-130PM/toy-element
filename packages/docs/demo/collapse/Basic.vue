<template>
  <er-collapse :model-value="['guide']">
    <er-collapse-item name="guide" title="快速开始">
      Toy Element 使用 Vue 3 + pnpm workspace 构建。
    </er-collapse-item>
    <er-collapse-item name="install" title="安装方式">
      推荐通过 corepack + pnpm 管理依赖。
    </er-collapse-item>
    <er-collapse-item name="release" title="发布说明">
      完成测试、文档和构建校验后再发布。
    </er-collapse-item>
  </er-collapse>
</template>
