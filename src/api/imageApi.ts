import { apiURL } from "@/constants/url";
import { THttpResponse } from "@/types/http";
import { axiosInstance, handleResponse } from "./axiosInstance";

export const imageApi = {
  upload: (file: File): Promise<THttpResponse<string>> => {
    const formData = new FormData();
    formData.append("file", file);

    return handleResponse(
      axiosInstance.post(apiURL.UPLOAD_IMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },
};
