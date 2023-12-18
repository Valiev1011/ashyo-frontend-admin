<template>
  <div>
    <h1>Models</h1>
    <DeleteModal :modal_value="store" customKey="model" ref="delete_modal" />
    <VButton :isLoading="false" btn_type="primary" @click="openModal"
      >Add Model</VButton
    >
    <Table :headers="headers" :body="store.models">
      <template
        v-if="category_store.category.length > 0"
        #body_category_id="{ item }"
      >
        {{ getCategory(item) }}
      </template>
      <template v-if="brand_store.brands.length > 0" #body_brand_id="{ item }">
        {{ getBrand(item) }}
      </template>
      <template #body_action="{ item }">
        <div class="flex gap-1">
          <VButton :isLoading="false" btn_type="success"
            ><SvgIcon type="mdi" :path="mdiPencilOutline"
          /></VButton>
          <VButton
            :isLoading="false"
            btn_type="danger"
            @click="openDeleteModal(item.id)"
            ><SvgIcon type="mdi" :path="mdiDeleteOutline"
          /></VButton>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import VButton from "@/components/form/VButton.vue";
  import Table from "@/components/ui/Table.vue";
  import { useModelStore } from "@/stores/admin/models";
  import { useCategoryStore } from "@/stores/admin/category";
  import { useBrandStore } from "@/stores/admin/brands";
  import router from "@/router";
  // @ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
  import DeleteModal from "./Modals/deleteModal.vue";

  const store = useModelStore();
  const category_store = useCategoryStore();
  const brand_store = useBrandStore();
  const delete_modal = ref();
  const headers = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "model_name" },
    { title: "Category Brand", value: "category_id" },
    { title: "Brand", value: "brand_id" },
    { title: "Action", value: "action" },
  ]);

  const getCategory = (item: any) => {
    let category = category_store.category.filter((category_item) => {
      if (item.category_brand.category_id == category_item.id) {
        return category_item;
      }
    });

    return category[0].category_name;
  };

  const getBrand = (item: any) => {
    let brand = brand_store.brands.filter((brand_item) => {
      if (item.category_brand.brand_id == brand_item.id) {
        return brand_item;
      }
    });

    return brand[0].brand_name;
  };

  const openModal = () => {
    router.push({ name: "create_model" });
    // modal_value.value.openModal();
  };

  const openDeleteModal = (id: number) => {
    delete_modal.value.openModal(id);
  };

  onMounted(async () => {
    await Promise.all([
      store.getAllModels(),
      category_store.getAllCategory(),
      brand_store.getAllBrands(),
    ]);
  });
</script>

<style scoped></style>
