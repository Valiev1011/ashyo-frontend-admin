<template>
  <AppModal v-model="dialog">
    <vee-form>
      <div class="flex flex-col items-start">
        <!-- Select Category -->
        <div class="flex gap-5 justify-between w-[100%] items-center">
          <h1 class="text-[20px] font-normal">Category:</h1>
          <select
            v-model="value"
            class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
            @change="getCategory"
          >
            <option
              v-for="(item, index) in options"
              :key="index"
              :value="item?.id"
            >
              {{ item?.category_name }}
            </option>
          </select>
        </div>
        <!-- Select SubCategory -->
        <div
          class="flex gap-5 justify-between w-[100%] items-center"
          v-if="value"
        >
          <h1 class="text-[20px] font-normal">SubCategory:</h1>
          <select
            v-model="form.category_id"
            class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
            @change="getSubCategory"
          >
            <option
              v-for="(item, index) in sub_options"
              :key="index"
              :value="item?.id"
            >
              {{ item?.category_name }}
            </option>
          </select>
        </div>
        <!-- Select Brand -->
        <div
          class="flex gap-5 justify-between w-[100%] items-center"
          v-if="form.category_id"
        >
          <h1 class="text-[20px] font-normal">Brand:</h1>
          <select
            v-model="form.brand_id"
            class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
            @change="getBrand"
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
        <!-- Select Model -->
        <div
          class="flex gap-5 justify-between w-[100%] items-center"
          v-if="form.brand_id"
        >
          <h1 class="text-[20px] font-normal">Model:</h1>
          <select
            v-model="form.model_id"
            class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
            @change="getModel"
          >
            <option
              v-for="(item, index) in category_store?.models"
              :key="index"
              :value="item?.id"
            >
              {{ item?.model_name }}
            </option>
          </select>
        </div>
        <!-- Attributes -->
        <div class="flex gap-5 w-[100%] flex-col" v-if="form.model_id">
          <h1 class="text-[20px] font-normal">Attributes:</h1>
          <div class="flex gap-5 text-[18px] flex-wrap ml-10">
            <div
              v-for="(item, index) in category_store.attributes"
              :key="index"
              class="flex items-center gap-5"
            >
              <h1>{{ item.name }}:</h1>
              <vee-field
                type="text"
                :name="item.name"
                class="w-[100%] p-[5px] text-[18px] border outline-none rounded-lg bg-[white]"
              />
              <ErrorMessage
                :name="item.name"
                class="text-error_color mt-2 text-[20px] font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </vee-form>
  </AppModal>
</template>

<script setup lang="ts">
  //@ts-ignore
  import AppModal from "@/components/ui/app-modal.vue";
  import { computed, onMounted, ref, watch } from "vue";
  import { useCategoryStore } from "@/stores/admin/category";
  import VInput from "@/components/form/VInput.vue";

  const options = ref();
  const sub_options = ref();
  const value = ref();

  const form = ref({
    category_id: null,
    brand_id: null,
    model_id: null,
    price: null,
    quantity: null,
  });

  const dialog = ref(false);

  computed(() => {
    if (!dialog) {
      form.value = {
        category_id: null,
        brand_id: null,
        model_id: null,
        price: null,
        quantity: null,
      };
    }
  });

  const category_store = useCategoryStore();

  const openModal = async () => {
    dialog.value = true;
    await category_store.getAllCategory();
    options.value = category_store.category.filter((item) => {
      if (!item.parent_category_id) {
        return item;
      } else {
        return false;
      }
    });
  };

  const getCategory = () => {
    sub_options.value = category_store.category.filter((item) => {
      if (value.value == item.parent_category_id) {
        return item;
      } else {
        return false;
      }
    });
  };

  const getSubCategory = async () => {
    await category_store.getBrandsByCategory({
      category_id: form.value.category_id,
    });
  };

  const getBrand = async () => {
    await category_store.getModels({
      category_id: form.value.category_id,
      brand_id: form.value.brand_id,
    });
  };

  const getModel = async () => {
    // console.log(
    //   form.value.model_id,
    //   form.value.category_id,
    //   form.value.brand_id
    // );
    await category_store.getAttributes({
      model_id: form.value.model_id,
      category_id: form.value.category_id,
      brand_id: form.value.brand_id,
    });
  };

  onMounted(async () => {});

  defineExpose({ openModal });
</script>

<style scoped></style>
