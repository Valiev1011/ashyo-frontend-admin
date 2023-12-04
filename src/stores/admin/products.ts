import adminApi from "@/api/admin/products";
import { defineStore } from "pinia";
import type { IModelAttribute, IProduct } from "@/types/adminTypes";

export const useAdminStore = defineStore({
  id: "admin",
  state: () => ({
    products: [] as IProduct[],
    model_attributes: [] as IModelAttribute[],
  }),
  actions: {
    async getAllProducts() {
      try {
        let res = await adminApi.getAllProducts();
        this.products = res;
        let count = 1;
        this.products.forEach((item) => {
          item.index = count;
          count++;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteProduct(id: number) {
      try {
        let res = await adminApi.deleteProduct(id);
      } catch (error) {
        console.log(error);
      }
    },

    async getAttributes(payload: any) {
      try {
        this.model_attributes = await adminApi.getAttributes(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async addProduct(payload: any) {
      try {
        let res = await adminApi.addProduct(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async addImageToProduct(payload: any) {
      try {
        let res = await adminApi.addImageToProduct(payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
