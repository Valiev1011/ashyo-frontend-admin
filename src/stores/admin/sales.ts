import saleApi from "@/api/admin/sales";
import type { ISale } from "@/types/adminTypes";
import { defineStore } from "pinia";

export const useSaleStore = defineStore({
  id: "sale",
  state: () => ({
    sales: [] as ISale[],
  }),
  actions: {
    async getAllSales() {
      try {
        this.sales = await saleApi.getAllSales();
        let count = 1;
        this.sales.forEach((item: ISale) => {
          item.index = count;
          count++;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async addSale(payload: any) {
      try {
        let res = await saleApi.addSale(payload);
      } catch (error) {
        console.log(error);
      }
    },

    async updateSale(id: number, payload: any) {
      try {
        let res = await saleApi.updateSale(id, payload);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteSale(id: number) {
      try {
        // let res = await saleApi.deleteSale(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
