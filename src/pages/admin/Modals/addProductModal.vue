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

        <!-- Price -->
        <div
          class="flex gap-5 justify-between w-[100%] items-center"
          v-if="form.brand_id"
        >
          <h1 class="text-[20px] font-normal">Price:</h1>
          <input
            type="number"
            v-model="form.price"
            class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
          />
        </div>

        <!-- Quantity -->
        <div
          class="flex gap-5 justify-between w-[100%] items-center"
          v-if="form.brand_id"
        >
          <h1 class="text-[20px] font-normal">Quantity:</h1>
          <input
            type="number"
            v-model="form.quantity"
            class="w-[70%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
          />
        </div>

        <!-- Attributes -->
        <div class="flex gap-5 w-[100%] flex-col" v-if="form.model_id">
          <h1 class="text-[20px] font-normal">Attributes:</h1>
          <div class="flex gap-5 text-[18px] flex-col flex-wrap ml-10">
            <div
              v-for="(item, index) in product_store.model_attributes"
              :key="index"
              class="flex flex-col gap-5"
            >
              <div class="flex flex-row items-center gap-5">
                <h1 class="w-[8%]">{{ item.attribute.name }}:</h1>
                <select
                  v-model="attributes[item.attribute_id]"
                  class="w-[50%] p-[5px] text-[18px] outline-none border rounded-lg bg-[white] mt-[7px]"
                  @change="getModel"
                >
                  <option
                    v-for="(item2, index2) in product_store?.model_attributes[
                      index
                    ].attribute_value"
                    :key="index2"
                    :value="item2"
                  >
                    {{ item2 }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <VButton
          @click="send"
          type="button"
          v-if="form.model_id"
          btn_type="primary"
          :is-loading="loading"
          >{{ loading ? "Loading" : "Create" }}</VButton
        >
      </div>
    </vee-form>
  </AppModal>
</template>

<script setup lang="ts">
  //@ts-ignore
  import AppModal from "@/components/ui/app-modal.vue";
  import { onMounted, ref, watch } from "vue";
  import { useCategoryStore } from "@/stores/admin/category";
  import { useAdminStore } from "@/stores/admin/products";
  import VButton from "@/components/form/VButton.vue";

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

  const loading = ref(false);

  const attributes = ref<Record<number, string>>({});

  const dialog = ref(false);

  watch(dialog, (value) => {
    if (!value) {
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
  const product_store = useAdminStore();

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

  const send = async () => {
    loading.value = true;
    await product_store.addProduct({
      ...form.value,
      product_info: attributes.value,
    });
    loading.value = false;
    location.reload();
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
    await product_store.getAttributes({ model_id: form.value.model_id });
  };

  onMounted(async () => {});

  defineExpose({ openModal });
</script>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
