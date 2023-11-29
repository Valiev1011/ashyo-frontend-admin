import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axiosClient.interceptors.request.use(
  (config: any) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (err: Error) {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (res: any) => {
    return res.data;
  },
  function (err: Error) {
    return Promise.reject(err);
  }
);

export default axiosClient;
