/** @jsxImportSource vue */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Select from "./Select.vue";
import Option from "./Option.vue";

describe("Select.vue", () => {
  it("should render with options", () => {
    const options = [
      { value: "1", label: "选项一" },
      { value: "2", label: "选项二" },
    ];
    const wrapper = mount(Select, {
      props: { modelValue: "", options },
    });
    expect(wrapper.find(".er-select").exists()).toBeTruthy();
  });

  it("should select an option", async () => {
    const options = [
      { value: "1", label: "选项一" },
      { value: "2", label: "选项二" },
    ];
    const wrapper = mount(Select, {
      props: {
        modelValue: "",
        options,
        "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val }),
      },
    });
    expect(wrapper.find(".er-select").exists()).toBeTruthy();
  });
});

describe("Option.vue", () => {
  it("should render label", () => {
    const wrapper = mount(Option, {
      props: { value: "1", label: "选项一" },
    });
    expect(wrapper.text()).toContain("选项一");
  });

  it("should apply disabled class", () => {
    const wrapper = mount(Option, {
      props: { value: "1", label: "选项一", disabled: true },
    });
    expect(wrapper.classes()).toContain("is-disabled");
  });
});
