<template>
  <div class="w-full flex h-screen">
    <TheSidebarVue />
    <div class="flex flex-col w-full">
      <TheHeaderVue />
      <div class="h-full overflow-auto ml-[20px]">
        <div class="overflow-x-auto">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TheHeaderVue from "../components/header/TheHeader.vue";
  import TheSidebarVue from "../components/header/TheSidebar.vue";
</script>

<style lang="scss" scoped></style>
