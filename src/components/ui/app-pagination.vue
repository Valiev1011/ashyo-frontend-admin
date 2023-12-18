<template>
  <div class="w-full flex justify-center px-5 items-center my-3 text-[20px]">
    <vue-awesome-paginate
      :total-items="count"
      :items-per-page="params.limit"
      :max-pages-shown="3"
      v-model="params.page"
      :on-click="changeParam"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    params: {
      type: Object,
    },
    changeParam: {
      type: Function,
    },
    count: {
      type: Number,
    },
  });
</script>

<style lang="scss" scoped></style>
