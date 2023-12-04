<template>
  <AppModal v-model="dialog">
    <div class="flex flex-col items-center">
      <SvgIcon
        type="mdi"
        :size="100"
        class="text-[red]"
        :path="mdiAlertCircleOutline"
      />
      <h3 class="text-[30px] font-bold">Are you sure to delete?</h3>
      <div class="flex w-[80%] gap-5 ml-[45%] mt-5">
        <VButton
          btn_type="success"
          :is-loading="loading"
          class="w-[20%] text-[17px] uppercase"
          @click="yes"
          >{{ loading ? "Loading" : "Yes" }}</VButton
        >
        <VButton
          btn_type="danger"
          :is-loading="false"
          class="w-[20%] text-[17px] uppercase"
          @click="dialog = false"
          >cancel</VButton
        >
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  //@ts-ignore
  import AppModal from "@/components/ui/app-modal.vue";
  //@ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiAlertCircleOutline } from "@mdi/js";
  import VButton from "@/components/form/VButton.vue";

  export interface IProps {
    modal_value: any;
    customKey: string;
  }

  const props = defineProps<IProps>();
  const loading = ref(false);
  const dialog = ref(false);
  const id = ref(0);
  const yes = async () => {
    loading.value = true;
    if (props.customKey == "category") {
      await props.modal_value.deleteCategory(id.value);
    } else if (props.customKey == "product") {
      await props.modal_value.deleteProduct(id.value);
    } else if (props.customKey == "brand") {
      await props.modal_value.deleteBrand(id.value);
    } else if (props.customKey == "model") {
      await props.modal_value.deleteModel(id.value);
    } else if(props.customKey == "sale") {
      await props.modal_value.deleteSale(id.value)
    }
    loading.value = false;
    location.reload();
  };

  const openModal = (value: any) => {
    id.value = value;
    dialog.value = true;
  };
  defineExpose({ openModal });
</script>

<style scoped></style>
