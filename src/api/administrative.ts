import { apiURL } from "@/constants/url";
import {
  TAdministrativeRegion,
  TAdministrativeUnit,
} from "@/types/administrative";
import { THttpResponse } from "@/types/http";
import { axiosInstance, handleResponse } from "./axiosInstance";

export const administrativeApi = {
  getAllRegions: (): Promise<THttpResponse<TAdministrativeRegion[]>> => {
    return handleResponse(
      axiosInstance.get(apiURL.GET_ALL_ADMINISTRATIVE_REGIONS)
    );
  },

  getAllUnits: (): Promise<THttpResponse<TAdministrativeUnit[]>> => {
    return handleResponse(
      axiosInstance.get(apiURL.GET_ALL_ADMINISTRATIVE_UNITS)
    );
  },
};
