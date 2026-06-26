import { computed, inject, ref, onMounted, onUnmounted, watch, toRef } from "vue";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants.js";
import { useId } from "@su-130pm/hooks";

export function useFormItem() {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  return { form, formItem };
}

export function useFormDisabled(fallback) {
  const form = inject(FORM_CTX_KEY, void 0);
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  return computed(
    () => fallback || form?.disabled || formItem?.disabled || false
  );
}

export function useFormItemInputId(props, formItemContext) {
  const inputId = ref("");
  let unwatch;

  onMounted(() => {
    unwatch = watch(
      toRef(() => props.id),
      (id) => {
        const newId = id ?? useId().value;
        if (newId !== inputId.value) {
          inputId.value && formItemContext?.removeInputId(inputId.value);
          formItemContext?.addInputId(newId);
          inputId.value = newId;
        }
      },
      { immediate: true }
    );
  });

  onUnmounted(() => {
    unwatch && unwatch();
    inputId.value && formItemContext?.removeInputId(inputId.value);
  });

  return { inputId };
}
