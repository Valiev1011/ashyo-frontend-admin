import adminApi from "@/api/admin/products";
import { defineStore } from "pinia";
import type { IProduct } from "@/types/adminTypes";

export const useAdminStore = defineStore({
  id: "admin",
  state: () => ({
    products: [] as IProduct[],
  }),
  actions: {
    async getAllProducts() {
      try {
        let res = await adminApi.getAllProducts();
        this.products = res?.data.products;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteProduct(id: number) {
      try {
        console.log(id);
        // let res = await adminApi.deleteProduct(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
