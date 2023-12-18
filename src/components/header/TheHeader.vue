<template>
  <div
    class="h-[70px] bg-global1 w-full border-l-[1px] border-[#fff] flex flex-row justify-between"
  >
    <button
      class="p-[10px] h-[40px] lg:hidden text-[white] my-[12px] ml-2 pb-[30px]"
      @click="isOpen = true"
    >
      <SvgIcon type="mdi" :path="mdiMenu" />
    </button>

    <!-- search -->
    <div class="relative my-[15px] mx-[40px]">
      <input
        v-model="payload.phone"
        type="text"
        name="search"
        placeholder="Search"
        class="outline-none w-[400px] px-[15px] py-3 text-[13px] rounded-[20px] h-[40px]"
      />
      <SvgIcon
        type="mdi"
        :path="mdiMagnify"
        class="absolute top-[8px] left-[350px]"
      />
    </div>

    <!-- <Account /> -->
    <div class="account flex items-center cursor-pointer mr-10">
      <div
        class="w-[35px] h-[35px] rounded-full flex items-center justify-center"
      ></div>
      <div class="w-[40px]">
        <img
          :src="image ? image : Account"
          alt="account img"
          class="w-[50px] h-[40px] object-cover rounded-full"
        />
      </div>
      <span class="text-[white] text-xs ml-[10px] mr-[26px] text-[17.5px]">
        Admin
      </span>

      <!-- sub-menu -->
      <div
        class="sub_menu bg-[white] text-global1 w-[120px] rounded-lg shadow-lg overflow-hidden absolute top-[63px] right-[33px]"
      >
        <div
          class="py-3 px-4 hover:bg-global1 hover:text-[white] duration-200"
          @click="goToProfile"
        >
          Profile
        </div>
        <div
          class="py-3 px-4 hover:bg-global1 hover:text-[white] duration-200"
          @click="logout"
        >
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSidebarjs } from "../../hooks/UseSidebar";
  //@ts-ignore
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiMenu, mdiMagnify } from "@mdi/js";
  import { onMounted, ref } from "vue";
  import Account from "@/assets/account.svg";
  import { useAuthStore } from "../../stores/auth";
  import { useRouter } from "vue-router";

  const store = useAuthStore();
  const router = useRouter();
  const isOpen = useSidebarjs();
  const image = ref("");
  const payload = ref({ phone: "" });
  const menu = ref("admin");

  const goToProfile = () => {
    router.push(`/${menu.value}/profile`);
  };

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    router.push("/login");
  };
</script>

<style scoped>
  .sub_menu {
    opacity: 0;
    visibility: hidden;
  }
  .account:hover .sub_menu {
    opacity: 1;
    visibility: visible;
  }
</style>
