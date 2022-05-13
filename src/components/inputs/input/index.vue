<template>
  <label class="asv-input-wrapper">
    <span class="asv-input-label" v-if="props.label">{{ props.label }}</span>
    <input
      :class="`asv-${props.size}`"
      class="asv-input"
      :value="props.modelValue"
      @input="onValueChange"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
    <span class="asv-input-error" v-if="props.error">{{ props.error }}</span>
  </label>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from "vue";

interface IProps {
  modelValue: string;
  label?: string;
  error?: string;
  size?: "small" | "medium" | "large";
  placeholder?: string;
  disabled?: boolean;
}

interface IEmits {
  (e: "update:modelValue", v: string): void;
}

const props = withDefaults(defineProps<IProps>(), { size: "medium" });
const emits = defineEmits<IEmits>();

function onValueChange(event: Event) {
  const target = event.target as HTMLInputElement;

  emits("update:modelValue", target.value);
}
</script>
<style lang="scss">
.asv-input {
  @include componentSize;

  background: var(--asv-surface-level-0);
  border-radius: 4px;
  border: 1px solid var(--asv-border-normal);
  color: inherit;
  display: flex;
  flex-direction: column;
  outline: none;
  padding: $spacing-4;

  &:hover:not(:disabled) {
    background: var(--asv-surface-level-1);
    border-color: var(--asv-border-hover);
  }

  &:active,
  &:focus {
    &:not(:disabled) {
      background: var(--asv-surface-level-1);
      border-color: var(--asv-border-active);
    }
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--asv-surface-level-3);
    color: var(--asv-text-disabled);
  }

  &-wrapper {
    position: relative;
  }

  &-error {
    &.as-text {
      color: red;
    }
  }
}
</style>
