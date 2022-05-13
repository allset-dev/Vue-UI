<template>
  <div :class="props.class" class="asv-dropdown">
    <div
      class="asv-dropdown-trigger"
      @contextmenu.prevent="handleModalOpen"
      @click="handleModalOpen"
    >
      <slot></slot>
    </div>
    <div
      :style="modalStyles"
      class="asv-dropdown-modal"
      ref="modalRef"
      v-if="isModalOpen"
    >
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from "vue";

interface Iprops {
  class?: string;
}

const props = defineProps<Iprops>();
const isModalOpen = ref(false);
const modalStyles = ref({});
const modalRef = ref<HTMLDivElement>();

function handleModalOpen(event: Event) {
  const eventTarget = event.target as HTMLDivElement;

  const udpatedIsModalOpen = !isModalOpen.value;

  const targetPosition = eventTarget.getBoundingClientRect();

  modalStyles.value = udpatedIsModalOpen
    ? {
        right: `${window.innerWidth - targetPosition.right - 8}px`,
        top: `${targetPosition.bottom}px`,
      }
    : {};

  isModalOpen.value = udpatedIsModalOpen;
}

watch([isModalOpen], () => {
  if (isModalOpen.value) {
    setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    });
  } else {
    window.removeEventListener("click", handleClickOutside);
  }
});

function handleClickOutside(event: MouseEvent) {
  const eventTarget = event.target as HTMLDivElement;
  const clickingOnModal = modalRef.value?.contains?.(eventTarget);

  if (!clickingOnModal) {
    isModalOpen.value = false;
  }
}
</script>
<style lang="scss">
.asv-dropdown {
  &-trigger {
    cursor: pointer;
  }

  &-modal {
    margin-top: $spacing-8;
    padding: $spacing-20;
    position: absolute;
    background: var(--asv-surface-level-1);
    border-radius: 12px;
  }
}
</style>
