import { Module } from "vuex";

import { delay } from "@/utils";

import { appApi } from "./api";

interface userState {
  isLoggedIn: boolean;
  isLoading: boolean;
  permissions: { [key: string]: any };
  name: string;
  email: string;
  id: string;
  imgUrl: string;
}

const Types = {
  APP_USER_SET_DETAILS: "APP_USER_SET_DETAILS",
  APP_USER_SET_IS_LOADING: "APP_USER_SET_IS_LOADING",
};

const user: Module<userState, any> = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    isLoading: true,
    permissions: {},
    name: "",
    email: "",
    id: "",
    imgUrl: "",
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getPermissions(state) {
      return state.permissions;
    },
    getUserDetails(state) {
      return state;
    },
  },
  mutations: {
    [Types.APP_USER_SET_IS_LOADING](state, isLoading: boolean) {
      state.isLoading = isLoading;
      state.isLoggedIn = false;
    },
    [Types.APP_USER_SET_DETAILS](state, payload: userState) {
      state.email = payload.email;
      state.name = payload.name;
      state.id = payload.id;
      state.imgUrl = payload.imgUrl;
      state.isLoggedIn = true;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      commit(Types.APP_USER_SET_IS_LOADING, true);

      try {
        const userDetails = await appApi.loggin("subbiah2806@gmail.com");
        const { email, imgUrl, name, id } = userDetails?.data?.[0];

        // NOTE: Adding delay to replicate real loggin.
        await delay(2000);

        commit(Types.APP_USER_SET_DETAILS, {
          email,
          name,
          id,
          imgUrl,
        });
        commit(Types.APP_USER_SET_IS_LOADING, false);
      } catch {
        commit(Types.APP_USER_SET_IS_LOADING, false);
        // Not handling error, has this will never happen with all hardcodings
      }
    },
  },
};

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { user },
};
