<template>
  <div class="asv-theme-changer">
    <ASVRadioInputs :options="themeOptions" v-model="value" />
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import { ASVRadioInputs } from "@/components";

import { themeOptions } from "./constants";

const store = useStore();

const value = computed({
  get() {
    return store.getters["themeChanger/getTheme"];
  },
  set(setTheme) {
    store.dispatch("themeChanger/setTheme", setTheme);
  },
});
</script>

<style lang="scss"></style>
