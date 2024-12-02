import { apiURL } from "@/constants/url";
import { axiosInstance, handleResponse } from "./axiosInstance";
import { THttpResponse } from "@/types/http";
import { TProvince } from "@/types/provinces";

export const provinceApi = {
  getAllProvinces: (): Promise<THttpResponse<TProvince[]>> => {
    return handleResponse(axiosInstance.get(apiURL.GET_ALL_PROVINCES));
  },
  getDistrictsByProvinceCode: (
    code: string | number
  ): Promise<THttpResponse<TProvince[]>> => {
    return handleResponse(
      axiosInstance.get(apiURL.GET_DISTRICTS_BY_PROVINCE_CODE(code))
    );
  },
};
