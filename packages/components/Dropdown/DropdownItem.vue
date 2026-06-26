<script setup>
import { DROPDOWN_CTX_KEY } from "./constants.js";
import { useId } from "@su-130pm/hooks";
import { inject, computed } from "vue";

defineOptions({
  name: "ErDropdownItem",
});

const props = defineProps({
  command: {
    type: [String, Number],
    default: () => useId().value,
  },
  label: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  divided: {
    type: Boolean,
    default: false,
  },
});

const ctx = inject(DROPDOWN_CTX_KEY);
const size = computed(() => ctx?.size?.value);

function handleClick() {
  if (props.disabled) return;
  ctx?.handleItemClick(props);
}
</script>

<template>
  <li v-if="divided" role="separator" class="divided-placeholder"></li>
  <li
    :id="`dropdown-item-${command ?? useId().value}`"
    :class="{
      'er-dropdown__item': true,
      [`er-dropdown__item--${size}`]: size,
      'is-disabled': disabled,
      'is-divided': divided,
    }"
    @click="handleClick"
  >
    <slot>
      {{ label }}
    </slot>
  </li>
</template>

<style scoped>
@import "./style.css";
</style>
