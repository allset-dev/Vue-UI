import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/views/app/index.vue";
import store from "@/store";
import route from "@/routes";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Loading...";
    const wrapper = shallowMount(HelloWorld, {
      global: {
        plugins: [store, route],
      },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
