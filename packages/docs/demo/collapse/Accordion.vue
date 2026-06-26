<template>
  <er-collapse accordion :model-value="['faq']">
    <er-collapse-item name="faq" title="FAQ">
      手风琴模式下一次只展开一项。
    </er-collapse-item>
    <er-collapse-item name="roadmap" title="Roadmap">
      当前版本支持 Button, Icon, Collapse 等组件。
    </er-collapse-item>
    <er-collapse-item name="disabled" title="禁用项" disabled>
      禁用项不会响应点击。
    </er-collapse-item>
  </er-collapse>
</template>
