<template>
  <div>
    <h1>Brands</h1>
    <AddBrand ref="brand_modal" />
    <DeleteModal :modal_value="store" custom-key="brand" ref="delete_modal" />
    <VButton btn_type="primary" :is-loading="false" @click="openModal"
      >Add Brand</VButton
    >
    <Table :headers="headers" :body="store?.brands">
      <template #body_image="{ item }">
        <img class="h-[50px] object-contain" :src="item.image" alt="img" />
      </template>

      <template #body_action="{ item }">
        <div class="flex gap-1">
          <VButton
            :isLoading="false"
            btn_type="success"
            @click="openModal(item)"
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
  import Table from "@/components/ui/Table.vue";
  import { useBrandStore } from "@/stores/admin/brands";
  import VButton from "@/components/form/VButton.vue";
  import DeleteModal from "./Modals/deleteModal.vue";
  import AddBrand from "./Modals/addBrand.vue";
  import type { IBrand } from "@/types/adminTypes";
  // @ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";

  const store = useBrandStore();
  const delete_modal = ref();
  const brand_modal = ref();
  const headers = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "brand_name" },
    { title: "Description", value: "brand_description" },
    { title: "Position", value: "position" },
    { title: "Image", value: "image" },
    { title: "Action", value: "action" },
  ]);

  const openDeleteModal = (id: number) => {
    delete_modal.value.openModal(id);
  };

  const openModal = (item?: IBrand) => {
    if (item?.id) {
      brand_modal.value.openModal("Edit", item);
    } else {
      brand_modal.value.openModal("Create");
    }
  };

  onMounted(async () => {
    await store.getAllBrands();
  });
</script>

<style scoped></style>
