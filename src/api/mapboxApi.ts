import appConstants from "@/constants/app";
import { THttpResponse } from "@/types/http";
import { TSuggestResponse } from "@/types/mapbox";
import { handleResponse, mapboxInstance } from "./axiosInstance";

const session = "03c19870-87af-45b1-893d-cd76a4607644";

export const mapboxApi = {
  search: (text: string): Promise<THttpResponse<TSuggestResponse>> =>
    handleResponse(
      mapboxInstance.get(`/search/searchbox/v1/suggest`, {
        params: {
          q: text,
          access_token: appConstants.VITE_MAP_BOX_KEY,
          session_token: session,
          country: "VN",
        },
      })
    ),
};
