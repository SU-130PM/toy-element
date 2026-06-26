<script setup>
import { ref, computed } from "vue";
import { addUnit } from "@su-130pm/utils";
import { useLocale } from "@su-130pm/hooks";
import ErButton from "../Button/Button.vue";
import ErIcon from "../Icon/Icon.vue";
import ErTooltip from "../Tooltip/Tooltip.vue";

defineOptions({
  name: "ErPopconfirm",
});

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonType: {
    type: String,
    default: "primary",
  },
  cancelButtonType: String,
  icon: {
    type: String,
    default: "question-circle",
  },
  iconColor: {
    type: String,
    default: "#f90",
  },
  hideIcon: Boolean,
  hideAfter: {
    type: Number,
    default: 200,
  },
  width: {
    type: [Number, String],
    default: 200,
  },
});

const emits = defineEmits(["confirm", "cancel"]);

const tooltipRef = ref();
const style = computed(() => ({ width: addUnit(props.width) }));

const { t } = useLocale();

function hidePopper() {
  tooltipRef.value?.hide();
}

function confirm(e) {
  emits("confirm", e);
  hidePopper();
}

function cancel(e) {
  emits("cancel", e);
  hidePopper();
}
</script>

<template>
  <ErTooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="er-popconfirm" :style="style">
        <div class="er-popconfirm__main">
          <ErIcon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="er-popconfirm__action">
          <ErButton
            size="small"
            class="er-popconfirm__cancel"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText || t("popconfirm.cancelButtonText") }}
          </ErButton>
          <ErButton
            size="small"
            class="er-popconfirm__confirm"
            :type="confirmButtonType"
            @click="confirm"
          >
            {{ confirmButtonText || t("popconfirm.confirmButtonText") }}
          </ErButton>
        </div>
      </div>
    </template>

    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
  </ErTooltip>
</template>

<style scoped>
@import "./style.css";
</style>
