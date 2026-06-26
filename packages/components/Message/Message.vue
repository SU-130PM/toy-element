<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getLastBottomOffset } from "./methods.js";
import { delay, bind } from "lodash-es";
import { useEventListener, useOffset } from "@su-130pm/hooks";
import { RenderVnode, typeIconMap } from "@su-130pm/utils";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErMessage",
});

const props = defineProps({
  id: String,
  message: [String, Object, Function],
  type: {
    type: String,
    default: "info",
  },
  duration: {
    type: Number,
    default: 3000,
  },
  offset: {
    type: Number,
    default: 10,
  },
  zIndex: Number,
  transitionName: {
    type: String,
    default: "fade-up",
  },
  showClose: Boolean,
  center: Boolean,
  onDestory: Function,
});

const visible = ref(false);
const messageRef = ref();
const boxHeight = ref(0);

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
});

const cssStyle = computed(() => ({
  top: topOffset.value + "px",
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
}

onMounted(() => {
  visible.value = true;
  startTimer();
});

useEventListener(document, "keydown", (e) => {
  if (e.code === "Escape") {
    close();
  }
});

watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset;
});

defineExpose({ bottomOffset, close });
</script>

<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef.getBoundingClientRect().height"
    @after-leave="!visible && onDestory()"
  >
    <div
      ref="messageRef"
      class="er-message"
      :class="[
        `er-message--${type}`,
        { 'is-close': showClose, 'text-center': center },
      ]"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <ErIcon class="er-message__icon" :icon="iconName" />
      <div class="er-message__content">
        <slot>
          <RenderVnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="er-message__close" v-if="showClose">
        <ErIcon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "./style.css";
</style>
