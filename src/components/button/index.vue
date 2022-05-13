<template>
  <button
    :class="`asv-${props.size} asv-${props.color}`"
    class="asv-button"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Iprops {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Iprops>(), {
  size: "medium",
  color: "primary",
  disabled: false,
});
</script>

<style lang="scss">
.asv-button {
  @include componentSize;
  @include componentColor;

  border-radius: 3px;
  border: 0;
  color: inherit;
  cursor: pointer;
  outline: none;
  padding: 0 $spacing-12;

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
