<script setup>
import { ref, computed, onMounted } from "vue";
import { getLastBottomOffset } from "./methods.js";
import { bind, delay, isString } from "lodash-es";
import { RenderVnode, typeIconMap } from "@su-130pm/utils";
import { useOffset } from "@su-130pm/hooks";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErNotification",
});

const props = defineProps({
  title: String,
  id: String,
  zIndex: Number,
  position: {
    type: String,
    default: "top-right",
  },
  type: {
    type: String,
    default: "info",
  },
  message: [String, Object],
  duration: {
    type: Number,
    default: 3000,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  offset: {
    type: Number,
    default: 20,
  },
  transitionName: {
    type: String,
    default: "fade",
  },
  icon: String,
  onClick: Function,
  onClose: Function,
  onDestory: Function,
});

const visible = ref(false);
const notifyRef = ref();
const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
});

const iconName = computed(() => {
  if (isString(props.icon)) return props.icon;
  return typeIconMap.get(props.type);
});

const horizontalClass = computed(() =>
  props.position.endsWith("right") ? "right" : "left"
);

const verticalProperty = computed(() =>
  props.position.startsWith("top") ? "top" : "bottom"
);

const cssStyle = computed(() => ({
  [verticalProperty.value]: topOffset.value + "px",
  zIndex: props.zIndex,
}));

let timer;

function startTimer() {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
  props?.onClose?.();
}

onMounted(() => {
  visible.value = true;
  startTimer();
});

defineExpose({ close, bottomOffset });
</script>

<template>
  <transition
    :name="`er-notification-${transitionName}`"
    @after-leave="!visible && onDestory()"
    @enter="boxHeight = notifyRef.getBoundingClientRect().height"
  >
    <div
      ref="notifyRef"
      class="er-notification"
      :class="[
        `er-notification--${type}`,
        { 'show-close': showClose },
        horizontalClass,
      ]"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @click="onClick"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <ErIcon v-if="iconName" :icon="iconName" class="er-notification__icon" />
      <div class="er-notification__text">
        <div class="er-notification__title">{{ title }}</div>
        <div class="er-notification__content">
          <slot>
            <RenderVnode v-if="message" :vNode="message" />
          </slot>
        </div>
      </div>
      <div class="er-notification__close" v-if="showClose">
        <ErIcon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import "./style.css";
</style>
