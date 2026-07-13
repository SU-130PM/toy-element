<script setup>
import { SELECT_CTX_KEY } from "./constants.js";
import { get, eq, every } from "lodash-es";
import { computed, inject } from "vue";
import { RenderVnode } from "@su-130pm/utils";

defineOptions({
  name: "ErOption",
});

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const ctx = inject(SELECT_CTX_KEY);

const selected = computed(
  () => ctx?.selectStates?.selectedOption?.value === props.value
);

const isHighlighted = computed(() =>
  every(["label", "value"], (key) =>
    eq(get(ctx?.highlightedLine, key), get(props, key))
  )
);

function handleClick() {
  if (props.disabled) return;
  ctx?.handleSelect(props);
}
</script>

<template>
  <li
    class="er-select__menu-item"
    :class="{
      'is-disabled': disabled,
      'is-selected': selected,
      'is-highlighted': isHighlighted,
    }"
    :id="`select-item-${value}`"
    @click.stop="handleClick"
  >
    <slot>
      <RenderVnode
        :vNode="ctx?.renderLabel ? ctx?.renderLabel(props) : label"
      />
    </slot>
  </li>
</template>

<style scoped>
@import "./style.css";
</style>
