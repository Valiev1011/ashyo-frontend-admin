import type { ISale } from "@/types/adminTypes";
import axiosClient from "../apiClient";

const saleApi = {
  getAllSales(): Promise<ISale[]> {
    const url = "/sale/get-all";
    return axiosClient.get(url);
  },

  addSale(payload: any) {
    const url = "/sale/create";
    return axiosClient.post(url, payload);
  },

  updateSale(id: number, payload: any) {
    const url = `/sale/update/${id}`;
    return axiosClient.put(url, payload);
  },

  deleteSale(id: number) {
    const url = `/sale/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default saleApi;
