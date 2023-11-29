import type { AxiosResponse } from "axios";
import axiosClient from "../apiClient";
import type { IProduct } from "@/types/adminTypes";

const adminApi = {
  getAllProducts(): Promise<AxiosResponse<{ products: IProduct[] }>> {
    const url = "/product/get-all";
    return axiosClient.get(url);
  },

  deleteProduct(id: number) {
    const url = `/product/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminApi;
