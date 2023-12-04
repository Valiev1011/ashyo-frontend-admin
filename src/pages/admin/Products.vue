<template>
  <div>
    <AddProductModal ref="product_modal" />
    <addProductImageVue ref="image_modal" />
    <deleteModalVue
      customKey="product"
      :modal_value="store"
      ref="delete_modal"
    />
    <h1>Products</h1>
    <VButton
      type="button"
      btn_type="primary"
      :isLoading="false"
      @click="openModal"
      >Add Product</VButton
    >
    <Table :headers="headers" :body="store?.products">
      <template #body_category="{ item }">
        {{ item?.category?.category_name }}
      </template>
      <template #body_brand="{ item }">
        {{ item?.brand?.brand_name }}
      </template>
      <template #body_productmodel="{ item }">
        {{ item?.productmodel?.modal_value }}
      </template>
      <template #body_stock="{ item }">
        {{ item?.stock?.quantity }}
      </template>
      <template #body_actions="{ item }">
        <div class="flex gap-1">
          <VButton
            :isLoading="false"
            btn_type="primary"
            @click="openImageModal(item.id)"
            ><SvgIcon type="mdi" :path="mdiFileImagePlusOutline"
          /></VButton>
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
  import VButton from "@/components/form/VButton.vue";
  import Table from "@/components/ui/Table.vue";
  import { onMounted, ref } from "vue";
  import { useAdminStore } from "@/stores/admin/products";
  import type { IProduct } from "@/types/adminTypes";
  import AddProductModal from "./Modals/addProductModal.vue";
  import deleteModalVue from "./Modals/deleteModal.vue";
  // @ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import {
    mdiFileImagePlusOutline,
    mdiPencilOutline,
    mdiDeleteOutline,
  } from "@mdi/js";
  import addProductImageVue from "./Modals/addProductImage.vue";

  const product_modal = ref();
  const delete_modal = ref();
  const image_modal = ref();
  const store = useAdminStore();
  const headers = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "name" },
    { title: "Price", value: "price" },
    { title: "Category", value: "category" },
    { title: "Brand", value: "brand" },
    { title: "Model", value: "productmodel" },
    { title: "Quantity", value: "stock" },
    { title: "rating", value: "average_rating" },
    { title: "Actions", value: "actions" },
  ]);

  const openImageModal = (id: number) => {
    image_modal.value.openModal(id);
  };

  const openDeleteModal = (id: number) => {
    delete_modal.value.openModal(id);
  };

  const openModal = () => {
    product_modal.value.openModal();
  };

  onMounted(async () => {
    await store.getAllProducts();
  });
</script>

<style scoped></style>
