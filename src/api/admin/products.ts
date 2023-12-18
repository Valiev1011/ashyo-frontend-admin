import type { AxiosResponse } from "axios";
import axiosClient from "../apiClient";
import type { IModelAttribute, IProduct } from "@/types/adminTypes";

const adminApi = {
  getAllProducts(): Promise<IProduct[]> {
    const url = "/product/get-all";
    return axiosClient.get(url);
  },

  deleteProduct(id: number) {
    const url = `/product/delete/${id}`;
    return axiosClient.delete(url);
  },

  getAttributes(payload: any): Promise<IModelAttribute[]> {
    const url = "/model-attribute/get-model-attributes";
    return axiosClient.post(url, payload);
  },

  addProduct(payload: any) {
    const url = "/product/create";
    return axiosClient.post(url, payload);
  },

  addImageToProduct(payload: any) {
    const url = "/product-media/add-media";
    return axiosClient.post(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default adminApi;
