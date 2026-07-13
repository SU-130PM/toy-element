<script setup>
import {
  assign, find, get, each, noop, isFunction, filter, isNil, isBoolean, includes, map, size, eq, debounce,
} from "lodash-es";
import {
  ref, reactive, computed, onMounted, provide, useSlots, watch, h, nextTick,
} from "vue";
import { useFocusController, useClickOutside } from "@su-130pm/hooks";
import { RenderVnode, debugWarn } from "@su-130pm/utils";
import { SELECT_CTX_KEY, POPPER_OPTIONS } from "./constants.js";
import useKeyMap from "./useKeyMap.js";
import ErTooltip from "../Tooltip/Tooltip.vue";
import ErIcon from "../Icon/Icon.vue";
import ErInput from "../Input/Input.vue";
import ErOption from "./Option.vue";

defineOptions({ name: "ErSelect" });

const props = defineProps({
  modelValue: String,
  id: String,
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: String,
  disabled: Boolean,
  clearable: Boolean,
  renderLabel: Function,
  filterable: Boolean,
  filterMethod: Function,
  remote: Boolean,
  remoteMethod: Function,
});

const emits = defineEmits(["update:modelValue", "change", "visible-change", "clear", "focus", "blur"]);

const initialOption = findOption(props.modelValue);

const selectRef = ref();
const tooltipRef = ref();
const inputRef = ref();

const isDropdownVisible = ref(false);
const filteredOptions = ref(props.options ?? []);
const filteredChilds = ref(new Map());

const selectStates = reactive({
  inputValue: initialOption?.label ?? "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightedIndex: -1,
});

const slots = useSlots();

const { wrapperRef: inputWrapperRef, isFocused, handleBlur, handleFocus } = useFocusController(inputRef);

useClickOutside(selectRef, (e) => handleClickOutside(e));

const highlightedLine = computed(() => {
  let result;
  if (hasChildren.value) {
    const node = [...filteredChilds.value][selectStates.highlightedIndex]?.[0];
    result = filteredChilds.value.get(node);
  } else {
    result = filteredOptions.value[selectStates.highlightedIndex];
  }
  return result;
});

const children = computed(() =>
  filter(slots?.default?.(), (child) => eq(child.type, ErOption))
);

const hasChildren = computed(() => size(children.value) > 0);

const childrenOptions = computed(() => {
  if (!hasChildren.value) return [];
  return map(children.value, (item) => ({
    vNode: h(item),
    props: assign(item.props, {
      disabled:
        item.props?.disabled === true ||
        (!isNil(item.props?.disabled) && !isBoolean(item.props?.disabled)),
    }),
  }));
});

const filterPlaceholder = computed(() => {
  return props.filterable && selectStates.selectedOption && isDropdownVisible.value
    ? selectStates.selectedOption.label
    : props.placeholder;
});

const timeout = computed(() => (props.remote ? 300 : 0));

const hasData = computed(() =>
  (hasChildren.value && filteredChilds.value.size > 0) ||
  (!hasChildren.value && size(filteredOptions.value) > 0)
);

const isNoData = computed(() => {
  if (!props.filterable) return false;
  if (!hasData.value) return true;
  return false;
});

const lastIndex = computed(() =>
  hasChildren.value ? filteredChilds.value.size - 1 : size(filteredOptions.value) - 1
);

const showClear = computed(
  () => props.clearable && selectStates.mouseHover && selectStates.inputValue !== ""
);

const handleFilterDebounce = debounce(handleFilter, timeout.value);

const keyMap = useKeyMap({
  isDropdownVisible,
  controlVisible,
  selectStates,
  highlightedLine,
  handleSelect,
  hasData,
  lastIndex,
});

function focus() {
  inputRef.value?.focus();
}

function blur() {
  handleClickOutside();
}

function setFilteredChilds(opts) {
  filteredChilds.value.clear();
  each(opts, (item) => {
    filteredChilds.value.set(item.vNode, item.props);
  });
}

function controlVisible(visible) {
  if (!tooltipRef.value) return;
  tooltipRef.value[visible ? "show" : "hide"]?.();
  props.filterable && controlInputVal(visible);
  isDropdownVisible.value = visible;
  emits("visible-change", visible);
  selectStates.highlightedIndex = -1;
}

function controlInputVal(visible) {
  if (!props.filterable) return;
  if (visible) {
    if (selectStates.selectedOption) selectStates.inputValue = "";
    handleFilterDebounce();
  } else {
    selectStates.inputValue = selectStates.selectedOption?.label || "";
  }
}

function toggleVisible() {
  if (props.disabled) return;
  controlVisible(!isDropdownVisible.value);
}

function findOption(value) {
  return find(props.options, (option) => option.value === value);
}

function handleClickOutside() {
  if (isFocused.value) {
    nextTick(() => handleBlur(new FocusEvent("blur")));
  }
}

function handleSelect(o) {
  if (o.disabled) return;
  selectStates.inputValue = o.label;
  selectStates.selectedOption = o;
  each(["change", "update:modelValue"], (k) => emits(k, o.value));
  controlVisible(false);
  inputRef.value?.focus();
}

function setSelected() {
  const option = findOption(props.modelValue);
  if (!option) return;
  selectStates.inputValue = option.label;
  selectStates.selectedOption = option;
}

function handleClear() {
  selectStates.inputValue = "";
  selectStates.selectedOption = null;
  emits("clear");
  each(["change", "update:modelValue"], (k) => emits(k, ""));
}

async function genFilterOptions(search) {
  if (!props.filterable) return;
  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    selectStates.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(search);
    } catch (error) {
      debugWarn("ErSelect", "remoteMethod error");
      filteredOptions.value = [];
    } finally {
      selectStates.loading = false;
    }
    return;
  }
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(search);
    return;
  }
  filteredOptions.value = filter(props.options, (opt) =>
    includes(opt.label, search)
  );
}

async function genFilterChilds(search) {
  if (!props.filterable) return;
  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    selectStates.loading = true;
    try {
      await props.remoteMethod(search);
    } catch (error) {
      debugWarn("ErSelect", "remoteMethod error");
    } finally {
      selectStates.loading = false;
    }
    setFilteredChilds(childrenOptions.value);
    return;
  }
  if (props.filterMethod && isFunction(props.filterMethod)) {
    const opts = map(props.filterMethod(search), "value");
    setFilteredChilds(filter(childrenOptions.value, (item) =>
      includes(opts, get(item, ["props", "value"]))
    ));
    return;
  }
  setFilteredChilds(
    filter(childrenOptions.value, (item) =>
      includes(get(item, ["props", "label"]), search)
    )
  );
}

function handleFilter() {
  const searchKey = selectStates.inputValue;
  selectStates.highlightedIndex = -1;
  if (hasChildren.value) {
    genFilterChilds(searchKey);
    return;
  }
  genFilterOptions(searchKey);
}

function handleKeyDown(e) {
  console.log("[ErSelect] keydown:", e.key, "| dropdown:", isDropdownVisible.value, "| highlightIdx:", selectStates.highlightedIndex);
  keyMap.has(e.key) && keyMap.get(e.key)?.(e);
}

watch(
  () => props.options,
  (newOpts) => {
    filteredOptions.value = newOpts ?? [];
  }
);

watch(
  () => childrenOptions.value,
  (newOpts) => setFilteredChilds(newOpts),
  { immediate: true }
);

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      setSelected();
    }
  }
);

onMounted(() => {
  setSelected();
});

provide(SELECT_CTX_KEY, {
  handleSelect,
  selectStates,
  renderLabel: props.renderLabel,
  highlightedLine,
});

defineExpose({ focus, blur });
</script>

<template>
  <div
    ref="selectRef"
    class="er-select"
    :class="{ 'is-disabled': disabled }"
    @click.stop="toggleVisible"
    @mouseenter="selectStates.mouseHover = true"
    @mouseleave="selectStates.mouseHover = false"
  >
    <ErTooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popper-options="POPPER_OPTIONS"
      @click-outside="controlVisible(false)"
      manual
    >
      <template #default>
        <div ref="inputWrapperRef" @keydown="handleKeyDown">
          <ErInput
            ref="inputRef"
            v-model="selectStates.inputValue"
            :id="id"
            :disabled="disabled"
            :placeholder="filterable ? filterPlaceholder : placeholder"
            :readonly="!filterable || !isDropdownVisible"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleFilterDebounce"
          >
            <template #suffix>
              <ErIcon
                v-if="showClear"
                icon="circle-xmark"
                class="er-input__clear"
                @click.stop="handleClear"
                @mousedown.prevent="noop"
              />
              <ErIcon
                v-else
                class="header-angle"
                icon="angle-down"
                :class="{ 'is-active': isDropdownVisible }"
              />
            </template>
          </ErInput>
        </div>
      </template>
      <template #content>
        <div class="er-select__loading" v-if="selectStates.loading">
          <ErIcon icon="spinner" spin />
        </div>
        <div class="er-select__nodata" v-else-if="filterable && isNoData">
          No data
        </div>
        <ul class="er-select__menu" v-else>
          <template v-if="!hasChildren">
            <ErOption
              v-for="item in filteredOptions"
              :key="item.value"
              v-bind="item"
            />
          </template>
          <template v-else>
            <template v-for="[vNode, _props] in filteredChilds" :key="_props.value">
              <RenderVnode :vNode="vNode" />
            </template>
          </template>
        </ul>
      </template>
    </ErTooltip>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
