import type { AxiosResponse } from "axios";
import axiosClient from "../apiClient";
import type { IAttribute, IBrand, ICategory, IModel } from "@/types/adminTypes";

const categoryApi = {
  getAllCategory(): Promise<AxiosResponse<{ categories: ICategory[] }>> {
    const url = "/category/get-all";
    return axiosClient.get(url);
  },

  addCategory(payload: ICategory) {
    const url = "/category/create";
    return axiosClient.post(url, payload);
  },

  deleteCategory(id: number) {
    const url = `/category/delete/${id}`;
    return axiosClient.delete(url);
  },

  getBrandsByCategory(payload: any): Promise<IBrand[]> {
    const url = "brand/get/by-category";
    return axiosClient.post(url, payload);
  },

  getModels(payload: any): Promise<IModel[]> {
    const url = "product-model/get/by-category-brand";
    return axiosClient.post(url, payload);
  },

  getAttributes(payload: any): Promise<IAttribute[]> {
    const url = "product/get/attributes/by-model";
    return axiosClient.post(url, payload);
  },
};

export default categoryApi;
