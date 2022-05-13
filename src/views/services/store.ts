import { Module } from "vuex";

import { DEFAULT_PAGE_NO, DEFAULT_PAGE_NO_LIMIT } from "@/constants";

import { delay } from "@/utils";

import { servicesApi } from "./api";

const Types = {
  SERVICES_SET_SERVICES: "SERVICES_SET_SERVICES",
  SERVICES_SET_PAGE_LIMIT: "SERVICES_SET_PAGE_LIMIT",
  SERVICES_SET_PAGE_NO: "SERVICES_SET_PAGE_NO",
  SERVICES_SET_TOTAL_COUNT: "SERVICES_SET_TOTAL_COUNT",
  SERVICES_SET_IS_FETCHING: "SERVICES_SET_IS_FETCHING",
  SERVICES_SET_SEARCH_TERM: "SERVICES_SET_SEARCH_TERM",
  SERVICES_SET_PAGINATION_LOADING: "SERVICES_SET_PAGINATION_LOADING",
};

const services: Module<any, any> = {
  namespaced: true,
  state: {
    services: [],
    pageLimit: DEFAULT_PAGE_NO_LIMIT,
    pageNo: DEFAULT_PAGE_NO,
    totalCount: 0,
    searchTerm: "",
    isFetching: false,
    paginationLoading: false,
  },
  getters: {
    getServices: (state) => {
      return state.services;
    },
    getPageNo: (state) => {
      return state.pageNo;
    },
    getPageLimit: (state) => {
      return state.pageLimit;
    },
    getTotalCount: (state) => {
      return state.totalCount;
    },
    getSearchTerm: (state) => {
      return state.searchTerm;
    },
    getIsFetching: (state) => {
      return state.isFetching;
    },
    getPaginationLoading: (state) => {
      return state.paginationLoading;
    },
  },
  mutations: {
    [Types.SERVICES_SET_SERVICES]: (state, payload) => {
      state.services = payload;
    },
    [Types.SERVICES_SET_PAGE_LIMIT]: (state, payload) => {
      state.pageLimit = payload;
    },
    [Types.SERVICES_SET_PAGE_NO]: (state, payload) => {
      state.pageNo = payload;
    },
    [Types.SERVICES_SET_TOTAL_COUNT]: (state, payload) => {
      state.totalCount = payload;
    },
    [Types.SERVICES_SET_IS_FETCHING]: (state, payload) => {
      state.isFetching = payload;
    },
    [Types.SERVICES_SET_SEARCH_TERM]: (state, payload) => {
      state.searchTerm = payload;
    },
    [Types.SERVICES_SET_PAGINATION_LOADING]: (state, payload) => {
      state.paginationLoading = payload;
    },
  },
  actions: {
    fetchServices: async ({ commit, rootGetters }, payload) => {
      if (payload.resetPageNo) {
        commit(Types.SERVICES_SET_PAGE_NO, DEFAULT_PAGE_NO);
      }

      if (!payload.isPaginating) {
        commit(Types.SERVICES_SET_PAGINATION_LOADING, true);
      }

      commit(Types.SERVICES_SET_IS_FETCHING, true);
      commit(Types.SERVICES_SET_SERVICES, []);
      const pageNo = rootGetters["services/getPageNo"];
      const pageLimit = rootGetters["services/getPageLimit"];
      const searchTerm = rootGetters["services/getSearchTerm"];

      try {
        const response = await servicesApi.fetchServices({
          pageLimit,
          pageNo,
          searchTerm,
        });

        const services = response?.data;
        const totalCount = response?.headers?.["x-total-count"];

        // Delay just to make it real.
        await delay(2000);

        const currentPageNo = rootGetters["services/getPageNo"];

        if (pageNo === currentPageNo) {
          commit(Types.SERVICES_SET_SERVICES, services);
          commit(Types.SERVICES_SET_TOTAL_COUNT, Number(totalCount));
          commit(Types.SERVICES_SET_IS_FETCHING, false);

          if (!payload.isPaginating) {
            commit(Types.SERVICES_SET_PAGINATION_LOADING, false);
          }
        }
      } catch {
        commit(Types.SERVICES_SET_IS_FETCHING, false);
        commit(Types.SERVICES_SET_PAGINATION_LOADING, false);
        console.error("not handled");
      }
    },
    setSearchTerm: ({ commit }, payload) => {
      commit(Types.SERVICES_SET_SEARCH_TERM, payload);
    },
    setPageNo: ({ commit }, payload) => {
      commit(Types.SERVICES_SET_PAGE_NO, payload);
    },
    setPageLimit: ({ commit }, payload) => {
      commit(Types.SERVICES_SET_PAGE_LIMIT, payload);
    },
    setPaginationLoading: ({ commit }, payload) => {
      commit(Types.SERVICES_SET_PAGINATION_LOADING, payload);
    },
    setServices: ({ commit }, payload) => {
      commit(Types.SERVICES_SET_SERVICES, payload);
    },
    setTotalCount: ({ commit }, payload) => {
      commit(Types.SERVICES_SET_TOTAL_COUNT, payload);
    },
  },
};

export default services;
