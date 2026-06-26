/** @jsxImportSource vue */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Tooltip from "./Tooltip.vue";

describe("Tooltip.vue", () => {
  it("should render trigger slot", () => {
    const wrapper = mount(Tooltip, {
      props: { content: "提示内容" },
      slots: { default: "hover me" },
    });
    expect(wrapper.text()).toContain("hover me");
    expect(wrapper.find(".er-tooltip").exists()).toBeTruthy();
  });

  it("should accept placement prop", () => {
    const wrapper = mount(Tooltip, {
      props: { content: "提示", placement: "top" },
    });
    expect(wrapper.find(".er-tooltip").exists()).toBeTruthy();
  });

  it("should not show popper initially", () => {
    const wrapper = mount(Tooltip, {
      props: { content: "提示内容" },
    });
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();
  });
});
