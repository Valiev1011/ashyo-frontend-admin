<template>
  <div class="flex flex-col">
    <label :for="name" class="text-[20px] font-normal">{{ label }}</label>
    <vee-field
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="w-[100%] p-[8px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px]"
    />
    <ErrorMessage
      :name="name"
      class="text-error_color mt-2 text-[20px] font-medium"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    name: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    mask: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
  });
</script>

<style lang="css" scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
