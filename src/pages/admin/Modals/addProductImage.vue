<template>
  <appModalVue v-model="dialog">
    <input type="file" multiple @change="handleChange" />
    <div class="flex">
      <div v-for="(image, index) in images" :key="index" class="w-fit">
        <img
          :src="image"
          alt="img"
          class="w-[100px] h-[100px] object-contain mt-5"
        />
      </div>
    </div>
    <VButton
      class="my-5 w-[18%]"
      btn_type="primary"
      :is-loading="loading"
      @click="send"
      >{{ loading ? "Loading" : "Add" }}</VButton
    >
  </appModalVue>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import VButton from "@/components/form/VButton.vue";
  import appModalVue from "@/components/ui/app-modal.vue";
  import { useAdminStore } from "@/stores/admin/products";

  const dialog = ref(false);
  const images = ref([]);
  const store = ref(useAdminStore());
  const files = ref([] as File[]);
  const loading = ref(false);
  watch(dialog, (value) => {
    if (!value) {
      images.value = [];
    }
  });

  const handleChange = (e: any) => {
    const newFiles = (e.target as HTMLInputElement).files;
    if (newFiles) {
      files.value = Array.from(newFiles); // Convert FileList to an array
      images.value = []; // Clear previous images
      files.value.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // @ts-ignore
          images.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const send = async () => {
    loading.value = true;
    files.value.forEach(async (file: File) => {
      const formdata = new FormData();
      formdata.append("image", file);
      await store.value.addImageToProduct({
        product_id: id.value,
        image: formdata.get("image"),
      });
    });
    loading.value = false;
    location.reload();
  };

  const id = ref();

  const openModal = (value: number) => {
    id.value = value;
    dialog.value = true;
  };
  defineExpose({ openModal });
</script>

<style scoped></style>
