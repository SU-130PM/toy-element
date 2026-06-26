/** @jsxImportSource vue */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Icon from "./Icon.vue";

describe("Icon.vue", () => {
  it("should render with default props", () => {
    const wrapper = mount(Icon, {
      props: { icon: "search" },
    });
    expect(wrapper.find(".er-icon").exists()).toBeTruthy();
    expect(wrapper.classes()).toContain("er-icon");
  });

  it("should add type class", () => {
    const wrapper = mount(Icon, {
      props: { icon: "circle-info", type: "info" },
    });
    expect(wrapper.classes()).toContain("er-icon--info");
  });

  it("should set color style", () => {
    const wrapper = mount(Icon, {
      props: { icon: "search", color: "red" },
    });
    expect(wrapper.attributes("style")).toContain("color: red");
  });

  it("should render with spin prop", () => {
    const wrapper = mount(Icon, {
      props: { icon: "spinner", spin: true },
    });
    expect(wrapper.find(".er-icon").exists()).toBeTruthy();
  });
});
