<script setup>
import { createPopper } from "@popperjs/core";
import { ref, watch, watchEffect, onUnmounted, computed } from "vue";
import { debounce, bind } from "lodash-es";
import { useClickOutside } from "@su-130pm/hooks";

defineOptions({
  name: "ErTooltip",
});

const props = defineProps({
  content: String,
  trigger: {
    type: String,
    default: "hover",
    validator: (val) => ["hover", "click", "contextmenu"].includes(val),
  },
  placement: {
    type: String,
    default: "bottom",
  },
  manual: Boolean,
  disabled: Boolean,
  popperOptions: Object,
  transition: {
    type: String,
    default: "fade",
  },
  showTimeout: {
    type: Number,
    default: 0,
  },
  hideTimeout: {
    type: Number,
    default: 200,
  },
  virtualRef: Object,
  virtualTriggering: Boolean,
});

const emits = defineEmits(["visible-change", "click-outside"]);

const visible = ref(false);
const events = ref({});
const outerEvents = ref({});
const dropdownEvents = ref({});

const containerNode = ref();
const popperNode = ref();
const _triggerNode = ref();

const triggerNode = computed(() => {
  if (props.virtualTriggering) {
    return props.virtualRef?.ref ?? props.virtualRef ?? _triggerNode.value;
  }
  return _triggerNode.value;
});

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));

const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0
);

const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hideTimeout : 0
);

const triggerStrategyMap = new Map();
triggerStrategyMap.set("hover", () => {
  events.value["mouseenter"] = openFinal;
  outerEvents.value["mouseleave"] = closeFinal;
  dropdownEvents.value["mouseenter"] = openFinal;
});
triggerStrategyMap.set("click", () => {
  events.value["click"] = togglePopper;
});
triggerStrategyMap.set("contextmenu", () => {
  events.value["contextmenu"] = (e) => {
    e.preventDefault();
    openFinal();
  };
});

let openDebounce;
let closeDebounce;

function openFinal() {
  closeDebounce?.cancel();
  openDebounce?.();
}

function closeFinal() {
  openDebounce?.cancel();
  closeDebounce?.();
}

function togglePopper() {
  visible.value ? closeFinal() : openFinal();
}

function setVisible(val) {
  if (props.disabled) return;
  visible.value = val;
  emits("visible-change", val);
}

let popperInstance = null;

function destroyPopperInstance() {
  popperInstance?.destroy();
  popperInstance = null;
}

function resetEvents() {
  events.value = {};
  outerEvents.value = {};
  dropdownEvents.value = {};
  attachEvents();
}

function attachEvents() {
  if (props.disabled || props.manual) return;
  triggerStrategyMap.get(props.trigger)?.();
}

if (!props.manual) {
  attachEvents();
}

function show() {
  openFinal();
}

function hide() {
  openDebounce?.cancel();
  setVisible(false);
}

useClickOutside(containerNode, () => {
  emits("click-outside");
  if (props.trigger === "hover" || props.manual) return;
  visible.value && closeFinal();
});

watch(
  visible,
  (val) => {
    if (!val) return;
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      );
    }
  },
  { flush: "post" }
);

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events.value = {};
      outerEvents.value = {};
      dropdownEvents.value = {};
      return;
    }
    attachEvents();
  }
);

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger === oldTrigger) return;
    resetEvents();
  }
);

watch(
  () => props.disabled,
  (val, oldVal) => {
    if (val === oldVal) return;
    openDebounce?.cancel();
    visible.value = false;
    emits("visible-change", false);
    resetEvents();
  }
);

watchEffect(() => {
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

onUnmounted(() => {
  destroyPopperInstance();
});

defineExpose({ show, hide });
</script>

<template>
  <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="er-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="er-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
