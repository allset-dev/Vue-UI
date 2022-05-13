<template>
  <ASVLoader :isLoading="showLoading">
    <div class="asv">
      <NavBar />
      <main class="asv-view">
        <router-view></router-view>
      </main>
    </div>
  </ASVLoader>
</template>
<script lang="ts" setup>
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import { ASVLoader } from "@/components";

// @ts-ignore
import NavBar from "@/views/nav-bar/index.vue";

import appStore from "./store";

const store = useStore();
const route = useRoute();

const showLoading = computed(() => {
  const isLoading = store.getters["user/getIsLoading"];
  const asynCheckAuth = route.meta.asynCheckAuth;
  return asynCheckAuth ? false : isLoading;
});

onBeforeMount(() => {
  store.registerModule("app", appStore);
  store.dispatch("user/fetchUser");
});
</script>
<style lang="scss">
body {
  height: 100vh;
  margin: 0;
  width: 100vw;
  background: var(--asv-surface-level-0);
  color: var(--asv-text-normal);
  font-family: "Roboto";
}

#root {
  height: 100%;
  width: 100%;
}

.asv {
  display: flex;
  flex-direction: column;

  &,
  &-view {
    @include flexNoOverflow;
  }
}
</style>
