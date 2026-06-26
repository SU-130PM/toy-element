/** @jsxImportSource vue */
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { reactive } from "vue";

import Form from "./Form.vue";
import FormItem from "./FormItem.vue";

describe("Form.vue", () => {
  it("should render with form items", () => {
    const model = reactive({ name: "" });
    const wrapper = mount(Form, {
      props: { model },
      slots: { default: FormItem },
    });
    expect(wrapper.find(".er-form").exists()).toBeTruthy();
  });

  it("should accept label-position prop", () => {
    const model = reactive({ name: "" });
    const wrapper = mount(Form, {
      props: { model, labelPosition: "top" },
    });
    expect(wrapper.find(".er-form").exists()).toBeTruthy();
  });
});

describe("FormItem.vue", () => {
  it("should render label", () => {
    const model = reactive({ name: "" });
    const wrapper = mount({
      setup() {
        return () => (
          <Form model={model}>
            <FormItem label="姓名" prop="name">
              <input />
            </FormItem>
          </Form>
        );
      },
    });
    expect(wrapper.text()).toContain("姓名");
  });

  it("should display error message on validation failure", async () => {
    const model = reactive({ name: "" });
    const rules = {
      name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
    };
    const wrapper = mount({
      setup() {
        return () => (
          <Form model={model} rules={rules}>
            <FormItem label="姓名" prop="name" rules={rules.name}>
              <input />
            </FormItem>
          </Form>
        );
      },
    });
    const formItem = wrapper.findComponent(FormItem);
    await formItem.vm.validate("blur").catch(() => {});
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".er-form-item__error-msg").exists()).toBeTruthy();
  });
});
