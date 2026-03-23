<script setup>
import { ref, provide, watch } from "vue";
import { each } from "lodash-es";
import { collapseProps } from "./type.js";
import { COLLAPSE_CTX_KEY } from "./constants";

const COMPONENT_NAME = "ErCollapse";

class ErUIError extends Error {
  constructor(message) {
    super(message);
    this.name = "ErUIError";
  }
}

const debugWarn = (scope, message) => {
  console.warn(new ErUIError(`[${scope}] ${message}`));
};

defineOptions({
  name: COMPONENT_NAME,
});

const props = defineProps(collapseProps);
const emits = defineEmits(["update:modelValue", "change"]);
const activeNames = ref([...(props.modelValue || [])]);

const validateAccordion = (names) => {
  if (props.accordion && names.length > 1) {
    debugWarn(COMPONENT_NAME, "accordion mode should only have one active item");
  }
};

validateAccordion(activeNames.value);

function handleItemClick(item) {
  const nextActiveNames = [...activeNames.value];

  if (props.accordion) {
    updateActiveNames(nextActiveNames[0] === item ? [] : [item]);
    return;
  }

  const index = nextActiveNames.indexOf(item);
  if (index > -1) {
    nextActiveNames.splice(index, 1);
  } else {
    nextActiveNames.push(item);
  }

  updateActiveNames(nextActiveNames);
}

function updateActiveNames(val) {
  activeNames.value = [...val];
  each(["update:modelValue", "change"], (eventName) => {
    emits(eventName, activeNames.value);
  });
}

watch(
  () => props.modelValue,
  (val) => {
    const normalizedValue = Array.isArray(val) ? [...val] : [];
    validateAccordion(normalizedValue);
    activeNames.value = normalizedValue;
  }
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
