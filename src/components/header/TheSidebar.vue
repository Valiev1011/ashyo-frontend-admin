<template>
  <div class="flex bg-[white]">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity opacity-50 lg:hidden bg-[#00111380]"
    ></div>
  </div>
  <div
    class="w-[15%] bg-global1 h-screen fixed inset-y-0 left-0 z-20 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="d-flex flex flex-row-reverse">
      <button
        class="p-[10px] lg:hidden text-[white] mt-2 mr-2"
        @click="isOpen = false"
      >
        <SvgIcon type="mdi" :path="mdiClose" />
      </button>
    </div>
    <div
      :class="isOpen ? 'mt-[15px]' : 'mt-[70px]'"
      class="border-t-[1px] border-[white]"
    >
      <router-link
        v-for="(item, index) in menu"
        :key="index"
        :to="item.path"
        class="flex py-[10px] px-[30px] text-[white] gap-[15px]"
        :class="{
          active_class: $route.meta.child == item.keys,
        }"
        ><div class="text-[20px]">
          <!-- <img :src="item.icon" class="w-[30px] h-[30px]" alt="icon" /> -->
          <SvgIcon type="mdi" :path="item.icon" />
        </div>
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  //@ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiClose } from "@mdi/js";
  import { useSidebarjs } from "../../hooks/UseSidebar";
  import { ref } from "vue";

  import { AdminMenu } from "../menu/AdminMenu";

  const menu = ref(AdminMenu);

  const isOpen = useSidebarjs();
</script>

<style scoped>
  .active_class {
    background-color: #f5fccd;
    color: #12486b;
  }
</style>
