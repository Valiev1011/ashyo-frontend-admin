<template>
  <div>
    <addCategoryVue ref="category_modal" />
    <DeleteModal
      custom-key="category"
      :modal_value="store"
      ref="delete_modal"
    />
    <h1>Category</h1>
    <VButton btn_type="primary" :is-loading="false" @click="openModal"
      >Add Category</VButton
    >
    <Table :headers="headers" :body="store.category">
      <template #body_id="{ item }">
        {{
          // @ts-ignore
          store.category.indexOf(item) + 1
        }}
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
  import VButton from "@/components/form/VButton.vue";
  import Table from "@/components/ui/Table.vue";
  import { useCategoryStore } from "@/stores/admin/category";
  import { onMounted, ref } from "vue";
  import addCategoryVue from "./Modals/addCategory.vue";
  import DeleteModal from "./Modals/deleteModal.vue";
  import type { ICategory } from "@/types/adminTypes";
  // @ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";

  const store = useCategoryStore();
  const category_modal = ref();
  const delete_modal = ref();
  const headers = ref([
    { title: "№", value: "index" },
    { title: "Name", value: "category_name" },
    { title: "Parent category", value: "parent_category_id" },
    { title: "Position", value: "position" },
    { title: "Action", value: "action" },
  ]);

  const openModal = () => {
    category_modal.value.openModal();
  };

  const openDeleteModal = (item: any) => {
    delete_modal.value.openModal(item.id);
  };

  onMounted(async () => {
    await store.getAllCategory();
  });
</script>

<style scoped></style>
