<script setup>
import { computed } from "vue";
import { isString } from "lodash-es";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErLoading",
  inheritAttrs: false,
});

const props = defineProps({
  visible: [Boolean, Object],
  text: String,
  spinner: [Boolean, String],
  background: String,
  zIndex: [Number, String],
  fullscreen: Boolean,
  onAfterLeave: Function,
});

const iconName = computed(() => {
  if (isString(props.spinner)) return props.spinner;
  return "spinner";
});
</script>

<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="visible?.value ?? visible"
      class="er-loading er-loading__mask"
      :class="{ 'is-fullscreen': fullscreen }"
    >
      <div class="er-loading__spinner">
        <ErIcon v-if="spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="er-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<style>
@import "./style.css";
.er-loading {
  --er-loading-bg-color: v-bind(background) !important;
  --er-loading-z-index: v-bind(zIndex) !important;
}
</style>
