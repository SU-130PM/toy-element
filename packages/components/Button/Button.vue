<script setup>
import { ref, computed, inject } from "vue";
import { BUTTON_GROUP_CTX_KEY } from "./constants";
import { throttle } from "lodash-es";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErButton",
});

const props = defineProps({
  tag: {
    type: [String, Object],
    default: "button",
  },
  type: String,
  size: String,
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  disabled: Boolean,
  autofocus: Boolean,
  nativeType: {
    type: String,
    default: "button",
  },
  icon: [Object, Array, String],
  loading: Boolean,
  loadingIcon: {
    type: [Object, Array, String],
    default: "spinner",
  },
  useThrottle: {
    type: Boolean,
    default: true,
  },
  throttleDuration: {
    type: Number,
    default: 500,
  },
});

const emits = defineEmits(["click"]);
const slots = defineSlots();
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);

const _ref = ref();
const size = computed(() => buttonGroupCtx?.size ?? props.size ?? "");
const type = computed(() => buttonGroupCtx?.type ?? props.type ?? "");
const disabled = computed(
  () => props.disabled || buttonGroupCtx?.disabled || false
);
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

const handleBtnClick = (e) => {
  emits("click", e);
};
const handleButtonClickThrottle = throttle(handleBtnClick, props.throttleDuration);

defineExpose({
  ref: _ref,
  disabled,
  size,
  type,
});
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    class="er-button"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading ? true : void 0"
    :type="tag === 'button' ? nativeType : void 0"
    :autofocus="autofocus"
    @click="
      (e) =>
        useThrottle ? handleButtonClickThrottle(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="loadingIcon"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <er-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />
    <slot></slot>
  </component>
</template>

<style scoped>
@import "./style.css";
</style>


<!--
对 ErButton 做“执行路径拆解”。

一、外部使用

假设这样用：

<ErButton
  type="primary"
  size="small"
  plain
  :loading="true"
>
  提交
</ErButton>
二、进入组件（props 解析阶段）

在 Button.vue 里会有类似：

const props = defineProps({
  type: String,
  size: String,
  plain: Boolean,
  round: Boolean,
  circle: Boolean,
  disabled: Boolean,
  loading: Boolean,
  nativeType: String,
  tag: {
    type: String,
    default: "button"
  }
})

此时 Vue 做的第一件事：

props = {
  type: "primary",
  size: "small",
  plain: true,
  loading: true
}
三、计算 disabled

你之前问过：

为什么 disabled 要 group 优先？

通常真实写法是：

const disabled = computed(() => {
  return group?.disabled ?? props.disabled
})

意思是：

优先使用 ButtonGroup 的 disabled
如果没有 group，再用自身的

四、进入 template 渲染阶段

模板核心是：

<component
  :is="tag"
  class="er-button"
  :class="{
    [`er-button--${type}`]: type,
    [`er-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
    'is-loading': loading,
  }"
  :disabled="disabled || loading ? true : void 0"
>

我们一步一步拆。

五、:is="tag" 动态组件

默认：

tag === "button"

等价于：

<button>

如果：

<ErButton tag="a" />

就变成：

<a>

这叫 动态组件渲染机制

六、class 是怎么拼出来的

输入：

type = "primary"
size = "small"
plain = true
loading = true

Vue 内部会把对象 class 处理成：

{
  "er-button--primary": true,
  "er-button--small": true,
  "is-plain": true,
  "is-loading": true
}

然后转换成字符串：

class="er-button er-button--primary er-button--small is-plain is-loading"
七、:disabled="disabled || loading ? true : void 0"

这行很关键。

如果：

loading === true

即使你没传 disabled，也会强制：

disabled

为什么？

因为 loading 状态下按钮必须不可点击。

八、点击事件执行流程
@click="(e) => useThrottle 
  ? handlBtneCLickThrottle(e) 
  : handleBtnClick(e)"

逻辑是：

判断是否开启节流

如果开启 → 走节流函数

否则 → 直接触发 click

内部一般会：

if (disabled || loading) return
emit('click', e)
九、loading 插槽渲染流程
<template v-if="loading">
  <slot name="loading">
    <er-icon spin />
  </slot>
</template>

如果 loading = true：

优先使用：

<template #loading>

否则使用默认：

<er-icon spin />

这个 er-icon 是你之前分析的那个组件。

十、完整渲染结果

假设：

<ErButton
  type="primary"
  size="small"
  plain
  :loading="true"
>
  提交
</ErButton>

最终 DOM 大概是：

<button
  class="er-button er-button--primary er-button--small is-plain is-loading"
  disabled
>
  <i class="er-icon loading-icon">
    [font-awesome-icon]
  </i>
  提交
</button>
十一、加入 ButtonGroup 后流程变化

如果写：

<ErButtonGroup disabled size="large">
  <ErButton>1</ErButton>
  <ErButton>2</ErButton>
</ErButtonGroup>

执行流程会多一步：

1️⃣ Group provide
provide(BUTTON_GROUP_CTX_KEY, {
  size,
  disabled
})
2️⃣ Button inject
const group = inject(BUTTON_GROUP_CTX_KEY, null)
3️⃣ computed 优先 group
size = group?.size ?? props.size
disabled = group?.disabled ?? props.disabled

最终：

<button class="er-button er-button--large is-disabled">
十二、整个 ErButton 的架构本质

它做了 5 件事：

动态标签渲染

BEM class 拼接

组件上下文继承（group）

状态互斥控制（loading = 强制 disabled）

插槽增强
-->
