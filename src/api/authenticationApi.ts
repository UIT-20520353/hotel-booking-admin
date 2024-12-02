import { TLoginResponse } from "@/types/authentication";
import { THttpResponse } from "@/types/http";
import { axiosInstance, handleResponse } from "./axiosInstance";
import { apiURL } from "@/constants/url";
import { TLoginForm } from "@/types/form";

export const authenticationApi = {
  login: (body: TLoginForm): Promise<THttpResponse<TLoginResponse>> =>
    handleResponse(axiosInstance.post(apiURL.LOGIN, body)),
};
