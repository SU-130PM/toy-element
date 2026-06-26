<script setup>
import { ref, reactive, computed, watch, nextTick } from "vue";
import { isFunction, isNil } from "lodash-es";
import { useId, useZIndex } from "@su-130pm/hooks";
import { typeIconMap } from "@su-130pm/utils";
import ErOverlay from "../Overlay/Overlay.vue";
import ErIcon from "../Icon/Icon.vue";
import ErButton from "../Button/Button.vue";
import ErInput from "../Input/Input.vue";

defineOptions({ name: "ErMessageBox", inheritAttrs: false });

const props = defineProps({
  visible: Object,
  title: String,
  message: [String, Object, Function],
  type: String,
  icon: String,
  showClose: { type: Boolean, default: true },
  closeOnClickModal: { type: Boolean, default: true },
  confirmButtonType: { type: String, default: "primary" },
  roundButton: Boolean,
  boxType: { type: String, default: "" },
  inputValue: { type: String, default: "" },
  inputPlaceholder: { type: String, default: "Please input..." },
  inputType: { type: String, default: "text" },
  showInput: Boolean,
  showConfirmButton: { type: Boolean, default: true },
  showCancelButton: Boolean,
  confirmButtonText: { type: String, default: "Ok" },
  cancelButtonText: { type: String, default: "Cancel" },
  confirmButtonLoading: Boolean,
  cancelButtonLoading: Boolean,
  cancelButtonType: String,
  center: Boolean,
  beforeClose: Function,
  doAction: Function,
  destroy: Function,
});

const { nextZIndex } = useZIndex();

const inputRef = ref();
const inputId = useId();

const state = reactive({
  ...props,
  zIndex: nextZIndex(),
});

const hasMessage = computed(() => !!state.message);
const iconComponent = computed(() => state.icon ?? typeIconMap.get(state.type ?? ""));

watch(
  () => props.visible?.value,
  (val) => {
    if (val) state.zIndex = nextZIndex();
    if (props.boxType !== "prompt") return;
    if (!val) return;
    nextTick(() => {
      inputRef.value && inputRef.value.focus();
    });
  }
);

function handleWrapperClick() {
  props.closeOnClickModal && handleAction("close");
}

function handleInputEnter(e) {
  if (state.inputType === "textarea") return;
  e.preventDefault();
  return handleAction("confirm");
}

function handleAction(action) {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => props.doAction(action, state.inputValue))
    : props.doAction(action, state.inputValue);
}

function handleClose() {
  handleAction("close");
}
</script>

<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <ErOverlay v-show="visible?.value" :z-index="state.zIndex" mask>
      <div role="dialog" class="er-overlay-message-box" @click="handleWrapperClick">
        <div
          :class="['er-message-box', { 'is-center': state.center }]"
          @click.stop
        >
          <div
            v-if="!isNil(state.title)"
            class="er-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="er-message-box__title">
              <ErIcon
                v-if="iconComponent && state.center"
                :class="{ [`er-icon-${state.type}`]: state.type }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <button
              v-if="showClose"
              class="er-message-box__header-btn"
              @click.stop="handleClose"
            >
              <ErIcon icon="xmark" />
            </button>
          </div>
          <div class="er-message-box__content">
            <ErIcon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{ [`er-icon-${state.type}`]: state.type }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="er-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="er-message-box__input">
            <ErInput
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="er-message-box__footer">
            <ErButton
              v-if="state.showCancelButton"
              class="er-message-box__footer-btn er-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
            >
              {{ state.cancelButtonText }}
            </ErButton>
            <ErButton
              v-show="state.showConfirmButton"
              class="er-message-box__footer-btn er-message-box__confirm-btn"
              :type="state.confirmButtonType"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
            >
              {{ state.confirmButtonText }}
            </ErButton>
          </div>
        </div>
      </div>
    </ErOverlay>
  </transition>
</template>

<style scoped>
@import "./style.css";
</style>
