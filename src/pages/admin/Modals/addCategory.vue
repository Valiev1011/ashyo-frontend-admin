<template>
  <AppModal v-model="dialog">
    <vee-form :validation-schema="schema" :initial-values="form" @submit="send">
      <VInput type="text" label="Category Name" name="name" />
      <VInput type="number" label="Position" name="position" />
      <label class="text-[20px] font-normal">Parent Category</label>
      <select
        class="w-[100%] p-[5px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px]"
        v-model="parent_category_id"
      >
        <option :value="null"></option>
        <option v-for="(item, index) in options" :key="index" :value="item.id">
          {{ item.category_name }}
        </option>
      </select>

      <VButton btn_type="success" class="mt-5" :is-loading="false"
        >Create</VButton
      >
    </vee-form>
  </AppModal>
</template>

<script setup lang="ts">
  import VButton from "@/components/form/VButton.vue";
  import VInput from "@/components/form/VInput.vue";
  //@ts-ignore
  import AppModal from "@/components/ui/app-modal.vue";
  import { useCategoryStore } from "@/stores/admin/category";
  import { computed, ref } from "vue";

  const dialog = ref(false);
  const store = useCategoryStore();
  const options = ref();
  const form = ref({
    name: "",
    position: null,
  });
  const parent_category_id = ref(null);

  const schema = computed(() => {
    return {
      name: "required|min:3|max:30",
      position: "required|max:2",
    };
  });

  const send = async (values: any) => {
    if (parent_category_id.value) {
      await store.addCategory({
        category_name: values.name,
        parent_category_id: parent_category_id.value,
        position: values.position,
      });
    } else {
      await store.addCategory({
        category_name: values.name,
        position: values.position,
      });
    }
    location.reload();
  };

  const openModal = () => {
    dialog.value = true;
    options.value = store?.category.filter((item) => {
      if (!item.parent_category_id) {
        return item;
      } else {
        return false;
      }
    });
  };

  defineExpose({ openModal });
</script>

<style scoped></style>
