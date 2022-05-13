import { Module } from "vuex";

import { themeOptions } from "./constants";

export const themeChanger: Module<any, any> = {
  namespaced: true,
  state: {
    theme: themeOptions[0].value,
  },
  getters: {
    getTheme: (state) => {
      return state.theme;
    },
  },
  mutations: {
    THEME: (state, payload) => {
      state.theme = payload;
    },
  },
  actions: {
    setTheme: ({ commit }, payload) => {
      const body = document.getElementsByTagName("body");
      body[0].className = payload;
      commit("THEME", payload);
    },
  },
};
