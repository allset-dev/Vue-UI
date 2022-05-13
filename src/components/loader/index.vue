<template>
  <div :class="props.class" v-if="props.isLoading" class="asv-loader">
    <KIcon
      v-if="props.kind === 'spin'"
      class="asv-loader-spin"
      icon="spinner"
    />
    <div v-else class="asv-loader-skeleton" />
  </div>
  <slot v-else></slot>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";

import { KIcon } from "@kong/kongponents";

interface IProps {
  isLoading: boolean;
  kind?: "spin" | "skeleton";
  class?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  isLoading: false,
  kind: "spin",
});
</script>
<style lang="scss">
@keyframes skelton-loader {
  100% {
    transform: translateX(100%);
  }
}

.asv-loader {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  &-spin {
    font-size: $font-size-36;
    padding: $spacing-12;
  }

  &-skeleton {
    background-color: var(--asv-surface-level-1);
    display: inline-block;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::after {
      animation: skelton-loader 2s infinite;
      background: linear-gradient(
        90deg,
        var(--asv-surface-level-1) 25%,
        var(--asv-surface-level-2) 37%,
        var(--asv-surface-level-1) 63%
      );
      bottom: 0;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(-100%);
    }
  }
}
</style>
