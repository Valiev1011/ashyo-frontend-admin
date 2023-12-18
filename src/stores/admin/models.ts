import modelApi from "@/api/admin/models";
import type { IAttribute, IProductModel } from "@/types/adminTypes";
import { defineStore } from "pinia";

export const useModelStore = defineStore({
  id: "model",
  state: () => ({
    models: [] as IProductModel[],
    category_brand: {} as any,
    attributes: [] as IAttribute[],
  }),
  actions: {
    async getAllModels() {
      try {
        this.models = await modelApi.getAllModels();
        let count = 1;
        this.models.forEach((item) => {
          item.index = count;
          count++;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getCategoryBrand(payload: any) {
      try {
        this.category_brand = await modelApi.getCategoryBrand(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async getAttributes(id: number) {
      try {
        this.attributes = await modelApi.getAttributes(id);
      } catch (error) {
        console.log(error);
      }
    },

    async addModel(payload: any) {
      try {
        let res = await modelApi.addModel(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteModel(id: number) {
      try {
        // let res = await modelApi.deleteModel(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
