import categoryApi from "@/api/admin/category";
import type {
  IBrand,
  ICategory,
  IProductModel,
  IAttribute,
} from "@/types/adminTypes";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    category: [] as ICategory[],
    brands: [] as IBrand[],
    models: [] as IProductModel[],
    attributes: [] as IAttribute[],
  }),
  actions: {
    async getAllCategory() {
      try {
        let res = await categoryApi.getAllCategory();
        this.category = res;
        let count = 1;
        this.category.sort(function (a: ICategory, b: ICategory) {
          return a.position - b.position;
        });
        this.category.forEach((item) => {
          item.index = count;
          count++;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async addCategory(payload: ICategory) {
      try {
        let res = await categoryApi.addCategory(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async getCategorById(id: number) {
      try {
        let res = await categoryApi.getCategoryById(id);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCategory(id: number) {
      try {
        let res = await categoryApi.deleteCategory(id);
      } catch (error) {
        console.log(error);
      }
    },

    async getBrandsByCategory(payload: any) {
      try {
        this.brands = await categoryApi.getBrandsByCategory(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async getModels(payload: any) {
      try {
        this.models = await categoryApi.getModels(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async getAttributes(payload: any) {
      try {
        this.attributes = await categoryApi.getAttributes(payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
