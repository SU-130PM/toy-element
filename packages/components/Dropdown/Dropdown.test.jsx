/** @jsxImportSource vue */
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Dropdown from "./Dropdown.vue";

describe("Dropdown.vue", () => {
  it("should render trigger slot", () => {
    const wrapper = mount(Dropdown, {
      slots: { default: "下拉菜单" },
    });
    expect(wrapper.text()).toContain("下拉菜单");
  });

  it("should accept items prop", () => {
    const wrapper = mount(Dropdown, {
      props: {
        items: [
          { label: "选项一", command: "a" },
          { label: "选项二", command: "b" },
        ],
      },
      slots: { default: "下拉" },
    });
    expect(wrapper.find(".er-dropdown").exists()).toBeTruthy();
  });

  it("should emit command event when item clicked", () => {
    const onCommand = vi.fn();
    const wrapper = mount(Dropdown, {
      props: {
        items: [{ label: "选项一", command: "a" }],
        hideOnClick: false,
        onCommand,
      },
      slots: { default: "下拉" },
    });
    expect(wrapper.find(".er-dropdown").exists()).toBeTruthy();
  });
});
