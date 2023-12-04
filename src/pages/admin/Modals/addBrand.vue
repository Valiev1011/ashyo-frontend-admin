<template>
  <AppModal v-model="dialog">
    <vee-form :validation-schema="schema" :initial-values="form" @submit="send">
      <VInput type="text" label="Brand name" name="brand_name" />
      <VInput type="text" label="Description" name="brand_description" />
      <VInput type="number" label="Position" name="position" />
      <div class="flex gap-8">
        <div class="flex w-[30%] flex-col">
          <label for="image" class="text-[20px] font-normal">Image</label>
          <input
            type="file"
            class="w-[100%] p-[10px] text-[17px] outline-none border rounded-lg bg-[white] mt-[7px]"
            name="image"
            @change="handleImage($event)"
          />
        </div>
        <img
          v-if="form.image"
          class="mt-5 w-[300px] h-[150px] object-contain"
          :src="form.image"
          alt="brand_img"
        />
      </div>
      <VButton class="mt-5 w-full" btn_type="success" :is-loading="loading">{{
        loading ? "Loading" : `${title}`
      }}</VButton>
    </vee-form>
  </AppModal>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import AppModal from "@/components/ui/app-modal.vue";
  import VInput from "@/components/form/VInput.vue";
  import VButton from "@/components/form/VButton.vue";
  import type { IBrand } from "@/types/adminTypes";
  import { useBrandStore } from "@/stores/admin/brands";

  const store = useBrandStore();
  const dialog = ref(false);
  const formdata = ref(new FormData());
  watch(dialog, (value) => {
    if (!value) {
      form.value = {
        id: NaN,
        brand_name: "",
        brand_description: "",
        position: NaN,
        image: "",
      };
    }
  });
  const loading = ref(false);

  const title = ref();

  const form = ref({
    id: NaN,
    brand_name: "",
    brand_description: "",
    position: NaN,
    image: "",
  });

  const schema = computed(() => {
    return {
      brand_name: "required|min:2",
      brand_description: "required|min:3",
      position: "required",
    };
  });

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      formdata.value.append("image", file);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      // @ts-ignore
      form.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const send = async (values: IBrand) => {
    loading.value = true;
    if (form.value.image) {
      const payload = {
        brand_name: values.brand_name,
        brand_description: values.brand_description,
        position: values.position,
        image: formdata.value.get("image"),
      };
      if (title.value == "Edit") {
        await store.updateBrand(form.value.id, {
          ...payload,
          id: form.value.id,
        });
      } else if (title.value == "Create") {
        await store.addBrand(payload);
      }
      location.reload();
    }
    loading.value = false;
  };

  const openModal = (titleKey: string, item?: IBrand) => {
    if (item?.id) {
      form.value = { ...item };
    }
    title.value = titleKey;
    dialog.value = true;
  };

  defineExpose({ openModal });
</script>

<style scoped>
  input[type="file"] {
    color: transparent;
  }
</style>
