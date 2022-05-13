<template>
  <div :class="props.class" class="asv-pagination">
    <ASVButton
      class="asv-pagination-left-wrapper"
      @click="handlePrev"
      color="secondary"
      size="large"
      :disabled="firstPage"
    >
      <KIcon class="asv-pagination-left" icon="arrowLeft" />
    </ASVButton>
    <div class="asv-pagination-content">{{ content }}</div>
    <ASVButton
      class="asv-pagination-right-wrapper"
      @click="handleNext"
      color="secondary"
      size="large"
      :disabled="lastPage"
    >
      <KIcon class="asv-pagination-right" icon="arrowRight" />
    </ASVButton>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

import { ASVButton } from "@/components";

import { KIcon } from "@kong/kongponents";

interface IProps {
  class?: string;
  pageLimit: number;
  pageNo: number;
  totalCount: number;
  currentPageCount: number;
}

interface IEmits {
  (e: "update:pageNo", data: number): void;
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();

const content = computed(() => {
  const start = (props.pageNo - 1) * props.pageLimit;
  const end = start + props.currentPageCount;

  return `${start} - ${end} of ${props.totalCount}`;
});

const firstPage = computed(() => {
  return props.pageNo - 1 === 0;
});

const lastPage = computed(() => {
  return (
    Math.max(Math.ceil(props.totalCount / props.pageLimit), 1) === props.pageNo
  );
});

function handlePrev() {
  emits("update:pageNo", props.pageNo - 1);
}

function handleNext() {
  emits("update:pageNo", props.pageNo + 1);
}
</script>
<style lang="scss">
.asv-pagination {
  display: flex;
  align-items: center;

  &-left,
  &-right {
    font-size: $font-size-18;

    &-wrapper {
      border-radius: 50%;

      &:disabled {
        path {
          // overriding kongs style.
          stroke: currentColor;
        }
      }
    }
  }

  &-content {
    min-width: 140px;
    margin: 0 $spacing-20;
    text-align: center;
  }
}
</style>
