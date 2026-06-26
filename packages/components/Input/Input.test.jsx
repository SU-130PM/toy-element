/** @jsxImportSource vue */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Input from "./Input.vue";

describe("Input.vue", () => {
  it("render", () => {
    const wrapper = mount(Input, {
      props: {
        type: "text",
        size: "small",
        modelValue: "test",
      },
      slots: {
        prepend: "https://",
        prefix: "prefix-icon",
      },
    });

    expect(wrapper.classes()).toContain("er-input");
    expect(wrapper.classes()).toContain("er-input--small");
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.find("input").attributes("type")).toBe("text");
    expect(wrapper.find(".er-input__prepend").exists()).toBeTruthy();
    expect(wrapper.find(".er-input__prepend").text()).toBe("https://");
    expect(wrapper.find(".er-input__prefix").exists()).toBeTruthy();
    expect(wrapper.find(".er-input__prefix").text()).toBe("prefix-icon");
  });

  it("textarea", () => {
    const wrapper = mount(Input, {
      props: {
        type: "textarea",
        modelValue: "test textarea",
      },
    });
    expect(wrapper.find("textarea").exists()).toBeTruthy();
    expect(wrapper.find("textarea").element.value).toBe("test textarea");
  });

  it("v-model", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test",
        "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val }),
      },
    });
    const input = wrapper.find("input");
    expect(input.element.value).toBe("test");

    await input.setValue("test2");
    expect(wrapper.props("modelValue")).toBe("test2");
    expect(wrapper.emitted()["input"]?.[0]).toEqual(["test2"]);
    expect(wrapper.emitted()["change"]?.[0]).toEqual(["test2"]);

    await wrapper.setProps({ modelValue: "test3" });
    expect(input.element.value).toBe("test3");
  });

  it("clearable", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test clear",
        clearable: true,
        "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val }),
      },
    });

    expect(wrapper.find(".er-input__clear").exists()).toBeFalsy();
    await wrapper.find("input").trigger("focus");
    expect(wrapper.find(".er-input__clear").exists()).toBeTruthy();

    await wrapper.find(".er-input__clear").trigger("click");
    expect(wrapper.emitted()["clear"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"]?.pop()).toEqual([""]);
  });

  it("toggle password", async () => {
    const wrapper = mount(Input, {
      props: {
        type: "password",
        showPassword: true,
        modelValue: "123",
        "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val }),
      },
    });

    expect(wrapper.find("input").attributes("type")).toBe("password");

    const toggleIcon = wrapper.find(".er-input__password");
    expect(toggleIcon.exists()).toBeTruthy();
    await toggleIcon.trigger("click");
    expect(wrapper.find("input").attributes("type")).toBe("text");
  });
});
