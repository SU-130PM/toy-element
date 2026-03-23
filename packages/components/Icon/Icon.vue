<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";

defineOptions({
  name: "ErIcon",
  inheritAttrs: false,
});

const props = defineProps({
  border: Boolean,
  fixedWidth: Boolean,
  flip: String,
  icon: {
    type: [Object, Array, String],
    required: true,
  },
  mask: [Object, Array, String],
  listItem: Boolean,
  pull: String,
  pulse: Boolean,
  rotation: [Number, String],
  swapOpacity: Boolean,
  size: String,
  spin: Boolean,
  transform: [Object, String],
  symbol: [Boolean, String],
  title: String,
  inverse: Boolean,
  bounce: Boolean,
  shake: Boolean,
  beat: Boolean,
  fade: Boolean,
  beatFade: Boolean,
  spinPulse: Boolean,
  spinReverse: Boolean,
  type: String,
  color: String,
});

const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>

<template>
  <i
    class="er-icon"
    :class="{ [`er-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped>
@import "./style.css";
</style>


<!-- 
<ErIcon color="red" /> 是怎么变成 style="color:red"

现在我们按执行流程走一遍。

① 外部使用
<ErIcon color="red" />
② color 被 defineProps 接收
const props = defineProps({
  color: String
})

于是：

props.color === "red"
③ customStyles 计算
const customStyles = computed(() => ({
  color: props.color ?? void 0
}));

变成：

{ color: "red" }
④ 绑定到 <i>
:style="customStyles"

Vue 自动渲染成：

<i style="color: red;">

这就是完整链路。 
-->