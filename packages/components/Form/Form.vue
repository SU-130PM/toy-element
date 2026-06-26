<script setup>
import { provide, reactive, toRefs } from "vue";
import { FORM_CTX_KEY } from "./constants.js";
import { each, filter, includes, size } from "lodash-es";

defineOptions({ name: "ErForm" });

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
  rules: Object,
  disabled: Boolean,
  labelWidth: [Number, String],
  labelPosition: {
    type: String,
    default: "right",
    validator: (val) => ["left", "right", "top"].includes(val),
  },
  labelSuffix: String,
  showMessage: {
    type: Boolean,
    default: true,
  },
  hideRequiredAsterisk: Boolean,
  requiredAsteriskPosition: {
    type: String,
    default: "left",
    validator: (val) => ["left", "right"].includes(val),
  },
});

const emits = defineEmits(["validate"]);

const fields = [];

const addField = (field) => {
  if (!field.prop) return;
  fields.push(field);
};

const removeField = (field) => {
  if (!field.prop) return;
  fields.splice(fields.indexOf(field), 1);
};

async function validate(callback) {
  return validateField([], callback);
}

async function validateField(keys = [], callback) {
  const filterArr = size(keys)
    ? filter(fields, (field) => includes(keys, field.prop))
    : fields;

  try {
    const result = await doValidateField(filterArr);
    if (result === true) {
      callback?.(result);
    }
    return result;
  } catch (e) {
    if (e instanceof Error) throw e;
    callback?.(false, e);
    return Promise.reject(e);
  }
}

function resetFields(keys = []) {
  each(filterFields(fields, keys), (field) => field.resetField());
}

function clearValidate(keys = []) {
  each(filterFields(fields, keys), (field) => field.clearValidate());
}

function filterFields(fieldsArr, propsArr) {
  return size(propsArr)
    ? filter(fieldsArr, (field) => includes(propsArr, field.prop))
    : fieldsArr;
}

async function doValidateField(fieldsArr = []) {
  let validationErrors = {};

  for (const field of fieldsArr) {
    try {
      await field.validate("");
    } catch (e) {
      validationErrors = { ...validationErrors, ...e };
    }
  }
  if (!size(Object.keys(validationErrors))) return true;
  return Promise.reject(validationErrors);
}

const formCtx = reactive({
  ...toRefs(props),
  emits,
  addField,
  removeField,
});

provide(FORM_CTX_KEY, formCtx);

defineExpose({ validate, validateField, resetFields, clearValidate });
</script>

<template>
  <form class="er-form">
    <slot></slot>
  </form>
</template>
