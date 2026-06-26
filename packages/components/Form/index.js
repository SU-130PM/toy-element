import Form from "./Form.vue";
import FormItem from "./FormItem.vue";
import { withInstall } from "@su-130pm/utils";

export const ErForm = withInstall(Form);
export const ErFormItem = withInstall(FormItem);

export * from "./hooks.js";
