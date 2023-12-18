<template>
  <div class="w-[80%] mx-[100px] mt-8">
    <div class="flex flex-col w-[100%] gap-5">
      <div class="flex w-[100%] gap-5">
        <div class="w-[33%] flex flex-col gap-[2px]">
          <label class="text-[20px] font-normal">Model name</label>
          <input
            class="w-[100%] p-[8px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
            type="text"
            v-model="form.model_name"
          />
        </div>
        <!-- Select Category -->
        <div class="w-[33%]">
          <h1 class="text-[20px] font-normal">Category</h1>
          <select
            v-model="form.category_id"
            class="w-[100%] p-[10px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
            @change="getBrands"
          >
            <option
              v-for="(item, index) in category_options"
              :key="index"
              :value="item?.id"
            >
              {{ item?.category_name }}
            </option>
          </select>
        </div>
        <!-- Select Brand -->
        <div class="w-[33%]">
          <h1 class="text-[20px] font-normal">Brand</h1>
          <select
            v-model="form.brand_id"
            class="w-[100%] p-[10px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
            @change="getCategoryBrand"
          >
            <option
              v-for="(item, index) in category_store?.brands"
              :key="index"
              :value="item?.id"
            >
              {{ item?.brand_name }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <div
          class="w-[100%] flex flex-col"
          v-for="(item, index) in model_store?.attributes"
          :key="index"
        >
          <label :for="item.name" class="text-[18px] font-normal">{{
            item.name
          }}</label>
          <input
            type="text"
            :name="item.name"
            class="w-full p-[8px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px]"
            v-model="attr[item.id]"
          />
        </div>
      </div>
    </div>
    <VButton
      btn_type="primary"
      :is-loading="loading"
      class="mt-5 w-[50%]"
      @click="send"
      v-if="brands.length > 0"
      >{{ loading ? "Loading" : "Create" }}</VButton
    >
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from "vue";
  import VInput from "@/components/form/VInput.vue";
  import { useCategoryStore } from "@/stores/admin/category";
  import type { IBrand } from "@/types/adminTypes";
  import { useModelStore } from "@/stores/admin/models";
  import VButton from "@/components/form/VButton.vue";

  const dialog = ref(false);
  const attr = ref<Record<number, string>>({});
  const category_store = useCategoryStore();
  const model_store = useModelStore();
  const category_options = ref();
  const loading = ref(false);
  const form = ref({
    model_name: "",
    category_id: NaN,
    brand_id: NaN,
    info: [
      {
        attribute_id: NaN,
        attribute_value: "" || [],
      },
    ],
  });
  const brands = ref([] as IBrand[]);
  watch(dialog, (value) => {
    if (!value) {
      form.value = {
        model_name: "",
        category_id: NaN,
        brand_id: NaN,
        info: [
          {
            attribute_id: NaN,
            attribute_value: "" || [],
          },
        ],
      };
      brands.value = [];
    }
  });

  const schema = computed(() => {
    return {
      model_name: "required|min:2",
      attribute_value: "required",
    };
  });

  const getBrands = async () => {
    await category_store.getBrandsByCategory({
      category_id: form.value.category_id,
    });
    await model_store.getAttributes(form.value.category_id);
    brands.value = category_store.brands;
  };

  const getCategoryBrand = async () => {
    await model_store.getCategoryBrand({
      category_id: form.value.category_id,
      brand_id: form.value.brand_id,
    });
  };

  const send = async () => {
    loading.value = true;
    form.value.info.pop();
    for (let [key, value] of Object.entries(attr.value)) {
      let new_value: any = value.split(",");
      form.value.info.push({
        attribute_id: Number(key),
        attribute_value: new_value,
      });
    }
    await model_store.addModel({
      ...form.value,
      category_brand_id: model_store.category_brand.id,
    });
    loading.value = false;
    location.reload();
  };

  onMounted(async () => {
    await category_store.getAllCategory();
    category_options.value = category_store.category.filter((item) => {
      if (item.parent_category_id) {
        return item;
      }
    });
  });

  // defineExpose({ openModal });
</script>

<style scoped></style>
