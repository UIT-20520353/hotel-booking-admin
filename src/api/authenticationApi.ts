import { TLoginResponse } from "@/types/authentication";
import { THttpResponse } from "@/types/http";
import { axiosInstance, handleResponse } from "./axiosInstance";
import { apiURL } from "@/constants/url";
import { TLoginForm } from "@/types/form";
import { EUserRole } from "@/enums/user";

export const authenticationApi = {
  login: (body: TLoginForm): Promise<THttpResponse<TLoginResponse>> =>
    handleResponse(
      axiosInstance.post(apiURL.LOGIN, {
        ...body,
        loginType: EUserRole.SYSTEM_ADMIN,
      })
    ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProfile: (): Promise<THttpResponse<any>> =>
    handleResponse(axiosInstance.get(apiURL.PROFILE)),
};
