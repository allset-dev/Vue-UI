<template>
  <div class="asv-radio-inputs">
    <RadioInput
      class="asv-radio-input-label"
      v-for="{ value, label, name, id } in props.options"
      :key="id || value"
      :value="value"
      :label="label"
      :name="name"
      :id="id"
      :modelValue="props.modelValue"
      @updated:modelValue="updateModelValue"
    ></RadioInput>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
// @ts-ignore
import RadioInput from "./radio-input.vue";

type stringOrNumber = string | number;

interface IProps {
  options: {
    id?: stringOrNumber;
    label: stringOrNumber;
    name?: stringOrNumber;
    value: stringOrNumber;
  }[];
  modelValue?: stringOrNumber;
}

interface IEmits {
  (e: "update:modelValue", value: stringOrNumber): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

function updateModelValue(value: string) {
  emit("update:modelValue", value);
}
</script>
<style lang="scss">
.asv-radio-inputs {
  display: flex;
  flex-direction: column;
}
.asv-radio-input {
  margin-bottom: -$spacing-2;

  &-label {
    align-items: center;
    display: flex;
    margin-bottom: $spacing-8;

    &-text {
      margin-left: $spacing-4;
    }
  }
}
</style>
