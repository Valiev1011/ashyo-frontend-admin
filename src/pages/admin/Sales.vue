<template>
  <div>
    <h1>Sales</h1>
    <AddSale ref="sale_modal" />
    <DeleteModal ref="delete_modal" custom-key="sale" :modal_value="store" />
    <VButton btn_type="primary" :is-loading="false" @click="openModal"
      >Add Sale</VButton
    >
    <Table :headers="headers" :body="store?.sales">
      <template #body_model_id="{ item }">
        {{ item.model.model_name }}
      </template>

      <template #body_sale_percentage="{ item }">
        {{ item.sale_percentage }}%
      </template>

      <template #body_sale_start_date="{ item }">
        {{ formatDate(item.sale_start_date) }}
      </template>
      <template #body_sale_end_date="{ item }">
        {{ formatDate(item.sale_end_date) }}
      </template>

      <template #body_actions="{ item }">
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
  import Table from "@/components/ui/Table.vue";
  import { useSaleStore } from "@/stores/admin/sales";
  import { onMounted, ref } from "vue";
  import { formatDate } from "@/plugins/format";
  import VButton from "@/components/form/VButton.vue";
  import AddSale from "./Modals/addSale.vue";
  // @ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiDeleteOutline, mdiPencilOutline } from "@mdi/js";
  import DeleteModal from "./Modals/deleteModal.vue";

  const store = ref(useSaleStore());
  const sale_modal = ref();
  const delete_modal = ref();
  const headers = ref([
    { title: "№", value: "index" },
    { title: "Model", value: "model_id" },
    { title: "Sale percentage", value: "sale_percentage" },
    { title: "Status", value: "sale_status" },
    { title: "Start date", value: "sale_start_date" },
    { title: "End date", value: "sale_end_date" },
    { title: "Actions", value: "actions" },
  ]);

  const openModal = (item: any) => {
    sale_modal.value.openModal(item);
  };

  const openDeleteModal = (id: number) => {
    delete_modal.value.openModal(id);
  };

  onMounted(async () => {
    await store.value.getAllSales();
  });
</script>

<style scoped></style>
