<script setup>
import { ref, computed, onMounted, watch } from "vue";

defineOptions({
  name: "ErSwitch",
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  disabled: Boolean,
  activeText: String,
  inactiveText: String,
  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  name: String,
  id: String,
  size: {
    type: String,
    validator: (val) => !val || ["small", "large"].includes(val),
  },
});

const emits = defineEmits(["update:modelValue", "change"]);

const innerValue = ref(props.modelValue);
const inputRef = ref(null);
const checked = computed(() => innerValue.value === props.activeValue);

function handleChange() {
  if (props.disabled) return;
  const newVal = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newVal;
  emits("update:modelValue", newVal);
  emits("change", newVal);
}

function focus() {
  inputRef.value?.focus();
}

onMounted(() => {
  inputRef.value.checked = checked.value;
});

watch(checked, (val) => {
  inputRef.value.checked = val;
});

watch(
  () => props.modelValue,
  (val) => (innerValue.value = val)
);

defineExpose({ focus, checked });
</script>

<template>
  <div
    class="er-switch"
    :class="[
      size ? `er-switch--${size}` : '',
      { 'is-disabled': disabled, 'is-checked': checked },
    ]"
    @click="handleChange"
  >
    <input
      class="er-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :id="id"
      :name="name"
      :disabled="disabled"
      :checked="checked"
      @keydown.enter="handleChange"
    />
    <div class="er-switch__core">
      <div class="er-switch__core-inner">
        <span v-if="activeText || inactiveText" class="er-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="er-switch__core-action"></div>
    </div>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
