/** @jsxImportSource vue */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Switch from "./Switch.vue";

describe("Switch.vue", () => {
  it("should render correctly with default props", () => {
    const wrapper = mount(Switch);
    expect(wrapper.find(".er-switch").exists()).toBeTruthy();
  });

  it("should handle click event and toggle the checked state", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val }),
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted()["update:modelValue"]?.[0]).toEqual([true]);
    expect(wrapper.emitted()["change"]?.[0]).toEqual([true]);

    await wrapper.setProps({ modelValue: true });
    await wrapper.trigger("click");
    expect(wrapper.emitted()["update:modelValue"]?.[1]).toEqual([false]);
    expect(wrapper.emitted()["change"]?.[1]).toEqual([false]);
  });

  it("should not toggle when disabled", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
        "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val }),
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted()["update:modelValue"]).toBeUndefined();
    expect(wrapper.emitted()["change"]).toBeUndefined();
  });

  it("should display active and inactive text", () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeValue: true,
        inactiveValue: false,
        activeText: "开",
        inactiveText: "关",
      },
    });
    expect(wrapper.text()).toContain("开");

    wrapper.setProps({ modelValue: false });
    expect(wrapper.text()).toContain("关");
  });

  it("should render with custom active and inactive values", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: "yes",
        activeValue: "yes",
        inactiveValue: "no",
        "onUpdate:modelValue": (val) => wrapper.setProps({ modelValue: val }),
      },
    });

    expect(wrapper.classes()).toContain("is-checked");
    await wrapper.trigger("click");
    expect(wrapper.emitted()["update:modelValue"]?.[0]).toEqual(["no"]);
  });
});
