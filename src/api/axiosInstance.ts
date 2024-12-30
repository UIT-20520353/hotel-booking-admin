import { store } from "@/app/store";
import appConstants from "@/constants/app";
import { decreaseLoading, increaseLoading } from "@/redux/globalSlice";
import { THttpResponse } from "@/types/http";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8082",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(appConstants.ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }

    store.dispatch(increaseLoading());
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(decreaseLoading());
    return response;
  },
  (error) => {
    console.error("Response error: ", error);
    store.dispatch(decreaseLoading());
    return Promise.reject(error);
  }
);

const handleResponse = <T>(
  response: Promise<AxiosResponse>
): Promise<THttpResponse<T>> =>
  response
    .then((res) => ({
      ok: true,
      status: res.status,
      body: res.data as T,
      error: undefined,
      totalPages: Number(res.headers["x-total-pages"]),
    }))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((error: any) => {
      if (error.status === 401) {
        localStorage.removeItem(appConstants.ACCESS_TOKEN_KEY);
      }

      return {
        ok: false,
        status: error.status,
        body: undefined,
        error: error.response.data,
      };
    });

const mapboxInstance = axios.create({
  baseURL: "https://api.mapbox.com",
});

export { axiosInstance, handleResponse, mapboxInstance };
