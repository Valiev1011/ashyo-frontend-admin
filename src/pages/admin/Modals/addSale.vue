<template>
  <appModalVue v-model="dialog">
    <div class="w-[100%]">
      <div class="flex gap-5 justify-between w-[100%] items-center">
        <h1 class="text-[20px] font-normal">Model:</h1>
        <select
          v-model="form.model_id"
          class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
          @change=""
        >
          <option
            v-for="(item, index) in model_store?.models"
            :key="index"
            :value="item?.id"
          >
            {{ item?.model_name }}
          </option>
        </select>
      </div>
      <div class="w-[100%] mt-5">
        <div class="demo-date-picker">
          <div class="flex gap-[17%] justify-between w-[100%] items-center">
            <span class="demonstration text-[20px] font-normal"
              >Sale dates:</span
            >
            <el-date-picker
              v-model="dates"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-5 justify-between w-[100%] items-center mt-3">
        <h1 class="text-[20px] font-normal">Sale percentage:</h1>
        <input
          min="1"
          type="number"
          v-model="form.sale_percentage"
          class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
        />
      </div>

      <VButtonVue
        class="mt-5 w-[20%]"
        btn_type="primary"
        :is-loading="loading"
        @click="send"
        >{{ loading ? "Loading" : title }}</VButtonVue
      >
    </div>
  </appModalVue>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import appModalVue from "@/components/ui/app-modal.vue";
  import { useModelStore } from "@/stores/admin/models";
  import VButtonVue from "@/components/form/VButton.vue";
  import { useSaleStore } from "@/stores/admin/sales";

  const dialog = ref();
  const model_store = useModelStore();
  const store = useSaleStore();
  const loading = ref(false);
  const id = ref();

  const form = ref({
    model_id: 0,
    sale_start_date: "",
    sale_end_date: "",
    sale_percentage: null,
  });
  const dates = ref([] as any);

  const send = async () => {
    loading.value = true;
    form.value.sale_start_date = dates.value[0];
    form.value.sale_end_date = dates.value[1];
    if (title.value == "Edit") {
      store.updateSale(id.value, form.value);
    } else {
      await store.addSale(form.value);
    }
    loading.value = false;
  };

  const title = ref("");

  const openModal = async (item?: any) => {
    console.log(item);
    if (item?.id) {
      id.value = item.id;
      form.value = { ...item };
      dates.value.push(form.value.sale_start_date);
      dates.value.push(form.value.sale_end_date);
      title.value = "Edit";
    } else {
      title.value = "Create";
    }
    dialog.value = true;
    await model_store.getAllModels();
  };

  defineExpose({ openModal });
</script>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  .demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }
  .demo-date-picker .block:last-child {
    border-right: none;
  }
</style>
