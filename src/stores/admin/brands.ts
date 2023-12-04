import brandApi from "@/api/admin/brands";
import type { IBrand } from "@/types/adminTypes";
import { defineStore } from "pinia";

export const useBrandStore = defineStore({
  id: "brand",
  state: () => ({
    brands: [] as IBrand[],
  }),
  actions: {
    async getAllBrands() {
      this.brands = await brandApi.getAllBrands();
      this.brands.sort(function (a: IBrand, b: IBrand) {
        return a.position - b.position;
      });
      let count = 1;
      this.brands.forEach((item) => {
        item.index = count;
        count++;
      });
    },

    async deleteBrand(id: number) {
      try {
        // let res = await brandApi.deleteBrand(id);
      } catch (error) {
        console.log(error);
      }
    },

    async addBrand(payload: any) {
      try {
        let res = await brandApi.addBrand(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async updateBrand(id: number, payload: any) {
      try {
        let res = await brandApi.updateBrand(id, payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
