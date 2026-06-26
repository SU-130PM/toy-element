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

  it("should expose validate method", () => {
    const model = reactive({ name: "test" });
    const wrapper = mount(Form, {
      props: { model },
    });
    expect(wrapper.vm.validate).toBeDefined();
    expect(wrapper.vm.validateField).toBeDefined();
    expect(wrapper.vm.resetFields).toBeDefined();
    expect(wrapper.vm.clearValidate).toBeDefined();
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

  it("should display error message when error prop is set", async () => {
    const model = reactive({ name: "" });
    const wrapper = mount({
      setup() {
        return () => (
          <Form model={model}>
            <FormItem label="姓名" prop="name" error="请填写姓名">
              <input />
            </FormItem>
          </Form>
        );
      },
    });
    expect(wrapper.find(".er-form-item__error-msg").exists()).toBeTruthy();
    expect(wrapper.find(".er-form-item__error-msg").text()).toContain("请填写姓名");
  });

  it("should show required asterisk", () => {
    const model = reactive({ name: "" });
    const wrapper = mount({
      setup() {
        return () => (
          <Form model={model}>
            <FormItem label="姓名" prop="name" required>
              <input />
            </FormItem>
          </Form>
        );
      },
    });
    expect(wrapper.find(".er-form-item").classes()).toContain("is-required");
  });
});
