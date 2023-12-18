import type { IBrand } from "@/types/adminTypes";
import axiosClient from "../apiClient";

const brandApi = {
  getAllBrands(): Promise<IBrand[]> {
    const url = "/brand/get-all";
    return axiosClient.get(url);
  },

  deleteBrand(id: number) {
    const url = `/brand/delete/${id}`;
    return axiosClient.delete(url);
  },

  addBrand(payload: any) {
    const url = "/brand/create";
    return axiosClient.post(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateBrand(id: number, payload: any) {
    const url = `/brand/update/${id}`;
    return axiosClient.put(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default brandApi;
