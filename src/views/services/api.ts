import { API } from "@/utils";

import { DEFAULT_PAGE_NO, DEFAULT_PAGE_NO_LIMIT } from "@/constants";

export const servicesApi = {
  fetchServices({
    pageLimit = DEFAULT_PAGE_NO_LIMIT,
    pageNo = DEFAULT_PAGE_NO,
    searchTerm = "",
  } = {}) {
    return API.get(
      `/services?_page=${pageNo}&_limit=${pageLimit}&name_like=${searchTerm}`
    );
  },
};
