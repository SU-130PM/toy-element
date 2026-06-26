<script setup>
import { ref, computed, provide } from "vue";
import { omit, isNil } from "lodash-es";
import { useId } from "@su-130pm/hooks";
import { DROPDOWN_CTX_KEY } from "./constants.js";
import { ErButton, ErButtonGroup } from "../Button/index.js";
import DropdownItem from "./DropdownItem.vue";
import ErTooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "ErDropdown",
  inheritAttrs: false,
});

const props = defineProps({
  content: String,
  trigger: {
    type: String,
    default: "hover",
  },
  placement: {
    type: String,
    default: "bottom",
  },
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  size: String,
  type: String,
  splitButton: Boolean,
  disabled: Boolean,
});

const emits = defineEmits(["command", "visible-change", "click"]);

const tooltipRef = ref();
const triggerRef = ref();

const tooltipProps = computed(() =>
  omit(props, ["items", "hideAfterClick", "size", "type", "splitButton"])
);

function handleItemClick(e) {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emits("command", e.command);
}

provide(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});

defineExpose({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
});
</script>

<template>
  <div
    class="er-dropdown"
    :id="`dropdown-${useId().value}`"
    :class="{ 'is-disabled': disabled }"
  >
    <ErTooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <ErButtonGroup
        :type="type"
        :size="size"
        :disabled="disabled"
        v-if="splitButton"
      >
        <ErButton @click="$emit('click', $event)">
          <slot name="default"></slot>
        </ErButton>
        <ErButton ref="triggerRef" icon="angle-down" />
      </ErButtonGroup>
      <slot v-else name="default"></slot>

      <template #content>
        <ul class="er-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command ?? useId().value">
              <DropdownItem v-bind="item" />
            </template>
          </slot>
        </ul>
      </template>
    </ErTooltip>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
