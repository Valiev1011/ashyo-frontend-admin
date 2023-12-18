import { defineStore } from "pinia";
import authApi from "../api/authApi";
import router from "../router/index";
import type { IAuthPayload } from "@/types/authTypes";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  actions: {
    async authLogin(payload: IAuthPayload) {
      try {
        let res: any = await authApi.login(payload);
        this.user = res?.admin;
        if (res?.tokens?.access_token) {
          localStorage.setItem("role", "admin");
          localStorage.setItem("token", res?.tokens?.access_token);
          await router.push({ name: "admin" });
          // if (res?.user?.role === "admin") {
          // }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
