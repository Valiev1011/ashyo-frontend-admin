<template>
  <div>
    <h1>Sales</h1>
    <Table :headers="headers" :body="[]"> </Table>
  </div>
</template>

<script setup lang="ts">
  import Table from "@/components/ui/Table.vue";
  import { ref } from "vue";

  const headers = ref([
    { title: "Model", value: "model_id" },
    { title: "Sale percentage", value: "sale_percentage" },
    { title: "Status", value: "sale_status" },
    { title: "Start date", value: "sale_start_date" },
    { title: "End date", value: "sale_end_date" },
  ]);
</script>

<style scoped></style>
