import type { IAttribute, IProductModel } from "@/types/adminTypes";
import axiosClient from "../apiClient";

const modelApi = {
  getAllModels(): Promise<IProductModel[]> {
    const url = "/product-model/get-all";
    return axiosClient.get(url);
  },

  getCategoryBrand(payload: any) {
    const url = "/brand-category/get/by-id";
    return axiosClient.post(url, payload);
  },

  getAttributes(id: number): Promise<IAttribute[]> {
    const url = `/attributes/get-by-category/${id}`;
    return axiosClient.get(url);
  },

  addModel(payload: any) {
    const url = "/product-model/create";
    return axiosClient.post(url, payload);
  },

  deleteModel(id: number) {
    const url = `/product-model/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default modelApi;
