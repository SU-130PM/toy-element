<script setup>
import { ref, computed, useSlots } from "vue";
import { typeIconMap } from "@su-130pm/utils";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErAlert",
});

const props = defineProps({
  title: String,
  type: {
    type: String,
    default: "info",
    validator: (val) => ["success", "info", "warning", "danger"].includes(val),
  },
  description: String,
  effect: {
    type: String,
    default: "light",
    validator: (val) => ["light", "dark"].includes(val),
  },
  closable: {
    type: Boolean,
    default: true,
  },
  center: Boolean,
  showIcon: Boolean,
});

const emits = defineEmits(["close"]);
const slots = useSlots();

const visible = ref(true);

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
const withDescription = computed(() => props.description || slots.default);

function close() {
  visible.value = false;
  emits("close");
}

function open() {
  visible.value = true;
}

defineExpose({ open, close });
</script>

<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="er-alert"
      role="alert"
      :class="[
        `er-alert__${type}`,
        `er-alert__${effect}`,
        { 'text-center': center },
      ]"
    >
      <er-icon
        v-if="showIcon"
        class="er-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="er-alert__content">
        <span
          class="er-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="er-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="er-alert__close" v-if="closable">
          <er-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import "./style.css";
</style>
