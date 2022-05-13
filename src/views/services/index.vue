<template>
  <div class="asv-services">
    <header class="asv-services-header">
      <h2 class="asv-services-title">Services</h2>
      <ASVButton class="asv-services-add-new">Add New Service</ASVButton>
    </header>
    <ASVInput
      :disabled="isFetching"
      class="asv-services-search"
      placeholder="Search by name"
      v-model="searchTerm"
    />
    <ul class="asv-services-cards" v-if="localServices.length > 0">
      <li
        class="asv-services-card"
        v-for="(service, index) in localServices"
        :key="index"
      >
        <ASVLoader :isLoading="service.isLoading" kind="skeleton">
          <div class="asv-services-card-content">
            <h4 class="asv-services-card-name">{{ service.name }}</h4>
            <p class="asv-services-card-desc">{{ service.description }}</p>
            <div class="asv-services-card-version-wrapper">
              <span class="asv-services-card-version">{{
                service.versions.length
              }}</span>
              <span class="asv-services-card-version-text">{{
                pluralizeByCount(service.versions.length, "Version", false)
              }}</span>
            </div>
          </div>
        </ASVLoader>
      </li>
    </ul>
    <div class="asv-services-cards-no-data" v-if="notDatawarning">
      {{ notDatawarning }}
    </div>
    <ASVLoader
      class="asv-services-pagination-loading"
      :isLoading="paginationLoading"
      kind="skeleton"
    >
      <ASVPagination
        class="asv-services-pagination"
        v-model:pageNo="pageNo"
        v-model:pageLimit="pageLimit"
        :totalCount="totalCount"
        :currentPageCount="currentPageCount"
      />
    </ASVLoader>
  </div>
</template>
<script setup>
import { useStore, mapGetters } from "vuex";
import { onMounted, computed, ref } from "vue";

import { ASVButton, ASVInput, ASVLoader, ASVPagination } from "@/components";
import { pluralizeByCount, useDebounce } from "@/utils";
import { DEFAULT_PAGE_NO } from "@/constants";

import servicesStore from "./store";

const store = useStore();

store.registerModule("services", servicesStore);

onMounted(() => {
  fetchServices();
});

const fetchServicesDebounced = useDebounce(fetchServices);

const isFetching = computed(() => {
  return store.getters["services/getIsFetching"];
});

const currentPageCount = computed(() => {
  return store.getters["services/getServices"].length;
});

const notDatawarning = computed(() => {
  const isFetching = store.getters["services/getIsFetching"];
  const services = store.getters["services/getServices"];
  const searchTerm = store.getters["services/getSearchTerm"];

  const noData = !isFetching && services.length === 0;

  return noData
    ? `No data found${
        searchTerm ? ` for given search term "${searchTerm}"` : ""
      }`
    : "";
});

const localServices = computed(() => {
  const services = store.getters["services/getServices"];
  const isFetching = store.getters["services/getIsFetching"];
  const pageLimit = store.getters["services/getPageLimit"];

  return isFetching
    ? Array(pageLimit)
        .fill(0)
        .map(() => ({ isLoading: true }))
    : services;
});

const searchTerm = computed({
  get() {
    return store.getters["services/getSearchTerm"];
  },
  set(searchTerm) {
    store.dispatch("services/setSearchTerm", searchTerm);
    if (searchTerm) {
      fetchServicesDebounced({ resetPageNo: true });
    } else {
      fetchServices({ resetPageNo: true });
    }
  },
});

const pageNo = computed({
  get() {
    return store.getters["services/getPageNo"];
  },
  set(pageNo) {
    store.dispatch("services/setPageNo", pageNo);
    fetchServices({ isPaginating: true });
  },
});

const pageLimit = computed({
  get() {
    return store.getters["services/getPageLimit"];
  },
  set(pageLimit) {
    store.dispatch("services/setPageLimit", pageLimit);
    fetchServices({ isPaginating: true });
  },
});

const totalCount = computed({
  get() {
    return store.getters["services/getTotalCount"];
  },
});

const paginationLoading = computed(() => {
  return store.getters["services/getPaginationLoading"];
});

function fetchServices({ resetPageNo = false, isPaginating = false } = {}) {
  store.dispatch("services/fetchServices", { resetPageNo, isPaginating });
}
</script>
<style lang="scss">
.asv-services {
  @include flexNoOverflow;

  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  padding: $spacing-40 $spacing-24;
  margin: auto;

  &-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  &-title {
    font-weight: normal;
    margin: 0;
  }

  &-search {
    margin: $spacing-24 auto 0 0;
  }

  &-cards {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    gap: $spacing-24;
    justify-content: center;
    list-style: none;
    margin: $spacing-24 0;
    overflow: auto;
    padding: 0;
    width: 100%;

    &-no-data {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
  }

  &-card {
    width: 210px;
    height: 180px;
    border: 1px solid var(--asv-border-normal);
    border-radius: 5px;

    &-content {
      @include flexNoOverflow;

      padding: $spacing-20 $spacing-12;
    }

    &-name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      flex-shrink: 0;
      margin: 0;
      color: var(--asv-primary);
    }

    &-desc {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      display: -webkit-box;
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--asv-text-helptext);
    }

    &-version {
      text-align: center;
      padding: 0 $spacing-8;
      display: inline-block;
      color: var(--asv-primary);
      border: 1px solid var(--asv-primary-border-normal);
      border-radius: 40px;

      &-wrapper {
        flex-shrink: 0;
      }

      &-text {
        margin-left: $spacing-4;
      }
    }
  }

  &-pagination {
    margin-left: auto;

    &-loading {
      height: 44px;
      width: 268px;
      margin-left: auto;
      flex-shrink: 0;
    }
  }
}
</style>
