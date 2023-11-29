import type { IAuthPayload } from "@/types/authTypes";
import axiosClient from "./apiClient";

const authApi = {
  login(payload: IAuthPayload) {
    const url = "/admin/login";
    console.log(payload);
    return axiosClient.post(url, payload);
  },
};

export default authApi;
