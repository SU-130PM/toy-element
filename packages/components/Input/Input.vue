<script setup>
import { ref, computed, watch } from "vue";
import { each, noop } from "lodash-es";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErInput",
  inheritAttrs: false,
});

const props = defineProps({
  id: String,
  modelValue: String,
  type: {
    type: String,
    default: "text",
  },
  size: {
    type: String,
    validator: (val) => !val || ["large", "small"].includes(val),
  },
  disabled: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  placeholder: String,
  readonly: Boolean,
  autocomplete: {
    type: String,
    default: "off",
  },
  autofocus: Boolean,
  form: String,
});

const emits = defineEmits([
  "update:modelValue",
  "input",
  "change",
  "focus",
  "blur",
  "clear",
]);

const innerValue = ref(props.modelValue);
const passwordVisible = ref(false);
const isFocused = ref(false);

const inputRef = ref();
const textareaRef = ref();
const wrapperRef = ref();

const _ref = computed(() => inputRef.value || textareaRef.value);

const showClear = computed(
  () => props.clearable && !!innerValue.value && !props.disabled && isFocused.value
);

const showPasswordArea = computed(
  () => props.type === "password" && props.showPassword && !props.disabled && !!innerValue.value
);

function handleInput() {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
}

function handleChange() {
  emits("change", innerValue.value);
}

function handleFocus(event) {
  isFocused.value = true;
  emits("focus", event);
}

function handleBlur(event) {
  isFocused.value = false;
  emits("blur", event);
}

function clear() {
  innerValue.value = "";
  each(["update:modelValue", "input", "change"], (e) => emits(e, ""));
  emits("clear");
}

function focus() {
  _ref.value?.focus();
}

function blur() {
  _ref.value?.blur();
}

function select() {
  _ref.value?.select();
}

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value;
}

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

defineExpose({ ref: _ref, focus, blur, select, clear });
</script>

<template>
  <div
    class="er-input"
    :class="[
      type !== 'textarea' ? `er-input--${size}` : 'er-input--textarea',
      { 'is-disabled': disabled, 'is-focus': isFocused },
    ]"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="er-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="er-input__wrapper" ref="wrapperRef">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="er-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          v-bind="$attrs"
          class="er-input__inner"
          ref="inputRef"
          :id="id"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="er-input__suffix"
        >
          <slot name="suffix"></slot>
          <ErIcon
            icon="circle-xmark"
            v-if="showClear"
            class="er-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          />
          <ErIcon
            :icon="passwordVisible ? 'eye' : 'eye-slash'"
            v-if="showPasswordArea"
            class="er-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="er-input__append">
        <slot name="append"></slot>
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        v-bind="$attrs"
        class="er-textarea__wrapper"
        ref="textareaRef"
        :id="id"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
