<script setup>
import { ref } from "vue";

const basicActiveNames = ref(["overview"]);
const accordionActiveNames = ref(["shipping"]);
</script>

<template>
  <main class="play-app">
    <section class="hero-card">
      <span class="eyebrow">Toy Element</span>
      <h1>Button + Collapse playground</h1>
      <p>
        一个面向 Vue 3 的小型组件库工作台，用来同时验证基础交互、文档示例和发布前体验。
      </p>
      <div class="hero-actions">
        <er-button type="primary">Primary Action</er-button>
        <er-button plain>Secondary Action</er-button>
      </div>
    </section>

    <section class="demo-grid">
      <article class="demo-card">
        <h2>基础折叠面板</h2>
        <er-collapse v-model="basicActiveNames">
          <er-collapse-item name="overview" title="Overview">
            Collapse 组件支持多项展开，适合 FAQ、配置概览和分组内容展示。
          </er-collapse-item>
          <er-collapse-item name="api" title="API Notes">
            内部状态与 `v-model` 同步，同时对外派发 `change` 和 `update:modelValue`。
          </er-collapse-item>
          <er-collapse-item name="release" title="Release Checklist">
            发布前建议完成测试、play 构建、docs 构建以及版本号检查。
          </er-collapse-item>
        </er-collapse>
      </article>

      <article class="demo-card">
        <h2>手风琴模式</h2>
        <er-collapse v-model="accordionActiveNames" accordion>
          <er-collapse-item name="shipping" title="Shipping">
            手风琴模式一次只会展开一个内容区块，适合信息层级更强的场景。
          </er-collapse-item>
          <er-collapse-item name="quality" title="Quality Gate">
            当前发布链路包括组件测试、文档构建和 core/play 验证。
          </er-collapse-item>
          <er-collapse-item name="disabled" title="Disabled" disabled>
            这一项被禁用，点击时不会触发切换。
          </er-collapse-item>
        </er-collapse>
      </article>
    </section>
  </main>
</template>
