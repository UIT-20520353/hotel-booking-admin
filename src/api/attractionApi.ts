import { apiURL } from "@/constants/url";
import { axiosInstance, handleResponse } from "./axiosInstance";
import { THttpResponse } from "@/types/http";
import { TAttraction, TCreateAttractionRequestBody } from "@/types/attraction";

export const attractionApi = {
  create: (
    requestBody: TCreateAttractionRequestBody
  ): Promise<THttpResponse<undefined>> => {
    const formData = new FormData();
    formData.append("name", requestBody.name);
    formData.append("latitude", requestBody.latitude.toString());
    formData.append("longitude", requestBody.longitude.toString());
    formData.append("description", requestBody.description);
    formData.append("address", requestBody.address);
    formData.append("overviewImage", requestBody.overviewImage);
    formData.append("summary", requestBody.summary);

    return handleResponse(
      axiosInstance.post(apiURL.CREATE_ATTRACTION, formData)
    );
  },
  getAllAttractions: ({
    page,
  }: {
    page: number;
  }): Promise<THttpResponse<TAttraction[]>> =>
    handleResponse(
      axiosInstance.get(apiURL.GET_ALL_ATTRACTIONS, {
        params: {
          page,
          size: 10,
        },
      })
    ),
  deleteAttraction: (id: number): Promise<THttpResponse<undefined>> =>
    handleResponse(axiosInstance.delete(apiURL.DELETE_ATTRACTION(id))),
  getAttractionDetail: (id: number): Promise<THttpResponse<TAttraction>> =>
    handleResponse(axiosInstance.get(apiURL.GET_ATTRACTION(id))),
};
