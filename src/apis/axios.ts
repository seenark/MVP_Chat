import axios, { AxiosRequestConfig } from "axios";

const option: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_API_URL,
};

const instance = axios.create(option);
instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
