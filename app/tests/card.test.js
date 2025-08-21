// app/tests/card.test.js
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Card from "~/components/card.vue";

describe("Card.vue", () => {
  const props = {
    src: "https://via.placeholder.com/300",
    index: 1,
    isLoading: true,
  };

  it("renderiza correctamente con props", () => {
    const wrapper = mount(Card, { props });

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe(props.src);
  });

  it("emite 'loaded' cuando la imagen se carga", async () => {
    const wrapper = mount(Card, { props });

    const img = wrapper.find("img");
    await img.trigger("load");

    expect(wrapper.emitted()).toHaveProperty("loaded");
    expect(wrapper.emitted("loaded")[0]).toEqual([props.index]);
  });

  it("emite 'delete' al hacer click en el componente", async () => {
    const wrapper = mount(Card, { props });

    await wrapper.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("delete");
    expect(wrapper.emitted("delete")[0]).toEqual([props.index]);
  });

  it("no muestra USkeleton si isLoading es false", () => {
    const wrapper = mount(Card, { props: { ...props, isLoading: false } });
    const skeleton = wrapper.findComponent({ name: "USkeleton" });
    expect(skeleton.exists()).toBe(false);
  });
});
