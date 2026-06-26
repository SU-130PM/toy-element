/** @jsxImportSource vue */
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Overlay from "./Overlay.vue";

describe("Overlay.vue", () => {
  it("should render with mask by default", () => {
    const wrapper = mount(Overlay);
    expect(wrapper.find(".er-overlay").exists()).toBeTruthy();
  });

  it("should emit click event on mask click", async () => {
    const wrapper = mount(Overlay);
    await wrapper.find(".er-overlay").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("should render without mask", () => {
    const wrapper = mount(Overlay, {
      props: { mask: false },
    });
    expect(wrapper.find(".er-overlay").exists()).toBeFalsy();
  });

  it("should apply overlay class", () => {
    const wrapper = mount(Overlay, {
      props: { overlayClass: "custom-class" },
    });
    expect(wrapper.find(".er-overlay").classes()).toContain("custom-class");
  });

  it("should slot content", () => {
    const wrapper = mount(Overlay, {
      slots: { default: "content" },
    });
    expect(wrapper.text()).toContain("content");
  });
});
