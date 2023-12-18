<template>
  <section
    class="w-full h-screen bg-[#E7EDF0] flex items-center justify-center"
  >
    <div class="w-[80%] flex items-center justify-center">
      <div class="w-[60%] flex items-center justify-center flex-col">
        <h1 class="text-global1 font-bold text-[44px]">Ashyo do'koniga</h1>
        <p class="text-global1 font-normal text-[32px]">Xush kelibsiz!</p>
        <vee-form
          :validation-schema="schema"
          class="w-[90%] mt-[70px] flex flex-col gap-[30px]"
          @submit="send"
        >
          <div class="w-full">
            <VInput
              type="text"
              label="Email"
              name="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div class="w-full justify-between items-center">
            <VPasswordInputVue
              type="password"
              label="Password"
              name="password"
              placeHolder="Enter your password"
            ></VPasswordInputVue>
          </div>

          <VButtonVue type="submit" btn_type="primary" :isLoading="false">
            {{ btn_title }}</VButtonVue
          >
        </vee-form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import VButtonVue from "@/components/form/VButton.vue";
  import VInput from "@/components/form/VInput.vue";
  import VPasswordInputVue from "@/components/form/VPasswordInput.vue";
  import type { IAuthPayload } from "@/types/authTypes";
  import { useAuthStore } from "@/stores/auth";

  const loading = ref(false);
  const store = useAuthStore();

  const btn_title = computed(() => {
    if (loading.value) {
      return "Loading";
    } else {
      return "Kirish";
    }
  });

  const schema = computed(() => {
    return {
      email: "required|email|min:15|max:30",
      password: "required|min:8|max:30",
    };
  });

  const send = async (values: IAuthPayload) => {
    loading.value = true;
    await store.authLogin(values);
    loading.value = false;
  };
</script>

<style scoped></style>
