import categoryApi from "@/api/admin/category";
import type { IBrand, ICategory, IModel, IAttribute } from "@/types/adminTypes";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    category: [] as ICategory[],
    brands: [] as IBrand[],
    models: [] as IModel[],
    attributes: [] as IAttribute[],
  }),
  actions: {
    async getAllCategory() {
      try {
        let res = await categoryApi.getAllCategory();
        this.category = res?.data.categories;
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
