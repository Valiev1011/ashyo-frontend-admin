<template>
  <div class="w-full flex flex-col">
    <label :for="name" class="text-global1 text-[20px] font-normal">{{
      label
    }}</label>
    <div class="w-full flex justify-between items-center mt-[7px]">
      <vee-field
        :type="active ? 'text' : 'password'"
        :name="name"
        :placeholder="placeHolder"
        class="w-[89%] p-[15px] text-[21px] outline-none rounded-s-lg bg-[white]"
      />
      <button
        type="button"
        class="w-[10%] bg-[white] text-[23px] rounded-e-lg py-[18px] flex justify-center items-center"
        @click="changeType"
      >
        <SvgIcon type="mdi" :path="mdiEyeOff" v-if="active" class="mx-auto" />
        <SvgIcon type="mdi" :path="mdiEye" v-else />
      </button>
    </div>
    <ErrorMessage
      :name="name"
      class="text-error_color mt-2 text-[20px] font-medium"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  //@ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiEye, mdiEyeOff } from "@mdi/js";

  const active = ref(false);
  const changeType = (e: any) => {
    e.preventDefault();
    active.value = !active.value;
  };

  const props = defineProps({
    name: {
      type: String,
    },
    placeHolder: {
      type: String,
    },
    label: {
      type: String,
    },
  });
</script>

<style lang="scss" scoped></style>
