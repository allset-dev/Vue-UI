import { createStore } from "vuex";

import { themeChanger } from "@/views/theme-changer/store";

export default createStore({
  modules: { themeChanger },
});
